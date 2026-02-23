"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Listing, Profile } from "@/types";

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<"tenant" | "landlord">("landlord");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { window.location.href = "/auth/login"; return; }

        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileData) {
          setProfile(profileData);
          setRole(profileData.role);
        }

        if (profileData?.role === "landlord") {
          const { data: listingsData } = await supabase
            .from("listings")
            .select("*")
            .eq("landlord_id", user.id)
            .order("created_at", { ascending: false });
          if (listingsData) setListings(listingsData);
        }
      } catch {
        // handle error silently
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const toggleStatus = async (id: string, currentStatus: string) => {
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const newStatus = currentStatus === "active" ? "paused" : "active";
      await supabase.from("listings").update({ status: newStatus }).eq("id", id);
      setListings(prev => prev.map(l => l.id === id ? { ...l, status: newStatus as any } : l));
    } catch {}
  };

  const handleSignOut = async () => {
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const statCards = role === "landlord"
    ? [
        { label: "Total Listings", value: listings.length, icon: "🏠" },
        { label: "Total Views", value: listings.reduce((s, l) => s + (l.views || 0), 0), icon: "👁️" },
        { label: "Inquiries", value: listings.reduce((s, l) => s + (l.inquiries || 0), 0), icon: "💬" },
        { label: "Active", value: listings.filter(l => l.status === "active").length, icon: "✅" },
      ]
    : [
        { label: "Saved Homes", value: 0, icon: "❤️" },
        { label: "Cities Browsed", value: 0, icon: "🏙️" },
        { label: "Inquiries Sent", value: 0, icon: "💬" },
        { label: "Profile Views", value: 0, icon: "👁️" },
      ];

  if (loading) {
    return (
      <main style={{ minHeight: "100vh", background: "#0A0E1A" }}>
        <Navbar />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "70vh" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
            <div style={{ fontSize: 16, color: "#8892AA" }}>Loading your dashboard...</div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0A0E1A" }}>
      <Navbar user={profile ? { name: profile.full_name, role: profile.role } : undefined} onSignOut={handleSignOut} />

      <div style={{ padding: "48px 60px 80px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#D4A843", marginBottom: 8 }}>Dashboard</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 42, fontWeight: 700, color: "white" }}>
              Welcome back, <span style={{ color: "#D4A843", fontStyle: "italic" }}>{profile?.full_name?.split(" ")[0] || "there"}</span>
            </h1>
            <div style={{ fontSize: 13, color: "#8892AA", marginTop: 6 }}>
              {role === "landlord" ? "🔑 Landlord Account" : "🏠 Tenant Account"}
              {profile?.verified && <span style={{ marginLeft: 10, color: "#D4A843" }}>✓ Verified</span>}
            </div>
          </div>
          <button onClick={handleSignOut}
            style={{ padding: "10px 22px", borderRadius: 10, background: "transparent", color: "#8892AA", border: "1.5px solid rgba(255,255,255,0.1)", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'Outfit',sans-serif", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#EF4444"; e.currentTarget.style.color = "#EF4444"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#8892AA"; }}>
            Sign Out
          </button>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginBottom: 44 }}>
          {statCards.map((s, i) => (
            <div key={s.label} style={{ background: "#141829", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "24px 22px", animation: `fadeUp 0.4s ease ${i * 0.08}s both` }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, fontWeight: 700, color: "white", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#8892AA", marginTop: 6, textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Landlord: My Listings */}
        {role === "landlord" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 700, color: "white" }}>My Listings</h2>
              <a href="/post" style={{ padding: "10px 22px", borderRadius: 10, background: "linear-gradient(135deg,#D4A843,#A87E28)", color: "#0A0E1A", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                + Add New
              </a>
            </div>

            {listings.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", background: "#141829", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🏠</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "white", marginBottom: 8 }}>No listings yet</div>
                <div style={{ fontSize: 13, color: "#8892AA", marginBottom: 24 }}>Post your first property for free</div>
                <a href="/post" style={{ padding: "12px 28px", borderRadius: 10, background: "linear-gradient(135deg,#D4A843,#A87E28)", color: "#0A0E1A", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                  Post a Listing →
                </a>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {listings.map(l => (
                  <div key={l.id} style={{ background: "#141829", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", gap: 20 }}>
                    <div style={{ width: 80, height: 60, borderRadius: 10, background: "#1E2436", overflow: "hidden", flexShrink: 0 }}>
                      {l.images?.[0] ? (
                        <img src={l.images[0]} alt={l.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🏠</div>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "white", marginBottom: 4 }}>{l.title}</div>
                      <div style={{ fontSize: 13, color: "#8892AA" }}>📍 {l.neighbourhood}, {l.city} · KSh {l.price.toLocaleString()}/mo</div>
                    </div>
                    <div style={{ display: "flex", gap: 24, fontSize: 13, color: "#8892AA", textAlign: "center" }}>
                      <div><div style={{ color: "white", fontWeight: 600, fontSize: 18 }}>{l.views || 0}</div>Views</div>
                      <div><div style={{ color: "white", fontWeight: 600, fontSize: 18 }}>{l.inquiries || 0}</div>Inquiries</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 1, background: l.status === "active" ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.06)", color: l.status === "active" ? "#22C55E" : "#8892AA", border: l.status === "active" ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(255,255,255,0.08)" }}>
                        {l.status}
                      </span>
                      <button onClick={() => toggleStatus(l.id, l.status)}
                        style={{ padding: "7px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit',sans-serif", background: "transparent", color: "#8892AA", border: "1.5px solid rgba(255,255,255,0.1)", transition: "all 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#D4A843"; e.currentTarget.style.color = "#D4A843"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#8892AA"; }}>
                        {l.status === "active" ? "Pause" : "Activate"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tenant view */}
        {role === "tenant" && (
          <div style={{ textAlign: "center", padding: "60px 0", background: "#141829", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "white", marginBottom: 8 }}>Start house hunting</div>
            <div style={{ fontSize: 13, color: "#8892AA", marginBottom: 24 }}>Browse verified listings across Kenya</div>
            <a href="/browse" style={{ padding: "12px 28px", borderRadius: 10, background: "linear-gradient(135deg,#D4A843,#A87E28)", color: "#0A0E1A", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              Browse Listings →
            </a>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}