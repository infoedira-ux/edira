"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { City } from "@/types";

const CITIES_DATA = [
  {
    name: "Nairobi" as City,
    tagline: "The Silicon Savannah",
    description: "Kenya's capital and economic hub. From Westlands nightlife to Karen's leafy suburbs — every lifestyle is here.",
    image: "https://images.unsplash.com/photo-1611348586755-53cc18a35074?w=900&auto=format&fit=crop&q=80",
    listings: 487, avgPrice: 65000,
    neighbourhoods: ["Westlands","Kilimani","Lavington","Karen","Kileleshwa","Parklands","Eastleigh","South B"],
    color: "#D4A843",
  },
  {
    name: "Mombasa" as City,
    tagline: "The Coastal Pearl",
    description: "Ocean breezes, Swahili culture, and beachfront living. Nyali, Diani, and Bamburi offer affordable coastal paradise.",
    image: "https://images.unsplash.com/photo-1589825743636-a30a5ef70d8c?w=900&auto=format&fit=crop&q=80",
    listings: 312, avgPrice: 28000,
    neighbourhoods: ["Nyali","Bamburi","Diani","Old Town","Likoni","Shanzu","Mtwapa"],
    color: "#3B9ED4",
  },
  {
    name: "Kisumu" as City,
    tagline: "The Lake City",
    description: "Lakeside living on Lake Victoria. Kisumu is affordable, fast-growing, and full of opportunity.",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=900&auto=format&fit=crop&q=80",
    listings: 198, avgPrice: 15000,
    neighbourhoods: ["Milimani","Kondele","Mamboleo","Lolwe","Nyalenda","Tom Mboya"],
    color: "#22C55E",
  },
  {
    name: "Nakuru" as City,
    tagline: "The Rift Valley Gem",
    description: "Kenya's fourth largest city, surrounded by flamingos and valleys. Affordable family living at its best.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&auto=format&fit=crop&q=80",
    listings: 143, avgPrice: 22000,
    neighbourhoods: ["Milimani","Section 58","Bondeni","Lanet","Shabab","Barnabas"],
    color: "#F97316",
  },
];

export default function CitiesPage() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <main style={{ minHeight: "100vh", background: "#0A0E1A" }}>
      <Navbar />

      {/* Header */}
      <div style={{ padding: "clamp(36px,7vw,56px) clamp(16px,5vw,60px) 32px", textAlign: "center" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#D4A843", marginBottom: 10 }}>Explore</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(32px,6vw,52px)", fontWeight: 700, color: "white", marginBottom: 12 }}>
          Choose your <span style={{ color: "#D4A843", fontStyle: "italic" }}>city</span>
        </h1>
        <p style={{ fontSize: 14, color: "#8892AA", maxWidth: 460, margin: "0 auto" }}>
          From Nairobi's skyline to Mombasa's coastline — find homes across Kenya's major cities.
        </p>
      </div>

      {/* City Cards */}
      <div className="cities-grid" style={{ padding: "0 clamp(16px,5vw,60px) 72px", display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
        {CITIES_DATA.map(city => (
          <a key={city.name} href={`/browse?city=${city.name}`} style={{ textDecoration: "none" }}>
            <div
              onMouseEnter={() => setHovered(city.name)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "relative", borderRadius: 18, overflow: "hidden",
                height: "clamp(260px,40vw,340px)", cursor: "pointer",
                transform: hovered === city.name ? "translateY(-6px)" : "translateY(0)",
                boxShadow: hovered === city.name ? "0 24px 60px rgba(0,0,0,0.6)" : "0 6px 24px rgba(0,0,0,0.3)",
                transition: "transform 0.3s, box-shadow 0.3s",
                border: `1px solid ${hovered === city.name ? city.color + "44" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              <img src={city.image} alt={city.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: hovered === city.name ? "scale(1.05)" : "scale(1)", transition: "transform 0.5s" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg,rgba(10,14,26,0.95) 0%,rgba(10,14,26,0.3) 55%,transparent 100%)" }} />
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 30% 80%,${city.color}18 0%,transparent 60%)`, opacity: hovered === city.name ? 1 : 0, transition: "opacity 0.3s" }} />

              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(16px,3vw,24px)" }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: city.color, marginBottom: 4 }}>{city.tagline}</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(24px,4vw,34px)", fontWeight: 700, color: "white", marginBottom: 6, lineHeight: 1 }}>{city.name}</h2>
                <p style={{ fontSize: "clamp(11px,1.8vw,13px)", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: 14, display: "none" }} className="city-desc">{city.description}</p>

                <div style={{ display: "flex", gap: 18, marginBottom: 12 }}>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(18px,3vw,22px)", fontWeight: 700, color: "white" }}>{city.listings}</div>
                    <div style={{ fontSize: 10, color: "#8892AA", textTransform: "uppercase", letterSpacing: 1 }}>Listings</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(18px,3vw,22px)", fontWeight: 700, color: "white" }}>KSh {city.avgPrice.toLocaleString()}</div>
                    <div style={{ fontSize: 10, color: "#8892AA", textTransform: "uppercase", letterSpacing: 1 }}>Avg/mo</div>
                  </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {city.neighbourhoods.slice(0, 4).map(n => (
                    <span key={n} style={{ fontSize: 10, padding: "3px 9px", borderRadius: 100, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.1)" }}>{n}</span>
                  ))}
                  {city.neighbourhoods.length > 4 && (
                    <span style={{ fontSize: 10, padding: "3px 9px", borderRadius: 100, background: `${city.color}18`, color: city.color, border: `1px solid ${city.color}33` }}>+{city.neighbourhoods.length - 4}</span>
                  )}
                </div>
              </div>

              <div style={{ position: "absolute", top: 14, right: 14, width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, transform: hovered === city.name ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.3s" }}>→</div>
            </div>
          </a>
        ))}
      </div>

      <Footer />
    </main>
  );
}