"use client";

import Image from "next/image";
import { useLanguage } from "@/components/language-provider";

export default function ServicesPage() {
  const { servicesCopy } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 py-10 md:px-8 md:py-16">
      <section className="space-y-4 text-center animate-fade-in-up">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          {servicesCopy.hero.tag}
        </p>
        <h1 className="text-3xl font-semibold text-white md:text-4xl">
          {servicesCopy.hero.title}
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
          {servicesCopy.hero.description}
        </p>
        <div className="mt-6 flex justify-center gap-3 text-xs font-medium">
          <a
            href="/contact?type=project"
            className="rounded-full bg-blue-500 px-5 py-2 text-white shadow-lg shadow-blue-500/40 transition hover:bg-blue-400"
          >
            {servicesCopy.hero.primaryCta}
          </a>
          <a
            href="/portfolio"
            className="rounded-full border border-zinc-700 px-5 py-2 text-zinc-200 transition hover:border-zinc-400 hover:bg-zinc-900"
          >
            {servicesCopy.hero.secondaryCta}
          </a>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.95)]">
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {servicesCopy.overview.tag}
            </p>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              {servicesCopy.overview.title}
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
              {servicesCopy.overview.description}
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-zinc-300">
              <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 ring-1 ring-blue-500/50">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                {servicesCopy.overview.chip1}
              </span>
              <span className="inline-flex items-center rounded-full bg-black/40 px-3 py-1 ring-1 ring-zinc-700">
                {servicesCopy.overview.chip2}
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.4),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.3),_transparent_55%)] opacity-80 blur-3xl" />
            <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-black/70">
              <Image
                src="/window.svg"
                alt="Service preview interface"
                fill
                className="object-contain p-5 animate-float-slow"
              />
              <div className="pointer-events-none absolute inset-x-4 bottom-3 flex items-center justify-between text-[11px] text-zinc-200">
                <span>{servicesCopy.overview.previewLabel}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-wide">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {servicesCopy.overview.previewBadge}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {servicesCopy.servicesSection.tag}
          </p>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            {servicesCopy.servicesSection.title}
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
            {servicesCopy.servicesSection.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {servicesCopy.cards.map((card) => (
            <ServiceCard
              key={card.title}
              title={card.title}
              description={card.description}
              footerNote={servicesCopy.cardFooterNote}
              footerCta={servicesCopy.cardFooterCta}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-xs text-zinc-300 md:px-6">
          <p>{servicesCopy.customNote}</p>
          <a
            href="/contact"
            className="rounded-full border border-blue-500/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-blue-300 transition hover:bg-blue-500/10"
          >
            {servicesCopy.customCta}
          </a>
        </div>
      </section>
    </div>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  footerNote: string;
  footerCta: string;
}

function ServiceCard({ title, description, footerNote, footerCta }: ServiceCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-zinc-950/60 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.9)] transition-transform duration-300 hover:-translate-y-1.5 hover:border-blue-500/70 hover:shadow-[0_32px_90px_rgba(37,99,235,0.55)]">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
        <Image
          src="/file.svg"
          alt={title}
          fill
          className="object-contain p-6 animate-float-slow"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-white md:text-base">{title}</h3>
        <p className="text-xs leading-relaxed text-zinc-400 md:text-sm">
          {description}
        </p>
      </div>
      <div className="mt-auto flex justify-between text-[11px] text-zinc-400">
        <span>{footerNote}</span>
        <span className="text-zinc-300">{footerCta}</span>
      </div>
    </article>
  );
}
