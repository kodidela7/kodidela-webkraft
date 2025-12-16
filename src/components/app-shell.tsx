"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { WhatsAppChatButton } from "@/components/whatsapp-chat-button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-full px-4 py-1 transition hover:bg-white/10"
    >
      {label}
    </Link>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { homeCopy } = useLanguage();
  const layout = homeCopy.layoutCopy;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1 md:px-8">
          <Link href="/" aria-label="Home">
            <Image
              src="/logo.png"
              alt="Kodidela Webkraft logo"
              width={160}
              height={62}
              className="rounded-lg"
            />
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-1 rounded-full border border-zinc-800 bg-black/70 px-2 py-1 text-xs font-medium text-zinc-300 md:flex">
              <NavLink href="/services" label={layout.nav.services} />
              <NavLink href="/portfolio" label={layout.nav.portfolio} />
              <NavLink href="/about" label={layout.nav.about} />
              <NavLink href="/contact" label={layout.nav.contact} />
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-black/80 text-zinc-300 shadow-sm transition hover:border-zinc-600 hover:text-white md:hidden"
                aria-label="Open navigation"
              >
                <span className="sr-only">Open navigation</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex justify-end md:hidden">
            <div
              className="absolute inset-0 bg-black"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative z-10 flex h-full w-64 max-w-full flex-col border-l border-zinc-800 bg-black px-4 py-5 text-sm text-zinc-100">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-black/80 text-zinc-300 hover:border-zinc-600 hover:text-white"
                  aria-label="Close navigation"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <nav className="space-y-2">
                <Link
                  href="/services"
                  className="block rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-100 hover:bg-zinc-800 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {layout.nav.services}
                </Link>
                <Link
                  href="/portfolio"
                  className="block rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-100 hover:bg-zinc-800 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {layout.nav.portfolio}
                </Link>
                <Link
                  href="/about"
                  className="block rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-100 hover:bg-zinc-800 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {layout.nav.about}
                </Link>
                <Link
                  href="/contact"
                  className="block rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-100 hover:bg-zinc-800 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {layout.nav.contact}
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>
      <main className="flex-1 bg-gradient-to-b from-black via-neutral-950 to-black">
        {children}
      </main>
      <footer className="border-t border-zinc-900 bg-black">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 text-sm text-zinc-400 md:flex-row md:items-start md:justify-between md:px-8">
          <div className="max-w-xs space-y-4">
            <Image
              src="/logo.png"
              alt="Kodidela Webkraft logo"
              width={160}
              height={62}
              className="rounded-lg"
            />
            <p className="text-xs leading-relaxed text-zinc-500">
              {layout.footerIntro}
            </p>
          </div>
          <div className="flex flex-1 flex-wrap gap-8 md:justify-end">
            <div className="space-y-2">
              <p className="font-semibold text-zinc-200">
                {layout.footer.servicesTitle}
              </p>
              <div className="space-y-1">
                {layout.footer.servicesItems.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-zinc-200">
                {layout.footer.companyTitle}
              </p>
              <div className="space-y-1">
                {layout.footer.companyItems.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-zinc-200">
                {layout.footer.contactTitle}
              </p>
              <div className="space-y-1">
                {layout.footer.contactItems.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 bg-black/95">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-[11px] text-zinc-500 md:px-8">
            <span>
              © {new Date().getFullYear()} {layout.footer.copyright}
            </span>
            <span className="space-x-4">
              <button className="underline-offset-2 hover:underline">
                {layout.footer.privacy}
              </button>
              <button className="underline-offset-2 hover:underline">
                {layout.footer.terms}
              </button>
            </span>
          </div>
        </div>
      </footer>
      <WhatsAppChatButton />
    </div>
  );
}
