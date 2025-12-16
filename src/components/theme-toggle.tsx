"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")
    .matches;

  return prefersDark ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(initial);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";

      if (typeof document !== "undefined") {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(next);
      }

      if (typeof window !== "undefined") {
        window.localStorage.setItem("theme", next);
      }

      return next;
    });
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-black/70 text-zinc-400 transition hover:border-zinc-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
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
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" className="hidden dark:block" />
        <path d="M12 12h.01" className="block dark:hidden" />
        <path d="M12 4V2" className="block dark:hidden" />
        <path d="M12 22v-2" className="block dark:hidden" />
        <path d="m19.07 4.93-.01 0" className="block dark:hidden" />
        <path d="m5.01 18.97-.01 0" className="block dark:hidden" />
        <path d="M22 12h-2" className="block dark:hidden" />
        <path d="M4 12H2" className="block dark:hidden" />
        <path d="m19.07 18.97-.01 0" className="block dark:hidden" />
        <path d="m5.01 4.93-.01 0" className="block dark:hidden" />
      </svg>
    </button>
  );
}
