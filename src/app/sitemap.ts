import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yourtutor.netlify.app'

  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/blog/top-10-gcse-maths-exam-mistakes`, lastModified: new Date('2026-06-10') },
    { url: `${baseUrl}/blog/how-to-get-grade-9-in-gcse-maths`, lastModified: new Date('2026-06-10') },
    { url: `${baseUrl}/blog/best-gcse-revision-strategy`, lastModified: new Date('2026-06-10') },
    { url: `${baseUrl}/blog/gcse-maths-formula-sheet-guide`, lastModified: new Date('2026-06-10') },
  ]
}
