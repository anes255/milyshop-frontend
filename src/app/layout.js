import "./globals.css";
import { getServerLang } from "@/lib/lang-server";
import { getDict } from "@/lib/i18n";
import { LangProvider } from "@/components/LangProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSettings, getCategories } from "@/lib/data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const TITLE = "Boutique MilyShop — Fine Apparel & Design";
const DESCRIPTION = "Boutique de mode féminine — élégance et raffinement. | بوتيك ميلي شوب للأزياء النسائية الراقية";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/logo.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Boutique MilyShop",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Boutique MilyShop" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export default async function RootLayout({ children }) {
  const lang = getServerLang();
  const t = getDict(lang);
  const [settings, categories] = await Promise.all([
    getSettings(),
    getCategories(),
  ]);

  return (
    <html lang={lang} dir={t.dir}>
      <body>
        <LangProvider lang={lang}>
          <Navbar settings={settings} categories={categories} />
          <main className="min-h-[70vh]">{children}</main>
          <Footer settings={settings} />
        </LangProvider>
      </body>
    </html>
  );
}
