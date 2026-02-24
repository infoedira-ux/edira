"use client";

import { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  user?: { name: string; role: string } | null;
  onSignOut?: () => void;
}

export default function Navbar({ user, onSignOut }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/browse", label: "Browse" },
    { href: "/cities", label: "Cities" },
    { href: "/post", label: "List Property" },
  ];

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(10,14,26,0.97)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "0 20px", height: 58,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: "linear-gradient(135deg,#D4A843,#A87E28)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, color: "#0A0E1A",
          }}>E</div>
          <span style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 20, fontWeight: 700, color: "white",
          }}>Edira<span style={{ color: "#D4A843" }}>.</span></span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 2, alignItems: "center" }} className="desktop-nav">
          {links.map(link => (
            <Link key={link.href} href={link.href} style={{
              padding: "7px 13px", borderRadius: 8, fontSize: 13, fontWeight: 500,
              color: "#8892AA", textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "white")}
              onMouseLeave={e => (e.currentTarget.style.color = "#8892AA")}
            >{link.label}</Link>
          ))}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 6 }}>
              <Link href="/dashboard" style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "6px 12px", borderRadius: 9,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#B4BECE", fontSize: 13, fontWeight: 500, textDecoration: "none",
              }}>
                <div style={{
                  width: 20, height: 20, borderRadius: "50%",
                  background: "linear-gradient(135deg,#D4A843,#A87E28)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 700, color: "#0A0E1A",
                }}>{user.name[0].toUpperCase()}</div>
                {user.name.split(" ")[0]}
              </Link>
              <button onClick={onSignOut} style={{
                padding: "7px 14px", borderRadius: 9,
                background: "transparent", color: "#8892AA",
                border: "1.5px solid rgba(255,255,255,0.1)",
                fontSize: 12, fontWeight: 500, cursor: "pointer",
                fontFamily: "'Outfit',sans-serif", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#EF4444"; e.currentTarget.style.color = "#EF4444"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#8892AA"; }}
              >Sign Out</button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 7, marginLeft: 6 }}>
              <Link href="/auth/login" style={{
                padding: "7px 16px", borderRadius: 9,
                background: "transparent", color: "#8892AA",
                border: "1.5px solid rgba(255,255,255,0.1)",
                fontSize: 13, fontWeight: 500, textDecoration: "none",
              }}>Sign In</Link>
              <Link href="/auth/signup" style={{
                padding: "7px 16px", borderRadius: 9,
                background: "linear-gradient(135deg,#D4A843,#A87E28)",
                color: "#0A0E1A", fontSize: 13, fontWeight: 700, textDecoration: "none",
              }}>Sign Up</Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "transparent", border: "none",
          color: "white", fontSize: 22, cursor: "pointer",
          fontFamily: "'Outfit',sans-serif", padding: 4,
        }} className="mobile-menu-btn">
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 58, left: 0, right: 0, bottom: 0,
          background: "rgba(10,14,26,0.98)", zIndex: 99,
          padding: "24px 20px", display: "flex", flexDirection: "column", gap: 6,
          animation: "fadeIn 0.2s ease both",
        }} className="mobile-drawer">
          {links.map(link => (
            <Link key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "14px 18px", borderRadius: 12, fontSize: 16, fontWeight: 500,
                color: "white", textDecoration: "none",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}>
              {link.label}
            </Link>
          ))}
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "10px 0" }} />
          {user ? (
            <>
              <Link href="/dashboard" onClick={() => setMenuOpen(false)} style={{
                padding: "14px 18px", borderRadius: 12, fontSize: 16, fontWeight: 500,
                color: "#D4A843", textDecoration: "none",
                background: "rgba(212,168,67,0.08)",
                border: "1px solid rgba(212,168,67,0.2)",
              }}>
                👤 {user.name}
              </Link>
              <button onClick={() => { onSignOut?.(); setMenuOpen(false); }} style={{
                padding: "14px 18px", borderRadius: 12, fontSize: 16, fontWeight: 500,
                color: "#EF4444", background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                cursor: "pointer", fontFamily: "'Outfit',sans-serif", textAlign: "left",
              }}>Sign Out</button>
            </>
          ) : (
            <>
              <Link href="/auth/login" onClick={() => setMenuOpen(false)} style={{
                padding: "14px 18px", borderRadius: 12, fontSize: 16, fontWeight: 600,
                color: "white", textDecoration: "none", textAlign: "center",
                border: "1.5px solid rgba(255,255,255,0.1)",
              }}>Sign In</Link>
              <Link href="/auth/signup" onClick={() => setMenuOpen(false)} style={{
                padding: "14px 18px", borderRadius: 12, fontSize: 16, fontWeight: 700,
                color: "#0A0E1A", textDecoration: "none", textAlign: "center",
                background: "linear-gradient(135deg,#D4A843,#A87E28)",
              }}>Sign Up Free</Link>
            </>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-drawer { display: none !important; }
        }
      `}</style>
    </>
  );
}