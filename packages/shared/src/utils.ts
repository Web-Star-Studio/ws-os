/**
 * Shared utility functions used across web and native apps.
 * Add your cross-platform helpers here.
 */

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
