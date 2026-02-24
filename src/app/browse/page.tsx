"use client";

import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ListingCard from "@/components/listings/ListingCard";
import { Listing, City, ListingType } from "@/types";

const CITIES: City[] = ["Nairobi", "Mombasa", "Kisumu", "Nakuru"];
const TYPES: ListingType[] = ["Bedsitter", "1 Bedroom", "2 Bedroom", "3 Bedroom", "4+ Bedroom"];
const AMENITY_PILLS = ["wifi", "parking", "security", "borehole", "furnished", "gym", "pool", "water", "garden"];

const FALLBACK_LISTINGS: Listing[] = [
  { id: "l1", landlord_id: "u1", title: "Luxury 3BR Penthouse", city: "Nairobi", neighbourhood: "Westlands", type: "3 Bedroom", price: 95000, beds: 3, baths: 2, sqft: 210, amenities: ["wifi","parking","security","gym"], images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"], status: "active", verified: true, featured: true, views: 120, inquiries: 8, created_at: "", updated_at: "", is_new: true, rating: 4.9, reviews: 14, landlord: { id: "u1", role: "landlord", full_name: "James K", phone: "0712345678", verified: true, trust_score: 4.9, total_reviews: 14, created_at: "" } },
  { id: "l2", landlord_id: "u2", title: "Ocean Breeze 1BR Apartment", city: "Mombasa", neighbourhood: "Nyali", type: "1 Bedroom", price: 28000, beds: 1, baths: 1, sqft: 60, amenities: ["wifi","water","security"], images: ["https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&auto=format&fit=crop&q=80"], status: "active", verified: true, featured: false, views: 80, inquiries: 5, created_at: "", updated_at: "", is_new: true, rating: 4.7, reviews: 11, landlord: { id: "u2", role: "landlord", full_name: "Aisha M", phone: "0745678901", verified: true, trust_score: 4.7, total_reviews: 11, created_at: "" } },
  { id: "l3", landlord_id: "u3", title: "Furnished Studio Bamburi", city: "Mombasa", neighbourhood: "Bamburi", type: "Bedsitter", price: 20000, beds: 1, baths: 1, sqft: 50, amenities: ["wifi","furnished","security"], images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80"], status: "active", verified: true, featured: false, views: 60, inquiries: 3, created_at: "", updated_at: "", is_new: true, rating: 4.6, reviews: 9, landlord: { id: "u3", role: "landlord", full_name: "Brian O", phone: "0757444555", verified: true, trust_score: 4.6, total_reviews: 9, created_at: "" } },
  { id: "l4", landlord_id: "u4", title: "Modern 2BR, Kilimani", city: "Nairobi", neighbourhood: "Kilimani", type: "2 Bedroom", price: 55000, beds: 2, baths: 2, sqft: 95, amenities: ["wifi","parking","security","furnished"], images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80"], status: "active", verified: true, featured: false, views: 95, inquiries: 6, created_at: "", updated_at: "", is_new: false, rating: 4.8, reviews: 12, landlord: { id: "u4", role: "landlord", full_name: "Grace W", phone: "0723111222", verified: true, trust_score: 4.8, total_reviews: 12, created_at: "" } },
  { id: "l5", landlord_id: "u5", title: "Cozy Bedsitter, Kisumu CBD", city: "Kisumu", neighbourhood: "Milimani", type: "Bedsitter", price: 10000, beds: 1, baths: 1, sqft: 30, amenities: ["water","security"], images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop&q=80"], status: "active", verified: false, featured: false, views: 40, inquiries: 2, created_at: "", updated_at: "", is_new: false, rating: 4.2, reviews: 5, landlord: { id: "u5", role: "landlord", full_name: "Peter O", phone: "0711333444", verified: false, trust_score: 4.2, total_reviews: 5, created_at: "" } },
  { id: "l6", landlord_id: "u6", title: "Spacious 4BR Family Home", city: "Nakuru", neighbourhood: "Milimani", type: "4+ Bedroom", price: 75000, beds: 4, baths: 3, sqft: 280, amenities: ["parking","garden","security","borehole"], images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop&q=80"], status: "active", verified: true, featured: true, views: 70, inquiries: 4, created_at: "", updated_at: "", is_new: false, rating: 4.5, reviews: 8, landlord: { id: "u6", role: "landlord", full_name: "Mary N", phone: "0799555666", verified: true, trust_score: 4.5, total_reviews: 8, created_at: "" } },
  { id: "l7", landlord_id: "u7", title: "1BR with Pool, Diani", city: "Mombasa", neighbourhood: "Diani", type: "1 Bedroom", price: 35000, beds: 1, baths: 1, sqft: 70, amenities: ["wifi","pool","security","ocean-view"], images: ["https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&auto=format&fit=crop&q=80"], status: "active", verified: true, featured: false, views: 110, inquiries: 9, created_at: "", updated_at: "", is_new: true, rating: 4.9, reviews: 20, landlord: { id: "u7", role: "landlord", full_name: "Hassan A", phone: "0733777888", verified: true, trust_score: 4.9, total_reviews: 20, created_at: "" } },
  { id: "l8", landlord_id: "u8", title: "Executive 2BR, Lavington", city: "Nairobi", neighbourhood: "Lavington", type: "2 Bedroom", price: 80000, beds: 2, baths: 2, sqft: 120, amenities: ["wifi","parking","gym","security","furnished"], images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80"], status: "active", verified: true, featured: true, views: 135, inquiries: 11, created_at: "", updated_at: "", is_new: false, rating: 5.0, reviews: 18, landlord: { id: "u8", role: "landlord", full_name: "Susan L", phone: "0720999000", verified: true, trust_score: 5.0, total_reviews: 18, created_at: "" } },
];

export default function BrowsePage() {
  const [allListings, setAllListings] = useState<Listing[]>(FALLBACK_LISTINGS);
  const [loadingData, setLoadingData] = useState(true);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState<City | "">("");
  const [type, setType] = useState<ListingType | "">("");
  const [maxPrice, setMaxPrice] = useState(200000);
  const [amenity, setAmenity] = useState("");
  const [sort, setSort] = useState<"price_asc"|"price_desc"|"rating">("rating");
  const [detail, setDetail] = useState<Listing | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const { data, error } = await supabase
          .from("listings")
          .select("*, landlord:profiles(*)")
          .eq("status", "active")
          .order("created_at", { ascending: false });
        if (!error && data && data.length > 0) setAllListings(data as Listing[]);
      } catch {}
      setLoadingData(false);
    };
    fetchListings();
  }, []);

  const filtered = useMemo(() => {
    let list = [...allListings];
    if (search) list = list.filter(l => l.title.toLowerCase().includes(search.toLowerCase()) || l.neighbourhood?.toLowerCase().includes(search.toLowerCase()));
    if (city) list = list.filter(l => l.city === city);
    if (type) list = list.filter(l => l.type === type);
    list = list.filter(l => l.price <= maxPrice);
    if (amenity) list = list.filter(l => l.amenities.includes(amenity as any));
    if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return list;
  }, [allListings, search, city, type, maxPrice, amenity, sort]);

  const activeFilters = [city, type, amenity].filter(Boolean).length;

  return (
    <main style={{ minHeight: "100vh", background: "#0A0E1A" }}>
      <Navbar />

      {/* Header */}
      <div style={{ padding: "clamp(28px,6vw,48px) clamp(16px,5vw,60px) 24px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#D4A843", marginBottom: 6 }}>Browse</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,5vw,44px)", fontWeight: 700, color: "white", marginBottom: 20 }}>
          Find your <span style={{ color: "#D4A843", fontStyle: "italic" }}>perfect home</span>
        </h1>

        {/* Search + filter toggle row */}
        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or neighbourhood..."
            style={{ flex: 1, padding: "12px 16px", borderRadius: 10, background: "#141829", border: "1.5px solid rgba(255,255,255,0.08)", color: "white", fontSize: 14, fontFamily: "'Outfit',sans-serif", outline: "none", minWidth: 0 }} />
          <button onClick={() => setFiltersOpen(!filtersOpen)}
            style={{ padding: "12px 16px", borderRadius: 10, background: filtersOpen || activeFilters > 0 ? "rgba(212,168,67,0.12)" : "#141829", border: `1.5px solid ${activeFilters > 0 ? "rgba(212,168,67,0.4)" : "rgba(255,255,255,0.08)"}`, color: activeFilters > 0 ? "#D4A843" : "#8892AA", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit',sans-serif", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
            ⚙ Filters {activeFilters > 0 && <span style={{ background: "#D4A843", color: "#0A0E1A", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{activeFilters}</span>}
          </button>
        </div>

        {/* Expandable filters */}
        {filtersOpen && (
          <div style={{ background: "#141829", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "18px 16px", marginBottom: 14, animation: "fadeUp 0.2s ease both" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, marginBottom: 16 }}>
              <select value={city} onChange={e => setCity(e.target.value as City | "")}
                style={{ padding: "11px 14px", borderRadius: 9, background: "#1E2436", border: "1.5px solid rgba(255,255,255,0.08)", color: city ? "white" : "#8892AA", fontSize: 13, fontFamily: "'Outfit',sans-serif", outline: "none", cursor: "pointer" }}>
                <option value="">All Cities</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={type} onChange={e => setType(e.target.value as ListingType | "")}
                style={{ padding: "11px 14px", borderRadius: 9, background: "#1E2436", border: "1.5px solid rgba(255,255,255,0.08)", color: type ? "white" : "#8892AA", fontSize: 13, fontFamily: "'Outfit',sans-serif", outline: "none", cursor: "pointer" }}>
                <option value="">All Types</option>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <select value={sort} onChange={e => setSort(e.target.value as any)}
                style={{ padding: "11px 14px", borderRadius: 9, background: "#1E2436", border: "1.5px solid rgba(255,255,255,0.08)", color: "white", fontSize: 13, fontFamily: "'Outfit',sans-serif", outline: "none", cursor: "pointer" }}>
                <option value="rating">Top Rated</option>
                <option value="price_asc">Price: Low → High</option>
                <option value="price_desc">Price: High → Low</option>
              </select>
            </div>

            {/* Price slider */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: "#8892AA" }}>Max Rent</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#D4A843" }}>KSh {maxPrice.toLocaleString()}</span>
              </div>
              <input type="range" min={5000} max={200000} step={5000} value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#D4A843" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#8892AA", marginTop: 4 }}>
                <span>KSh 5,000</span><span>KSh 200,000</span>
              </div>
            </div>

            {/* Amenity pills */}
            <div>
              <div style={{ fontSize: 11, color: "#8892AA", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Amenities</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {AMENITY_PILLS.map(a => (
                  <button key={a} onClick={() => setAmenity(amenity === a ? "" : a)}
                    style={{ padding: "6px 13px", borderRadius: 100, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "'Outfit',sans-serif", transition: "all 0.2s", background: amenity === a ? "rgba(212,168,67,0.15)" : "rgba(255,255,255,0.04)", color: amenity === a ? "#D4A843" : "#8892AA", border: amenity === a ? "1px solid rgba(212,168,67,0.4)" : "1px solid rgba(255,255,255,0.07)" }}>
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear filters */}
            {activeFilters > 0 && (
              <button onClick={() => { setCity(""); setType(""); setAmenity(""); setMaxPrice(200000); }}
                style={{ marginTop: 14, padding: "8px 18px", borderRadius: 8, background: "transparent", color: "#EF4444", border: "1px solid rgba(239,68,68,0.3)", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>
                ✕ Clear all filters
              </button>
            )}
          </div>
        )}

        {/* City quick filter pills */}
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
          {CITIES.map(c => (
            <button key={c} onClick={() => setCity(city === c ? "" : c)}
              style={{ padding: "6px 14px", borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit',sans-serif", transition: "all 0.2s", background: city === c ? "rgba(212,168,67,0.15)" : "rgba(255,255,255,0.04)", color: city === c ? "#D4A843" : "#8892AA", border: city === c ? "1px solid rgba(212,168,67,0.4)" : "1px solid rgba(255,255,255,0.07)" }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div style={{ padding: "24px clamp(16px,5vw,60px) 72px" }}>
        <div style={{ fontSize: 13, color: "#8892AA", marginBottom: 20 }}>
          {loadingData ? (
            <span style={{ color: "#D4A843" }}>Loading listings...</span>
          ) : (
            <><span style={{ color: "white", fontWeight: 600 }}>{filtered.length}</span> properties found{city && <span> in <span style={{ color: "#D4A843" }}>{city}</span></span>}</>
          )}
        </div>

        {loadingData ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ height: 360, borderRadius: 16, background: "#141829", animation: "pulse 1.5s ease infinite" }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 44, marginBottom: 14 }}>🏚️</div>
            <div style={{ fontSize: 17, fontWeight: 600, color: "white", marginBottom: 8 }}>No properties found</div>
            <div style={{ fontSize: 13, color: "#8892AA", marginBottom: 20 }}>Try adjusting your filters</div>
            <button onClick={() => { setCity(""); setType(""); setAmenity(""); setMaxPrice(200000); setSearch(""); }}
              style={{ padding: "10px 22px", borderRadius: 10, background: "linear-gradient(135deg,#D4A843,#A87E28)", color: "#0A0E1A", fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
            {filtered.map((l, i) => <ListingCard key={l.id} listing={l} onOpen={setDetail} delay={i * 0.05} />)}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {detail && (
        <div onClick={() => setDetail(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 0 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#141829", borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 600, maxHeight: "92vh", overflowY: "auto", animation: "fadeUp 0.3s ease both" }}>
            <div style={{ position: "sticky", top: 0, display: "flex", justifyContent: "center", padding: "10px 0 0", background: "#141829", zIndex: 1 }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} />
            </div>
            <img src={detail.images[0] || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"} alt={detail.title} style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
            <div style={{ padding: "20px 20px 36px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 700, color: "#D4A843" }}>KSh {detail.price.toLocaleString()}<span style={{ fontSize: 13, color: "#8892AA", fontFamily: "'Outfit',sans-serif" }}>/mo</span></div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>{detail.title}</div>
                  <div style={{ fontSize: 12, color: "#8892AA", marginTop: 3 }}>📍 {detail.neighbourhood}, {detail.city}</div>
                </div>
                <button onClick={() => setDetail(null)} style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "white", width: 34, height: 34, borderRadius: "50%", cursor: "pointer", fontSize: 16, flexShrink: 0 }}>✕</button>
              </div>
              {detail.description && <p style={{ fontSize: 13, color: "#8892AA", lineHeight: 1.7, marginBottom: 16 }}>{detail.description}</p>}
              <div style={{ display: "flex", gap: 14, padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 16, fontSize: 12, color: "#8892AA", flexWrap: "wrap" }}>
                <span>🛏 {detail.beds} Bed</span>
                <span>🚿 {detail.baths} Bath</span>
                {detail.sqft && <span>📐 {detail.sqft}m²</span>}
                <span>🏠 {detail.type}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 20 }}>
                {detail.amenities.map(a => (
                  <span key={a} style={{ padding: "4px 12px", borderRadius: 100, fontSize: 11, background: "rgba(212,168,67,0.08)", color: "#D4A843", border: "1px solid rgba(212,168,67,0.2)" }}>{a}</span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <a href={`https://wa.me/254${detail.landlord?.phone?.replace(/^0/,"")}?text=Hi, I saw your listing on Edira: ${detail.title}. Is it still available?`} target="_blank" rel="noreferrer"
                  style={{ flex: 1, background: "#25D366", color: "white", padding: "13px 0", borderRadius: 10, fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, textDecoration: "none" }}>
                  💬 WhatsApp
                </a>
                <a href={`tel:${detail.landlord?.phone}`}
                  style={{ flex: 1, background: "rgba(255,255,255,0.06)", color: "white", padding: "13px 0", borderRadius: 10, fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.1)" }}>
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