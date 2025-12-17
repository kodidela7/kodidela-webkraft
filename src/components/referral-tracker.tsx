"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const COOKIE_NAME = "ref_code";
const COOKIE_EXPIRY_DAYS = 90;

export function ReferralTracker() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const refCode = searchParams?.get("ref");

        if (refCode) {
            // Save to cookie
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);
            document.cookie = `${COOKIE_NAME}=${refCode}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;

            // Save to localStorage as backup
            try {
                localStorage.setItem(COOKIE_NAME, refCode);
            } catch (e) {
                console.error("Failed to save to localStorage:", e);
            }
        }
    }, [searchParams]);

    return null; // This component doesn't render anything
}

/**
 * Hook to get the current referral code
 */
export function useReferralCode(): string | null {
    if (typeof window === "undefined") return null;

    // Try cookie first
    const cookies = document.cookie.split(";");
    const refCookie = cookies.find((c) => c.trim().startsWith(`${COOKIE_NAME}=`));
    if (refCookie) {
        return refCookie.split("=")[1] || null;
    }

    // Fallback to localStorage
    try {
        return localStorage.getItem(COOKIE_NAME);
    } catch (e) {
        return null;
    }
}
