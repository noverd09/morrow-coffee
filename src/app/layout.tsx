import type { Metadata } from "next";
import { Instrument_Serif, Instrument_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/hooks/use-cart";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { MotionProvider } from "@/components/motion-provider";

const displayFont = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const bodyFont = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const monoFont = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Morrow Coffee | Pick your first hour",
  description:
    "Six small-batch coffees ordered from dark roast to light, like the sky between night and noon. Roasted fresh weekly.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body className="min-h-screen flex flex-col">
        <MotionProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
