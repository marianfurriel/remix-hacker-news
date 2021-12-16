import { formatDistance } from "date-fns";

export function formatDate(timestamp?: number): string {
  if (!timestamp) return '';

  const unixTimestamp = timestamp;
  const milliseconds = unixTimestamp * 1000;
  const timeDistance = formatDistance(new Date(milliseconds), new Date(), {
    addSuffix: true,
  });

  return timeDistance;
}