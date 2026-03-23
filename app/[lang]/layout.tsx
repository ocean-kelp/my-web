import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import OceanBackground from "@/components/OceanBackground";
import { ThemeProvider } from "@/components/ThemeProvider";
import MouseSpotlight from "@/components/MouseSpotlight";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ronald Díaz | Portfolio",
  description: "Software Engineer & DevOps Specialist",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col text-slate-800 dark:text-slate-200 bg-white dark:bg-black transition-colors duration-500">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <OceanBackground />
          <MouseSpotlight />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
