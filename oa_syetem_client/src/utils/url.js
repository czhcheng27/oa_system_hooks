// HashRouter
export function getFullHashUrl(relativeHashPathWithQuery) {
  const { origin, pathname } = window.location;

  // 提取 basePath（如 "/oa_system_hooks"，确保适配 GitHub Pages）
  const pathSegments = pathname.split("/").filter(Boolean);
  const basePath = pathSegments.length > 0 ? `/${pathSegments[0]}` : "";

  return `${origin}${basePath}/#/${relativeHashPathWithQuery}`;
}

// BrowserRouter
export function getFullPathUrl(relativePathWithQuery) {
  const { origin, pathname } = window.location;

  // 提取 basePath，例如 /oa_system_hooks
  const pathSegments = pathname.split("/").filter(Boolean);
  const basePath = pathSegments.length > 0 ? `/${pathSegments[0]}` : "";

  return `${origin}${basePath}/${relativePathWithQuery}`;
}
