import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ikevss.github.io/ai-pm-handbook";
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/templates/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/prompts/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}