"use client";

import { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  user?: { name: string; role: string } | null;
  onSignOut?: () => void;
}

export default function Navbar({ user, onSignOut }: NavbarProps) {
  const [active, setActive] = useState("");

  const links = [
    { href: "/", label: "Home" },
    { href: "/browse", label: "Browse" },
    { href: "/cities", label: "Cities" },
    { href: "/post", label: "List Property" },
  ];

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(10,14,26,0.95)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      padding: "0 40px", height: 62,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      {/* Logo */}
      <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: "linear-gradient(135deg, #D4A843, #A87E28)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 700, color: "#0A0E1A",
        }}>E</div>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 22, fontWeight: 700, color: "white",
        }}>
          Edira<span style={{ color: "#D4A843" }}>.</span>
        </span>
      </Link>

      {/* Links */}
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} style={{
            padding: "7px 14px", borderRadius: 8,
            fontSize: 14, fontWeight: 500,
            color: active === link.href ? "#D4A843" : "#8892AA",
            textDecoration: "none", transition: "color 0.2s",
            position: "relative",
          }}
            onClick={() => setActive(link.href)}
            onMouseEnter={e => (e.currentTarget.style.color = "white")}
            onMouseLeave={e => (e.currentTarget.style.color = active === link.href ? "#D4A843" : "#8892AA")}
          >
            {link.label}
          </Link>
        ))}

        {/* Auth buttons */}
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: 8 }}>
            <Link href="/dashboard" style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "7px 14px", borderRadius: 10,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#B4BECE", fontSize: 13, fontWeight: 500,
              textDecoration: "none",
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: "50%",
                background: "linear-gradient(135deg,#D4A843,#A87E28)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, color: "#0A0E1A",
              }}>
                {user.name[0].toUpperCase()}
              </div>
              {user.name.split(" ")[0]}
            </Link>
            <button onClick={onSignOut} style={{
              padding: "8px 18px", borderRadius: 10,
              background: "transparent", color: "#8892AA",
              border: "1.5px solid rgba(255,255,255,0.1)",
              fontSize: 13, fontWeight: 500, cursor: "pointer",
              fontFamily: "'Outfit', sans-serif", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#D4A843"; e.currentTarget.style.color = "#D4A843"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#8892AA"; }}
            >Sign Out</button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 8, marginLeft: 8 }}>
            <Link href="/auth/login" style={{
              padding: "8px 18px", borderRadius: 10,
              background: "transparent", color: "#8892AA",
              border: "1.5px solid rgba(255,255,255,0.1)",
              fontSize: 13, fontWeight: 500, textDecoration: "none",
              transition: "all 0.2s",
            }}>Sign In</Link>
            <Link href="/auth/signup" style={{
              padding: "8px 18px", borderRadius: 10,
              background: "linear-gradient(135deg,#D4A843,#A87E28)",
              color: "#0A0E1A", fontSize: 13, fontWeight: 700,
              textDecoration: "none", transition: "all 0.2s",
            }}>Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}