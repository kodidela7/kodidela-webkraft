// Database Models
export interface Referrer {
    id: number;
    name: string;
    email: string;
    phone?: string;
    referral_code: string;
    payout_method: string;
    is_blocked: number;
    created_at: string;
}

export interface Visitor {
    id: number;
    visitor_id: string;
    ip?: string;
    country?: string;
    city?: string;
    device?: string;
    browser?: string;
    os?: string;
    ref_code?: string;
    page_views: number;
    first_visit: string;
    last_visit: string;
}

export interface Lead {
    id: number;
    name: string;
    email: string;
    phone: string;
    company?: string;
    project_type?: string;
    budget?: string;
    details?: string;
    ref_code?: string;
    status: "New" | "Contacted" | "In Discussion" | "Converted to Client" | "Closed / Lost";
    created_at: string;
}

export interface Client {
    id: number;
    lead_id?: number;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    project_value?: number;
    service_type?: string;
    start_date?: string;
    status: string;
    ref_code?: string;
    // Payment tracking fields
    amount_paid?: number;
    amount_pending?: number;
    payment_method?: string;
    payment_notes?: string;
    payment_status?: string;
    last_payment_date?: string;
    created_at: string;
}

export interface ReferralPayout {
    id: number;
    referrer_id: number;
    client_id: number;
    amount: number;
    status: "Pending" | "Paid";
    paid_at?: string;
    transaction_id?: string;
    notes?: string;
    created_at: string;
}

export interface AdminUser {
    id: number;
    email: string;
    password_hash: string;
    role: string;
    last_login?: string;
    created_at: string;
}

// API Request/Response Types
export interface ReferrerRegistrationRequest {
    name: string;
    email: string;
    phone?: string;
    payout_method: string;
}

export interface ReferrerRegistrationResponse {
    success: boolean;
    referral_code?: string;
    referral_link?: string;
    message?: string;
}

export interface QuoteSubmissionRequest {
    name: string;
    email: string;
    phone: string;
    company?: string;
    project_type?: string;
    budget?: string;
    details?: string;
    ref_code?: string;
}

export interface VisitorTrackingData {
    visitor_id: string;
    ip?: string;
    user_agent?: string;
    referrer?: string;
    ref_code?: string;
    page: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    token?: string;
    admin?: {
        id: number;
        email: string;
        role: string;
    };
    message?: string;
}

export interface DashboardStats {
    total_visitors: number;
    total_leads: number;
    total_referrals: number;
    converted_clients: number;
    revenue_generated: number;
    referral_payouts_pending: number;
}

export interface ReferrerWithStats extends Referrer {
    leads_count: number;
    converted_clients: number;
    total_commission: number;
    pending_commission: number;
}
