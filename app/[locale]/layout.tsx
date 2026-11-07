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

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === 'ar';
  const isFr = locale === 'fr';

  const defaultTitle = isAr
    ? 'وكالة التواصل والتسويق الرقمي في المغرب | WEZO MEDIA'
    : isFr
      ? 'Agence de Communication Digitale au Maroc | WEZO MEDIA'
      : 'Digital Marketing & Communication Agency in Morocco | WEZO MEDIA';

  const defaultDescription = isAr
    ? 'وكالة WEZO MEDIA للتواصل والتسويق الرقمي وشريك النمو للشركات في المغرب. استراتيجية رقمية، مواقع إلكترونية ومتاجر، هوية بصرية، إعلانات ممولة وأتمتة ذكية للأعمال.'
    : isFr
      ? 'WEZO MEDIA accompagne les entreprises au Maroc en communication digitale, publicité Meta Ads, création de sites web, branding et automatisation.'
      : 'WEZO MEDIA is a digital communication and marketing agency in Morocco helping businesses grow through branding, websites, paid ads, video, and automation.';

  return {
    metadataBase: new URL('https://www.wezomedia.ma'),
    title: {
      default: defaultTitle,
      template: '%s | WEZO MEDIA',
    },
    description: defaultDescription,
    alternates: {
      languages: {
        en: '/en',
        ar: '/ar',
        fr: '/fr',
      },
    },
  };
}

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
      <body className={`${tajawal.variable} ${dmSans.variable} ${cairo.variable} ${syne.variable} ${locale === 'ar' ? 'font-tajawal' : 'font-dmSans'} antialiased`}>
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
