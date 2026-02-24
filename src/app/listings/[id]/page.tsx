"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Listing } from "@/types";

const FALLBACK_LISTINGS: Listing[] = [
  { id: "l1", landlord_id: "u1", title: "Luxury 3BR Penthouse", city: "Nairobi", neighbourhood: "Westlands", type: "3 Bedroom", price: 95000, beds: 3, baths: 2, sqft: 210, amenities: ["wifi","parking","security","gym"], images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"], status: "active", verified: true, featured: true, views: 120, inquiries: 8, created_at: "", updated_at: "", is_new: true, rating: 4.9, reviews: 14, landlord: { id: "u1", role: "landlord", full_name: "James K", phone: "0712345678", verified: true, trust_score: 4.9, total_reviews: 14, created_at: "" } },
  { id: "l2", landlord_id: "u2", title: "Ocean Breeze 1BR Apartment", city: "Mombasa", neighbourhood: "Nyali", type: "1 Bedroom", price: 28000, beds: 1, baths: 1, sqft: 60, amenities: ["wifi","water","security"], images: ["https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&auto=format&fit=crop&q=80"], status: "active", verified: true, featured: false, views: 80, inquiries: 5, created_at: "", updated_at: "", is_new: true, rating: 4.7, reviews: 11, landlord: { id: "u2", role: "landlord", full_name: "Aisha M", phone: "0745678901", verified: true, trust_score: 4.7, total_reviews: 11, created_at: "" } },
  { id: "l3", landlord_id: "u3", title: "Furnished Studio Bamburi", city: "Mombasa", neighbourhood: "Bamburi", type: "Bedsitter", price: 20000, beds: 1, baths: 1, sqft: 50, amenities: ["wifi","furnished","security"], images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80"], status: "active", verified: true, featured: false, views: 60, inquiries: 3, created_at: "", updated_at: "", is_new: true, rating: 4.6, reviews: 9, landlord: { id: "u3", role: "landlord", full_name: "Brian O", phone: "0757444555", verified: true, trust_score: 4.6, total_reviews: 9, created_at: "" } },
  { id: "l4", landlord_id: "u4", title: "Modern 2BR Kilimani", city: "Nairobi", neighbourhood: "Kilimani", type: "2 Bedroom", price: 55000, beds: 2, baths: 2, sqft: 95, amenities: ["wifi","parking","security","furnished"], images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80"], status: "active", verified: true, featured: false, views: 95, inquiries: 6, created_at: "", updated_at: "", is_new: false, rating: 4.8, reviews: 12, landlord: { id: "u4", role: "landlord", full_name: "Grace W", phone: "0723111222", verified: true, trust_score: 4.8, total_reviews: 12, created_at: "" } },
  { id: "l5", landlord_id: "u5", title: "Cozy Bedsitter Kisumu CBD", city: "Kisumu", neighbourhood: "Milimani", type: "Bedsitter", price: 10000, beds: 1, baths: 1, sqft: 30, amenities: ["water","security"], images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop&q=80"], status: "active", verified: false, featured: false, views: 40, inquiries: 2, created_at: "", updated_at: "", is_new: false, rating: 4.2, reviews: 5, landlord: { id: "u5", role: "landlord", full_name: "Peter O", phone: "0711333444", verified: false, trust_score: 4.2, total_reviews: 5, created_at: "" } },
  { id: "l6", landlord_id: "u6", title: "Spacious 4BR Family Home", city: "Nakuru", neighbourhood: "Milimani", type: "4+ Bedroom", price: 75000, beds: 4, baths: 3, sqft: 280, amenities: ["parking","garden","security","borehole"], images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop&q=80"], status: "active", verified: true, featured: true, views: 70, inquiries: 4, created_at: "", updated_at: "", is_new: false, rating: 4.5, reviews: 8, landlord: { id: "u6", role: "landlord", full_name: "Mary N", phone: "0799555666", verified: true, trust_score: 4.5, total_reviews: 8, created_at: "" } },
  { id: "l7", landlord_id: "u7", title: "1BR with Pool Diani", city: "Mombasa", neighbourhood: "Diani", type: "1 Bedroom", price: 35000, beds: 1, baths: 1, sqft: 70, amenities: ["wifi","pool","security","ocean-view"], images: ["https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&auto=format&fit=crop&q=80"], status: "active", verified: true, featured: false, views: 110, inquiries: 9, created_at: "", updated_at: "", is_new: true, rating: 4.9, reviews: 20, landlord: { id: "u7", role: "landlord", full_name: "Hassan A", phone: "0733777888", verified: true, trust_score: 4.9, total_reviews: 20, created_at: "" } },
  { id: "l8", landlord_id: "u8", title: "Executive 2BR Lavington", city: "Nairobi", neighbourhood: "Lavington", type: "2 Bedroom", price: 80000, beds: 2, baths: 2, sqft: 120, amenities: ["wifi","parking","gym","security","furnished"], images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80"], status: "active", verified: true, featured: true, views: 135, inquiries: 11, created_at: "", updated_at: "", is_new: false, rating: 5.0, reviews: 18, landlord: { id: "u8", role: "landlord", full_name: "Susan L", phone: "0720999000", verified: true, trust_score: 5.0, total_reviews: 18, created_at: "" } },
];

const AMENITY_ICONS: Record<string, string> = {
  wifi: "📶", parking: "🚗", security: "🔒", borehole: "⛲",
  furnished: "🛋", gym: "💪", pool: "🏊", water: "💧",
  garden: "🌿", "ocean-view": "🌊",
};

const Stars = ({ rating }: { rating: number }) => (
  <span>
    {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
  </span>
);

export default function ListingPage() {
  const { id } = useParams();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const { data, error } = await supabase
          .from("listings")
          .select("*, landlord:profiles(*)")
          .eq("id", id)
          .single();
        if (!error && data) {
          setListing(data as Listing);

          // Increment views
          await supabase.from("listings")
            .update({ views: (data.views || 0) + 1 })
            .eq("id", id);

          setLoading(false);
          return;
        }
      } catch {}

      // Fallback to sample data
      const found = FALLBACK_LISTINGS.find(l => l.id === id);
      setListing(found || null);
      setLoading(false);
    };
    if (id) fetchListing();
  }, [id]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: listing?.title, text: `Check out this property on Edira: ${listing?.title}`, url });
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <main style={{ minHeight: "100vh", background: "#0A0E1A" }}>
        <Navbar />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "70vh" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 44, marginBottom: 14 }}>⏳</div>
            <div style={{ fontSize: 15, color: "#8892AA" }}>Loading property...</div>
          </div>
        </div>
      </main>
    );
  }

  if (!listing) {
    return (
      <main style={{ minHeight: "100vh", background: "#0A0E1A" }}>
        <Navbar />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "70vh" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 44, marginBottom: 14 }}>🏚️</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: "white", marginBottom: 8 }}>Property not found</div>
            <div style={{ fontSize: 13, color: "#8892AA", marginBottom: 24 }}>This listing may have been removed.</div>
            <a href="/browse" style={{ padding: "12px 28px", borderRadius: 10, background: "linear-gradient(135deg,#D4A843,#A87E28)", color: "#0A0E1A", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              Browse Listings
            </a>
          </div>
        </div>
      </main>
    );
  }

  const images = listing.images?.length > 0
    ? listing.images
    : ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"];

  return (
    <main style={{ minHeight: "100vh", background: "#0A0E1A" }}>
      <Navbar />

      {/* Breadcrumb */}
      <div style={{ padding: "16px clamp(16px,5vw,60px)", fontSize: 12, color: "#8892AA", display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
        <a href="/" style={{ color: "#8892AA", textDecoration: "none" }}>Home</a>
        <span>›</span>
        <a href="/browse" style={{ color: "#8892AA", textDecoration: "none" }}>Browse</a>
        <span>›</span>
        <a href={`/browse?city=${listing.city}`} style={{ color: "#8892AA", textDecoration: "none" }}>{listing.city}</a>
        <span>›</span>
        <span style={{ color: "#D4A843" }}>{listing.title}</span>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(16px,5vw,60px) 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }} className="listing-detail-grid">

          {/* LEFT COLUMN */}
          <div>
            {/* Image gallery */}
            <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 12, position: "relative" }}>
              <img src={images[activeImage]} alt={listing.title}
                style={{ width: "100%", height: "clamp(220px,45vw,460px)", objectFit: "cover", display: "block" }} />

              {/* Badges */}
              <div style={{ position: "absolute", top: 14, left: 14, display: "flex", gap: 8 }}>
                {listing.verified && (
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 10px", borderRadius: 6, background: "rgba(212,168,67,0.9)", color: "#0A0E1A" }}>✓ Verified</span>
                )}
                {listing.is_new && (
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 10px", borderRadius: 6, background: "rgba(34,197,94,0.9)", color: "white" }}>New</span>
                )}
              </div>

              {/* Image counter */}
              {images.length > 1 && (
                <div style={{ position: "absolute", bottom: 14, right: 14, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", borderRadius: 8, padding: "5px 12px", fontSize: 12, color: "white", fontWeight: 600 }}>
                  {activeImage + 1} / {images.length}
                </div>
              )}

              {/* Nav arrows */}
              {images.length > 1 && (
                <>
                  <button onClick={() => setActiveImage(i => Math.max(0, i - 1))} disabled={activeImage === 0}
                    style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: "none", color: "white", fontSize: 16, cursor: "pointer", opacity: activeImage === 0 ? 0.3 : 1 }}>‹</button>
                  <button onClick={() => setActiveImage(i => Math.min(images.length - 1, i + 1))} disabled={activeImage === images.length - 1}
                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: "none", color: "white", fontSize: 16, cursor: "pointer", opacity: activeImage === images.length - 1 ? 0.3 : 1 }}>›</button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div style={{ display: "flex", gap: 8, marginBottom: 24, overflowX: "auto", paddingBottom: 4 }}>
                {images.map((img, i) => (
                  <img key={i} src={img} alt="" onClick={() => setActiveImage(i)}
                    style={{ width: 72, height: 52, objectFit: "cover", borderRadius: 8, cursor: "pointer", flexShrink: 0, border: `2px solid ${activeImage === i ? "#D4A843" : "transparent"}`, opacity: activeImage === i ? 1 : 0.6, transition: "all 0.2s" }} />
                ))}
              </div>
            )}

            {/* Title + price */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
                <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, color: "white", lineHeight: 1.2 }}>{listing.title}</h1>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: "#D4A843", whiteSpace: "nowrap" }}>
                  KSh {listing.price.toLocaleString()}<span style={{ fontSize: 13, color: "#8892AA", fontFamily: "'Outfit',sans-serif" }}>/mo</span>
                </div>
              </div>
              <div style={{ fontSize: 14, color: "#8892AA", marginBottom: 10 }}>📍 {listing.neighbourhood}, {listing.city}</div>
              {(listing.rating || 0) > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#D4A843", fontSize: 14 }}><Stars rating={listing.rating || 0} /></span>
                  <span style={{ fontSize: 13, color: "#8892AA" }}>{listing.rating} · {listing.reviews} review{listing.reviews !== 1 ? "s" : ""}</span>
                </div>
              )}
            </div>

            {/* Specs */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: 12, marginBottom: 28 }}>
              {[
                { icon: "🛏", label: "Bedrooms", value: `${listing.beds} Bed${listing.beds > 1 ? "s" : ""}` },
                { icon: "🚿", label: "Bathrooms", value: `${listing.baths} Bath${listing.baths > 1 ? "s" : ""}` },
                { icon: "🏠", label: "Type", value: listing.type },
                ...(listing.sqft ? [{ icon: "📐", label: "Size", value: `${listing.sqft} m²` }] : []),
              ].map(spec => (
                <div key={spec.label} style={{ background: "#141829", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "14px 16px" }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{spec.icon}</div>
                  <div style={{ fontSize: 11, color: "#8892AA", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>{spec.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "white" }}>{spec.value}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            {listing.description && (
              <div style={{ marginBottom: 28 }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700, color: "white", marginBottom: 12 }}>About this property</h2>
                <p style={{ fontSize: 14, color: "#8892AA", lineHeight: 1.85 }}>{listing.description}</p>
              </div>
            )}

            {/* Amenities */}
            {listing.amenities?.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700, color: "white", marginBottom: 16 }}>Amenities</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 10 }}>
                  {listing.amenities.map(a => (
                    <div key={a} style={{ display: "flex", alignItems: "center", gap: 10, background: "#141829", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "11px 14px" }}>
                      <span style={{ fontSize: 18 }}>{AMENITY_ICONS[a] || "✓"}</span>
                      <span style={{ fontSize: 13, color: "#B4BECE", fontWeight: 500, textTransform: "capitalize" }}>{a.replace("-", " ")}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700, color: "white", marginBottom: 16 }}>Location</h2>
              <div style={{ background: "#141829", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "20px", display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ fontSize: 36 }}>📍</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "white", marginBottom: 4 }}>{listing.neighbourhood}</div>
                  <div style={{ fontSize: 13, color: "#8892AA" }}>{listing.city}, Kenya</div>
                </div>
                <a href={`https://www.google.com/maps/search/${encodeURIComponent(`${listing.neighbourhood} ${listing.city} Kenya`)}`}
                  target="_blank" rel="noreferrer"
                  style={{ marginLeft: "auto", padding: "9px 18px", borderRadius: 9, background: "rgba(212,168,67,0.1)", color: "#D4A843", border: "1px solid rgba(212,168,67,0.25)", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
                  View on Maps →
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — sticky contact card */}
          <div style={{ position: "sticky", top: 76 }}>
            <div style={{ background: "#141829", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "24px", marginBottom: 14 }}>

              {/* Price */}
              <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 700, color: "#D4A843" }}>
                  KSh {listing.price.toLocaleString()}
                </div>
                <div style={{ fontSize: 13, color: "#8892AA" }}>per month</div>
              </div>

              {/* Landlord */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#D4A843,#A87E28)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#0A0E1A", flexShrink: 0 }}>
                  {(listing.landlord?.full_name || "L")[0].toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "white" }}>{listing.landlord?.full_name || "Landlord"}</div>
                  <div style={{ fontSize: 12, color: "#8892AA" }}>
                    {listing.landlord?.verified ? "✓ Verified Landlord" : "Landlord"}
                  </div>
                  {(listing.landlord?.trust_score || 0) > 0 && (
                    <div style={{ fontSize: 12, color: "#D4A843", marginTop: 2 }}>
                      ★ {listing.landlord?.trust_score} · {listing.landlord?.total_reviews} reviews
                    </div>
                  )}
                </div>
              </div>

              {/* CTA buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href={`https://wa.me/254${listing.landlord?.phone?.replace(/^0/, "")}?text=Hi ${listing.landlord?.full_name}, I saw your listing on Edira: "${listing.title}" (${listing.neighbourhood}, ${listing.city}) at KSh ${listing.price.toLocaleString()}/mo. Is it still available?`}
                  target="_blank" rel="noreferrer"
                  style={{ background: "#25D366", color: "white", padding: "14px", borderRadius: 11, fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none" }}>
                  💬 WhatsApp Landlord
                </a>
                <a href={`tel:${listing.landlord?.phone}`}
                  style={{ background: "rgba(255,255,255,0.05)", color: "white", padding: "13px", borderRadius: 11, fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.1)" }}>
                  📞 Call {listing.landlord?.phone}
                </a>
              </div>

              {/* Safety notice */}
              <div style={{ marginTop: 16, padding: "12px 14px", background: "rgba(212,168,67,0.06)", border: "1px solid rgba(212,168,67,0.15)", borderRadius: 10, fontSize: 12, color: "#8892AA", lineHeight: 1.6 }}>
                🛡️ <strong style={{ color: "#D4A843" }}>Safety tip:</strong> Always visit the property before paying any deposit. Never send money without viewing.
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setSaved(!saved)}
                style={{ flex: 1, padding: "12px", borderRadius: 11, background: saved ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.04)", color: saved ? "#EF4444" : "#8892AA", border: `1.5px solid ${saved ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.1)"}`, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit',sans-serif", transition: "all 0.2s" }}>
                {saved ? "❤️ Saved" : "🤍 Save"}
              </button>
              <button onClick={handleShare}
                style={{ flex: 1, padding: "12px", borderRadius: 11, background: copied ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.04)", color: copied ? "#22C55E" : "#8892AA", border: `1.5px solid ${copied ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.1)"}`, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit',sans-serif", transition: "all 0.2s" }}>
                {copied ? "✓ Copied!" : "🔗 Share"}
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 0, marginTop: 14, background: "#141829", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, overflow: "hidden" }}>
              {[
                { label: "Views", value: (listing.views || 0) + 1 },
                { label: "Inquiries", value: listing.inquiries || 0 },
              ].map((s, i) => (
                <div key={s.label} style={{ flex: 1, padding: "14px", textAlign: "center", borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700, color: "white" }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#8892AA", textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Similar listings */}
        <div style={{ marginTop: 52 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 700, color: "white", marginBottom: 8 }}>
            More in <span style={{ color: "#D4A843", fontStyle: "italic" }}>{listing.city}</span>
          </h2>
          <p style={{ fontSize: 13, color: "#8892AA", marginBottom: 24 }}>Other properties you might like</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 18 }}>
            {FALLBACK_LISTINGS.filter(l => l.city === listing.city && l.id !== listing.id).slice(0, 3).map(l => (
              <a key={l.id} href={`/listings/${l.id}`} style={{ textDecoration: "none" }}>
                <div style={{ background: "#141829", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, overflow: "hidden", transition: "transform 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
                  <img src={l.images[0]} alt={l.title} style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }} />
                  <div style={{ padding: "14px" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 700, color: "#D4A843" }}>KSh {l.price.toLocaleString()}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "white", marginBottom: 3 }}>{l.title}</div>
                    <div style={{ fontSize: 12, color: "#8892AA" }}>📍 {l.neighbourhood}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .listing-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}