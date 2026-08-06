import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/add-project',
    },
    sitemap: 'https://localhost:3000/sitemap.xml', // Update to your domain in production
  };
}
