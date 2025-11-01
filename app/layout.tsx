import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { generateOrganizationLdJson, generateSiteNavigationLdJson, generateWebPage, generateWebSiteLdJson } from "@/lib/ld-json";
import VerticalMenu from "@/components/VerticalMenu";

export const metadata: Metadata = {
  title: "Portal de Receitas",
  description: "Descubra receitas deliciosas e fáceis de fazer no Portal de Receitas.",
  metadataBase: new URL("https://exemplo.com"),
  openGraph: {
    title: "Portal de Receitas",
    description: "As melhores receitas caseiras e práticas.",
    url: "https://exemplo.com",
    siteName: "Portal de Receitas",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portal de Receitas",
    description: "Receitas fáceis e deliciosas para o dia a dia.",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const websiteJsonLd = generateWebSiteLdJson();
  const organizationJsonLd = generateOrganizationLdJson();
  const siteNavigationJsonLd = await generateSiteNavigationLdJson();
  const webpageJsonLd = generateWebPage();

  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageJsonLd) }}
        />
        <Header />
        <div className="flex gap-6 max-w-7xl mx-auto flex-1 px-4 py-6">
          <VerticalMenu />
          <main className="flex-1 container mx-auto px-4 py-6">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
