/**
 * Extracts the first image URL from markdown content
 * Supports both markdown syntax ![alt](url) and HTML img tags
 */
export function extractFirstImage(content: string): string | undefined {
  // First try to match markdown image syntax: ![alt](url)
  const markdownImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/;
  const markdownMatch = content.match(markdownImageRegex);
  
  if (markdownMatch) {
    return markdownMatch[2]; // Return the URL part
  }
  
  // Then try to match HTML img tags: <img src="url" />
  const htmlImageRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i;
  const htmlMatch = content.match(htmlImageRegex);
  
  if (htmlMatch) {
    return htmlMatch[1]; // Return the src attribute value
  }
  
  return undefined;
}