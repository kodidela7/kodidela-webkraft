"use client";

import { LanguageCode, supportedLanguages, useLanguage } from "./language-provider";

import { useState } from "react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (code: LanguageCode) => {
    if (code !== language) {
      setLanguage(code);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Desktop pill-style switcher */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="hidden h-8 items-center justify-center gap-2 rounded-full border border-zinc-800 bg-black/70 px-3 text-xs font-medium text-zinc-300 transition hover:border-zinc-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 md:flex"
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
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="uppercase">{language}</span>
      </button>

      {/* Mobile compact globe */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-black/80 text-zinc-300 shadow-sm transition hover:border-zinc-600 hover:text-white md:hidden"
        aria-label="Change language"
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
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-32 rounded-lg border border-zinc-800 bg-black/90 p-1.5 text-xs font-medium text-zinc-200 shadow-lg">
          {supportedLanguages.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => handleSelect(item.code)}
              className={`w-full rounded-md px-3 py-1.5 text-left transition ${
                item.code === language
                  ? "bg-white font-semibold text-black"
                  : "text-zinc-300 hover:bg-white/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
