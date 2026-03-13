import type { Metadata } from "next";
import { Tajawal, DM_Sans, Cairo, Syne } from "next/font/google";
import "./../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Providers } from "@/components/shared/Providers";

const tajawal = Tajawal({ 
  subsets: ["arabic"],
  weight: ['300', '400', '500', '700'],
  variable: '--font-tajawal',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
});

const cairo = Cairo({ 
  subsets: ["arabic"],
  weight: ['400', '600', '700', '900'],
  variable: '--font-cairo',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
});

export const metadata: Metadata = {
  title: "Wezo Media | Digital Success Partner",
  description: "Music production, digital marketing, and web development services.",
  alternates: {
    languages: {
      'en': '/en',
      'ar': '/ar',
      'fr': '/fr',
    },
  },
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${tajawal.variable} ${dmSans.variable} ${cairo.variable} ${syne.variable} font-tajawal antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
