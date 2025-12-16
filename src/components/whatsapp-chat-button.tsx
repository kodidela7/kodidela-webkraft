"use client";

const DEFAULT_MESSAGE =
  "Hi, I found your portfolio and would like to discuss a project.";

export function WhatsAppChatButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  if (!phone) {
    return null;
  }

  const href = `https://wa.me/${phone}?text=${encodeURIComponent(
    DEFAULT_MESSAGE,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="h-4 w-4"
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M16.04 5C10.51 5 6 9.21 6 14.4c0 2.27.87 4.34 2.32 5.94L7 27l6.89-1.79c.64.18 1.32.28 2.03.28 5.53 0 10.04-4.22 10.04-9.4C25.96 9.21 21.57 5 16.04 5Zm0 16.9c-.6 0-1.19-.08-1.75-.24l-.35-.1-4.09 1.06 1.1-3.9-.23-.25A6.64 6.64 0 0 1 9 14.4c0-3.74 3.16-6.79 7.04-6.79 3.88 0 7.04 3.05 7.04 6.79 0 3.75-3.16 6.8-7.04 6.8Zm3.86-5.1c-.21-.11-1.25-.65-1.44-.72-.19-.07-.33-.11-.47.11-.14.22-.54.72-.66.87-.12.14-.24.16-.45.05-.21-.11-.9-.35-1.71-1.09-.63-.56-1.05-1.26-1.17-1.47-.12-.22-.01-.33.1-.44.1-.1.21-.27.32-.4.11-.13.14-.22.21-.36.07-.14.04-.26-.02-.37-.07-.11-.47-1.13-.64-1.55-.17-.42-.35-.36-.47-.37h-.4c-.14 0-.37.05-.57.24-.19.2-.75.73-.75 1.78 0 1.05.77 2.06.88 2.2.11.15 1.52 2.43 3.79 3.31 2.27.88 2.27.59 2.68.56.41-.03 1.25-.5 1.43-.98.18-.47.18-.88.12-.98-.06-.09-.19-.15-.4-.26Z"
          />
        </svg>
      </span>
      Chat on WhatsApp
    </a>
  );
}
