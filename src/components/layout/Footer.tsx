import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      background: "#060911",
      borderTop: "1px solid rgba(255,255,255,0.04)",
      padding: "36px 60px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      {/* Logo */}
      <div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 20, fontWeight: 700, color: "white", marginBottom: 4,
        }}>
          Edira<span style={{ color: "#D4A843" }}>.</span>
        </div>
        <div style={{ fontSize: 12, color: "#8892AA" }}>
          Making house hunting human again. 🇰🇪
        </div>
      </div>

      {/* Cities */}
      <div style={{ fontSize: 12, color: "#8892AA", textAlign: "center" }}>
        Nairobi · Mombasa · Kisumu · Nakuru
        <br />
        <span style={{ color: "rgba(255,255,255,0.25)" }}>
          © {new Date().getFullYear()} Edira Kenya
        </span>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: 20 }}>
        {["Privacy", "Terms", "Contact"].map((label) => (
          <Link key={label} href={`/${label.toLowerCase()}`} style={{
            fontSize: 13, color: "#8892AA",
            textDecoration: "none", transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = "#D4A843")}
            onMouseLeave={e => (e.currentTarget.style.color = "#8892AA")}
          >
            {label}
          </Link>
        ))}
      </div>
    </footer>
  );
}