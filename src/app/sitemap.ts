import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://edira.vercel.app";
  const cities = ["Nairobi", "Mombasa", "Kisumu", "Nakuru"];
  const types = ["bedsitter", "1-bedroom", "2-bedroom", "3-bedroom"];

  const cityPages = cities.map((city) => ({
    url: `${base}/browse?city=${city}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const typePages = types.map((type) => ({
    url: `${base}/browse?type=${type}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/browse`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/cities`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/post`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/auth/signup`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...cityPages,
    ...typePages,
  ];
}
