// Edit Modal Components for Admin Panel
import { useState } from "react";

export function EditLeadModal({ lead, onSave, onClose }: any) {
    const [formData, setFormData] = useState(lead);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
            <div className="w-full max-w-2xl rounded-xl bg-zinc-900 p-6">
                <h2 className="mb-4 text-xl font-semibold text-white">Edit Lead</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="text-sm text-zinc-400">Name</label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full rounded bg-black px-3 py-2 text-white" />
                    </div>
                    <div>
                        <label className="text-sm text-zinc-400">Email</label>
                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded bg-black px-3 py-2 text-white" />
                    </div>
                    <div>
                        <label className="text-sm text-zinc-400">Phone</label>
                        <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full rounded bg-black px-3 py-2 text-white" />
                    </div>
                    <div>
                        <label className="text-sm text-zinc-400">Company</label>
                        <input type="text" value={formData.company || ""} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full rounded bg-black px-3 py-2 text-white" />
                    </div>
                    <div>
                        <label className="text-sm text-zinc-400">Project Type</label>
                        <input type="text" value={formData.project_type || ""} onChange={(e) => setFormData({ ...formData, project_type: e.target.value })} className="w-full rounded bg-black px-3 py-2 text-white" />
                    </div>
                    <div>
                        <label className="text-sm text-zinc-400">Budget</label>
                        <input type="text" value={formData.budget || ""} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className="w-full rounded bg-black px-3 py-2 text-white" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="text-sm text-zinc-400">Details</label>
                        <textarea value={formData.details || ""} onChange={(e) => setFormData({ ...formData, details: e.target.value })} className="w-full rounded bg-black px-3 py-2 text-white" rows={3} />
                    </div>
                </div>
                <div className="mt-4 flex gap-2">
                    <button onClick={() => onSave(formData)} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-400">Save</button>
                    <button onClick={onClose} className="rounded bg-zinc-700 px-4 py-2 text-white hover:bg-zinc-600">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export function EditClientModal({ client, onSave, onClose }: any) {
    const [formData, setFormData] = useState(client);

    // Auto-calculate pending amount whenever project_value or amount_paid changes
    const calculatedPending = (formData.project_value || 0) - (formData.amount_paid || 0);

    // Auto-determine payment status
    const calculatedPaymentStatus = (() => {
        if (formData.amount_paid >= formData.project_value && formData.project_value > 0) return 'Paid';
        if (formData.amount_paid > 0) return 'Partial';
        return 'Pending';
    })();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-zinc-900 p-6">
                <h2 className="mb-4 text-xl font-semibold text-white">Edit Client</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <h3 className="col-span-2 text-sm font-medium text-blue-400">Personal Information</h3>
                    <div>
                        <label className="text-sm text-zinc-400">Name *</label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full rounded bg-black px-3 py-2 text-white" />
                    </div>
                    <div>
                        <label className="text-sm text-zinc-400">Email *</label>
                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded bg-black px-3 py-2 text-white" />
                    </div>
                    <div>
                        <label className="text-sm text-zinc-400">Phone</label>
                        <input type="text" value={formData.phone || ""} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full rounded bg-black px-3 py-2 text-white" />
                    </div>
                    <div>
                        <label className="text-sm text-zinc-400">Company</label>
                        <input type="text" value={formData.company || ""} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full rounded bg-black px-3 py-2 text-white" />
                    </div>

                    <h3 className="col-span-2 mt-2 text-sm font-medium text-blue-400">Project Details</h3>
                    <div>
                        <label className="text-sm text-zinc-400">Project Value ($)</label>
                        <input type="number" value={formData.project_value || ""} onChange={(e) => setFormData({ ...formData, project_value: parseFloat(e.target.value) || 0 })} className="w-full rounded bg-black px-3 py-2 text-white" />
                    </div>
                    <div>
                        <label className="text-sm text-zinc-400">Service Type</label>
                        <input type="text" value={formData.service_type || ""} onChange={(e) => setFormData({ ...formData, service_type: e.target.value })} className="w-full rounded bg-black px-3 py-2 text-white" />
                    </div>
                    <div>
                        <label className="text-sm text-zinc-400">Status</label>
                        <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full rounded bg-black px-3 py-2 text-white">
                            <option>Active</option>
                            <option>Completed</option>
                            <option>On Hold</option>
                            <option>Cancelled</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm text-zinc-400">Start Date</label>
                        <input type="date" value={formData.start_date || ""} onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} className="w-full rounded bg-black px-3 py-2 text-white" />
                    </div>

                    <h3 className="col-span-2 mt-2 text-sm font-medium text-blue-400">Payment Tracking</h3>
                    <div>
                        <label className="text-sm text-zinc-400">Amount Paid ($)</label>
                        <input type="number" value={formData.amount_paid || ""} onChange={(e) => setFormData({ ...formData, amount_paid: parseFloat(e.target.value) || 0 })} className="w-full rounded bg-black px-3 py-2 text-white" />
                    </div>
                    <div>
                        <label className="text-sm text-zinc-400">Amount Pending ($ - Auto-calculated)</label>
                        <input type="number" value={calculatedPending.toFixed(2)} disabled className="w-full rounded bg-zinc-800 px-3 py-2 text-zinc-400 cursor-not-allowed" />
                        <p className="mt-1 text-xs text-zinc-500">Pending = Project Value - Amount Paid</p>
                    </div>
                    <div>
                        <label className="text-sm text-zinc-400">Payment Method</label>
                        <select value={formData.payment_method || ""} onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })} className="w-full rounded bg-black px-3 py-2 text-white">
                            <option value="">Select Method</option>
                            <option>Bank Transfer</option>
                            <option>PayPal</option>
                            <option>Credit Card</option>
                            <option>Check</option>
                            <option>Cash</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm text-zinc-400">Payment Status (Auto-updated)</label>
                        <input type="text" value={calculatedPaymentStatus} disabled className="w-full rounded bg-zinc-800 px-3 py-2 text-zinc-400 cursor-not-allowed" />
                        <p className="mt-1 text-xs text-zinc-500">Auto-set based on payment amount</p>
                    </div>
                    <div className="col-span-2">
                        <label className="text-sm text-zinc-400">Payment Notes</label>
                        <textarea value={formData.payment_notes || ""} onChange={(e) => setFormData({ ...formData, payment_notes: e.target.value })} className="w-full rounded bg-black px-3 py-2 text-white" rows={2} />
                    </div>
                </div>
                <div className="mt-4 flex gap-2">
                    <button onClick={() => onSave(formData)} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-400">Save Changes</button>
                    <button onClick={onClose} className="rounded bg-zinc-700 px-4 py-2 text-white hover:bg-zinc-600">Cancel</button>
                </div>
            </div>
        </div>
    );
}
