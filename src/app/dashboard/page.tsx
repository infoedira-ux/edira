"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Listing } from "@/types";

const MOCK_LANDLORD_LISTINGS: Listing[] = [
  { id: "l1", landlord_id: "u1", title: "Luxury 3BR Penthouse", city: "Nairobi", neighbourhood: "Westlands", type: "3 Bedroom", price: 95000, beds: 3, baths: 2, sqft: 210, amenities: ["wifi","parking","security","gym"], images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"], status: "active", verified: true, featured: true, views: 120, inquiries: 8, created_at: "", updated_at: "", rating: 4.9, reviews: 14 },
  { id: "l8", landlord_id: "u1", title: "Executive 2BR, Lavington", city: "Nairobi", neighbourhood: "Lavington", type: "2 Bedroom", price: 80000, beds: 2, baths: 2, sqft: 120, amenities: ["wifi","parking","gym","security","furnished"], images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80"], status: "paused", verified: true, featured: false, views: 135, inquiries: 11, created_at: "", updated_at: "", rating: 5.0, reviews: 18 },
];

const MOCK_SAVED: Listing[] = [
  { id: "l2", landlord_id: "u2", title: "Ocean Breeze 1BR Apartment", city: "Mombasa", neighbourhood: "Nyali", type: "1 Bedroom", price: 28000, beds: 1, baths: 1, sqft: 60, amenities: ["wifi","water","security"], images: ["https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&auto=format&fit=crop&q=80"], status: "active", verified: true, featured: false, views: 80, inquiries: 5, created_at: "", updated_at: "", rating: 4.7, reviews: 11, landlord: { id: "u2", role: "landlord", full_name: "Aisha M", phone: "0745678901", verified: true, trust_score: 4.7, total_reviews: 11, created_at: "" } },
  { id: "l7", landlord_id: "u7", title: "1BR with Pool, Diani", city: "Mombasa", neighbourhood: "Diani", type: "1 Bedroom", price: 35000, beds: 1, baths: 1, sqft: 70, amenities: ["wifi","pool","security","ocean-view"], images: ["https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&auto=format&fit=crop&q=80"], status: "active", verified: true, featured: false, views: 110, inquiries: 9, created_at: "", updated_at: "", rating: 4.9, reviews: 20, landlord: { id: "u7", role: "landlord", full_name: "Hassan A", phone: "0733777888", verified: true, trust_score: 4.9, total_reviews: 20, created_at: "" } },
];

export default function DashboardPage() {
  const [role, setRole] = useState<"tenant" | "landlord">("landlord");
  const [listings, setListings] = useState(MOCK_LANDLORD_LISTINGS);

  const toggleStatus = (id: string) => {
    setListings(prev => prev.map(l => l.id === id ? { ...l, status: l.status === "active" ? "paused" : "active" } : l));
  };

  const statCards = role === "landlord"
    ? [
        { label: "Total Listings", value: listings.length, icon: "🏠" },
        { label: "Total Views", value: listings.reduce((s, l) => s + l.views, 0), icon: "👁️" },
        { label: "Inquiries", value: listings.reduce((s, l) => s + l.inquiries, 0), icon: "💬" },
        { label: "Active", value: listings.filter(l => l.status === "active").length, icon: "✅" },
      ]
    : [
        { label: "Saved Homes", value: MOCK_SAVED.length, icon: "❤️" },
        { label: "Cities Browsed", value: 2, icon: "🏙️" },
        { label: "Inquiries Sent", value: 3, icon: "💬" },
        { label: "Profile Views", value: 12, icon: "👁️" },
      ];

  return (
    <main style={{ minHeight: "100vh", background: "#0A0E1A" }}>
      <Navbar user={{ name: role === "landlord" ? "James K" : "Sarah W", role }} />

      <div style={{ padding: "48px 60px 80px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#D4A843", marginBottom: 8 }}>Dashboard</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 42, fontWeight: 700, color: "white" }}>
              Welcome back, <span style={{ color: "#D4A843", fontStyle: "italic" }}>{role === "landlord" ? "James" : "Sarah"}</span>
            </h1>
          </div>

          {/* Role toggle — for demo */}
          <div style={{ display: "flex", background: "#141829", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 4, gap: 4 }}>
            {(["tenant", "landlord"] as const).map(r => (
              <button key={r} onClick={() => setRole(r)}
                style={{ padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit',sans-serif", transition: "all 0.2s", textTransform: "capitalize", background: role === r ? "linear-gradient(135deg,#D4A843,#A87E28)" : "transparent", color: role === r ? "#0A0E1A" : "#8892AA", border: "none" }}>
                {r === "tenant" ? "🏠 Tenant" : "🔑 Landlord"}
              </button>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginBottom: 44 }}>
          {statCards.map((s, i) => (
            <div key={s.label} style={{ background: "#141829", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "24px 22px", animation: `fadeUp 0.4s ease ${i * 0.08}s both` }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, fontWeight: 700, color: "white", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#8892AA", marginTop: 6, textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Landlord: My Listings */}
        {role === "landlord" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 700, color: "white" }}>My Listings</h2>
              <a href="/post" style={{ padding: "10px 22px", borderRadius: 10, background: "linear-gradient(135deg,#D4A843,#A87E28)", color: "#0A0E1A", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                + Add New
              </a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {listings.map(l => (
                <div key={l.id} style={{ background: "#141829", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", gap: 20 }}>
                  <img src={l.images[0]} alt={l.title} style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 10, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "white", marginBottom: 4 }}>{l.title}</div>
                    <div style={{ fontSize: 13, color: "#8892AA" }}>📍 {l.neighbourhood}, {l.city} · KSh {l.price.toLocaleString()}/mo</div>
                  </div>
                  <div style={{ display: "flex", gap: 24, fontSize: 13, color: "#8892AA", textAlign: "center" }}>
                    <div><div style={{ color: "white", fontWeight: 600, fontSize: 18 }}>{l.views}</div>Views</div>
                    <div><div style={{ color: "white", fontWeight: 600, fontSize: 18 }}>{l.inquiries}</div>Inquiries</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 1, background: l.status === "active" ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.06)", color: l.status === "active" ? "#22C55E" : "#8892AA", border: l.status === "active" ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(255,255,255,0.08)" }}>
                      {l.status}
                    </span>
                    <button onClick={() => toggleStatus(l.id)}
                      style={{ padding: "7px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit',sans-serif", background: "transparent", color: "#8892AA", border: "1.5px solid rgba(255,255,255,0.1)", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "#D4A843"; e.currentTarget.style.color = "#D4A843"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#8892AA"; }}>
                      {l.status === "active" ? "Pause" : "Activate"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tenant: Saved listings */}
        {role === "tenant" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 700, color: "white" }}>Saved Homes</h2>
              <a href="/browse" style={{ padding: "10px 22px", borderRadius: 10, background: "transparent", color: "#B4BECE", border: "1.5px solid rgba(255,255,255,0.1)", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
                Browse More →
              </a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18 }}>
              {MOCK_SAVED.map(l => (
                <div key={l.id} style={{ background: "#141829", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden", display: "flex" }}>
                  <img src={l.images[0]} alt={l.title} style={{ width: 120, height: "100%", objectFit: "cover", flexShrink: 0 }} />
                  <div style={{ padding: "18px 20px", flex: 1 }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 700, color: "#D4A843", marginBottom: 4 }}>KSh {l.price.toLocaleString()}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 4 }}>{l.title}</div>
                    <div style={{ fontSize: 12, color: "#8892AA", marginBottom: 14 }}>📍 {l.neighbourhood}, {l.city}</div>
                    <a href={`https://wa.me/254${l.landlord?.phone?.replace(/^0/, "")}?text=Hi, I saw your listing on Edira: ${l.title}. Is it still available?`} target="_blank" rel="noreferrer"
                      style={{ fontSize: 12, fontWeight: 600, color: "#25D366", textDecoration: "none", background: "rgba(37,211,102,0.08)", padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(37,211,102,0.2)", display: "inline-block" }}>
                      💬 WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}