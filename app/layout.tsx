import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'TITAN ATHLETIC CLUB | Premium Gym & Performance Center',
  description: 'World-class fitness center featuring high-performance training programs, cinematic branch management, and expert coaching.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'TITAN ATHLETIC CLUB | Premium Gym & Performance Center',
    description: 'World-class fitness center featuring high-performance training programs, cinematic branch management, and expert coaching.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TITAN ATHLETIC CLUB | Premium Gym & Performance Center',
    description: 'World-class fitness center featuring high-performance training programs, cinematic branch management, and expert coaching.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
