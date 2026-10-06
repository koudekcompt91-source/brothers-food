import type { Metadata, Viewport } from "next";
import { Anton, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { BRAND, RESTAURANT } from "@/data/config";
import Preloader from "@/components/preloader/preloader";
import CustomCursor from "@/components/cursor/custom-cursor";
import ScrollProgress from "@/components/ui/scroll-progress";
import Navbar from "@/components/navbar/navbar";
import CartDrawer from "@/components/cart/cart-drawer";
import MobileCartBar from "@/components/cart/mobile-cart-bar";
import CartToast from "@/components/cart/cart-toast";
import Footer from "@/components/footer/footer";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: `${BRAND.name} | Good Food. Good Mood.`,
  description:
    "Discover BROTHERS FOOD — burgers, sandwiches and our signature Tasty Crusty box.",
  openGraph: {
    title: `${BRAND.name} | Good Food. Good Mood.`,
    description: "Discover BROTHERS FOOD — burgers, sandwiches and our signature Tasty Crusty box.",
    images: ["/logo.png"],
    type: "website",
  },
  icons: { icon: "/logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#ff6a00",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: BRAND.name,
  servesCuisine: "Fast Food",
  priceRange: "$$",
  telephone: RESTAURANT.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: RESTAURANT.address,
    addressLocality: RESTAURANT.city,
  },
  openingHours: "Mo-Su 11:00-23:00",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${manrope.variable}`}>
      <body className="grain custom-cursor-active">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <CartProvider>
          <Preloader />
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <MobileCartBar />
          <CartToast />
        </CartProvider>
      </body>
    </html>
  );
}
