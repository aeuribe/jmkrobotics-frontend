import { MetadataRoute } from 'next';

const BASE_URL = 'https://jmkrobotics.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE_URL}/en`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/es`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/en/machines`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/es/maquinas`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/en/in-action`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/es/en-accion`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/en/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/es/contacto`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];
}
