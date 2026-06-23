import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "MUSTAV | Artisan Smashed Burgers",
  description: "Experience the ultimate artisan smashed burgers at MUSTAV. Fresh ingredients, bold flavors, and zero guilt. Crafted for your cravings.",
  keywords: "artisan burgers, smashed burgers, fresh ingredients, organic burgers, MUSTAV burgers, Lahore, Islamabad, Rawalpindi, Multan",
  openGraph: {
    title: "MUSTAV | Artisan Smashed Burgers",
    description: "Experience the ultimate artisan smashed burgers at MUSTAV. Fresh ingredients, bold flavors, and zero guilt.",
    url: "https://mustav.shop",
    siteName: "MUSTAV Burgers",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col grain">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
