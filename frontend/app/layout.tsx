import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Henry M. Ugochukwu | Full Stack Developer',
  description: 'Modern full stack developer portfolio with live projects, certifications, and admin-managed content.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
