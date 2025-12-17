"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"dashboard" | "referrals" | "leads" | "clients" | "payouts" | "analytics">("dashboard");
    const [stats, setStats] = useState<any>(null);
    const [referrers, setReferrers] = useState<any[]>([]);
    const [leads, setLeads] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);
    const [payouts, setPayouts] = useState<any[]>([]);
    const [analytics, setAnalytics] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
        fetchDashboardStats();
    }, []);

    useEffect(() => {
        if (activeTab === "referrals") fetchReferrers();
        else if (activeTab === "leads") fetchLeads();
        else if (activeTab === "clients") fetchClients();
        else if (activeTab === "payouts") fetchPayouts();
        else if (activeTab === "analytics") fetchAnalytics();
    }, [activeTab]);

    const checkAuth = async () => {
        const token = localStorage.getItem("admin_token");
        if (!token) {
            router.push("/admin/login");
            return;
        }

        try {
            const response = await fetch("/api/admin/auth/verify", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                localStorage.removeItem("admin_token");
                router.push("/admin/login");
            }
        } catch (error) {
            router.push("/admin/login");
        }
    };

    const fetchDashboardStats = async () => {
        const token = localStorage.getItem("admin_token");
        const response = await fetch("/api/admin/dashboard/stats", {
            headers: { Author: `Bearer ${token}` },
        });
        const data = await response.json();
        setStats(data);
        setLoading(false);
    };

    const fetchReferrers = async () => {
        const token = localStorage.getItem("admin_token");
        const response = await fetch("/api/admin/referrers", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setReferrers(data.referrers || []);
    };

    const fetchLeads = async () => {
        const token = localStorage.getItem("admin_token");
        const response = await fetch("/api/admin/leads", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setLeads(data.leads || []);
    };

    const fetchClients = async () => {
        const token = localStorage.getItem("admin_token");
        const response = await fetch("/api/admin/clients", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setClients(data.clients || []);
    };

    const fetchPayouts = async () => {
        const token = localStorage.getItem("admin_token");
        const response = await fetch("/api/admin/payouts", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setPayouts(data.payouts || []);
    };

    const fetchAnalytics = async () => {
        const token = localStorage.getItem("admin_token");
        const response = await fetch("/api/admin/analytics", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setAnalytics(data);
    };

    const handleLogout = async () => {
        localStorage.removeItem("admin_token");
        await fetch("/api/admin/auth/logout", { method: "POST" });
        router.push("/admin/login");
    };

    const updateLeadStatus = async (leadId: number, status: string) => {
        const token = localStorage.getItem("admin_token");
        await fetch("/api/admin/leads", {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: leadId, status }),
        });
        fetchLeads();
    };

    const blockReferrer = async (referrerId: number, isBlocked: boolean) => {
        const token = localStorage.getItem("admin_token");
        await fetch("/api/admin/referrers", {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: referrerId, is_blocked: isBlocked }),
        });
        fetchReferrers();
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="border-b border-white/10 bg-zinc-900/50">
                <div className="mx-auto max-w-7xl px-4 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
                        <button
                            onClick={handleLogout}
                            className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/20"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="mx-auto max-w-7xl px-4 py-8">
                {/* Navigation Tabs */}
                <div className="mb-8 flex gap-2 overflow-x-auto border-b border-white/10 pb-2">
                    {["dashboard", "referrals", "leads", "clients", "payouts", "analytics"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${activeTab === tab
                                    ? "bg-blue-500 text-white"
                                    : "text-zinc-400 hover:text-white"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Dashboard Overview */}
                {activeTab === "dashboard" && stats && (
                    <div className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <StatsCard title="Total Visitors" value={stats.total_visitors} icon="👥" />
                            <StatsCard title="Total Leads" value={stats.total_leads} icon="📝" />
                            <StatsCard title="Total Referrals" value={stats.total_referrals} icon="🔗" />
                            <StatsCard title="Converted Clients" value={stats.converted_clients} icon="✅" />
                            <StatsCard title="Revenue Generated" value={`$${stats.revenue_generated.toFixed(2)}`} icon="💰" />
                            <StatsCard title="Pending Payouts" value={`$${stats.referral_payouts_pending.toFixed(2)}`} icon="⏳" />
                        </div>
                    </div>
                )}

                {/* Referrals Tab */}
                {activeTab === "referrals" && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">Referrers</h2>
                        <div className="overflow-x-auto rounded-xl border border-white/10 bg-zinc-900/50">
                            <table className="w-full text-sm">
                                <thead className="border-b border-white/10">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Name</th>
                                        <th className="px-4 py-3 text-left">Email</th>
                                        <th className="px-4 py-3 text-left">Code</th>
                                        <th className="px-4 py-3 text-center">Leads</th>
                                        <th className="px-4 py-3 text-center">Clients</th>
                                        <th className="px-4 py-3 text-right">Commission</th>
                                        <th className="px-4 py-3 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {referrers.map((ref) => (
                                        <tr key={ref.id} className="border-b border-white/5">
                                            <td className="px-4 py-3">{ref.name}</td>
                                            <td className="px-4 py-3 text-zinc-400">{ref.email}</td>
                                            <td className="px-4 py-3">
                                                <code className="text-blue-400">{ref.referral_code}</code>
                                            </td>
                                            <td className="px-4 py-3 text-center">{ref.leads_count}</td>
                                            <td className="px-4 py-3 text-center">{ref.converted_clients}</td>
                                            <td className="px-4 py-3 text-right">${(ref.total_commission || 0).toFixed(2)}</td>
                                            <td className="px-4 py-3 text-center">
                                                <button
                                                    onClick={() => blockReferrer(ref.id, !ref.is_blocked)}
                                                    className={`rounded px-3 py-1 text-xs ${ref.is_blocked
                                                            ? "bg-emerald-500/10 text-emerald-400"
                                                            : "bg-red-500/10 text-red-400"
                                                        }`}
                                                >
                                                    {ref.is_blocked ? "Unblock" : "Block"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Leads Tab */}
                {activeTab === "leads" && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">Leads</h2>
                        <div className="space-y-4">
                            {leads.map((lead) => (
                                <div key={lead.id} className="rounded-xl border border-white/10 bg-zinc-900/50 p-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{lead.name}</h3>
                                            <p className="text-sm text-zinc-400">{lead.email} • {lead.phone}</p>
                                            {lead.company && <p className="text-sm text-zinc-500">{lead.company}</p>}
                                            <p className="mt-2 text-sm">{lead.details}</p>
                                            {lead.ref_code && (
                                                <p className="mt-2 text-xs text-blue-400">Referred by: {lead.ref_code}</p>
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            <select
                                                value={lead.status}
                                                onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                                className="rounded-lg border border-white/10 bg-black px-3 py-1 text-sm"
                                            >
                                                <option>New</option>
                                                <option>Contacted</option>
                                                <option>In Discussion</option>
                                                <option>Converted to Client</option>
                                                <option>Closed / Lost</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Clients Tab */}
                {activeTab === "clients" && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">Clients</h2>
                        <div className="overflow-x-auto rounded-xl border border-white/10 bg-zinc-900/50">
                            <table className="w-full text-sm">
                                <thead className="border-b border-white/10">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Name</th>
                                        <th className="px-4 py-3 text-left">Email</th>
                                        <th className="px-4 py-3 text-left">Company</th>
                                        <th className="px-4 py-3 text-right">Project Value</th>
                                        <th className="px-4 py-3 text-left">Service</th>
                                        <th className="px-4 py-3 text-center">Ref Code</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clients.map((client) => (
                                        <tr key={client.id} className="border-b border-white/5">
                                            <td className="px-4 py-3">{client.name}</td>
                                            <td className="px-4 py-3 text-zinc-400">{client.email}</td>
                                            <td className="px-4 py-3 text-zinc-400">{client.company || "-"}</td>
                                            <td className="px-4 py-3 text-right">${(client.project_value || 0).toFixed(2)}</td>
                                            <td className="px-4 py-3">{client.service_type || "-"}</td>
                                            <td className="px-4 py-3 text-center">
                                                {client.ref_code ? (
                                                    <code className="text-blue-400">{client.ref_code}</code>
                                                ) : (
                                                    "-"
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Payouts Tab */}
                {activeTab === "payouts" && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold">Payouts</h2>
                            <a
                                href="/api/admin/payouts?format=csv"
                                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium transition hover:bg-blue-400"
                            >
                                Export CSV
                            </a>
                        </div>
                        <div className="overflow-x-auto rounded-xl border border-white/10 bg-zinc-900/50">
                            <table className="w-full text-sm">
                                <thead className="border-b border-white/10">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Referrer</th>
                                        <th className="px-4 py-3 text-left">Client</th>
                                        <th className="px-4 py-3 text-right">Amount</th>
                                        <th className="px-4 py-3 text-center">Status</th>
                                        <th className="px-4 py-3 text-left">Method</th>
                                        <th className="px-4 py-3 text-left">Transaction ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payouts.map((payout) => (
                                        <tr key={payout.id} className="border-b border-white/5">
                                            <td className="px-4 py-3">{payout.referrer_name}</td>
                                            <td className="px-4 py-3 text-zinc-400">{payout.client_name}</td>
                                            <td className="px-4 py-3 text-right">${payout.amount.toFixed(2)}</td>
                                            <td className="px-4 py-3 text-center">
                                                <span
                                                    className={`rounded-full px-2 py-1 text-xs ${payout.status === "Paid"
                                                            ? "bg-emerald-500/10 text-emerald-400"
                                                            : "bg-yellow-500/10 text-yellow-400"
                                                        }`}
                                                >
                                                    {payout.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">{payout.payout_method}</td>
                                            <td className="px-4 py-3 text-zinc-400">{payout.transaction_id || "-"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Analytics Tab */}
                {activeTab === "analytics" && analytics && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold">Analytics</h2>

                        <div>
                            <h3 className="mb-3 text-lg font-medium">Geographic Distribution</h3>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {analytics.geo_distribution?.map((geo: any) => (
                                    <div key={geo.country} className="rounded-xl border border-white/10 bg-zinc-900/50 p-4">
                                        <div className="text-2xl font-semibold">{geo.visitor_count}</div>
                                        <div className="text-sm text-zinc-400">{geo.country}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-3 text-lg font-medium">Top Referrers</h3>
                            <div className="overflow-x-auto rounded-xl border border-white/10 bg-zinc-900/50">
                                <table className="w-full text-sm">
                                    <thead className="border-b border-white/10">
                                        <tr>
                                            <th className="px-4 py-3 text-left">Referrer</th>
                                            <th className="px-4 py-3 text-center">Visitors</th>
                                            <th className="px-4 py-3 text-center">Leads</th>
                                            <th className="px-4 py-3 text-center">Clients</th>
                                            <th className="px-4 py-3 text-right">Total Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {analytics.referral_performance?.map((ref: any) => (
                                            <tr key={ref.referral_code} className="border-b border-white/5">
                                                <td className="px-4 py-3">{ref.referrer_name}</td>
                                                <td className="px-4 py-3 text-center">{ref.visitors}</td>
                                                <td className="px-4 py-3 text-center">{ref.leads}</td>
                                                <td className="px-4 py-3 text-center">{ref.clients}</td>
                                                <td className="px-4 py-3 text-right">${ref.total_value.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function StatsCard({ title, value, icon }: { title: string; value: any; icon: string }) {
    return (
        <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-zinc-400">{title}</p>
                    <p className="mt-2 text-3xl font-semibold">{value}</p>
                </div>
                <div className="text-3xl">{icon}</div>
            </div>
        </div>
    );
}
