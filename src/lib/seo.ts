export const siteUrl = "https://www.homefrontsolutionsllc.com";

export function buildTitle(title: string) {
  return `${title} | Home Front Solutions LLC`;
}

export function absoluteUrl(path: string) {
  return `${siteUrl}${path}`;
}
