"use client";

import Image from "next/image";
import { useLanguage } from "@/components/language-provider";

export default function AboutPage() {
  const { aboutCopy: copy } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 py-10 md:px-8 md:py-16">
      <section className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)]">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {copy.hero.tag}
          </p>
          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            {copy.hero.title}
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
            {copy.hero.description}
          </p>
          <div className="flex flex-wrap gap-3 text-xs font-medium">
            <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-300 ring-1 ring-emerald-400/40">
              {copy.hero.chip1}
            </span>
            <span className="inline-flex items-center rounded-full bg-zinc-900 px-3 py-1 text-zinc-300 ring-1 ring-zinc-700">
              {copy.hero.chip2}
            </span>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-white/10 bg-zinc-900/50 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.95)]">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black/70">
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.45),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.35),_transparent_55%)] opacity-80 blur-3xl" />
            <Image
              src="/window.svg"
              alt="Bug-fix workflow demo"
              fill
              className="relative object-contain p-6 animate-float-slow"
            />
            <div className="pointer-events-none absolute inset-x-4 bottom-3 flex items-center justify-between text-[11px] text-zinc-200">
              <span>{copy.hero.videoCaption}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-[10px] uppercase tracking-wide">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {copy.hero.videoBadge}
              </span>
            </div>
          </div>
          <p className="text-xs text-zinc-500">{copy.hero.videoNote}</p>
        </div>
      </section>

      <section className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {copy.collaboration.tag}
          </p>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            {copy.collaboration.title}
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
            {copy.collaboration.description}
          </p>

          <dl className="grid gap-6 text-sm text-zinc-200 md:grid-cols-2">
            {copy.collaboration.values.map((item) => (
              <ValueItem key={item.title} title={item.title} body={item.body} />
            ))}
          </dl>
        </div>

        <aside className="space-y-6 rounded-2xl border border-white/10 bg-black/50 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.95)] animate-fade-in-up">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {copy.results.tag}
            </p>
            <h3 className="text-xl font-semibold text-white md:text-2xl">
              {copy.results.title}
            </h3>
            <p className="text-xs leading-relaxed text-zinc-400 md:text-sm">
              {copy.results.description}
            </p>
          </div>

          <div className="grid gap-4 rounded-xl bg-zinc-950/80 p-4 text-sm text-zinc-100 sm:grid-cols-2">
            {copy.results.metrics.map((metric) => (
              <ResultMetric
                key={metric.label}
                label={metric.label}
                value={metric.value}
              />
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 text-xs text-zinc-300">
            <p>{copy.results.ctaText}</p>
            <a
              href="/contact"
              className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-blue-300 underline underline-offset-4"
            >
              {copy.results.ctaLabel}
            </a>
          </div>
        </aside>
      </section>
    </div>
  );
}

interface ValueItemProps {
  title: string;
  body: string;
}

function ValueItem({ title, body }: ValueItemProps) {
  return (
    <div className="space-y-1">
      <dt className="text-[13px] font-semibold text-white">{title}</dt>
      <dd className="text-xs leading-relaxed text-zinc-400 md:text-[13px]">
        {body}
      </dd>
    </div>
  );
}

interface ResultMetricProps {
  label: string;
  value: string;
}

function ResultMetric({ label, value }: ResultMetricProps) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
