"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", role: "tenant" as "tenant" | "landlord" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) { setError("Please fill in all required fields."); return; }
    setLoading(true);
    setError("");
    setTimeout(() => { setLoading(false); setError("Supabase not connected yet — coming soon!"); }, 1000);
  };

  const inputStyle = {
    width: "100%", padding: "13px 16px", borderRadius: 10,
    background: "#1E2436", border: "1.5px solid rgba(255,255,255,0.08)",
    color: "white", fontSize: 14, fontFamily: "'Outfit',sans-serif",
    outline: "none", boxSizing: "border-box" as const,
  };

  return (
    <main style={{ minHeight: "100vh", background: "#0A0E1A" }}>
      <Navbar />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "85vh", padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: 460 }}>

          {/* Logo mark */}
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg,#D4A843,#A87E28)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "#0A0E1A", margin: "0 auto 16px" }}>E</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, fontWeight: 700, color: "white", marginBottom: 6 }}>Create your account</h1>
            <p style={{ fontSize: 14, color: "#8892AA" }}>Join thousands finding homes on Edira</p>
          </div>

          <div style={{ background: "#141829", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "36px 32px" }}>

            {error && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#EF4444", marginBottom: 20 }}>
                {error}
              </div>
            )}

            {/* Role selector */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#8892AA", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 10, display: "block" }}>I am a</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {(["tenant", "landlord"] as const).map(r => (
                  <button key={r} onClick={() => update("role", r)}
                    style={{
                      padding: "14px", borderRadius: 10, cursor: "pointer",
                      fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: 600,
                      transition: "all 0.2s", textTransform: "capitalize",
                      background: form.role === r ? "rgba(212,168,67,0.12)" : "rgba(255,255,255,0.03)",
                      border: form.role === r ? "1.5px solid rgba(212,168,67,0.5)" : "1.5px solid rgba(255,255,255,0.07)",
                      color: form.role === r ? "#D4A843" : "#8892AA",
                    }}>
                    {r === "tenant" ? "🏠 Tenant" : "🔑 Landlord"}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#8892AA", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 8, display: "block" }}>Full Name</label>
                <input value={form.name} onChange={e => update("name", e.target.value)} placeholder="John Kamau" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#8892AA", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 8, display: "block" }}>Email</label>
                <input type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="you@example.com" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#8892AA", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 8, display: "block" }}>
                  Phone <span style={{ color: "#D4A843" }}>(WhatsApp)</span>
                </label>
                <input value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="0712345678" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#8892AA", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 8, display: "block" }}>Password</label>
                <input type="password" value={form.password} onChange={e => update("password", e.target.value)} placeholder="Min. 8 characters" style={inputStyle} />
              </div>

              <button onClick={handleSubmit} disabled={loading}
                style={{ padding: "14px", borderRadius: 10, background: "linear-gradient(135deg,#D4A843,#A87E28)", color: "#0A0E1A", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'Outfit',sans-serif", marginTop: 4, opacity: loading ? 0.7 : 1, transition: "opacity 0.2s" }}>
                {loading ? "Creating account..." : "Create Account →"}
              </button>

              <p style={{ fontSize: 12, color: "#8892AA", textAlign: "center", lineHeight: 1.7 }}>
                By signing up you agree to Edira's{" "}
                <a href="/terms" style={{ color: "#D4A843", textDecoration: "none" }}>Terms</a> and{" "}
                <a href="/privacy" style={{ color: "#D4A843", textDecoration: "none" }}>Privacy Policy</a>
              </p>
            </div>
          </div>

          <p style={{ textAlign: "center", fontSize: 14, color: "#8892AA", marginTop: 24 }}>
            Already have an account?{" "}
            <Link href="/auth/login" style={{ color: "#D4A843", textDecoration: "none", fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}