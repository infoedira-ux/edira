"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface Review {
  id: string;
  reviewer_id: string;
  landlord_id: string;
  listing_id: string;
  rating: number;
  comment: string;
  created_at: string;
  reviewer?: { full_name: string };
  listing?: { title: string; city: string; neighbourhood: string };
}

const Stars = ({ rating, interactive = false, onRate }: { rating: number; interactive?: boolean; onRate?: (r: number) => void }) => (
  <div style={{ display: "flex", gap: 4 }}>
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s}
        onClick={() => interactive && onRate?.(s)}
        style={{ fontSize: interactive ? 28 : 16, cursor: interactive ? "pointer" : "default", color: s <= rating ? "#D4A843" : "rgba(255,255,255,0.15)", transition: "color 0.15s" }}>
        ★
      </span>
    ))}
  </div>
);

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ listing_id: "", rating: 0, comment: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const init = async () => {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();

        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        // Fetch reviews
        const { data: reviewData } = await supabase
          .from("reviews")
          .select("*, reviewer:profiles!reviewer_id(full_name), listing:listings(title,city,neighbourhood)")
          .order("created_at", { ascending: false });
        if (reviewData) setReviews(reviewData);

        // Fetch user's listings they've inquired about (for review form)
        if (user) {
          const { data: listingData } = await supabase
            .from("listings")
            .select("id, title, city, neighbourhood")
            .eq("status", "active")
            .limit(50);
          if (listingData) setListings(listingData);
        }
      } catch {}
      setLoading(false);
    };
    init();
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.listing_id) e.listing_id = "Please select a property";
    if (form.rating === 0) e.rating = "Please select a rating";
    if (!form.comment.trim() || form.comment.length < 10) e.comment = "Comment must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/auth/login"; return; }

      // Get landlord_id from listing
      const { data: listing } = await supabase
        .from("listings")
        .select("landlord_id")
        .eq("id", form.listing_id)
        .single();

      if (!listing) { setErrors({ submit: "Listing not found" }); setSubmitting(false); return; }

      const { error } = await supabase.from("reviews").insert({
        reviewer_id: user.id,
        landlord_id: listing.landlord_id,
        listing_id: form.listing_id,
        rating: form.rating,
        comment: form.comment.trim(),
      });

      if (error) { setErrors({ submit: error.message }); setSubmitting(false); return; }

      setSuccess(true);
      setShowForm(false);
      setForm({ listing_id: "", rating: 0, comment: "" });

      // Refresh reviews
      const { data: reviewData } = await supabase
        .from("reviews")
        .select("*, reviewer:profiles!reviewer_id(full_name), listing:listings(title,city,neighbourhood)")
        .order("created_at", { ascending: false });
      if (reviewData) setReviews(reviewData);
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." });
    }
    setSubmitting(false);
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "—";

  return (
    <main style={{ minHeight: "100vh", background: "#0A0E1A" }}>
      <Navbar />

      {/* Header */}
      <div style={{ padding: "clamp(32px,6vw,56px) clamp(16px,5vw,60px) 32px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#D4A843", marginBottom: 8 }}>Community</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,5vw,44px)", fontWeight: 700, color: "white", marginBottom: 8 }}>
              Landlord <span style={{ color: "#D4A843", fontStyle: "italic" }}>Reviews</span>
            </h1>
            <p style={{ fontSize: 14, color: "#8892AA" }}>Real experiences from real tenants across Kenya.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, fontWeight: 700, color: "#D4A843" }}>{avgRating}</div>
              <div style={{ fontSize: 11, color: "#8892AA", textTransform: "uppercase", letterSpacing: 1 }}>Avg Rating</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, fontWeight: 700, color: "white" }}>{reviews.length}</div>
              <div style={{ fontSize: 11, color: "#8892AA", textTransform: "uppercase", letterSpacing: 1 }}>Reviews</div>
            </div>
            {user && (
              <button onClick={() => setShowForm(!showForm)}
                style={{ padding: "12px 24px", borderRadius: 10, background: "linear-gradient(135deg,#D4A843,#A87E28)", color: "#0A0E1A", fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>
                + Write Review
              </button>
            )}
            {!user && (
              <a href="/auth/login" style={{ padding: "12px 24px", borderRadius: 10, background: "linear-gradient(135deg,#D4A843,#A87E28)", color: "#0A0E1A", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                Sign In to Review
              </a>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px clamp(16px,5vw,60px) 80px" }}>

        {/* Success banner */}
        {success && (
          <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 12, padding: "14px 18px", fontSize: 14, color: "#22C55E", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
            ✓ Your review has been submitted! Thank you for helping the community.
          </div>
        )}

        {/* Review form */}
        {showForm && (
          <div style={{ background: "#141829", border: "1px solid rgba(212,168,67,0.2)", borderRadius: 16, padding: "24px", marginBottom: 32, animation: "fadeUp 0.3s ease both" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700, color: "white", marginBottom: 20 }}>Write a Review</h2>

            {errors.submit && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#EF4444", marginBottom: 16 }}>
                ⚠ {errors.submit}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {/* Property selector */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#8892AA", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, display: "block" }}>Property *</label>
                <select value={form.listing_id} onChange={e => { setForm(f => ({ ...f, listing_id: e.target.value })); setErrors(er => ({ ...er, listing_id: "" })); }}
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 10, background: "#1E2436", border: `1.5px solid ${errors.listing_id ? "#EF4444" : "rgba(255,255,255,0.08)"}`, color: form.listing_id ? "white" : "#8892AA", fontSize: 14, fontFamily: "'Outfit',sans-serif", outline: "none" }}>
                  <option value="">Select a property you rented or visited</option>
                  {listings.map(l => (
                    <option key={l.id} value={l.id}>{l.title} — {l.neighbourhood}, {l.city}</option>
                  ))}
                </select>
                {errors.listing_id && <div style={{ fontSize: 11, color: "#EF4444", marginTop: 4 }}>⚠ {errors.listing_id}</div>}
              </div>

              {/* Star rating */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#8892AA", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, display: "block" }}>Rating *</label>
                <Stars rating={form.rating} interactive onRate={r => { setForm(f => ({ ...f, rating: r })); setErrors(er => ({ ...er, rating: "" })); }} />
                {form.rating > 0 && (
                  <div style={{ fontSize: 12, color: "#D4A843", marginTop: 6 }}>
                    {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][form.rating]}
                  </div>
                )}
                {errors.rating && <div style={{ fontSize: 11, color: "#EF4444", marginTop: 4 }}>⚠ {errors.rating}</div>}
              </div>

              {/* Comment */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#8892AA", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, display: "block" }}>Your Experience *</label>
                <textarea value={form.comment} onChange={e => { setForm(f => ({ ...f, comment: e.target.value })); setErrors(er => ({ ...er, comment: "" })); }}
                  placeholder="Describe your experience with this landlord and property... (min 10 characters)"
                  rows={4} maxLength={500}
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 10, background: "#1E2436", border: `1.5px solid ${errors.comment ? "#EF4444" : "rgba(255,255,255,0.08)"}`, color: "white", fontSize: 14, fontFamily: "'Outfit',sans-serif", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {errors.comment && <div style={{ fontSize: 11, color: "#EF4444", marginTop: 4 }}>⚠ {errors.comment}</div>}
                  <span style={{ fontSize: 11, color: "#8892AA", marginLeft: "auto", marginTop: 4 }}>{form.comment.length}/500</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setShowForm(false)}
                  style={{ flex: 1, padding: "12px", borderRadius: 10, background: "transparent", color: "#8892AA", border: "1.5px solid rgba(255,255,255,0.1)", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>
                  Cancel
                </button>
                <button onClick={handleSubmit} disabled={submitting}
                  style={{ flex: 2, padding: "13px", borderRadius: 10, background: "linear-gradient(135deg,#D4A843,#A87E28)", color: "#0A0E1A", fontSize: 14, fontWeight: 700, border: "none", cursor: submitting ? "not-allowed" : "pointer", fontFamily: "'Outfit',sans-serif", opacity: submitting ? 0.7 : 1 }}>
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reviews list */}
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ height: 140, borderRadius: 14, background: "#141829", animation: "pulse 1.5s ease infinite" }} />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⭐</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "white", marginBottom: 8 }}>No reviews yet</div>
            <div style={{ fontSize: 13, color: "#8892AA" }}>Be the first to review a landlord on Edira</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {reviews.map((r, i) => (
              <div key={r.id} style={{ background: "#141829", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "20px 22px", animation: `fadeUp 0.4s ease ${i * 0.06}s both` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#D4A843,#A87E28)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#0A0E1A", flexShrink: 0 }}>
                      {(r.reviewer?.full_name || "A")[0].toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "white" }}>{r.reviewer?.full_name || "Anonymous"}</div>
                      <div style={{ fontSize: 11, color: "#8892AA" }}>
                        {r.listing?.title && `${r.listing.title} · `}
                        {new Date(r.created_at).toLocaleDateString("en-KE", { month: "short", year: "numeric" })}
                      </div>
                    </div>
                  </div>
                  <Stars rating={r.rating} />
                </div>
                <p style={{ fontSize: 14, color: "#B4BECE", lineHeight: 1.7, margin: 0 }}>{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}