/**
 * The homepage train entrance plays every time the homepage becomes active.
 *
 * - Navigating to "/" from another page remounts the page (app/template.tsx),
 *   so the animation starts again on its own. This includes the browser
 *   back button.
 * - Clicking a Home link while already on "/" does not remount anything, so
 *   those links dispatch this event and the hero restarts itself.
 * - Returning from another site through the browser's back/forward cache
 *   fires `pageshow` with `persisted`, which the hero also listens for.
 *
 * Nothing is stored in sessionStorage or localStorage.
 */
export const HOME_REPLAY_EVENT = "codebase:replay-home";

export function requestHomeReplay() {
  window.dispatchEvent(new Event(HOME_REPLAY_EVENT));
}
