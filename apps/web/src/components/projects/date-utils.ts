export function formatDateTime(timestamp: number): string {
  return new Date(timestamp).toLocaleString();
}

export function formatDate(timestamp: number | null | undefined): string {
  if (!timestamp) {
    return "-";
  }
  return new Date(timestamp).toLocaleDateString();
}

