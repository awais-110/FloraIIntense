import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Floral Intense — Luxury Scents by Floral Intense",
  description: "Karachi based perfumery with 14 products, men, women, unisex and discovery sets.",
  openGraph: {
    title: "Floral Intense — Luxury Scents",
    description: "A fragrance that speaks before you do.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0806",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
