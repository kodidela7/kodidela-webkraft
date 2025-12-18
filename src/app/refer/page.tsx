"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/language-provider";

export default function ReferPage() {
    const { referCopy } = useLanguage();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        payout_method: "UPI",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const [referralData, setReferralData] = useState<{
        code: string;
        link: string;
    } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setMessage("");

        try {
            const response = await fetch("/api/referral/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setStatus("success");
                setReferralData({
                    code: data.referral_code,
                    link: data.referral_link,
                });
                setMessage(data.message);
            } else {
                setStatus("error");
                setMessage(data.message || "Registration failed");
            }
        } catch (error) {
            setStatus("error");
            setMessage("An error occurred. Please try again.");
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setMessage(referCopy.success.copiedMessage);
    };

    if (status === "success" && referralData) {
        return (
            <div className="mx-auto max-w-4xl space-y-8 px-4 py-16 md:px-8">
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 p-8 text-center shadow-[0_24px_90px_rgba(0,0,0,0.95)]">
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-full bg-emerald-500/20 p-4">
                            <svg className="h-16 w-16 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>

                    <h1 className="mb-4 text-3xl font-semibold text-white md:text-4xl">
                        {referCopy.success.title}
                    </h1>

                    <p className="mb-8 text-zinc-300">
                        {referCopy.success.subtitle}
                    </p>

                    <div className="space-y-4">
                        <div className="rounded-xl border border-white/10 bg-black/40 p-6">
                            <p className="mb-2 text-sm font-medium text-zinc-400">{referCopy.success.codeLabel}</p>
                            <div className="flex items-center justify-center gap-3">
                                <code className="text-2xl font-bold text-blue-400">{referralData.code}</code>
                                <button
                                    onClick={() => copyToClipboard(referralData.code)}
                                    className="rounded-lg bg-white/10 p-2 transition hover:bg-white/20"
                                >
                                    <svg className="h-5 w-5 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-black/40 p-6">
                            <p className="mb-2 text-sm font-medium text-zinc-400">{referCopy.success.linkLabel}</p>
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={referralData.link}
                                    readOnly
                                    className="flex-1 rounded-lg border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                                />
                                <button
                                    onClick={() => copyToClipboard(referralData.link)}
                                    className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-400"
                                >
                                    {referCopy.success.copyButton}
                                </button>
                            </div>
                        </div>
                    </div>

                    {message && (
                        <p className="mt-4 text-sm text-emerald-400">{message}</p>
                    )}
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6">
                        <div className="mb-3 text-3xl">📤</div>
                        <h3 className="mb-2 text-lg font-semibold text-white">{referCopy.benefits.shareTitle}</h3>
                        <p className="text-sm text-zinc-400">
                            {referCopy.benefits.shareDesc}
                        </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6">
                        <div className="mb-3 text-3xl">💼</div>
                        <h3 className="mb-2 text-lg font-semibold text-white">{referCopy.benefits.projectTitle}</h3>
                        <p className="text-sm text-zinc-400">
                            {referCopy.benefits.projectDesc}
                        </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6">
                        <div className="mb-3 text-3xl">💰</div>
                        <h3 className="mb-2 text-lg font-semibold text-white">{referCopy.benefits.earnTitle}</h3>
                        <p className="text-sm text-zinc-400">
                            {referCopy.benefits.earnDesc}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl space-y-16 px-4 py-10 md:px-8 md:py-16">
            <section className="space-y-4 text-center">
                <h1 className="text-3xl font-semibold text-white md:text-4xl">
                    {referCopy.hero.title}
                </h1>
                <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
                    {referCopy.hero.description}
                </p>
            </section>

            <section className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.95)]">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black/70">
                    <div className="absolute -inset-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.45),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.35),_transparent_55%)] opacity-80 blur-3xl" />
                    <Image
                        src="/refer&earn.gif"
                        alt="How referral program works"
                        fill
                        className="relative object-contain p-6 animate-float-slow"
                    />
                </div>
            </section>

            <section className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)]">
                <div className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                        {referCopy.form.getStarted}
                    </p>
                    <h2 className="text-2xl font-semibold text-white md:text-3xl">
                        {referCopy.form.joinTitle}
                    </h2>
                    <p className="max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
                        {referCopy.form.joinDescription}
                    </p>

                    <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-sm text-zinc-100">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-zinc-300">{referCopy.form.nameLabel} *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full rounded-xl border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none ring-blue-500/40 placeholder:text-zinc-600 focus:border-blue-500 focus:ring-2"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-zinc-300">{referCopy.form.emailLabel} *</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full rounded-xl border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none ring-blue-500/40 placeholder:text-zinc-600 focus:border-blue-500 focus:ring-2"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-zinc-300">{referCopy.form.phoneLabel}</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full rounded-xl border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none ring-blue-500/40 placeholder:text-zinc-600 focus:border-blue-500 focus:ring-2"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-zinc-300">{referCopy.form.payoutMethodLabel} *</label>
                            <select
                                value={formData.payout_method}
                                onChange={(e) => setFormData({ ...formData, payout_method: e.target.value })}
                                className="w-full rounded-xl border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none ring-blue-500/40 focus:border-blue-500 focus:ring-2"
                            >
                                <option value="UPI">{referCopy.form.upi}</option>
                                <option value="Bank">{referCopy.form.bank}</option>
                                <option value="PayPal">{referCopy.form.paypal}</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="mt-2 inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/40 transition hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:opacity-50"
                        >
                            {status === "loading" ? referCopy.form.submittingButton : referCopy.form.submitButton}
                        </button>

                        {status === "error" && (
                            <p className="text-sm text-red-400">{message}</p>
                        )}

                        <p className="text-xs text-zinc-500">
                            {referCopy.form.termsNote}
                        </p>
                    </form>
                </div>

                <aside className="space-y-6 rounded-2xl border border-white/10 bg-black/50 p-6 text-sm text-zinc-100 shadow-[0_20px_80px_rgba(0,0,0,0.9)]">
                    <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                            {referCopy.sidebar.heading}
                        </p>
                        <h3 className="text-xl font-semibold text-white md:text-2xl">
                            {referCopy.sidebar.title}
                        </h3>
                    </div>

                    <div className="space-y-4 text-xs text-zinc-300 md:text-[13px]">
                        {referCopy.sidebar.steps.map((step: string, index: number) => (
                            <div key={index} className="space-y-1">
                                <p className="text-zinc-400">{step}</p>
                            </div>
                        ))}

                        <div className="mt-6 rounded-lg bg-blue-500/10 p-4 border border-blue-500/20">
                            <p className="font-semibold text-blue-400">{referCopy.sidebar.proTip}</p>
                            <p className="text-zinc-400 mt-1">{referCopy.sidebar.proTipDescription}</p>
                        </div>
                    </div>
                </aside>
            </section>
        </div>
    );
}
