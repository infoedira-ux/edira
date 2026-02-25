"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email is required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim() || form.message.length < 10) e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    // Simulate sending — replace with real email API later
    await new Promise(r => setTimeout(r, 1200));
    setSubmitted(true);
    setLoading(false);
  };

  const inputStyle = (hasError: boolean) => ({
    width: "100%", padding: "13px 16px", borderRadius: 10,
    background: "#1E2436",
    border: `1.5px solid ${hasError ? "#EF4444" : "rgba(255,255,255,0.08)"}`,
    color: "white", fontSize: 14, fontFamily: "'Outfit',sans-serif",
    outline: "none", boxSizing: "border-box" as const,
  });

  const labelStyle = {
    fontSize: 12, fontWeight: 600 as const, color: "#8892AA",
    textTransform: "uppercase" as const, letterSpacing: 1,
    marginBottom: 6, display: "block",
  };

  return (
    <main style={{ minHeight: "100vh", background: "#0A0E1A" }}>
      <Navbar />
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "clamp(40px,8vw,72px) clamp(16px,5vw,40px) 80px" }}>

        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#D4A843", marginBottom: 10 }}>Get in Touch</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(32px,5vw,48px)", fontWeight: 700, color: "white", marginBottom: 8 }}>
          Contact <span style={{ color: "#D4A843", fontStyle: "italic" }}>Us</span>
        </h1>
        <p style={{ fontSize: 14, color: "#8892AA", marginBottom: 40, lineHeight: 1.7 }}>
          Have a question, spotted a scam listing, or want to partner with us? We'd love to hear from you.
        </p>

        {/* Contact cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 40 }}>
          {[
            { icon: "📧", label: "Email", value: "info.edira@gmail.com", href: "mailto:info.edira@gmail.com" },
            { icon: "💬", label: "WhatsApp", value: "+254 715848222", href: "https://wa.me/254715848222" },
            { icon: "🐦", label: "Twitter", value: "@Edira21", href: "https://twitter.com/Edira21" },
            { icon: "📍", label: "Location", value: "Nairobi, Kenya", href: "#" },
          ].map(c => (
            <a key={c.label} href={c.href} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
              <div style={{ background: "#141829", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "16px 18px", transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(212,168,67,0.3)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
                <div style={{ fontSize: 11, color: "#8892AA", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>{c.label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "white" }}>{c.value}</div>
              </div>
            </a>
          ))}
        </div>

        {submitted ? (
          <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 16, padding: "40px", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: "white", marginBottom: 8 }}>Message sent!</div>
            <div style={{ fontSize: 14, color: "#8892AA" }}>We'll get back to you within 24 hours.</div>
          </div>
        ) : (
          <div style={{ background: "#141829", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700, color: "white", marginBottom: 22 }}>Send a Message</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={labelStyle}>Name *</label>
                  <input value={form.name} onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: "" })); }}
                    placeholder="Your name" style={inputStyle(!!errors.name)} />
                  {errors.name && <div style={{ fontSize: 11, color: "#EF4444", marginTop: 4 }}>⚠ {errors.name}</div>}
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input type="email" value={form.email} onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: "" })); }}
                    placeholder="your@email.com" style={inputStyle(!!errors.email)} />
                  {errors.email && <div style={{ fontSize: 11, color: "#EF4444", marginTop: 4 }}>⚠ {errors.email}</div>}
                </div>
              </div>
              <div>
                <label style={labelStyle}>Subject *</label>
                <input value={form.subject} onChange={e => { setForm(f => ({ ...f, subject: e.target.value })); setErrors(er => ({ ...er, subject: "" })); }}
                  placeholder="What's this about?" style={inputStyle(!!errors.subject)} />
                {errors.subject && <div style={{ fontSize: 11, color: "#EF4444", marginTop: 4 }}>⚠ {errors.subject}</div>}
              </div>
              <div>
                <label style={labelStyle}>Message *</label>
                <textarea value={form.message} onChange={e => { setForm(f => ({ ...f, message: e.target.value })); setErrors(er => ({ ...er, message: "" })); }}
                  placeholder="Tell us more..." rows={5} maxLength={1000}
                  style={{ ...inputStyle(!!errors.message), resize: "vertical" }} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {errors.message && <div style={{ fontSize: 11, color: "#EF4444", marginTop: 4 }}>⚠ {errors.message}</div>}
                  <span style={{ fontSize: 11, color: "#8892AA", marginLeft: "auto", marginTop: 4 }}>{form.message.length}/1000</span>
                </div>
              </div>
              <button onClick={handleSubmit} disabled={loading}
                style={{ padding: "14px", borderRadius: 10, background: "linear-gradient(135deg,#D4A843,#A87E28)", color: "#0A0E1A", fontSize: 15, fontWeight: 700, border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Outfit',sans-serif", opacity: loading ? 0.7 : 1 }}>
                {loading ? "Sending..." : "Send Message →"}
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}