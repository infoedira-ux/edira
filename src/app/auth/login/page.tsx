"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setError("");
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (error) { setError(error.message); setLoading(false); return; }
      window.location.href = "/dashboard";
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "85vh", padding: "0 24px" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>

          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg,#D4A843,#A87E28)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "#0A0E1A", margin: "0 auto 16px" }}>E</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, fontWeight: 700, color: "white", marginBottom: 6 }}>Welcome back</h1>
            <p style={{ fontSize: 14, color: "#8892AA" }}>Sign in to your Edira account</p>
          </div>

          <div style={{ background: "#141829", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "36px 32px" }}>

            {error && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#EF4444", marginBottom: 20 }}>
                {error}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#8892AA", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 8, display: "block" }}>Email</label>
                <input type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="you@example.com" style={inputStyle} />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#8892AA", textTransform: "uppercase" as const, letterSpacing: 1 }}>Password</label>
                  <a href="/auth/reset" style={{ fontSize: 12, color: "#D4A843", textDecoration: "none" }}>Forgot password?</a>
                </div>
                <input type="password" value={form.password} onChange={e => update("password", e.target.value)} placeholder="••••••••" style={inputStyle}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()} />
              </div>

              <button onClick={handleSubmit} disabled={loading}
                style={{ padding: "14px", borderRadius: 10, background: "linear-gradient(135deg,#D4A843,#A87E28)", color: "#0A0E1A", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'Outfit',sans-serif", marginTop: 4, opacity: loading ? 0.7 : 1, transition: "opacity 0.2s" }}>
                {loading ? "Signing in..." : "Sign In →"}
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
              <span style={{ fontSize: 12, color: "#8892AA" }}>or continue with</span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
            </div>

            <button style={{ width: "100%", padding: "13px", borderRadius: 10, background: "rgba(37,211,102,0.08)", color: "#25D366", border: "1.5px solid rgba(37,211,102,0.2)", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              💬 Continue with WhatsApp OTP
            </button>
          </div>

          <p style={{ textAlign: "center", fontSize: 14, color: "#8892AA", marginTop: 24 }}>
            Don't have an account?{" "}
            <Link href="/auth/signup" style={{ color: "#D4A843", textDecoration: "none", fontWeight: 600 }}>Sign up free</Link>
          </p>
        </div>
      </div>
    </main>
  );
}