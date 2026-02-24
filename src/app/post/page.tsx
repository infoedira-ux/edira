"use client";

import { useState, useRef } from "react";
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

function validatePhone(phone: string) {
  const cleaned = phone.replace(/\s/g, "");
  return /^(0[17]\d{8}|254[17]\d{8})$/.test(cleaned);
}

function validatePrice(price: string) {
  const n = Number(price);
  return n >= 1000 && n <= 500000;
}

export default function PostPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [images, setImages] = useState<{ file: File; preview: string; url?: string }[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "", city: "" as City | "", neighbourhood: "",
    type: "" as ListingType | "", price: "", beds: "1", baths: "1",
    sqft: "", description: "", phone: "", amenities: [] as Amenity[],
  });

  const update = (k: string, v: any) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: "" }));
  };

  const toggleAmenity = (a: Amenity) => {
    setForm(f => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter(x => x !== a) : [...f.amenities, a],
    }));
  };

  const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 8) {
      setErrors(er => ({ ...er, images: "Maximum 8 photos allowed" }));
      return;
    }
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages(prev => [...prev, ...newImages]);
    setErrors(er => ({ ...er, images: "" }));
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!form.title.trim() || form.title.length < 5) newErrors.title = "Title must be at least 5 characters";
    if (!form.city) newErrors.city = "Please select a city";
    if (!form.type) newErrors.type = "Please select a property type";
    if (!form.neighbourhood.trim()) newErrors.neighbourhood = "Neighbourhood is required";
    if (!validatePrice(form.price)) newErrors.price = "Enter a valid rent between KSh 1,000 and 500,000";
    if (form.description && form.description.length < 20) newErrors.description = "Description must be at least 20 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!validatePhone(form.phone)) newErrors.phone = "Enter a valid Kenyan number e.g. 0712345678";
    if (images.length === 0) newErrors.images = "Please upload at least 1 photo";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadImages = async (userId: string) => {
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const urls: string[] = [];
    for (const img of images) {
      const ext = img.file.name.split(".").pop();
      const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("listing-images").upload(path, img.file, { cacheControl: "3600", upsert: false });
      if (!error) {
        const { data } = supabase.storage.from("listing-images").getPublicUrl(path);
        urls.push(data.publicUrl);
      }
    }
    return urls;
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setLoading(true);
    setUploading(true);
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/auth/login"; return; }

      const imageUrls = await uploadImages(user.id);
      setUploading(false);

      // Update phone in profile
      await supabase.from("profiles").update({ phone: form.phone }).eq("id", user.id);

      const { error } = await supabase.from("listings").insert({
        landlord_id: user.id,
        title: form.title.trim(),
        description: form.description.trim(),
        city: form.city,
        neighbourhood: form.neighbourhood.trim(),
        type: form.type,
        price: Number(form.price),
        beds: Number(form.beds),
        baths: Number(form.baths),
        sqft: form.sqft ? Number(form.sqft) : null,
        amenities: form.amenities,
        images: imageUrls,
        status: "active",
      });

      if (error) { setErrors({ submit: error.message }); setLoading(false); return; }
      setSubmitted(true);
    } catch (err) {
      setErrors({ submit: "Something went wrong. Please try again." });
    }
    setLoading(false);
  };

  // Styles
  const input = (hasError: boolean) => ({
    width: "100%", padding: "13px 16px", borderRadius: 10,
    background: "#1E2436",
    border: `1.5px solid ${hasError ? "#EF4444" : "rgba(255,255,255,0.08)"}`,
    color: "white", fontSize: 14, fontFamily: "'Outfit',sans-serif",
    outline: "none", boxSizing: "border-box" as const,
    transition: "border-color 0.2s",
  });

  const label = {
    fontSize: 12, fontWeight: 600, color: "#8892AA",
    textTransform: "uppercase" as const, letterSpacing: 1,
    marginBottom: 6, display: "block",
  };

  const errorMsg = (msg: string) => msg ? (
    <div style={{ fontSize: 11, color: "#EF4444", marginTop: 5 }}>⚠ {msg}</div>
  ) : null;

  if (submitted) {
    return (
      <main style={{ minHeight: "100vh", background: "#0A0E1A" }}>
        <Navbar />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", textAlign: "center", padding: "0 24px" }}>
          <div style={{ fontSize: 72, marginBottom: 24 }}>🎉</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, fontWeight: 700, color: "white", marginBottom: 12 }}>
            Listing <span style={{ color: "#D4A843", fontStyle: "italic" }}>live!</span>
          </h2>
          <p style={{ fontSize: 15, color: "#8892AA", maxWidth: 380, lineHeight: 1.8, marginBottom: 36 }}>
            Your property is now visible to tenants across Kenya.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <a href="/browse" style={{ padding: "13px 28px", borderRadius: 10, background: "linear-gradient(135deg,#D4A843,#A87E28)", color: "#0A0E1A", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Browse Listings</a>
            <a href="/dashboard" style={{ padding: "13px 28px", borderRadius: 10, background: "transparent", color: "#B4BECE", border: "1.5px solid rgba(255,255,255,0.1)", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>My Dashboard</a>
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
      <div style={{ padding: "40px 24px 28px", textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#D4A843", marginBottom: 8 }}>Free Listing</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(32px,6vw,48px)", fontWeight: 700, color: "white", marginBottom: 8 }}>
          Post your <span style={{ color: "#D4A843", fontStyle: "italic" }}>property</span>
        </h1>
        <p style={{ fontSize: 14, color: "#8892AA" }}>No commissions. No fees. Real tenants.</p>
      </div>

      {/* Step indicator */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, marginBottom: 32, padding: "0 24px" }}>
        {[1, 2, 3].map(s => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 30, height: 30, borderRadius: "50%", fontSize: 13, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: step >= s ? "linear-gradient(135deg,#D4A843,#A87E28)" : "rgba(255,255,255,0.06)",
              color: step >= s ? "#0A0E1A" : "#8892AA", transition: "all 0.3s",
            }}>{step > s ? "✓" : s}</div>
            <span style={{ fontSize: 11, color: step >= s ? "#D4A843" : "#8892AA", fontWeight: step === s ? 600 : 400, display: "none" }}>
              {s === 1 ? "Details" : s === 2 ? "Amenities" : "Photos & Contact"}
            </span>
            {s < 3 && <div style={{ width: 32, height: 1, background: step > s ? "#D4A843" : "rgba(255,255,255,0.1)" }} />}
          </div>
        ))}
      </div>

      {/* Form */}
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 16px 80px" }}>
        <div style={{ background: "#141829", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "clamp(20px,5vw,36px)" }}>

          {errors.submit && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#EF4444", marginBottom: 20 }}>
              ⚠ {errors.submit}
            </div>
          )}

          {/* STEP 1 — Property Details */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={label}>Listing Title *</label>
                <input value={form.title} onChange={e => update("title", e.target.value)}
                  placeholder="e.g. Modern 2BR Apartment in Westlands"
                  style={input(!!errors.title)} maxLength={80} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {errorMsg(errors.title)}
                  <span style={{ fontSize: 11, color: "#8892AA", marginLeft: "auto", marginTop: 4 }}>{form.title.length}/80</span>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={label}>City *</label>
                  <select value={form.city} onChange={e => update("city", e.target.value)} style={{ ...input(!!errors.city), cursor: "pointer" }}>
                    <option value="">Select city</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errorMsg(errors.city)}
                </div>
                <div>
                  <label style={label}>Property Type *</label>
                  <select value={form.type} onChange={e => update("type", e.target.value)} style={{ ...input(!!errors.type), cursor: "pointer" }}>
                    <option value="">Select type</option>
                    {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errorMsg(errors.type)}
                </div>
              </div>

              <div>
                <label style={label}>Neighbourhood *</label>
                <input value={form.neighbourhood} onChange={e => update("neighbourhood", e.target.value)}
                  placeholder="e.g. Westlands, Kilimani, Nyali..."
                  style={input(!!errors.neighbourhood)} />
                {errorMsg(errors.neighbourhood)}
              </div>

              <div>
                <label style={label}>Monthly Rent (KSh) *</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "#8892AA", fontWeight: 600 }}>KSh</span>
                  <input type="number" value={form.price} onChange={e => update("price", e.target.value)}
                    placeholder="e.g. 35000" min={1000} max={500000}
                    style={{ ...input(!!errors.price), paddingLeft: 52 }} />
                </div>
                {errorMsg(errors.price)}
                {form.price && !errors.price && Number(form.price) >= 1000 && (
                  <div style={{ fontSize: 11, color: "#22C55E", marginTop: 4 }}>✓ KSh {Number(form.price).toLocaleString()} per month</div>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <div>
                  <label style={label}>Beds</label>
                  <select value={form.beds} onChange={e => update("beds", e.target.value)} style={{ ...input(false), cursor: "pointer" }}>
                    {["1","2","3","4","5+"].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label style={label}>Baths</label>
                  <select value={form.baths} onChange={e => update("baths", e.target.value)} style={{ ...input(false), cursor: "pointer" }}>
                    {["1","2","3","4+"].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label style={label}>Size (m²)</label>
                  <input type="number" value={form.sqft} onChange={e => update("sqft", e.target.value)}
                    placeholder="80" min={10} max={2000}
                    style={input(false)} />
                </div>
              </div>

              <div>
                <label style={label}>Description</label>
                <textarea value={form.description} onChange={e => update("description", e.target.value)}
                  placeholder="Describe the property — nearby amenities, transport, special features... (min 20 characters)"
                  rows={4} maxLength={500}
                  style={{ ...input(!!errors.description), resize: "vertical" as const }} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {errorMsg(errors.description)}
                  <span style={{ fontSize: 11, color: "#8892AA", marginLeft: "auto", marginTop: 4 }}>{form.description.length}/500</span>
                </div>
              </div>

              <button onClick={() => { if (validateStep1()) setStep(2); }}
                style={{ padding: "14px", borderRadius: 10, background: "linear-gradient(135deg,#D4A843,#A87E28)", color: "#0A0E1A", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>
                Next: Amenities →
              </button>
            </div>
          )}

          {/* STEP 2 — Amenities */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={label}>What's available? <span style={{ color: "#8892AA", textTransform: "none", letterSpacing: 0, fontWeight: 400 }}>(select all that apply)</span></label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
                  {AMENITIES.map(a => (
                    <button key={a.key} onClick={() => toggleAmenity(a.key)}
                      style={{
                        padding: "12px 14px", borderRadius: 10, cursor: "pointer",
                        fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 500,
                        display: "flex", alignItems: "center", gap: 10, transition: "all 0.2s",
                        background: form.amenities.includes(a.key) ? "rgba(212,168,67,0.12)" : "rgba(255,255,255,0.03)",
                        border: form.amenities.includes(a.key) ? "1.5px solid rgba(212,168,67,0.4)" : "1.5px solid rgba(255,255,255,0.07)",
                        color: form.amenities.includes(a.key) ? "#D4A843" : "#8892AA",
                      }}>
                      <span style={{ fontSize: 18 }}>{a.icon}</span>
                      <span style={{ flex: 1, textAlign: "left" }}>{a.label}</span>
                      {form.amenities.includes(a.key) && <span style={{ fontSize: 14 }}>✓</span>}
                    </button>
                  ))}
                </div>
                {form.amenities.length > 0 && (
                  <div style={{ fontSize: 12, color: "#22C55E", marginTop: 10 }}>✓ {form.amenities.length} amenit{form.amenities.length === 1 ? "y" : "ies"} selected</div>
                )}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, padding: "13px", borderRadius: 10, background: "transparent", color: "#8892AA", border: "1.5px solid rgba(255,255,255,0.1)", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>← Back</button>
                <button onClick={() => setStep(3)} style={{ flex: 2, padding: "13px", borderRadius: 10, background: "linear-gradient(135deg,#D4A843,#A87E28)", color: "#0A0E1A", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>Next: Photos & Contact →</button>
              </div>
            </div>
          )}

          {/* STEP 3 — Photos & Contact */}
          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

              {/* Photo upload */}
              <div>
                <label style={label}>Property Photos * <span style={{ color: "#8892AA", textTransform: "none", letterSpacing: 0, fontWeight: 400 }}>(up to 8)</span></label>

                {/* Upload zone */}
                <div onClick={() => fileRef.current?.click()}
                  style={{ border: `2px dashed ${errors.images ? "#EF4444" : "rgba(212,168,67,0.3)"}`, borderRadius: 14, padding: "28px 20px", textAlign: "center", cursor: "pointer", background: "rgba(212,168,67,0.03)", transition: "all 0.2s", marginBottom: 12 }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(212,168,67,0.06)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(212,168,67,0.03)")}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>📸</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 4 }}>Tap to add photos</div>
                  <div style={{ fontSize: 12, color: "#8892AA" }}>JPG, PNG · Max 5MB each · Up to 8 photos</div>
                </div>
                <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleImagePick} style={{ display: "none" }} />
                {errorMsg(errors.images)}

                {/* Image previews */}
                {images.length > 0 && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginTop: 12 }}>
                    {images.map((img, i) => (
                      <div key={i} style={{ position: "relative", borderRadius: 10, overflow: "hidden", aspectRatio: "4/3" }}>
                        <img src={img.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        {i === 0 && (
                          <div style={{ position: "absolute", top: 6, left: 6, fontSize: 9, fontWeight: 700, background: "#D4A843", color: "#0A0E1A", padding: "2px 7px", borderRadius: 4, letterSpacing: 1, textTransform: "uppercase" }}>Cover</div>
                        )}
                        <button onClick={() => removeImage(i)}
                          style={{ position: "absolute", top: 5, right: 5, width: 24, height: 24, borderRadius: "50%", background: "rgba(0,0,0,0.7)", border: "none", color: "white", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Outfit',sans-serif" }}>
                          ✕
                        </button>
                      </div>
                    ))}
                    {images.length < 8 && (
                      <div onClick={() => fileRef.current?.click()}
                        style={{ borderRadius: 10, border: "2px dashed rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", aspectRatio: "4/3", cursor: "pointer", fontSize: 24, color: "#8892AA" }}>
                        +
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label style={label}>WhatsApp Number *</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "#8892AA", fontWeight: 600 }}>🇰🇪</span>
                  <input value={form.phone} onChange={e => {
                    const val = e.target.value.replace(/[^\d+]/g, "").slice(0, 13);
                    update("phone", val);
                  }}
                    placeholder="0712345678"
                    inputMode="tel"
                    style={{ ...input(!!errors.phone), paddingLeft: 42 }} />
                </div>
                {errorMsg(errors.phone)}
                {form.phone && !errors.phone && validatePhone(form.phone) && (
                  <div style={{ fontSize: 11, color: "#22C55E", marginTop: 4 }}>✓ Valid Kenyan number</div>
                )}
                <div style={{ fontSize: 11, color: "#8892AA", marginTop: 6 }}>Tenants will contact you directly via WhatsApp</div>
              </div>

              {/* Summary */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "18px 20px" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#D4A843", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Summary</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 13 }}>
                  {[
                    ["Title", form.title || "—"],
                    ["City", form.city || "—"],
                    ["Type", form.type || "—"],
                    ["Rent", form.price ? `KSh ${Number(form.price).toLocaleString()}/mo` : "—"],
                    ["Beds/Baths", `${form.beds} bed · ${form.baths} bath`],
                    ["Photos", `${images.length} uploaded`],
                    ["Amenities", `${form.amenities.length} selected`],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <div style={{ color: "#8892AA", fontSize: 11, marginBottom: 2 }}>{k}</div>
                      <div style={{ color: "white", fontWeight: 500 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(2)} style={{ flex: 1, padding: "13px", borderRadius: 10, background: "transparent", color: "#8892AA", border: "1.5px solid rgba(255,255,255,0.1)", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>← Back</button>
                <button onClick={handleSubmit} disabled={loading}
                  style={{ flex: 2, padding: "14px", borderRadius: 10, background: "linear-gradient(135deg,#D4A843,#A87E28)", color: "#0A0E1A", fontSize: 15, fontWeight: 700, border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Outfit',sans-serif", opacity: loading ? 0.7 : 1, transition: "opacity 0.2s" }}>
                  {uploading ? "⬆ Uploading photos..." : loading ? "Submitting..." : "🚀 Submit Listing"}
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