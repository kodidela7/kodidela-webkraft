"use client";

import Image from "next/image";
import { useLanguage } from "@/components/language-provider";

export default function Home() {
  const { homeCopy } = useLanguage();

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(250,250,250,0.08),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.9),_transparent_65%)]" />

      <section className="mx-auto flex max-w-6xl xl:max-w-7xl 2xl:max-w-[90rem] flex-col gap-10 px-4 pb-8 pt-4 md:flex-row md:items-center md:px-8 md:pb-10 md:pt-8">
        <div className="flex-1 animate-fade-in-up">
          <div className="flex flex-col space-y-6 md:space-y-8">
            <div className="space-y-6">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-zinc-700/80 bg-black/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-200 sm:text-[11px]">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white" />
                <span className="break-words text-[10px] text-zinc-200 sm:text-xs">
                  {homeCopy.hero.tag}
                </span>
              </div>

              <div className="space-y-5">
                <h1 className="text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-[2.75rem]">
                  {homeCopy.hero.title}
                </h1>
                <p className="max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                  {homeCopy.hero.subtitle}
                </p>
              </div>

              <div className="grid gap-3 text-xs text-zinc-100 sm:grid-cols-2 sm:text-[13px]">
                {homeCopy.hero.bullets.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full border border-zinc-600 bg-black text-[9px] text-zinc-200">
                      ●
                    </span>
                    <p className="leading-snug text-zinc-200">{item}</p>
                  </div>
                ))}
              </div>

              {/* Mobile bug guarantee card under bullets */}
              <div className="mt-1 rounded-2xl border border-zinc-800 bg-black/70 p-3 text-[11px] text-zinc-200 shadow-[0_18px_70px_rgba(0,0,0,0.9)] md:hidden">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  {homeCopy.bugCard.label}
                </p>
                <p className="mt-1 text-sm font-medium text-white">
                  {homeCopy.bugCard.title}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-zinc-400">
                  {homeCopy.bugCard.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/contact?type=quote"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-2.5 text-sm font-semibold text-black shadow-[0_20px_60px_rgba(0,0,0,0.8)] transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
              >
                {homeCopy.hero.primaryCta}
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-6 py-2.5 text-sm font-semibold text-zinc-100 shadow-sm transition hover:border-zinc-200 hover:bg-zinc-900/80"
              >
                {homeCopy.hero.secondaryCta}
              </a>
            </div>
          </div>
        </div>

        <div className="relative flex-1">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-zinc-800/80 bg-gradient-to-br from-white/10 via-zinc-900 to-black blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full border border-zinc-800/80 bg-gradient-to-tl from-zinc-200/10 via-zinc-900 to-black blur-3xl" />

          <div className="relative mx-auto flex max-w-md flex-col gap-5">
            <div className="group relative">
              <div className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-tr from-white/20 via-zinc-700/40 to-black opacity-60 blur-xl transition group-hover:opacity-90" />
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] border border-zinc-700 bg-black shadow-[0_28px_90px_rgba(0,0,0,0.95)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.01] group-hover:shadow-[0_40px_120px_rgba(0,0,0,1)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,250,250,0.12),_transparent_60%)]" />
                <video
                  className="h-full w-full object-cover"
                  src="/hero.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div className="pointer-events-none absolute inset-x-4 bottom-3 flex items-center justify-between text-[11px] text-zinc-100">
                  <span>Live app / dashboard preview</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-black">
                    <span className="h-1.5 w-1.5 rounded-full bg-black" />
                    3D mock
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="hidden rounded-2xl border border-zinc-800 bg-black/70 p-4 text-xs text-zinc-200 shadow-[0_18px_70px_rgba(0,0,0,0.9)] md:block">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  {homeCopy.bugCard.label}
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                  {homeCopy.bugCard.title}
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-zinc-400">
                  {homeCopy.bugCard.description}
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-100/5 via-black to-black p-4 text-xs text-zinc-200 shadow-[0_18px_70px_rgba(0,0,0,0.9)]">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    {homeCopy.snapshotCard.label}
                  </p>
                  <span className="rounded-full bg-zinc-900 px-3 py-1 text-[10px] text-zinc-200">
                    {homeCopy.snapshotCard.launches}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3 text-[11px] text-zinc-300">
                  <div>
                    <p className="text-lg font-semibold text-white">40+</p>
                    <p>{homeCopy.snapshotCard.projectsLabel}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">&lt; 2h</p>
                    <p>{homeCopy.snapshotCard.responseLabel}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">98%</p>
                    <p>{homeCopy.snapshotCard.happyClientsLabel}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-900 bg-black/80">
        <div className="mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[90rem] space-y-8 px-4 py-12 md:px-8">
          <div className="max-w-2xl space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              {homeCopy.buildSection.tag}
            </p>
            <h2 className="text-xl font-semibold text-white md:text-2xl">
              {homeCopy.buildSection.title}
            </h2>
            <p className="max-w-xl text-xs leading-relaxed text-zinc-400 md:text-sm">
              {homeCopy.buildSection.description}
            </p>
          </div>
          <ServiceTabs />
        </div>
      </section>

      <section className="border-t border-zinc-900 bg-black">
        <div className="mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[90rem] px-4 py-12 text-center md:px-8">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                {homeCopy.readySection.tag}
              </p>
              <h2 className="text-xl font-semibold text-white md:text-2xl">
                {homeCopy.readySection.title}
              </h2>
              <p className="mx-auto max-w-2xl text-xs leading-relaxed text-zinc-400 md:text-sm">
                {homeCopy.readySection.description}
              </p>
            </div>

            <div className="relative flex flex-col items-stretch gap-4 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-center">
              <div className="hidden flex-1 border-t border-dashed border-zinc-800 sm:block" />
              <div className="flex items-center justify-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-800 bg-black text-zinc-200">
                  1
                </span>
                <span>{homeCopy.readySection.steps[0]}</span>
              </div>
              <div className="hidden flex-1 border-t border-dashed border-zinc-800 sm:block" />
              <div className="flex items-center justify-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-800 bg-black text-zinc-200">
                  2
                </span>
                <span>{homeCopy.readySection.steps[1]}</span>
              </div>
              <div className="hidden flex-1 border-t border-dashed border-zinc-800 sm:block" />
              <div className="flex items-center justify-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-800 bg-black text-zinc-200">
                  3
                </span>
                <span>{homeCopy.readySection.steps[2]}</span>
              </div>
              <div className="hidden flex-1 border-t border-dashed border-zinc-800 sm:block" />
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact?type=quote"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-2.5 text-sm font-semibold text-black shadow-[0_20px_60px_rgba(0,0,0,0.8)] transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
              >
                {homeCopy.readySection.primaryCta}
              </a>
              <a
                href="/contact?type=bug"
                className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-6 py-2.5 text-sm font-semibold text-zinc-100 shadow-sm transition hover:border-zinc-200 hover:bg-zinc-900/80"
              >
                {homeCopy.readySection.secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState } from "react";

function ServiceTabs() {
  const { homeCopy } = useLanguage();
  const [activeTab, setActiveTab] = useState("web");

  const TABS = [
  {
    id: "web",
    name: homeCopy.buildSection.tabs.web.name,
    title: homeCopy.buildSection.tabs.web.title,
    description: homeCopy.buildSection.tabs.web.description,
    image: "/globe.svg",
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    id: "devops",
    name: homeCopy.buildSection.tabs.devops.name,
    title: homeCopy.buildSection.tabs.devops.title,
    description: homeCopy.buildSection.tabs.devops.description,
    image: "/window.svg",
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M20 17V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2z" />
        <path d="m16 2-4 4-4-4M8 22v-4h8v4" />
      </svg>
    ),
  },
  {
    id: "support",
    name: homeCopy.buildSection.tabs.support.name,
    title: homeCopy.buildSection.tabs.support.title,
    description: homeCopy.buildSection.tabs.support.description,
    image: "/file.svg",
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

  const activeTabData = TABS.find((tab) => tab.id === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-200 md:gap-3">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 transition ${
              activeTab === tab.id
                ? "border-zinc-700 bg-white text-black shadow-sm"
                : "border-zinc-800 bg-black/70 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-900"
            }`}
          >
            <tab.icon
              className={`h-4 w-4 ${
                activeTab === tab.id ? "text-black" : "text-zinc-400"
              }`}
            />
            {tab.name}
          </button>
        ))}
      </div>

      {activeTabData && (
        <div
          key={activeTabData.id}
          className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-tr from-black/90 via-zinc-950/90 to-black p-4 shadow-[0_24px_90px_rgba(0,0,0,0.95)] animate-fade-in-up"
        >
          <div className="absolute -inset-16 bg-[radial-gradient(circle_at_top,_rgba(250,250,250,0.08),_transparent_50%),radial-gradient(circle_at_bottom,_rgba(24,24,27,0.8),_transparent_60%)] opacity-90 blur-2xl" />
          <div className="relative grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-zinc-700 bg-black/80">
              <Image
                src={activeTabData.image}
                alt={activeTabData.title}
                fill
                className="object-contain p-6 animate-float-slow"
              />
            </div>
            <div className="space-y-3 text-sm text-zinc-200">
              <h3 className="font-semibold text-white">{activeTabData.title}</h3>
              <p className="text-xs leading-relaxed text-zinc-400 md:text-[13px]">
                {activeTabData.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
