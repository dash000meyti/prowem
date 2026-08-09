import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { DemoProvider } from "@/context/DemoProvider";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PROWEM — Run Sports. Build Communities. Create Experiences.",
  description:
    "Digital infrastructure for modern sports — events, clubs, live matches and fans on one data platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-bg-0 font-sans text-foreground">
        <DemoProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-orange focus:px-3 focus:py-2 focus:text-bg-0"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </DemoProvider>
      </body>
    </html>
  );
}
