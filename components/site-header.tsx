// Re-export Nav as SiteHeader so all pages use the same unified header.
// All existing imports of { SiteHeader } across the codebase continue to work
// without any changes to content-page.tsx, blog/[id]/page.tsx, or not-found.tsx.
export { Nav as SiteHeader } from "@/components/home/Nav";
