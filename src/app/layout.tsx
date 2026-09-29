import type { Metadata } from "next";
import { Crimson_Pro, Inter } from "next/font/google";
import "./globals.css";

const headingSerif = Crimson_Pro({
  variable: "--font-heading-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const bodySans = Inter({
  variable: "--font-body-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Morrow Coffee — Small-batch coffee for slow mornings",
  description: "Independent specialty coffee roaster focused on high-quality, small-batch coffee for everyday rituals.",
};

import { CartProvider } from "@/lib/hooks/use-cart";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${headingSerif.variable} ${bodySans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
