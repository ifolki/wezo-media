import type { Metadata } from "next";
import { Tajawal, DM_Sans, Cairo, Syne } from "next/font/google";
import "./../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Providers } from "@/components/shared/Providers";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

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
  metadataBase: new URL("https://www.wezomedia.ma"),
  title: {
    default: "WEZO MEDIA | وكالة حلول رقمية وتسويق رقمي في المغرب",
    template: "%s | WEZO MEDIA",
  },
  description: "وكالة WEZO MEDIA للحلول الرقمية وشريك النمو للشركات في المغرب. استراتيجية رقمية، مواقع إلكترونية ومتاجر، هوية بصرية، إعلانات ممولة وأتمتة ذكية للأعمال.",
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
        <GoogleAnalytics locale={locale} />
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
