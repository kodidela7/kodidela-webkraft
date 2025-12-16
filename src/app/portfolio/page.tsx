"use client";

import Image from "next/image";
import { useLanguage } from "@/components/language-provider";

export default function PortfolioPage() {
  const { portfolioCopy } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 py-10 md:px-8 md:py-16">
      <section className="space-y-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          {portfolioCopy.hero.tag}
        </p>
        <h1 className="text-3xl font-semibold text-white md:text-4xl">
          {portfolioCopy.hero.title}
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
          {portfolioCopy.hero.description}
        </p>
      </section>

      <section className="space-y-4 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.95)]">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black/70">
          <div className="absolute -inset-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.45),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.35),_transparent_55%)] opacity-90 blur-3xl" />
          <Image
            src="/globe.svg"
            alt="Collection of web projects"
            fill
            className="relative object-contain p-6 animate-float-slow"
          />
          <div className="pointer-events-none absolute inset-x-4 bottom-3 flex items-center justify-between text-[11px] text-zinc-200">
            <span>{portfolioCopy.highlight.caption}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-[10px] uppercase tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {portfolioCopy.highlight.badge}
            </span>
          </div>
        </div>
        <p className="text-xs text-zinc-500">
          {portfolioCopy.highlight.note}
        </p>
      </section>

      <section className="space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {portfolioCopy.testimonials.tag}
          </p>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            {portfolioCopy.testimonials.title}
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
            {portfolioCopy.testimonials.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {portfolioCopy.testimonials.items.map((item) => (
            <TestimonialCard
              key={item.name}
              label={portfolioCopy.testimonials.cardLabel}
              quote={item.quote}
              name={item.name}
              role={item.role}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

interface TestimonialCardProps {
  label: string;
  quote: string;
  name: string;
  role: string;
}

function TestimonialCard({ label, quote, name, role }: TestimonialCardProps) {
  return (
    <article className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-zinc-950/80 p-5 text-left shadow-[0_20px_70px_rgba(0,0,0,0.9)] transition-transform duration-300 hover:-translate-y-1.5 hover:border-blue-500/70 hover:shadow-[0_32px_90px_rgba(37,99,235,0.55)]">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          {label}
        </p>
        <p className="text-sm leading-relaxed text-zinc-100 md:text-[15px]">
          “{quote}”
        </p>
      </div>
      <div className="space-y-1 text-xs text-zinc-400">
        <p className="font-semibold text-zinc-100">{name}</p>
        <p>{role}</p>
      </div>
    </article>
  );
}
