/** Open a public-folder asset without TanStack Router treating it as an app route. */
export function openStaticAsset(path: string, event?: { preventDefault: () => void; stopPropagation: () => void }) {
  event?.preventDefault();
  event?.stopPropagation();
  const url = path.startsWith("http") ? path : `${window.location.origin}${path.startsWith("/") ? path : `/${path}`}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
