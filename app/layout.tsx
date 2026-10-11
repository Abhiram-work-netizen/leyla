import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Leyla — Your AI Mental Wellness Companion',
    template: '%s | Leyla',
  },
  description:
    'Leyla is your AI mental wellness companion — private, judgment-free and always here for you. Talk, express, get support and feel better, at your own pace.',
  keywords: [
    'mental health',
    'AI companion',
    'wellness',
    'therapy',
    'mood tracking',
    'journaling',
    'support',
  ],
  openGraph: {
    title: 'Leyla — Your AI Mental Wellness Companion',
    description:
      'Private, judgment-free AI mental wellness companion. Talk, express, get support and feel better.',
    siteName: 'Leyla',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leyla — Your AI Mental Wellness Companion',
    description:
      'Private, judgment-free AI mental wellness companion.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${plusJakarta.variable} h-full dark`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
