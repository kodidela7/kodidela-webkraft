"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const VISITOR_ID_KEY = "visitor_id";

function generateVisitorId(): string {
    return `v_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

function getVisitorId(): string {
    if (typeof window === "undefined") return "";

    // Try to get from cookie
    const cookies = document.cookie.split(";");
    const visitorCookie = cookies.find((c) =>
        c.trim().startsWith(`${VISITOR_ID_KEY}=`)
    );

    if (visitorCookie) {
        return visitorCookie.split("=")[1] || "";
    }

    // Generate new visitor ID
    const visitorId = generateVisitorId();

    // Save to cookie (1 year expiry)
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    document.cookie = `${VISITOR_ID_KEY}=${visitorId}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;

    return visitorId;
}

function getReferralCode(): string | null {
    if (typeof window === "undefined") return null;

    const cookies = document.cookie.split(";");
    const refCookie = cookies.find((c) => c.trim().startsWith("ref_code="));
    if (refCookie) {
        return refCookie.split("=")[1] || null;
    }

    try {
        return localStorage.getItem("ref_code");
    } catch (e) {
        return null;
    }
}

export function VisitorTracker() {
    const pathname = usePathname();
    const hasTracked = useRef(false);

    useEffect(() => {
        // Track on mount and route change
        if (hasTracked.current) {
            hasTracked.current = false;
        }

        const trackVisitor = async () => {
            if (hasTracked.current) return;
            hasTracked.current = true;

            const visitorId = getVisitorId();
            const refCode = getReferralCode();

            try {
                await fetch("/api/track/visitor", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        visitor_id: visitorId,
                        ref_code: refCode,
                        page: pathname,
                    }),
                });
            } catch (error) {
                console.error("Visitor tracking failed:", error);
            }
        };

        // Track with a small delay to avoid blocking page load
        const timer = setTimeout(trackVisitor, 1000);

        return () => clearTimeout(timer);
    }, [pathname]);

    return null;
}
