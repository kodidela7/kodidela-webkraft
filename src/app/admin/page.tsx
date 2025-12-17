"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EditLeadModal, EditClientModal } from "./components/EditModals";
import { FilterBar } from "./components/FilterBar";

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

    // Edit modal states
    const [editingLead, setEditingLead] = useState<any>(null);
    const [editingClient, setEditingClient] = useState<any>(null);
    const [editingReferrer, setEditingReferrer] = useState<any>(null);

    // Filter states for each section
    const [leadsSearch, setLeadsSearch] = useState("");
    const [leadsSort, setLeadsSort] = useState("date");
    const [leadsStatusFilter, setLeadsStatusFilter] = useState("all");

    const [clientsSearch, setClientsSearch] = useState("");
    const [clientsSort, setClientsSort] = useState("date");
    const [clientsStatusFilter, setClientsStatusFilter] = useState("all");
    const [clientsPaymentFilter, setClientsPaymentFilter] = useState("all");

    const [referrersSearch, setReferrersSearch] = useState("");
    const [referrersSort, setReferrersSort] = useState("date");
    const [referrersFilter, setReferrersFilter] = useState("all");

    const [payoutsSearch, setPayoutsSearch] = useState("");
    const [payoutsSort, setPayoutsSort] = useState("date");
    const [payoutsStatusFilter, setPayoutsStatusFilter] = useState("all");

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

    const convertToClient = async (leadId: number) => {
        const projectValue = prompt("Enter project value (USD):");
        if (!projectValue) return;

        const value = parseFloat(projectValue);
        if (isNaN(value) || value <= 0) {
            alert("Please enter a valid positive number");
            return;
        }

        const token = localStorage.getItem("admin_token");
        const response = await fetch("/api/admin/leads", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ lead_id: leadId, project_value: value }),
        });

        if (response.ok) {
            alert("Lead successfully converted to client!");
            fetchLeads();
            fetchReferrers();
            fetchClients();
        } else {
            const error = await response.json();
            alert(`Conversion failed: ${error.error || "Unknown error"}`);
        }
    };

    const handleUpdateLead = async (leadData: any) => {
        const token = localStorage.getItem("admin_token");
        await fetch("/api/admin/leads", {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(leadData),
        });
        setEditingLead(null);
        fetchLeads();
    };

    const handleUpdateClient = async (clientData: any) => {
        const token = localStorage.getItem("admin_token");
        const response = await fetch("/api/admin/clients", {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(clientData),
        });
        if (response.ok) {
            setEditingClient(null);
            fetchClients();
            fetchReferrers(); // Refresh referrer stats too
        } else {
            alert("Failed to update client");
        }
    };

    const handleUpdateReferrer = async (referrerData: any) => {
        // For now, only block status is updatable via API
        // If more fields need updating, we'd need to add PUT endpoint to referrers
        const token = localStorage.getItem("admin_token");
        await blockReferrer(referrerData.id, referrerData.is_blocked);
        setEditingReferrer(null);
    };

    // Apply filters, search, and sort to leads
    const filteredLeads = leads
        .filter(lead => {
            // Search filter
            const searchLower = leadsSearch.toLowerCase();
            const matchesSearch = !leadsSearch ||
                lead.name?.toLowerCase().includes(searchLower) ||
                lead.email?.toLowerCase().includes(searchLower) ||
                lead.company?.toLowerCase().includes(searchLower);

            // Status filter
            const matchesStatus = leadsStatusFilter === "all" || lead.status === leadsStatusFilter;

            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            if (leadsSort === "date") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            if (leadsSort === "name") return a.name.localeCompare(b.name);
            return 0;
        });

    // Apply filters, search, and sort to clients
    const filteredClients = clients
        .filter(client => {
            const searchLower = clientsSearch.toLowerCase();
            const matchesSearch = !clientsSearch ||
                client.name?.toLowerCase().includes(searchLower) ||
                client.email?.toLowerCase().includes(searchLower) ||
                client.company?.toLowerCase().includes(searchLower);

            const matchesStatus = clientsStatusFilter === "all" || client.status === clientsStatusFilter;
            const matchesPayment = clientsPaymentFilter === "all" || client.payment_status === clientsPaymentFilter;

            return matchesSearch && matchesStatus && matchesPayment;
        })
        .sort((a, b) => {
            if (clientsSort === "date") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            if (clientsSort === "name") return a.name.localeCompare(b.name);
            if (clientsSort === "value") return (b.project_value || 0) - (a.project_value || 0);
            return 0;
        });

    // Apply filters, search, and sort to referrers
    const filteredReferrers = referrers
        .filter(ref => {
            const searchLower = referrersSearch.toLowerCase();
            const matchesSearch = !referrersSearch ||
                ref.name?.toLowerCase().includes(searchLower) ||
                ref.email?.toLowerCase().includes(searchLower) ||
                ref.referral_code?.toLowerCase().includes(searchLower);

            const matchesFilter = referrersFilter === "all" ||
                (referrersFilter === "blocked" && ref.is_blocked) ||
                (referrersFilter === "active" && !ref.is_blocked);

            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
            if (referrersSort === "date") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            if (referrersSort === "name") return a.name.localeCompare(b.name);
            if (referrersSort === "leads") return b.leads_count - a.leads_count;
            if (referrersSort === "commission") return (b.total_commission || 0) - (a.total_commission || 0);
            return 0;
        });

    // Apply filters, search, and sort to payouts
    const filteredPayouts = payouts
        .filter(payout => {
            const searchLower = payoutsSearch.toLowerCase();
            const matchesSearch = !payoutsSearch ||
                payout.referrer_name?.toLowerCase().includes(searchLower) ||
                payout.client_name?.toLowerCase().includes(searchLower);

            const matchesStatus = payoutsStatusFilter === "all" || payout.status === payoutsStatusFilter;

            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            if (payoutsSort === "date") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            if (payoutsSort === "amount") return b.amount - a.amount;
            return 0;
        });

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
                        <h2 className="text-2xl font-semibold">Referrers ({filteredReferrers.length})</h2>
                        <FilterBar
                            search={referrersSearch}
                            setSearch={setReferrersSearch}
                            sort={referrersSort}
                            setSort={setReferrersSort}
                            sortOptions={[
                                { value: "date", label: "Sort: Newest" },
                                { value: "name", label: "Sort: Name" },
                                { value: "leads", label: "Sort: Leads Count" },
                                { value: "commission", label: "Sort: Commission" }
                            ]}
                            statusFilter={referrersFilter}
                            setStatusFilter={setReferrersFilter}
                            statusOptions={["All", "Active", "Blocked"]}
                        />
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
                                    {filteredReferrers.map((ref) => (
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
                        <h2 className="text-2xl font-semibold">Leads ({filteredLeads.length})</h2>
                        <FilterBar
                            search={leadsSearch}
                            setSearch={setLeadsSearch}
                            sort={leadsSort}
                            setSort={setLeadsSort}
                            sortOptions={[
                                { value: "date", label: "Sort: Newest" },
                                { value: "name", label: "Sort: Name" }
                            ]}
                            statusFilter={leadsStatusFilter}
                            setStatusFilter={setLeadsStatusFilter}
                            statusOptions={["All", "New", "Contacted", "In Discussion", "Converted to Client", "Closed / Lost"]}
                        />
                        <div className="space-y-4">
                            {filteredLeads.map((lead) => (
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
                                        <div className="ml-4 flex flex-col gap-2">
                                            <select
                                                value={lead.status}
                                                onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                                className="rounded-lg border border-white/10 bg-black px-3 py-1 text-sm"
                                                disabled={lead.status === "Converted to Client"}
                                            >
                                                <option>New</option>
                                                <option>Contacted</option>
                                                <option>In Discussion</option>
                                                <option>Converted to Client</option>
                                                <option>Closed / Lost</option>
                                            </select>
                                            <div className="flex gap-2">
                                                {lead.status !== "Converted to Client" && lead.status !== "Closed / Lost" && (
                                                    <button
                                                        onClick={() => convertToClient(lead.id)}
                                                        className="rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-1 text-sm font-medium transition hover:from-blue-400 hover:to-cyan-400"
                                                    >
                                                        Convert
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => setEditingLead(lead)}
                                                    className="rounded-lg bg-zinc-700/50 px-4 py-1 text-sm text-white transition hover:bg-zinc-700"
                                                >
                                                    Edit
                                                </button>
                                            </div>
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
                        <h2 className="text-2xl font-semibold">Clients ({filteredClients.length})</h2>
                        <FilterBar
                            search={clientsSearch}
                            setSearch={setClientsSearch}
                            sort={clientsSort}
                            setSort={setClientsSort}
                            sortOptions={[
                                { value: "date", label: "Sort: Newest" },
                                { value: "name", label: "Sort: Name" },
                                { value: "value", label: "Sort: Project Value" }
                            ]}
                            statusFilter={clientsStatusFilter}
                            setStatusFilter={setClientsStatusFilter}
                            statusOptions={["All", "Active", "Completed", "On Hold", "Cancelled"]}
                            extraFilter={clientsPaymentFilter}
                            setExtraFilter={setClientsPaymentFilter}
                            extraOptions={["Pending", "Partial", "Paid", "Overdue"]}
                            extraLabel="Payment"
                        />
                        <div className="space-y-4">
                            {filteredClients.map((client) => (
                                <div key={client.id} className="rounded-xl border border-white/10 bg-zinc-900/50 p-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold">{client.name}</h3>
                                            <p className="text-sm text-zinc-400">{client.email} {client.phone && `• ${client.phone}`}</p>
                                            {client.company && <p className="text-sm text-zinc-500">{client.company}</p>}

                                            <div className="mt-3 grid gap-2 text-sm md:grid-cols-2">
                                                <div>
                                                    <span className="text-zinc-500">Project Value:</span> <span className="font-medium text-green-400">${(client.project_value || 0).toFixed(2)}</span>
                                                </div>
                                                <div>
                                                    <span className="text-zinc-500">Service:</span> {client.service_type || "-"}
                                                </div>
                                                <div>
                                                    <span className="text-zinc-500">Status:</span> <span className={`rounded px-2 py-0.5 text-xs ${client.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-zinc-700 text-zinc-300'}`}>{client.status}</span>
                                                </div>
                                                <div>
                                                    <span className="text-zinc-500">Start Date:</span> {client.start_date || "-"}
                                                </div>
                                                {client.ref_code && (
                                                    <div>
                                                        <span className="text-zinc-500">Referred by:</span> <code className="text-blue-400">{client.ref_code}</code>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Payment Tracking Section */}
                                            <div className="mt-3 rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
                                                <h4 className="mb-2 text-xs font-medium text-blue-400">Payment Tracking</h4>
                                                <div className="grid gap-2 text-sm md:grid-cols-3">
                                                    <div>
                                                        <span className="text-zinc-500">Paid:</span> <span className="font-medium text-green-400">${(client.amount_paid || 0).toFixed(2)}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-zinc-500">Pending:</span> <span className="font-medium text-yellow-400">${(client.amount_pending || 0).toFixed(2)}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-zinc-500">Status:</span> <span className={`rounded px-2 py-0.5 text-xs ${client.payment_status === 'Paid' ? 'bg-green-500/10 text-green-400' :
                                                            client.payment_status === 'Partial' ? 'bg-yellow-500/10 text-yellow-400' :
                                                                'bg-red-500/10 text-red-400'
                                                            }`}>{client.payment_status || 'Pending'}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-zinc-500">Method:</span> {client.payment_method || "-"}
                                                    </div>
                                                    {client.payment_notes && (
                                                        <div className="md:col-span-2">
                                                            <span className="text-zinc-500">Notes:</span> {client.payment_notes}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setEditingClient(client)}
                                            className="ml-4 rounded-lg bg-blue-500/10 px-4 py-2 text-sm text-blue-400 transition hover:bg-blue-500/20"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Payouts Tab */}
                {activeTab === "payouts" && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold">Payouts ({filteredPayouts.length})</h2>
                            <a
                                href="/api/admin/payouts?format=csv"
                                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium transition hover:bg-blue-400"
                            >
                                Export CSV
                            </a>
                        </div>
                        <FilterBar
                            search={payoutsSearch}
                            setSearch={setPayoutsSearch}
                            sort={payoutsSort}
                            setSort={setPayoutsSort}
                            sortOptions={[
                                { value: "date", label: "Sort: Newest" },
                                { value: "amount", label: "Sort: Amount" }
                            ]}
                            statusFilter={payoutsStatusFilter}
                            setStatusFilter={setPayoutsStatusFilter}
                            statusOptions={["All", "Pending", "Paid"]}
                        />
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
                                    {filteredPayouts.map((payout) => (
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

            {/* Edit Modals */}
            {editingLead && (
                <EditLeadModal
                    lead={editingLead}
                    onSave={handleUpdateLead}
                    onClose={() => setEditingLead(null)}
                />
            )}
            {editingClient && (
                <EditClientModal
                    client={editingClient}
                    onSave={handleUpdateClient}
                    onClose={() => setEditingClient(null)}
                />
            )}
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
