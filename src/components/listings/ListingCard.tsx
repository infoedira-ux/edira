"use client";

import { useState } from "react";
import { Listing } from "@/types";

const AMENITY_ICONS: Record<string, string> = {
  wifi: "📶",
  parking: "🚗",
  security: "🔒",
  borehole: "⛲",
  furnished: "🛋",
  gym: "💪",
  pool: "🏊",
  water: "💧",
  garden: "🌿",
  "ocean-view": "🌊",
};

const Stars = ({ rating }: { rating: number }) => (
  <span style={{ color: "#D4A843", fontSize: 12 }}>
    {"★".repeat(Math.floor(rating))}
    {"☆".repeat(5 - Math.floor(rating))}
    <span style={{ color: "#8892AA", fontSize: 11, marginLeft: 4 }}>
      {rating}
    </span>
  </span>
);

interface ListingCardProps {
  listing: Listing;
  onOpen: (listing: Listing) => void;
  delay?: number;
}

export default function ListingCard({
  listing: l,
  onOpen,
  delay = 0,
}: ListingCardProps) {
  const [saved, setSaved] = useState(false);

  return (
    <div
      onClick={() => onOpen(l)}
      style={{
        background: "#141829",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: 220 }}>
        <img
          src={
            l.images?.[0] ||
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
          }
          alt={l.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Save */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSaved(!saved);
          }}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "rgba(0,0,0,0.6)",
            border: "none",
            borderRadius: "50%",
            width: 32,
            height: 32,
            cursor: "pointer",
            color: saved ? "red" : "white",
          }}
        >
          {saved ? "❤️" : "🤍"}
        </button>

        {/* Price */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            color: "white",
            fontWeight: 700,
          }}
        >
          KSh {l.price.toLocaleString()} /month
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: 16 }}>
        <Stars rating={l.rating || 0} />

        <h3 style={{ margin: "8px 0", color: "white" }}>{l.title}</h3>

        <p style={{ color: "#8892AA", fontSize: 13 }}>
          📍 {l.neighbourhood}, {l.city}
        </p>

        {/* Specs */}
        <div style={{ display: "flex", gap: 12, margin: "10px 0" }}>
          <span>🛏 {l.beds} Bed</span>
          <span>🚿 {l.baths} Bath</span>
        </div>

        {/* Amenities */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {l.amenities?.slice(0, 3).map((a) => (
            <span
              key={a}
              style={{
                fontSize: 11,
                padding: "4px 8px",
                background: "#1F2438",
                borderRadius: 20,
              }}
            >
              {AMENITY_ICONS[a]} {a}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          <a
            href={`https://wa.me/254${l.landlord?.phone?.replace(
              /^0/,
              ""
            )}?text=Hi, I found your listing on Edira: ${
              l.title
            }. Is it still available?`}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: 1,
              background: "#25D366",
              color: "white",
              padding: "8px 0",
              textAlign: "center",
              borderRadius: 8,
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            💬 WhatsApp
          </a>

          <button
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: 1,
              background: "#1F2438",
              color: "white",
              border: "none",
              padding: "8px 0",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            📞 Call
          </button>
        </div>
      </div>
    </div>
  );
}