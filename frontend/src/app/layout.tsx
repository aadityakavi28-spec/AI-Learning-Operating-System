import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'AI Learning OS - Smart Learning Platform',
    template: '%s | AI Learning OS',
  },
  description: 'AI-powered platform that helps students learn from the internet while tracking their learning behavior and optimizing their study process.',
  keywords: ['AI Learning', 'Online Education', 'Study Tools', 'Flashcards', 'Notes', 'Learning Analytics'],
  authors: [{ name: 'AI Learning OS Team' }],
  creator: 'AI Learning OS',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ai-learning-os.com',
    siteName: 'AI Learning OS',
    title: 'AI Learning OS - Smart Learning Platform',
    description: 'AI-powered platform that helps students learn from the internet',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Learning OS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Learning OS',
    description: 'AI-powered platform for smart learning',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

