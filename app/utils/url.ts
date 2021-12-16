export function extractHost(url?: string): (string | undefined) {
  if (!url) return '';
  const arr = url.split("/");
  return arr[2];
}
