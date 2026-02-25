import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using Edira Kenya rental platform.",
};

export default function TermsPage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: "By accessing or using Edira, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.",
    },
    {
      title: "Landlord Responsibilities",
      content: "Landlords are responsible for ensuring all listing information is accurate, current, and not misleading. You must own or have legal authority to rent the listed property. Edira reserves the right to remove listings that violate our policies without notice.",
    },
    {
      title: "Tenant Responsibilities",
      content: "Tenants agree to use Edira solely for legitimate house-hunting purposes. You must not misrepresent your identity or intent when contacting landlords. Any harassment of landlords will result in immediate account suspension.",
    },
    {
      title: "Prohibited Content",
      content: "Users may not post false, misleading, or fraudulent listings. Ghost houses, scam deposits, and bait-and-switch listings are strictly prohibited and will be reported to relevant authorities.",
    },
    {
      title: "No Financial Transactions",
      content: "Edira is a listing and discovery platform only. We do not process rental payments, hold deposits, or mediate financial disputes between landlords and tenants. Always visit a property in person before making any payment.",
    },
    {
      title: "Limitation of Liability",
      content: "Edira is not liable for any disputes, losses, or damages arising from interactions between landlords and tenants. We provide a platform for connection — all rental agreements are made directly between the parties involved.",
    },
    {
      title: "Account Termination",
      content: "We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or harm the Edira community.",
    },
    {
      title: "Governing Law",
      content: "These terms are governed by the laws of the Republic of Kenya. Any disputes shall be subject to the jurisdiction of Kenyan courts.",
    },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#0A0E1A" }}>
      <Navbar />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "clamp(40px,8vw,72px) clamp(16px,5vw,40px) 80px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#D4A843", marginBottom: 10 }}>Legal</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(32px,5vw,48px)", fontWeight: 700, color: "white", marginBottom: 8 }}>Terms of Service</h1>
        <p style={{ fontSize: 13, color: "#8892AA", marginBottom: 48 }}>Last updated: {new Date().toLocaleDateString("en-KE", { month: "long", day: "numeric", year: "numeric" })}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {sections.map((s) => (
            <div key={s.title} style={{ paddingBottom: 32, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700, color: "white", marginBottom: 12 }}>{s.title}</h2>
              <p style={{ fontSize: 14, color: "#8892AA", lineHeight: 1.85 }}>{s.content}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, padding: "20px 24px", background: "#141829", border: "1px solid rgba(212,168,67,0.15)", borderRadius: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 6 }}>Questions about our terms?</div>
          <div style={{ fontSize: 13, color: "#8892AA" }}>Email us at <a href="mailto:legal@edira.co.ke" style={{ color: "#D4A843", textDecoration: "none" }}>legal@edira.co.ke</a></div>
        </div>
      </div>
      <Footer />
    </main>
  );
}