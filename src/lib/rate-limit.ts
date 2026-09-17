/**
 * Rate limiting for spammy endpoints.
 *
 * Two backends, picked automatically:
 *  - **Upstash Redis** (preferred; works on serverless platforms like Vercel
 *    where instances share no memory). Enabled when UPSTASH_REDIS_REST_URL +
 *    UPSTASH_REDIS_REST_TOKEN *or* KV_REST_API_URL + KV_REST_API_TOKEN
 *    (Vercel Storage integration) are set.
 *  - **In-memory fallback** for local dev / a single Node server.
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export interface RateLimitResult {
  ok: boolean;
  retryAfterSeconds: number;
}

/* ------------------------- Upstash (production) ------------------------- */

const upstashUrl = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

// One Redis client + one limiter instance per (limit, window) combination
let upstashRedis: Redis | null = null;
const upstashLimiters = new Map<string, Ratelimit>();

function getUpstash(limit: number, windowMs: number): Ratelimit | null {
  if (!upstashUrl || !upstashToken) return null;
  const cfgKey = `${limit}:${windowMs}`;
  let limiter = upstashLimiters.get(cfgKey);
  if (!limiter) {
    upstashRedis ??= new Redis({ url: upstashUrl, token: upstashToken });
    limiter = new Ratelimit({
      redis: upstashRedis,
      limiter: Ratelimit.slidingWindow(limit, `${Math.round(windowMs / 1000)} s`),
      prefix: "rate",
      analytics: false,
    });
    upstashLimiters.set(cfgKey, limiter);
  }
  return limiter;
}

/* --------------------- In-memory fallback (local dev) -------------------- */

type Bucket = number[]; // timestamps (ms) of recent hits
const buckets = new Map<string, Bucket>();
const MAX_KEYS = 5000;

function rateLimitMemory(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const windowStart = now - windowMs;

  if (buckets.size > MAX_KEYS) {
    for (const [k, b] of buckets) {
      if (b.length === 0 || b[b.length - 1] <= windowStart) buckets.delete(k);
    }
  }

  const hits = (buckets.get(key) ?? []).filter((t) => t > windowStart);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return {
      ok: false,
      retryAfterSeconds: Math.max(1, Math.ceil((hits[0] + windowMs - now) / 1000)),
    };
  }
  hits.push(now);
  buckets.set(key, hits);
  return { ok: true, retryAfterSeconds: 0 };
}

/* ------------------------------ Public API ------------------------------ */

/**
 * Records a hit for `key` and reports whether it is within `limit` hits
 * per `windowMs`. Rejected hits still count, so rapid retrying can't
 * shave off the wait.
 */
export async function rateLimit(key: string, limit: number, windowMs: number): Promise<RateLimitResult> {
  const backend = getUpstash(limit, windowMs);
  if (!backend) return rateLimitMemory(key, limit, windowMs);

  try {
    const { success, reset } = await backend.limit(key);
    if (!success) {
      return {
        ok: false,
        retryAfterSeconds: Math.max(1, Math.ceil((reset - Date.now()) / 1000)),
      };
    }
    return { ok: true, retryAfterSeconds: 0 };
  } catch (err) {
    // If Redis is unreachable, fail open (log + allow) rather than blocking
    // real users; spam protection must not take the contact form down.
    console.error("[rate-limit] Upstash check failed, allowing request:", err);
    return { ok: true, retryAfterSeconds: 0 };
  }
}
