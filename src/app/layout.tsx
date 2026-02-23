import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Edira — Kenya's Premium Rental Platform",
  description: "Find verified rental properties across Nairobi, Mombasa, Kisumu and Nakuru. No broker fees, no scams — just real homes.",
  keywords: "rental, Kenya, Nairobi, Mombasa, house, apartment, bedsitter",
  openGraph: {
    title: "Edira — Kenya's Premium Rental Platform",
    description: "Find your perfect home in Kenya.",
    siteName: "Edira",
    locale: "en_KE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "'Outfit', sans-serif", background: "#0A0E1A", color: "white", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}