import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { LayoutWrapper } from '@/components/layout-wrapper';
import { WhatsAppButton } from '@/components/whatsapp-button';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Assignment Help UK | Premium Essay & Dissertation Writing Services',
    template: '%s | Cambridge Writers',
  },
  description:
    'Assignment help UK from expert academic writers. Trusted by UK university students for essays, coursework, and dissertations. Get high-quality work delivered on time.',
  keywords: [
    'assignment help UK',
    'essay writing UK',
    'dissertation writing service',
    'coursework help',
    'academic writing service',
    'essay help UK',
    'university assignment help',
    'dissertation help UK',
    'Cambridge Writers',
  ],
  metadataBase: new URL('https://www.cambridgewriters.co.uk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.cambridgewriters.co.uk',
    siteName: 'Cambridge Writers',
    title: 'Assignment Help UK | Premium Essay & Dissertation Writing Services',
    description:
      'Assignment help UK from expert academic writers. Trusted by UK university students for essays, coursework, and dissertations. Get high-quality work delivered on time.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Assignment Help UK | Premium Essay & Dissertation Writing Services',
    description:
      'Assignment help UK from expert academic writers. Trusted by UK university students for essays, coursework, and dissertations.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning className='scroll-smooth'>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
