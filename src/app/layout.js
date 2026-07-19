import "./globals.css";
import { getServerLang } from "@/lib/lang-server";
import { getDict } from "@/lib/i18n";
import { LangProvider } from "@/components/LangProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSettings, getCategories } from "@/lib/data";
import { API_URL } from "@/lib/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const TITLE = "Boutique MilyShop — Fine Apparel & Design";
const DESCRIPTION = "Boutique de mode féminine — élégance et raffinement. | بوتيك ميلي شوب للأزياء النسائية الراقية";

// Uses the admin-set logo (Settings) for the favicon when available, so the
// exact uploaded logo becomes the browser-tab icon. Social preview (og:image)
// needs a fetchable http(s) image, so it uses the logo only if it's a URL;
// otherwise it falls back to the bundled og.png card.
export async function generateMetadata() {
  const settings = await getSettings();
  const logo = settings?.logo || "/logo.png";
  // og:image must be a fetchable URL. A path (/logo.png) or http URL works as-is
  // (Next resolves it against metadataBase); an admin-uploaded data URL is served
  // as a real image by the backend at /api/logo instead.
  const ogImage = typeof logo === "string" && logo.startsWith("data:") ? `${API_URL}/api/logo` : logo;
  return {
    metadataBase: new URL(SITE_URL),
    title: TITLE,
    description: DESCRIPTION,
    icons: { icon: logo, apple: logo, shortcut: logo },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: SITE_URL,
      siteName: "Boutique MilyShop",
      images: [ogImage],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
      images: [ogImage],
    },
  };
}

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
