import { Student, type StudentProps } from "./Student";

/** A student character cropped to head and shoulders, for cards. */
export function Avatar({
  className = "h-28 w-auto",
  ...props
}: StudentProps & { className?: string }) {
  return (
    <svg viewBox="-6 2 116 116" className={className} aria-hidden="true">
      <Student {...props} />
    </svg>
  );
}
