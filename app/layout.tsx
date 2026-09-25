import type { Metadata } from 'next';
import { DM_Sans, Instrument_Serif } from 'next/font/google';
import { BASE_PATH } from '@/lib/base-path';
import './globals.css';

export const dynamic = 'force-static';

const siteOrigin = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').origin;

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: 'Isidora Orrego — Diseño de Moda y Gestión',
  description:
    'Portafolio de Isidora Orrego. Diseño de moda, dirección de arte, styling, desarrollo de colecciones, fotografía y comunicación visual.',
  icons: {
    icon: `${BASE_PATH}/favicon.svg`,
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    title: 'Isidora Orrego — Diseño de Moda y Gestión',
    description:
      'Mirar distinto, diseñar con intención. Portafolio de diseño de moda de Isidora Orrego.',
    images: [
      {
        url: `${BASE_PATH}/og.png`,
        width: 1200,
        height: 630,
        alt: 'Isidora Orrego — Mirar distinto, diseñar con intención',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Isidora Orrego — Diseño de Moda y Gestión',
    description: 'Mirar distinto, diseñar con intención.',
    images: [`${BASE_PATH}/og.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${dmSans.variable} ${instrumentSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
