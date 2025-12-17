import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/language-provider";
import { AppShell } from "@/components/app-shell";
import { ReferralTracker } from "@/components/referral-tracker";
import { VisitorTracker } from "@/components/visitor-tracker";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kodidela Webkraft | Full-Stack Developer Portfolio",
  description:
    "Professional full-stack development, DevOps, and maintenance services. Build, deploy, and scale high-quality web and software solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Suspense fallback={null}>
          <ReferralTracker />
          <VisitorTracker />
        </Suspense>
        <LanguageProvider>
          <AppShell>{children}</AppShell>
        </LanguageProvider>
      </body>
    </html>
  );
}