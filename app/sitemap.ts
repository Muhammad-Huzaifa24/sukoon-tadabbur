import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sukoon.example";
  return [
    "",
    "/reminders",
    "/series",
    "/courses",
    "/tadabbur",
    "/consultation",
    "/blog",
    "/about",
    "/privacy",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
