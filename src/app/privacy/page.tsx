import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Privacy Policy",
  description: "How Edira Kenya collects, uses and protects your personal data.",
};

export default function PrivacyPage() {
  const sections = [
    {
      title: "Information We Collect",
      content: "We collect information you provide directly — such as your name, email address, phone number, and property details when you create an account or post a listing. We also collect usage data such as pages visited, listings viewed, and search queries to improve your experience.",
    },
    {
      title: "How We Use Your Information",
      content: "We use your information to provide and improve our services, connect tenants with landlords, send important notifications about your account or listings, and ensure platform safety. We do not sell your personal data to third parties.",
    },
    {
      title: "Phone Numbers & WhatsApp",
      content: "Landlord phone numbers are displayed on listings to enable direct WhatsApp and call contact. By posting a listing, you consent to your contact information being visible to registered users. Tenants' phone numbers are never shared without consent.",
    },
    {
      title: "Data Storage & Security",
      content: "Your data is stored securely using Supabase (PostgreSQL) with row-level security policies. We use HTTPS encryption for all data in transit. Passwords are hashed and never stored in plain text.",
    },
    {
      title: "Cookies",
      content: "We use essential cookies to keep you signed in and remember your preferences. We do not use advertising or tracking cookies.",
    },
    {
      title: "Your Rights",
      content: "You have the right to access, correct, or delete your personal data at any time. To request deletion of your account and all associated data, email us at privacy@edira.co.ke.",
    },
    {
      title: "Changes to This Policy",
      content: "We may update this policy from time to time. We will notify you of significant changes via email or a notice on the platform.",
    },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#0A0E1A" }}>
      <Navbar />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "clamp(40px,8vw,72px) clamp(16px,5vw,40px) 80px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#D4A843", marginBottom: 10 }}>Legal</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(32px,5vw,48px)", fontWeight: 700, color: "white", marginBottom: 8 }}>Privacy Policy</h1>
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
          <div style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 6 }}>Questions about privacy?</div>
          <div style={{ fontSize: 13, color: "#8892AA" }}>Email us at <a href="mailto:privacy@edira.co.ke" style={{ color: "#D4A843", textDecoration: "none" }}>privacy@edira.co.ke</a></div>
        </div>
      </div>
      <Footer />
    </main>
  );
}