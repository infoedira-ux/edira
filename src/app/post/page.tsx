"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { City, ListingType, Amenity } from "@/types";

const CITIES: City[] = ["Nairobi", "Mombasa", "Kisumu", "Nakuru"];
const TYPES: ListingType[] = ["Bedsitter", "1 Bedroom", "2 Bedroom", "3 Bedroom", "4+ Bedroom"];
const AMENITIES: { key: Amenity; label: string; icon: string }[] = [
  { key: "wifi", label: "WiFi", icon: "📶" },
  { key: "parking", label: "Parking", icon: "🚗" },
  { key: "security", label: "Security", icon: "🔒" },
  { key: "borehole", label: "Borehole", icon: "⛲" },
  { key: "furnished", label: "Furnished", icon: "🛋" },
  { key: "gym", label: "Gym", icon: "💪" },
  { key: "pool", label: "Pool", icon: "🏊" },
  { key: "water", label: "24/7 Water", icon: "💧" },
  { key: "garden", label: "Garden", icon: "🌿" },
  { key: "ocean-view", label: "Ocean View", icon: "🌊" },
];

export default function PostPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "", city: "" as City | "", neighbourhood: "", address: "",
    type: "" as ListingType | "", price: "", beds: "1", baths: "1",
    sqft: "", description: "", phone: "", amenities: [] as Amenity[],
  });

  const update = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  const toggleAmenity = (a: Amenity) => {
    setForm(f => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter(x => x !== a) : [...f.amenities, a],
    }));
  };

  const inputStyle = {
    width: "100%", padding: "13px 16px", borderRadius: 10,
    background: "#1E2436", border: "1.5px solid rgba(255,255,255,0.08)",
    color: "white", fontSize: 14, fontFamily: "'Outfit',sans-serif",
    outline: "none", boxSizing: "border-box" as const,
  };

  const labelStyle = { fontSize: 12, fontWeight: 600, color: "#8892AA", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 8, display: "block" };

  if (submitted) {
    return (
      <main style={{ minHeight: "100vh", background: "#0A0E1A" }}>
        <Navbar />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", textAlign: "center", padding: "0 24px" }}>
          <div style={{ fontSize: 72, marginBottom: 24 }}>🎉</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 44, fontWeight: 700, color: "white", marginBottom: 12 }}>
            Listing <span style={{ color: "#D4A843", fontStyle: "italic" }}>submitted!</span>
          </h2>
          <p style={{ fontSize: 15, color: "#8892AA", maxWidth: 420, lineHeight: 1.8, marginBottom: 36 }}>
            Your property is under review. Once verified, it will appear live on Edira within 24 hours.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="/browse" style={{ padding: "13px 28px", borderRadius: 10, background: "linear-gradient(135deg,#D4A843,#A87E28)", color: "#0A0E1A", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              Browse Listings
            </a>
            <button onClick={() => { setSubmitted(false); setStep(1); setForm({ title: "", city: "", neighbourhood: "", address: "", type: "", price: "", beds: "1", baths: "1", sqft: "", description: "", phone: "", amenities: [] }); }}
              style={{ padding: "13px 28px", borderRadius: 10, background: "transparent", color: "#B4BECE", border: "1.5px solid rgba(255,255,255,0.1)", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>
              Post Another
            </button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0A0E1A" }}>
      <Navbar />

      {/* Header */}
      <div style={{ padding: "52px 60px 36px", textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#D4A843", marginBottom: 10 }}>Free Listing</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 700, color: "white", marginBottom: 12 }}>
          Post your <span style={{ color: "#D4A843", fontStyle: "italic" }}>property</span>
        </h1>
        <p style={{ fontSize: 15, color: "#8892AA" }}>No commissions. No fees. Just real tenants.</p>
      </div>

      {/* Step indicator */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 40 }}>
        {[1, 2, 3].map(s => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", fontSize: 13, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: step >= s ? "linear-gradient(135deg,#D4A843,#A87E28)" : "rgba(255,255,255,0.06)",
              color: step >= s ? "#0A0E1A" : "#8892AA",
              border: step === s ? "2px solid #D4A843" : "none",
              transition: "all 0.3s",
            }}>{s}</div>
            <span style={{ fontSize: 12, color: step >= s ? "#D4A843" : "#8892AA", fontWeight: step === s ? 600 : 400 }}>
              {s === 1 ? "Property Details" : s === 2 ? "Amenities" : "Contact"}
            </span>
            {s < 3 && <div style={{ width: 40, height: 1, background: step > s ? "#D4A843" : "rgba(255,255,255,0.1)" }} />}
          </div>
        ))}
      </div>

      {/* Form */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ background: "#141829", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "36px 40px" }}>

          {/* Step 1 */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div>
                <label style={labelStyle}>Listing Title</label>
                <input value={form.title} onChange={e => update("title", e.target.value)} placeholder="e.g. Modern 2BR in Westlands" style={inputStyle} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={labelStyle}>City</label>
                  <select value={form.city} onChange={e => update("city", e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="">Select city</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Property Type</label>
                  <select value={form.type} onChange={e => update("type", e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="">Select type</option>
                    {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Neighbourhood</label>
                  <input value={form.neighbourhood} onChange={e => update("neighbourhood", e.target.value)} placeholder="e.g. Westlands" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Monthly Rent (KSh)</label>
                  <input type="number" value={form.price} onChange={e => update("price", e.target.value)} placeholder="e.g. 35000" style={inputStyle} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Bedrooms</label>
                  <select value={form.beds} onChange={e => update("beds", e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                    {["1","2","3","4","5+"].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Bathrooms</label>
                  <select value={form.baths} onChange={e => update("baths", e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                    {["1","2","3","4+"].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Size (m²)</label>
                  <input type="number" value={form.sqft} onChange={e => update("sqft", e.target.value)} placeholder="e.g. 80" style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Description</label>
                <textarea value={form.description} onChange={e => update("description", e.target.value)} placeholder="Describe the property — location, features, nearby amenities..." rows={4}
                  style={{ ...inputStyle, resize: "vertical" as const }} />
              </div>
              <button onClick={() => setStep(2)} disabled={!form.title || !form.city || !form.type || !form.price}
                style={{ padding: "14px", borderRadius: 10, background: "linear-gradient(135deg,#D4A843,#A87E28)", color: "#0A0E1A", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'Outfit',sans-serif", opacity: (!form.title || !form.city || !form.type || !form.price) ? 0.5 : 1, transition: "opacity 0.2s" }}>
                Next: Amenities →
              </button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <label style={labelStyle}>Select Amenities</label>
                <p style={{ fontSize: 13, color: "#8892AA", marginBottom: 18 }}>Choose everything available in the property.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
                  {AMENITIES.map(a => (
                    <button key={a.key} onClick={() => toggleAmenity(a.key)}
                      style={{
                        padding: "13px 16px", borderRadius: 10, cursor: "pointer",
                        fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 500,
                        display: "flex", alignItems: "center", gap: 10, transition: "all 0.2s",
                        background: form.amenities.includes(a.key) ? "rgba(212,168,67,0.12)" : "rgba(255,255,255,0.03)",
                        border: form.amenities.includes(a.key) ? "1.5px solid rgba(212,168,67,0.4)" : "1.5px solid rgba(255,255,255,0.07)",
                        color: form.amenities.includes(a.key) ? "#D4A843" : "#8892AA",
                      }}>
                      <span style={{ fontSize: 18 }}>{a.icon}</span>
                      {a.label}
                      {form.amenities.includes(a.key) && <span style={{ marginLeft: "auto", fontSize: 14 }}>✓</span>}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, padding: "13px", borderRadius: 10, background: "transparent", color: "#8892AA", border: "1.5px solid rgba(255,255,255,0.1)", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>
                  ← Back
                </button>
                <button onClick={() => setStep(3)} style={{ flex: 2, padding: "13px", borderRadius: 10, background: "linear-gradient(135deg,#D4A843,#A87E28)", color: "#0A0E1A", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>
                  Next: Contact →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div>
                <label style={labelStyle}>Your WhatsApp Number</label>
                <input value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="e.g. 0712345678" style={inputStyle} />
                <p style={{ fontSize: 12, color: "#8892AA", marginTop: 8 }}>Tenants will contact you directly on WhatsApp.</p>
              </div>

              {/* Summary */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px 24px" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#D4A843", marginBottom: 14, textTransform: "uppercase", letterSpacing: 1 }}>Listing Summary</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 13 }}>
                  {[
                    ["Title", form.title],
                    ["City", form.city],
                    ["Type", form.type],
                    ["Rent", `KSh ${Number(form.price).toLocaleString()}/mo`],
                    ["Beds / Baths", `${form.beds} bed · ${form.baths} bath`],
                    ["Amenities", `${form.amenities.length} selected`],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <div style={{ color: "#8892AA", marginBottom: 2 }}>{k}</div>
                      <div style={{ color: "white", fontWeight: 500 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(2)} style={{ flex: 1, padding: "13px", borderRadius: 10, background: "transparent", color: "#8892AA", border: "1.5px solid rgba(255,255,255,0.1)", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>
                  ← Back
                </button>
                <button onClick={() => setSubmitted(true)} disabled={!form.phone}
                  style={{ flex: 2, padding: "14px", borderRadius: 10, background: "linear-gradient(135deg,#D4A843,#A87E28)", color: "#0A0E1A", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'Outfit',sans-serif", opacity: !form.phone ? 0.5 : 1, transition: "opacity 0.2s" }}>
                  🚀 Submit Listing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}