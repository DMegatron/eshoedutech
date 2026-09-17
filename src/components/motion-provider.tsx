"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Global motion preferences.
 * `reducedMotion="user"` makes every framer-motion transform/layout animation
 * collapse to a simple fade when the OS requests reduced motion —
 * CSS-side guard lives in globals.css.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
