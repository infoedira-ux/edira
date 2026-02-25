import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://edira.vercel.app"),
  title: {
    default: "Edira — Find Verified Rentals in Kenya",
    template: "%s | Edira Kenya",
  },
  description: "Browse verified rental listings across Nairobi, Mombasa, Kisumu and Nakuru. No brokers, no scams. Connect directly with landlords on WhatsApp.",
  keywords: ["rentals Kenya", "houses for rent Nairobi", "apartments Mombasa", "bedsitter Nairobi", "furnished apartment Kenya", "houses Kisumu", "Nakuru rentals", "Westlands apartment", "Kilimani house", "Nyali apartment"],
  authors: [{ name: "Edira Kenya" }],
  creator: "Edira Kenya",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://edira.vercel.app",
    siteName: "Edira Kenya",
    title: "Edira — Find Verified Rentals in Kenya",
    description: "Browse verified rental listings across Nairobi, Mombasa, Kisumu and Nakuru. No brokers, no scams.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Edira Kenya Rentals" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Edira — Find Verified Rentals in Kenya",
    description: "Browse verified rental listings across Nairobi, Mombasa, Kisumu and Nakuru.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#0A0E1A" }}>
        {children}
      </body>
    </html>
  );
}