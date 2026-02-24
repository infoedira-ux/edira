"use client";

import { useState } from "react";
import { Listing } from "@/types";

const AMENITY_ICONS: Record<string, string> = {
  wifi: "📶", parking: "🚗", security: "🔒",
  borehole: "⛲", furnished: "🛋", gym: "💪",
  pool: "🏊", water: "💧", garden: "🌿", "ocean-view": "🌊",
};

const Stars = ({ rating }: { rating: number }) => (
  <span style={{ color: "#D4A843", fontSize: 12 }}>
    {"★".repeat(Math.floor(rating))}
    {"☆".repeat(5 - Math.floor(rating))}
    <span style={{ color: "#8892AA", fontSize: 11, marginLeft: 4 }}>{rating}</span>
  </span>
);

interface ListingCardProps {
  listing: Listing;
  onOpen: (listing: Listing) => void;
  delay?: number;
}

export default function ListingCard({ listing: l, onOpen, delay = 0 }: ListingCardProps) {
  const [saved, setSaved] = useState(false);

  return (
    <div
      onClick={() => window.location.href = `/listings/${l.id}`}
      style={{
        background: "#141829",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: 16, overflow: "hidden",
        transition: "transform 0.25s, box-shadow 0.25s",
        cursor: "pointer",
        animation: `fadeUp 0.45s ease ${delay}s both`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
        <img
          src={l.images?.[0] || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"}
          alt={l.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.45s" }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.07)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg,rgba(10,14,26,0.75) 0%,transparent 55%)" }} />

        {/* Badges */}
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
          {l.verified && (
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", padding: "3px 9px", borderRadius: 4, background: "rgba(212,168,67,0.15)", color: "#D4A843", border: "1px solid rgba(212,168,67,0.3)" }}>
              ✓ Verified
            </span>
          )}
          {l.is_new && (
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", padding: "3px 9px", borderRadius: 4, background: "rgba(34,197,94,0.12)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.3)" }}>
              New
            </span>
          )}
        </div>

        {/* Save button */}
        <button
          onClick={e => { e.stopPropagation(); setSaved(!saved); }}
          style={{
            position: "absolute", top: 10, right: 12,
            background: "rgba(10,14,26,0.7)", backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.12)",
            width: 34, height: 34, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontSize: 15,
            color: saved ? "#EF4444" : "rgba(255,255,255,0.7)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.15)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          {saved ? "❤️" : "🤍"}
        </button>

        {/* Price */}
        <div style={{ position: "absolute", bottom: 12, left: 14 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color: "white", lineHeight: 1 }}>
            KSh {l.price.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>/month</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "16px 18px 18px" }}>
        <div style={{ marginBottom: 4 }}>
          <Stars rating={l.rating || 0} />
          <span style={{ color: "#8892AA", fontSize: 11, marginLeft: 4 }}>({l.reviews || 0})</span>
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "white", marginBottom: 5, lineHeight: 1.3 }}>{l.title}</div>
        <div style={{ fontSize: 13, color: "#8892AA", marginBottom: 12 }}>📍 {l.neighbourhood}, {l.city}</div>

        {/* Specs */}
        <div style={{ display: "flex", gap: 14, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.05)", marginBottom: 14, fontSize: 12, color: "#8892AA", fontWeight: 500 }}>
          <span>🛏 {l.beds} Bed</span>
          <span>🚿 {l.baths} Bath</span>
          {l.sqft && <span>📐 {l.sqft}m²</span>}
          {l.amenities?.includes("wifi") && <span>📶 WiFi</span>}
        </div>

        {/* Amenity pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          {l.amenities?.slice(0, 3).map(a => (
            <span key={a} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 100, background: "rgba(255,255,255,0.04)", color: "#8892AA", border: "1px solid rgba(255,255,255,0.07)" }}>
              {AMENITY_ICONS[a]} {a}
            </span>
          ))}
          {(l.amenities?.length || 0) > 3 && (
            <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 100, background: "rgba(212,168,67,0.08)", color: "#D4A843", border: "1px solid rgba(212,168,67,0.2)" }}>
              +{l.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 8 }}>
          
            href={`https://wa.me/254${l.landlord?.phone?.replace(/^0/, "")}?text=Hi, I found your listing on Edira: ${l.title}. Is it still available?`}
            target="_blank" rel="noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              flex: 1, background: "#25D366", color: "white",
              padding: "9px 0", borderRadius: 9, fontSize: 13, fontWeight: 600,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
              textDecoration: "none", transition: "filter 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.1)")}
            onMouseLeave={e => (e.currentTarget.style.filter = "brightness(1)")}
          >
            💬 WhatsApp
          </a>
          <button
            onClick={e => { e.stopPropagation(); window.location.href = `/listings/${l.id}`; }}
            style={{
              flex: 1, background: "transparent", color: "#B4BECE",
              border: "1.5px solid rgba(255,255,255,0.1)",
              padding: "9px 0", borderRadius: 9, fontSize: 13, fontWeight: 500,
              cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#D4A843"; e.currentTarget.style.color = "#D4A843"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#B4BECE"; }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}