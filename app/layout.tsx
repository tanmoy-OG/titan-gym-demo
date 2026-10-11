import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'TITAN ATHLETIC CLUB | Premium Gym & Performance Center',
  description: 'World-class fitness center featuring high-performance training programs, cinematic branch management, expert coaching, and AI-powered athletic visualizers.',
  openGraph: {
    title: 'TITAN ATHLETIC CLUB | Premium Gym & Performance Center',
    description: 'World-class fitness center featuring high-performance training programs, cinematic branch management, expert coaching, and AI-powered athletic visualizers.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TITAN ATHLETIC CLUB | Premium Gym & Performance Center',
    description: 'World-class fitness center featuring high-performance training programs, cinematic branch management, expert coaching, and AI-powered athletic visualizers.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
