import './globals.css';
import type { Metadata } from 'next';

const siteUrl = 'https://henry-ugochukwu-porfolio.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Henry M. Ugochukwu | Full Stack Developer',
  description:
    'Full stack developer specializing in modern web development, dynamic websites, database design, and production-ready products.',
  keywords: [
    'Henry Ugochukwu',
    'Henry M. Ugochukwu',
    'Full Stack Developer',
    'Full-Stack Developer',
    'Web Developer',
    'Web Development',
    'Dynamic Websites',
    'Database Design',
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'Express',
    'PostgreSQL',
    'Prisma',
    'Vercel',
    'Railway',
    'Portfolio'
  ],
  authors: [{ name: 'Henry M. Ugochukwu', url: siteUrl }],
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Henry M. Ugochukwu | Full Stack Developer',
    description:
      'Showcasing full stack web development, web design, dynamic websites, and database design projects by Henry M. Ugochukwu.',
    siteName: 'Henry M. Ugochukwu Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Henry M. Ugochukwu – Full Stack Developer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Henry M. Ugochukwu | Full Stack Developer',
    description:
      'Full stack developer building modern, scalable web applications, dynamic websites, and well-designed databases.',
    images: ['/og-image.png']
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
