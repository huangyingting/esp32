import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#f8f1e6',
  colorScheme: 'light',
};

export const metadata: Metadata = {
  title: 'Learn ESP32 — interactive 3D lessons for beginners',
  description:
    'Learn the ESP32 on an interactive 3D board: wire sensors and motors, use Wi-Fi and Bluetooth, then run the code and watch it work. 20 free beginner lessons.',
  applicationName: 'Learn ESP32',
  authors: [{ name: 'Dilum Sanjaya', url: 'https://x.com/DilumSanjaya' }],
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: '48x48' },
      { url: `${basePath}/favicon.svg`, type: 'image/svg+xml' },
    ],
    apple: `${basePath}/apple-touch-icon.png`,
  },
  manifest: `${basePath}/site.webmanifest`,
  openGraph: {
    type: 'website',
    siteName: 'Learn ESP32',
    locale: 'en_US',
    title: 'Learn ESP32 — interactive 3D lessons',
    description:
      'Wire up LEDs, buttons, touch keys, sensors, motors, servos and a stepper on a 3D ESP32, talk to it over Wi-Fi, Bluetooth and ESP-NOW, then run the code and watch it work. 20 free beginner lessons.',
    images: [
      {
        url: `${basePath}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'An illustrated 3D ESP32 board wired on a breadboard to a distance sensor and a traffic light, with a toy car in front of it',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@DilumSanjaya',
    images: [`${basePath}/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="is-loading" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              const d = document.documentElement;
              const vw = d.clientWidth || innerWidth;
              const vh = d.clientHeight || innerHeight;
              let s = Math.min(vw / 1672, vh / 941);
              if (s < 0.8) s = Math.min(vw / 1280, vh / 941, 0.8);
              if (s < 0.62 || vw / vh < 0.95) d.classList.add('compact');
            })();`,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
