import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      background: "#060911",
      borderTop: "1px solid rgba(255,255,255,0.04)",
      padding: "32px 24px",
    }}>
      <div className="footer-inner" style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: 1100,
        margin: "0 auto",
      }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 700, color: "white", marginBottom: 4 }}>
            Edira<span style={{ color: "#D4A843" }}>.</span>
          </div>
          <div style={{ fontSize: 12, color: "#8892AA" }}>Making house hunting human again. 🇰🇪</div>
        </div>

        <div style={{ fontSize: 12, color: "#8892AA", textAlign: "center" }}>
          Nairobi · Mombasa · Kisumu · Nakuru
          <br />
          <span style={{ color: "rgba(255,255,255,0.2)" }}>© {new Date().getFullYear()} Edira Kenya</span>
        </div>

        <div style={{ display: "flex", gap: 18 }}>
          {["Privacy", "Terms", "Contact"].map(label => (
            <Link key={label} href={`/${label.toLowerCase()}`} style={{
              fontSize: 13, color: "#8892AA", textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "#D4A843")}
              onMouseLeave={e => (e.currentTarget.style.color = "#8892AA")}
            >{label}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}