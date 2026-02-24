"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ListingCard from "@/components/listings/ListingCard";
import { Listing } from "@/types";

const SAMPLE_LISTINGS: Listing[] = [
  {
    id: "l1", landlord_id: "u1", title: "Luxury 3BR Penthouse",
    city: "Nairobi", neighbourhood: "Westlands", type: "3 Bedroom",
    price: 95000, beds: 3, baths: 2, sqft: 210,
    amenities: ["wifi", "parking", "security", "gym"],
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"],
    status: "active", verified: true, featured: true, views: 120, inquiries: 8,
    created_at: "", updated_at: "", is_new: true, rating: 4.9, reviews: 14,
    landlord: { id: "u1", role: "landlord", full_name: "James K", phone: "0712345678", verified: true, trust_score: 4.9, total_reviews: 14, created_at: "" },
  },
  {
    id: "l2", landlord_id: "u2", title: "Ocean Breeze 1BR Apartment",
    city: "Mombasa", neighbourhood: "Nyali", type: "1 Bedroom",
    price: 28000, beds: 1, baths: 1, sqft: 60,
    amenities: ["wifi", "water", "security"],
    images: ["https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&auto=format&fit=crop&q=80"],
    status: "active", verified: true, featured: false, views: 80, inquiries: 5,
    created_at: "", updated_at: "", is_new: true, rating: 4.7, reviews: 11,
    landlord: { id: "u2", role: "landlord", full_name: "Aisha M", phone: "0745678901", verified: true, trust_score: 4.7, total_reviews: 11, created_at: "" },
  },
  {
    id: "l3", landlord_id: "u3", title: "Furnished Studio, Bamburi",
    city: "Mombasa", neighbourhood: "Bamburi", type: "Bedsitter",
    price: 20000, beds: 1, baths: 1, sqft: 50,
    amenities: ["wifi", "furnished", "security"],
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80"],
    status: "active", verified: true, featured: false, views: 60, inquiries: 3,
    created_at: "", updated_at: "", is_new: true, rating: 4.6, reviews: 9,
    landlord: { id: "u3", role: "landlord", full_name: "Brian O", phone: "0757444555", verified: true, trust_score: 4.6, total_reviews: 9, created_at: "" },
  },
];

export default function HomePage() {
  const [detail, setDetail] = useState<Listing | null>(null);

  return (
    <main style={{ minHeight: "100vh", background: "#0A0E1A" }}>
      <Navbar />

      {/* HERO */}
      <div className="hero-grid" style={{
        background: "linear-gradient(135deg,#0A0E1A 0%,#0d1420 100%)",
        padding: "clamp(40px,8vw,80px) clamp(16px,5vw,60px)",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 40, alignItems: "center",
        minHeight: "88vh", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "15%", right: "47%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(212,168,67,0.05) 0%,transparent 70%)", pointerEvents: "none" }} />

        {/* Left */}
        <div style={{ position: "relative", zIndex: 2, animation: "fadeUp 0.7s ease both" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(212,168,67,0.08)", border: "1px solid rgba(212,168,67,0.2)", borderRadius: 100, padding: "6px 14px", marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#D4A843", display: "inline-block" }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#D4A843", textTransform: "uppercase" }}>Kenya's Premium Rental Platform</span>
          </div>

          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(42px,7vw,70px)", fontWeight: 700, lineHeight: 1.0, color: "white", marginBottom: 20 }}>
            Your next<br />
            <span style={{ color: "#D4A843", fontStyle: "italic" }}>home</span><br />
            awaits.
          </h1>

          <p style={{ fontSize: "clamp(14px,2vw,16px)", color: "#8892AA", lineHeight: 1.8, maxWidth: 400, marginBottom: 32 }}>
            No broker chaos. No ghost houses. Verified listings across Nairobi, Mombasa, Kisumu & Nakuru.
          </p>

          <div style={{ display: "flex", gap: 12, marginBottom: 44, flexWrap: "wrap" }}>
            <a href="/browse" style={{
              padding: "13px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700,
              background: "linear-gradient(135deg,#D4A843,#A87E28)", color: "#0A0E1A",
              textDecoration: "none",
            }}>Explore Listings →</a>
            <a href="/post" style={{
              padding: "13px 24px", borderRadius: 10, fontSize: 14, fontWeight: 500,
              background: "transparent", color: "#B4BECE",
              border: "1.5px solid rgba(255,255,255,0.1)", textDecoration: "none",
            }}>List Property Free</a>
          </div>

          {/* Stats */}
          <div className="stats-row" style={{ display: "flex", gap: 32, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {[["1,240+","Listings"],["4","Cities"],["98%","Verified"],["24hr","Response"]].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(20px,3vw,28px)", fontWeight: 700, color: "white" }}>{v}</div>
                <div style={{ fontSize: 10, color: "#8892AA", textTransform: "uppercase", letterSpacing: 1, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — floating cards (hidden on mobile via CSS) */}
        <div className="hero-cards" style={{ position: "relative", height: 520 }}>
          {SAMPLE_LISTINGS.map((l, i) => (
            <div key={l.id} onClick={() => setDetail(l)} style={{
              position: "absolute",
              top: i === 0 ? 0 : i === 1 ? 150 : 310,
              left: i === 0 ? 20 : i === 1 ? 50 : 0,
              width: 260, borderRadius: 14,
              background: "#141829", border: "1px solid rgba(255,255,255,0.07)",
              overflow: "hidden", cursor: "pointer", zIndex: 3 - i,
              transform: i === 1 ? "rotate(-2.5deg)" : i === 2 ? "rotate(1.5deg)" : "rotate(0)",
              boxShadow: i === 0 ? "0 24px 60px rgba(0,0,0,0.5)" : "0 8px 30px rgba(0,0,0,0.4)",
              animation: `fadeUp 0.6s ease ${0.2 + i * 0.12}s both`,
              transition: "transform 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "rotate(0) scale(1.04)"; e.currentTarget.style.zIndex = "10"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = i === 1 ? "rotate(-2.5deg)" : i === 2 ? "rotate(1.5deg)" : "rotate(0)"; e.currentTarget.style.zIndex = String(3 - i); }}
            >
              <img src={l.images[0]} alt={l.title} style={{ width: "100%", height: 130, objectFit: "cover", display: "block" }} />
              <div style={{ padding: "12px 14px" }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontWeight: 700, color: "#D4A843" }}>KSh {l.price.toLocaleString()}</div>
                <div style={{ fontSize: 12, color: "white", fontWeight: 600, marginBottom: 2 }}>{l.title}</div>
                <div style={{ fontSize: 11, color: "#8892AA" }}>📍 {l.neighbourhood}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ background: "#0d1420", padding: "clamp(40px,8vw,72px) clamp(16px,5vw,60px)" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#D4A843", marginBottom: 10 }}>Why Edira</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,5vw,42px)", fontWeight: 700, color: "white" }}>Built different, for Kenya.</h2>
        </div>
        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, maxWidth: 1100, margin: "0 auto" }}>
          {[
            ["🔐","Verified Listings","Every landlord vetted. Every listing real. Zero scams."],
            ["📱","WhatsApp First","Direct landlord contact — the way Kenya communicates."],
            ["🏙️","Hyper-Local","Neighbourhood-level precision for smarter house hunting."],
            ["🛡️","Tenant Protection","Landlord ratings, reviews, and easy scam reporting."],
          ].map(([icon, title, desc]) => (
            <div key={String(title)} style={{
              background: "#141829", border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 16, padding: "22px 18px", transition: "transform 0.25s",
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-5px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={{ fontSize: 30, marginBottom: 12 }}>{icon}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "white", marginBottom: 7 }}>{title}</div>
              <div style={{ fontSize: 13, color: "#8892AA", lineHeight: 1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FRESH LISTINGS */}
      <div style={{ padding: "clamp(40px,8vw,72px) clamp(16px,5vw,60px)", background: "#0A0E1A" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#D4A843", marginBottom: 8 }}>Just Added</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px,4vw,38px)", fontWeight: 700, color: "white" }}>
              Fresh <span style={{ color: "#D4A843", fontStyle: "italic" }}>properties</span>
            </h2>
          </div>
          <a href="/browse" style={{ padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 500, background: "transparent", color: "#B4BECE", border: "1.5px solid rgba(255,255,255,0.1)", textDecoration: "none" }}>View All →</a>
        </div>
        <div className="listings-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
          {SAMPLE_LISTINGS.map((l, i) => (
            <ListingCard key={l.id} listing={l} onOpen={setDetail} delay={i * 0.1} />
          ))}
        </div>
      </div>

      {/* CTA BANNER */}
      <div style={{
        margin: "0 clamp(16px,4vw,60px) clamp(40px,8vw,72px)",
        borderRadius: 20,
        background: "linear-gradient(135deg,#1a2f26,#0d1f19)",
        padding: "clamp(32px,6vw,56px) clamp(20px,5vw,60px)",
        border: "1px solid rgba(212,168,67,0.12)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: 40, top: "50%", transform: "translateY(-50%)", fontSize: 100, opacity: 0.05 }}>🏠</div>
        <div style={{ maxWidth: 480, position: "relative", zIndex: 2 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px,4vw,38px)", fontWeight: 700, color: "white", marginBottom: 10 }}>
            Are you a <span style={{ color: "#D4A843", fontStyle: "italic" }}>landlord?</span>
          </h2>
          <p style={{ fontSize: 14, color: "#8892AA", lineHeight: 1.8, marginBottom: 24 }}>
            Post for free. Reach verified tenants. No commissions, ever.
          </p>
          <a href="/post" style={{ padding: "13px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, background: "linear-gradient(135deg,#D4A843,#A87E28)", color: "#0A0E1A", textDecoration: "none", display: "inline-block" }}>
            Post Free →
          </a>
        </div>
      </div>

      {/* Detail Modal */}
      {detail && (
        <div onClick={() => setDetail(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#141829", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, width: "100%", maxWidth: 540, maxHeight: "90vh", overflowY: "auto", animation: "popIn 0.3s ease both" }}>
            <img src={detail.images[0]} alt={detail.title} style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: "20px 20px 0 0", display: "block" }} />
            <div style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 700, color: "#D4A843" }}>KSh {detail.price.toLocaleString()}<span style={{ fontSize: 13, color: "#8892AA", fontFamily: "'Outfit',sans-serif" }}>/mo</span></div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>{detail.title}</div>
                  <div style={{ fontSize: 12, color: "#8892AA", marginTop: 3 }}>📍 {detail.neighbourhood}, {detail.city}</div>
                </div>
                <button onClick={() => setDetail(null)} style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "white", width: 34, height: 34, borderRadius: "50%", cursor: "pointer", fontSize: 16, flexShrink: 0 }}>✕</button>
              </div>
              <div style={{ display: "flex", gap: 16, padding: "14px 0", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 16, fontSize: 12, color: "#8892AA", flexWrap: "wrap" }}>
                <span>🛏 {detail.beds} Bed</span>
                <span>🚿 {detail.baths} Bath</span>
                {detail.sqft && <span>📐 {detail.sqft}m²</span>}
                <span>🏠 {detail.type}</span>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <a href={`https://wa.me/254${detail.landlord?.phone?.replace(/^0/, "")}?text=Hi, I saw your listing on Edira: ${detail.title}. Is it still available?`} target="_blank" rel="noreferrer"
                  style={{ flex: 1, background: "#25D366", color: "white", padding: "12px 0", borderRadius: 10, fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, textDecoration: "none" }}>
                  💬 WhatsApp
                </a>
                <a href={`tel:${detail.landlord?.phone}`}
                  style={{ flex: 1, background: "rgba(255,255,255,0.06)", color: "white", padding: "12px 0", borderRadius: 10, fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.1)" }}>
                  📞 Call
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}