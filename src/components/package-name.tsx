import { Fragment } from "react";
import { getPackageCourses, type Package } from "@/data/packages";

/** Connector color per background context; code text always inherits the surrounding heading/link color */
const DOT_TONES = {
  light: "text-skyblue-500 dark:text-skyblue-400",
  onAccent: "text-white/90",
  onDark: "text-skyblue-400",
} as const;

/**
 * Renders a package's course codes as plain bold text joined by accent-
 * colored "·" separators — avoiding confusion with the "+" that is part
 * of course names like "A+" and "N+".
 * Font size and text color are inherited from the surrounding element.
 */
export function PackageName({
  pkg,
  tone = "light",
  className,
}: {
  pkg: Package;
  tone?: keyof typeof DOT_TONES;
  className?: string;
}) {
  const codes = getPackageCourses(pkg).map((c) => c.code);

  return (
    <span className={"inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5 " + (className ?? "")}>
      {codes.map((code, i) => (
        <Fragment key={code}>
          {i > 0 && (
            <span aria-hidden="true" className={`shrink-0 font-black ${DOT_TONES[tone]}`}>
              ·
            </span>
          )}
          <span className="font-bold tracking-tight">{code}</span>
        </Fragment>
      ))}
    </span>
  );
}
