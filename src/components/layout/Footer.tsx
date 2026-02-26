"use client";

import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  const cols = [
    {
      heading: "Explore",
      links: [
        { label: "Browse Listings", href: "/browse" },
        { label: "Cities", href: "/cities" },
        { label: "Post a Listing", href: "/post" },
        { label: "Reviews", href: "/reviews" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ],
    },
    {
      heading: "Account",
      links: [
        { label: "Sign Up", href: "/auth/signup" },
        { label: "Sign In", href: "/auth/login" },
        { label: "Dashboard", href: "/dashboard" },
      ],
    },
  ];

  return (
    <footer style={{
      background: "#0D1120",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      padding: "48px clamp(16px,5vw,60px) 28px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Top row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr repeat(3, auto)", gap: "40px", marginBottom: 40, flexWrap: "wrap" }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 700, color: "white", marginBottom: 10 }}>
              Edira<span style={{ color: "#D4A843" }}>.</span>
            </div>
            <p style={{ fontSize: 13, color: "#8892AA", lineHeight: 1.7, maxWidth: 240, marginBottom: 18 }}>
              Kenya's trusted rental platform. No brokers, no scams. Connect directly with verified landlords.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { icon: "🐦", href: "https://twitter.com/Edira21", label: "Twitter" },
                { icon: "💬", href: "https://wa.me/254715848222", label: "WhatsApp" },
                { icon: "📧", href: "mailto:info.edira@gmail.com", label: "Email" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, textDecoration: "none", transition: "border-color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(212,168,67,0.4)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.heading}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#D4A843", marginBottom: 14 }}>
                {col.heading}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(l => (
                  <a key={l.label} href={l.href}
                    style={{ fontSize: 13, color: "#8892AA", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "white")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#8892AA")}>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{ paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div style={{ fontSize: 12, color: "#8892AA" }}>
            © {year} Edira Kenya. All rights reserved.
          </div>
          <div style={{ fontSize: 12, color: "#8892AA" }}>
            Made with ❤️ for Kenyan renters
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}