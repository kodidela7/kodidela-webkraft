"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setMessage("");

        try {
            const response = await fetch("/api/admin/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                // Store token in localStorage
                localStorage.setItem("admin_token", data.token);
                router.push("/admin");
            } else {
                setStatus("error");
                setMessage(data.message || "Login failed");
            }
        } catch (error) {
            setStatus("error");
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black px-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold text-white">Admin Login</h1>
                    <p className="mt-2 text-sm text-zinc-400">
                        Sign in to access the admin dashboard
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-6 rounded-2xl border border-white/10 bg-zinc-900/50 p-8"
                >
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-zinc-300">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                className="mt-1 w-full rounded-xl border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none ring-blue-500/40 placeholder:text-zinc-600 focus:border-blue-500 focus:ring-2"
                                placeholder="admin@example.com"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-zinc-300">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                                className="mt-1 w-full rounded-xl border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none ring-blue-500/40 placeholder:text-zinc-600 focus:border-blue-500 focus:ring-2"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {status === "error" && (
                        <p className="text-sm text-red-400">{message}</p>
                    )}

                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/40 transition hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:opacity-50"
                    >
                        {status === "loading" ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p className="text-center text-xs text-zinc-500">
                    Protected admin area. Unauthorized access is prohibited.
                </p>
            </div>
        </div>
    );
}
