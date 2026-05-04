import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, Cell, PieChart, Pie, Legend
} from "recharts";

// ── WorldTeams Brand Colors ──────────────────────────────────────────────────
const C = {
  darkGreen:  "#142d2b",
  persian:    "#58958c",
  dogwood:    "#d4b5aa",
  snow:       "#fff7f3",
  night:      "#131313",
  mindaro:    "#d2f176",
  lavender:   "#ffbdf4",
  cerise:     "#f900a8",
  darkPurple: "#3e0d2a",
  textMuted:  "#6b6866",
  border:     "rgba(20,45,43,0.12)",
};

// ── April 2026 Data ──────────────────────────────────────────────────────────
const MES = "Abril 2026";

const bdData = [
  {
    name: "Luisa", target: 6, leadgenMeetings: 9, nivel: "140%",
    meetCom: 1600, cierreCom: 100, total: 1700,
    cierres: 2, revenue: 1656 + 350,
    meetings: [
      { deal: "Jensen Architects - Steven Huegli",   origin: "LEADGEN",       size: "Mid",   quality: "Mid high",   valor: 200, comment: "Se abonan al 140%" },
      { deal: "Firm Ground Architects",               origin: "LEADGEN",       size: "Small", quality: "Mid high",   valor: 140, comment: "Se abonan al 140%" },
      { deal: "Giampiero Tagliaferri - Rebecca",      origin: "LEADGEN",       size: "Mid",   quality: "Mid high",   valor: 200, comment: "Se abonan al 140%" },
      { deal: "DOXworks Architecture",                origin: "LEADGEN",       size: "Small", quality: "Mid low",    valor: 140, comment: "Se abonan al 140%" },
      { deal: "Cooney Homes - Nick Girard",           origin: "LEADGEN",       size: "Small", quality: "Mid high",   valor: 140, comment: "Se abonan al 140%" },
      { deal: "Hadar Interiors - New Deal",           origin: "LEADGEN",       size: "Small", quality: "Mid low",    valor: 140, comment: "Se abonan al 140%" },
      { deal: "Camillo Companies - Nathan Siems",     origin: "LEADGEN",       size: "Big",   quality: "Mid high",   valor: 200, comment: "Se abonan al 140%" },
      { deal: "Just Decorate - Anna Young",           origin: "LEADGEN",       size: "Small", quality: "Low",        valor: 100, comment: "Low - Se abonan al 100% (tope)" },
      { deal: "Novo Domus Design - Erika Perez Rubio",origin: "LEADGEN",       size: "Small", quality: "Mid low",    valor: 140, comment: "Se abonan al 140%" },
      { deal: "Maxim Popov - Metro craft",            origin: "WEB PAID MEDIA",size: "Small", quality: "Low",        valor: 100, comment: "Se abonan al 100%" },
      { deal: "Mike Stake - Mike stake studio",       origin: "WEB PAID MEDIA",size: "Small", quality: "Mid low",    valor: 100, comment: "Se abonan al 100%" },
    ],
    cierresDetail: [
      { deal: "Meredith Rebolledo Interior Design", size: "Small", valor: 50, revenue: 1656 },
      { deal: "Hadar Interiors - New Deal",         size: "Small", valor: 50, revenue: 350 },
    ],
  },
  {
    name: "Luna", target: 6, leadgenMeetings: 6, nivel: "100%",
    meetCom: 800, cierreCom: 0, total: 800,
    cierres: 0, revenue: 0,
    meetings: [
      { deal: "Blueprint & Co Architecture - Trevor Dickson", origin: "LEADGEN", size: "Small", quality: "Mid low",  valor: 100, comment: "Se abonan al 100%" },
      { deal: "Todd & Associates - Shelley Chalmers-Ranney",  origin: "LEADGEN", size: "Mid",   quality: "Mid high", valor: 150, comment: "Se abonan al 100%" },
      { deal: "AE Works - David Andros",                      origin: "LEADGEN", size: "Mid",   quality: "Mid high", valor: 150, comment: "Se abonan al 100%" },
      { deal: "Matlock Homes - Byron Matlock",                origin: "LEADGEN", size: "Small", quality: "Low",      valor: 100, comment: "Low - Se abonan al 100% (tope)" },
      { deal: "LGI Homes - Luke Lansman",                     origin: "LEADGEN", size: "Big",   quality: "Mid low",  valor: 150, comment: "Se abonan al 100%" },
      { deal: "SPT Architecture - Jeff Koch",                 origin: "LEADGEN", size: "Mid",   quality: "Mid high", valor: 150, comment: "Se abonan al 100%" },
    ],
    cierresDetail: [],
  },
  {
    name: "Mia", target: 6, leadgenMeetings: 6, nivel: "100%",
    meetCom: 700, cierreCom: 100, total: 800,
    cierres: 2, revenue: 1400 + 300,
    meetings: [
      { deal: "Century Communities - John Kollman",        origin: "LEADGEN", size: "Big",   quality: "Mid high",     valor: 150, comment: "Se abonan al 100%" },
      { deal: "Balding Design Build - Nick Balding",       origin: "LEADGEN", size: "Small", quality: "Mid low",      valor: 100, comment: "Se abonan al 100%" },
      { deal: "FunCycled - Sarah Trop",                    origin: "LEADGEN", size: "Small", quality: "Mid low",      valor: 100, comment: "Se abonan al 100%" },
      { deal: "LJI Design - Jodi and Lindsey",             origin: "LEADGEN", size: "Mid",   quality: "Mid low",      valor: 150, comment: "Se abonan al 100%" },
      { deal: "Guzman Engineering - Richard Guzman",       origin: "LEADGEN", size: "Small", quality: "Mid low",      valor: 100, comment: "Se abonan al 100%" },
      { deal: "EDM Engineering & Landscape Architecture",  origin: "LEADGEN", size: "Small", quality: "High potential",valor: 100, comment: "Se abonan al 100%" },
    ],
    cierresDetail: [
      { deal: "GO WEST Architecture + Nick Otto",  size: "Small", valor: 50, revenue: 1400 },
      { deal: "Libby Langdon Interiors",           size: "Small", valor: 50, revenue: 300  },
    ],
  },
  {
    name: "Sofi S", target: 4, leadgenMeetings: 4, nivel: "100%",
    meetCom: 400, cierreCom: 50, total: 450,
    cierres: 1, revenue: 857.5,
    meetings: [
      { deal: "4RM+ULA - James Garrett Jr",           origin: "LEADGEN", size: "Small", quality: "Mid low", valor: 100, comment: "Se abonan al 100%" },
      { deal: "Perigon Design - Michelle Demetriou",  origin: "LEADGEN", size: "Small", quality: "Mid low", valor: 100, comment: "Se abonan al 100%" },
      { deal: "Designed to Build - Andrew Privette",  origin: "LEADGEN", size: "Small", quality: "Low",     valor: 100, comment: "Low - Se abonan al 100% (tope)" },
      { deal: "Ghatit Studio - Adham el Ghatit",      origin: "LEADGEN", size: "Small", quality: "Mid low", valor: 100, comment: "Se abonan al 100%" },
    ],
    cierresDetail: [
      { deal: "Egan Simon - Rene R. Rodriguez", size: "Small", valor: 50, revenue: 857.5 },
    ],
  },
  {
    name: "Renata", target: 6, leadgenMeetings: 5, nivel: "80%",
    meetCom: 480, cierreCom: 100, total: 580,
    cierres: 2, revenue: 1767 + 840,
    meetings: [
      { deal: "Tessere - John Ford",                origin: "LEADGEN", size: "Big",   quality: "High potential", valor: 120, comment: "Se abonan al 80%" },
      { deal: "SEK Architects - Stephen Kowalski",  origin: "LEADGEN", size: "Small", quality: "Mid high",       valor: 80,  comment: "Se abonan al 80%" },
      { deal: "AOTA Design Studio - Tabitha Evans", origin: "LEADGEN", size: "Small", quality: "Mid low",        valor: 80,  comment: "Se abonan al 80%" },
      { deal: "Cultivateland - Jake Salzman",       origin: "LEADGEN", size: "Small", quality: "Mid low",        valor: 80,  comment: "Se abonan al 80%" },
      { deal: "Creative Contracting - Mark Streicher",origin:"LEADGEN",size: "Mid",   quality: "Mid high",       valor: 120, comment: "Se abonan al 80%" },
    ],
    cierresDetail: [
      { deal: "Ray Renders - Caleb Ray",           size: "Small", valor: 50, revenue: 1767 },
      { deal: "Gladwin Vaughn Architecture",       size: "Small", valor: 50, revenue: 840  },
    ],
  },
  {
    name: "Ana Paula", target: 0, leadgenMeetings: 1, nivel: "100%",
    meetCom: 100, cierreCom: 0, total: 100,
    cierres: 0, revenue: 0,
    meetings: [
      { deal: "Blue Frog Design Group - Ernesto Miranda", origin: "LEADGEN", size: "Small", quality: "Mid low", valor: 100, comment: "Es nueva. No tiene objetivo aún." },
    ],
    cierresDetail: [],
  },
  {
    name: "Daniel", target: 5, leadgenMeetings: 3, nivel: "< 80%",
    meetCom: 0, cierreCom: 0, total: 0,
    cierres: 0, revenue: 0,
    meetings: [
      { deal: "Ramirez, Johnson & Associates",        origin: "LEADGEN", size: "Mid",   quality: "Mid high", valor: 0, comment: "No aplica" },
      { deal: "Huitt Zollars - John Jarrard",         origin: "LEADGEN", size: "Big",   quality: "Mid high", valor: 0, comment: "No aplica" },
      { deal: "Summit Water Engineers - Jason Brothers",origin:"LEADGEN", size: "Small", quality: "Mid low",  valor: 0, comment: "No aplica" },
    ],
    cierresDetail: [],
  },
  {
    name: "Luciana", target: 6, leadgenMeetings: 3, nivel: "< 80%",
    meetCom: 0, cierreCom: 50, total: 50,
    cierres: 1, revenue: 1330,
    meetings: [
      { deal: "Clements Engineering Inc",           origin: "LEADGEN", size: "Small", quality: "Mid low",  valor: 0, comment: "No aplica" },
      { deal: "Michael Barron-Wike Architect",      origin: "LEADGEN", size: "Small", quality: "Low",      valor: 0, comment: "No aplica" },
      { deal: "Jewel Toned Interiors - Brittney",   origin: "LEADGEN", size: "Small", quality: "Mid high", valor: 0, comment: "No aplica" },
    ],
    cierresDetail: [
      { deal: "Willingham & Towne - Andrew Willingham", size: "Small", valor: 50, revenue: 1330 },
    ],
  },
];

const TOTAL_MEETINGS_COM = bdData.reduce((s, b) => s + b.meetCom, 0);
const TOTAL_CIERRES_COM  = bdData.reduce((s, b) => s + b.cierreCom, 0);
const TOTAL_COM          = TOTAL_MEETINGS_COM + TOTAL_CIERRES_COM;
const TOTAL_REVENUE      = bdData.reduce((s, b) => s + b.revenue, 0);
const TOTAL_MEETINGS     = bdData.reduce((s, b) => s + b.leadgenMeetings, 0);
const TOTAL_CIERRES      = bdData.reduce((s, b) => s + b.cierres, 0);

// ── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

function pct(bd) {
  if (bd.target === 0) return null;
  return Math.round((bd.leadgenMeetings / bd.target) * 100);
}

function nivelColor(nivel) {
  if (nivel === "140%")    return C.mindaro;
  if (nivel === "120%")    return "#a8e063";
  if (nivel === "100%")    return C.persian;
  if (nivel === "80%")     return C.dogwood;
  if (nivel === "< 80%")   return "#d07070";
  return C.dogwood;
}

function nivelBg(nivel) {
  if (nivel === "140%")  return { bg: C.mindaro,   text: C.darkGreen };
  if (nivel === "100%")  return { bg: C.persian,   text: "#fff7f3" };
  if (nivel === "80%")   return { bg: C.dogwood,   text: C.darkGreen };
  if (nivel === "< 80%") return { bg: "#e8b4b4",   text: "#7a2020" };
  return { bg: C.dogwood, text: C.darkGreen };
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: C.darkGreen, border: `1px solid ${C.persian}`, borderRadius: 8, padding: "10px 14px" }}>
        <p style={{ color: C.mindaro, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 12, marginBottom: 4 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: C.snow, fontSize: 12, margin: "2px 0" }}>
            {p.name}: <strong>{fmt(p.value)}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ── Slack Message Builder ─────────────────────────────────────────────────────
function buildSlackMessage() {
  const sorted = [...bdData].sort((a, b) => b.total - a.total);
  const ranking = sorted.map((bd, i) => {
    const emoji = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "▫️";
    const totalStr = bd.total > 0 ? fmt(bd.total) : "$0";
    return `${emoji} *${bd.name}* — ${totalStr}`;
  }).join("\n");

  return `📊 *Dashboard de Comisiones — ${MES}*\n\n` +
    `💰 *Total comisiones:* ${fmt(TOTAL_COM)}\n` +
    `🤝 *Meetings:* ${fmt(TOTAL_MEETINGS_COM)} | *Cierres:* ${fmt(TOTAL_CIERRES_COM)}\n` +
    `🏆 *Revenue de clientes cerrados:* ${fmt(TOTAL_REVENUE)}\n\n` +
    `*Ranking BDs:*\n${ranking}\n\n` +
    `🔗 Dashboard completo: https://worldteams-dashboard-lgcomisiones.vercel.app`;
}

// ── Components ───────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{
      background: accent ? C.darkGreen : C.snow,
      border: accent ? "none" : `1px solid ${C.border}`,
      borderRadius: 12,
      padding: "16px 20px",
      minWidth: 0,
    }}>
      <div style={{ fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: accent ? C.persian : C.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 22, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: accent ? C.mindaro : C.darkGreen }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 11, color: accent ? "rgba(255,247,243,0.6)" : C.textMuted, marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

function BDRow({ bd, onClick, isSelected }) {
  const p = pct(bd);
  const { bg, text } = nivelBg(bd.nivel);
  return (
    <tr
      onClick={onClick}
      style={{
        background: isSelected ? "rgba(88,149,140,0.08)" : "transparent",
        cursor: "pointer",
        borderBottom: `1px solid ${C.border}`,
        transition: "background 0.15s",
      }}
    >
      <td style={{ padding: "11px 14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, color: C.darkGreen }}>{bd.name}</td>
      <td style={{ padding: "11px 14px", fontSize: 12, color: C.textMuted, textAlign: "center" }}>
        <span style={{ color: bd.leadgenMeetings >= bd.target && bd.target > 0 ? C.persian : C.darkGreen, fontWeight: 500 }}>
          {bd.leadgenMeetings}
        </span>
        {bd.target > 0 ? <span style={{ color: C.textMuted }}> / {bd.target}</span> : <span style={{ color: C.persian, fontSize: 10 }}> (nueva)</span>}
      </td>
      <td style={{ padding: "11px 14px", textAlign: "center" }}>
        <span style={{
          display: "inline-block", padding: "3px 10px", borderRadius: 20,
          background: bg, color: text,
          fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700,
        }}>
          {bd.target === 0 ? "Nueva" : `${p}%`}
        </span>
      </td>
      <td style={{ padding: "11px 14px", textAlign: "center" }}>
        <span style={{
          background: bg, color: text,
          padding: "2px 8px", borderRadius: 20,
          fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700,
        }}>{bd.nivel}</span>
      </td>
      <td style={{ padding: "11px 14px", fontSize: 12, color: C.darkGreen, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{fmt(bd.meetCom)}</td>
      <td style={{ padding: "11px 14px", fontSize: 12, color: C.darkGreen, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{fmt(bd.cierreCom)}</td>
      <td style={{ padding: "11px 14px", textAlign: "right" }}>
        <strong style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: C.darkGreen }}>{fmt(bd.total)}</strong>
      </td>
      <td style={{ padding: "11px 14px", fontSize: 12, color: C.persian, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
        {bd.revenue > 0 ? fmt(bd.revenue) : <span style={{ color: C.textMuted }}>—</span>}
      </td>
    </tr>
  );
}

// ── SLACK MODAL ──────────────────────────────────────────────────────────────
function SlackModal({ onClose }) {
  const [copied, setCopied] = useState(false);
  const msg = buildSlackMessage();
  const copy = () => {
    navigator.clipboard.writeText(msg).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(20,45,43,0.6)", backdropFilter: "blur(4px)",
      zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
    }} onClick={onClose}>
      <div style={{
        background: C.snow, borderRadius: 16, padding: 28, maxWidth: 540, width: "90%",
        boxShadow: "0 24px 60px rgba(20,45,43,0.25)",
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: C.darkGreen }}>📣 Vista previa — Slack</span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: C.textMuted }}>×</button>
        </div>
        <div style={{
          background: C.darkGreen, borderRadius: 10, padding: "14px 18px",
          fontFamily: "monospace", fontSize: 12, color: C.snow, lineHeight: 1.8, whiteSpace: "pre-wrap",
          marginBottom: 16,
        }}>{msg}</div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={copy} style={{
            flex: 1, background: copied ? C.persian : C.darkGreen, color: copied ? C.snow : C.mindaro,
            border: "none", borderRadius: 20, padding: "10px 0",
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer",
            transition: "background 0.3s",
          }}>
            {copied ? "✅ ¡Copiado!" : "📋 Copiar mensaje"}
          </button>
          <button onClick={onClose} style={{
            padding: "10px 18px", background: "none", border: `1px solid ${C.border}`,
            borderRadius: 20, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13,
            color: C.textMuted, cursor: "pointer",
          }}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN DASHBOARD ──────────────────────────────────────────────────────────
export default function Dashboard() {
  const [selectedBD, setSelectedBD] = useState(null);
  const [showSlack, setShowSlack]   = useState(false);
  const [activeTab, setActiveTab]   = useState("resumen"); // resumen | detalle | ranking

  const sorted = [...bdData].sort((a, b) => b.total - a.total);
  const chartData = sorted.map(bd => ({
    name: bd.name,
    Meetings: bd.meetCom,
    Cierres: bd.cierreCom,
    Revenue: bd.revenue,
  }));

  const selected = bdData.find(b => b.name === selectedBD);

  return (
    <div style={{
      fontFamily: "'Manrope', sans-serif",
      background: C.snow,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.snow}; }
        tr:hover td { background: rgba(88,149,140,0.06) !important; }
      `}</style>

      {/* HEADER */}
      <div style={{
        background: C.darkGreen,
        padding: "0 32px",
        display: "flex", alignItems: "center", gap: 20,
        height: 58,
        borderBottom: `2px solid ${C.persian}`,
      }}>
        {/* WT Isotipo placeholder */}
        <div style={{
          width: 30, height: 30, borderRadius: 6,
          background: C.mindaro, display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, color: C.darkGreen,
          flexShrink: 0,
        }}>WT</div>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: C.snow, letterSpacing: "-0.3px" }}>
            WorldTeams <span style={{ color: C.persian, fontWeight: 400 }}>/ LeadGen</span>
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,247,243,0.45)", marginTop: 1 }}>Comisiones · {MES}</div>
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: 2, marginLeft: 28 }}>
          {[
            { id: "resumen", label: "Resumen" },
            { id: "detalle", label: "Detalle BDs" },
            { id: "ranking", label: "Ranking" },
          ].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              background: activeTab === t.id ? C.persian : "none",
              border: "none", cursor: "pointer",
              borderRadius: 20, padding: "5px 14px",
              fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 500,
              color: activeTab === t.id ? C.snow : "rgba(255,247,243,0.55)",
              transition: "all 0.15s",
            }}>{t.label}</button>
          ))}
        </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <div style={{
            background: "rgba(88,149,140,0.25)", borderRadius: 6,
            padding: "4px 10px", fontSize: 10, color: C.mindaro,
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
          }}>v corregida ✓</div>
          <button onClick={() => setShowSlack(true)} style={{
            background: C.lavender, border: "none", borderRadius: 20, cursor: "pointer",
            padding: "6px 14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: 12, color: C.darkGreen, display: "flex", alignItems: "center", gap: 6,
          }}>
            📣 Enviar a Slack
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, padding: "24px 32px", maxWidth: 1100, width: "100%", margin: "0 auto" }}>

        {/* ── RESUMEN TAB ── */}
        {activeTab === "resumen" && (
          <>
            {/* STAT CARDS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, marginBottom: 24 }}>
              <StatCard label="Total comisiones" value={fmt(TOTAL_COM)} sub={`${MES}`} accent />
              <StatCard label="Meetings" value={fmt(TOTAL_MEETINGS_COM)} sub={`${TOTAL_MEETINGS} reuniones`} />
              <StatCard label="Cierres" value={fmt(TOTAL_CIERRES_COM)} sub={`${TOTAL_CIERRES} deals`} />
              <StatCard label="Revenue" value={fmt(TOTAL_REVENUE)} sub="de cierres abr." />
              <StatCard label="BDs activos" value="8" sub="en abril" />
              <StatCard label="BDs ≥ 100%" value="5" sub="Luna, Luisa, Mia, Sofi S, Ana P." />
            </div>

            {/* CHART */}
            <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, color: C.darkGreen, marginBottom: 16 }}>
                Comisiones por BD — {MES}
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="name" tick={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fill: C.darkGreen }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, fill: C.textMuted }} axisLine={false} tickLine={false} tickFormatter={v => "$" + v} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="Meetings" stackId="a" fill={C.persian} radius={[0,0,0,0]} />
                  <Bar dataKey="Cierres" stackId="a" fill={C.mindaro} radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 8 }}>
                {[{ color: C.persian, label: "Meetings" }, { color: C.mindaro, label: "Cierres" }].map(l => (
                  <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />
                    <span style={{ fontSize: 11, color: C.textMuted, fontFamily: "'Space Grotesk', sans-serif" }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ANA PAULA CORRECTION NOTICE */}
            <div style={{
              background: "#e8f4f2", border: `1px solid ${C.persian}`, borderRadius: 10,
              padding: "12px 16px", marginBottom: 20, display: "flex", gap: 12, alignItems: "flex-start",
            }}>
              <span style={{ fontSize: 18 }}>✅</span>
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, color: C.darkGreen, marginBottom: 3 }}>
                  Corrección aplicada — Ana Paula
                </div>
                <div style={{ fontSize: 12, color: C.darkGreen, lineHeight: 1.6 }}>
                  Target de Ana Paula en Abril 2026 = <strong>0</strong> (es nueva, sin objetivo asignado). Su meeting de Blue Frog Design Group (Small) se paga al <strong>100% = $100</strong>. Dashboard regenerado con este ajuste.
                </div>
              </div>
            </div>

            {/* SUMMARY TABLE */}
            <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(8, 1fr)",
                background: C.darkGreen, padding: "10px 14px",
              }}>
                {["BD", "Meetings / Target", "Cumpl.", "Nivel", "Com. Meetings", "Com. Cierres", "Total", "Revenue"].map(h => (
                  <div key={h} style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 600,
                    color: C.mindaro, textTransform: "uppercase", letterSpacing: "0.4px",
                    textAlign: h === "BD" ? "left" : "right",
                    paddingLeft: h === "BD" ? 0 : 14,
                  }}>{h}</div>
                ))}
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  {sorted.map(bd => (
                    <BDRow key={bd.name} bd={bd} onClick={() => { setSelectedBD(bd.name === selectedBD ? null : bd.name); setActiveTab("detalle"); }} isSelected={bd.name === selectedBD} />
                  ))}
                  {/* TOTAL ROW */}
                  <tr style={{ background: C.darkGreen }}>
                    <td style={{ padding: "10px 14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, color: C.mindaro }}>TOTAL</td>
                    <td colSpan={3} />
                    <td style={{ padding: "10px 14px", textAlign: "right", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, color: C.snow }}>{fmt(TOTAL_MEETINGS_COM)}</td>
                    <td style={{ padding: "10px 14px", textAlign: "right", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, color: C.snow }}>{fmt(TOTAL_CIERRES_COM)}</td>
                    <td style={{ padding: "10px 14px", textAlign: "right", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: C.mindaro }}>{fmt(TOTAL_COM)}</td>
                    <td style={{ padding: "10px 14px", textAlign: "right", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, color: C.persian }}>{fmt(TOTAL_REVENUE)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── DETALLE TAB ── */}
        {activeTab === "detalle" && (
          <div>
            {/* BD Selector */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              {bdData.map(bd => {
                const { bg, text } = nivelBg(bd.nivel);
                return (
                  <button key={bd.name} onClick={() => setSelectedBD(bd.name === selectedBD ? null : bd.name)} style={{
                    background: bd.name === selectedBD ? C.darkGreen : "#fff",
                    border: `1px solid ${bd.name === selectedBD ? C.darkGreen : C.border}`,
                    borderRadius: 20, padding: "7px 14px", cursor: "pointer",
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600,
                    color: bd.name === selectedBD ? C.mindaro : C.darkGreen,
                    display: "flex", gap: 8, alignItems: "center",
                  }}>
                    {bd.name}
                    <span style={{ background: bg, color: text, padding: "1px 7px", borderRadius: 10, fontSize: 10 }}>{bd.nivel}</span>
                  </button>
                );
              })}
            </div>

            {selected ? (
              <div>
                {/* BD Header */}
                <div style={{
                  background: C.darkGreen, borderRadius: 12, padding: "16px 20px",
                  marginBottom: 16, display: "flex", gap: 24, alignItems: "center",
                }}>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: C.snow }}>{selected.name}</div>
                    <div style={{ fontSize: 11, color: C.persian, marginTop: 2 }}>
                      {selected.target === 0
                        ? "BD nueva — sin objetivo en abril"
                        : `${selected.leadgenMeetings} / ${selected.target} meetings · ${pct(selected)}% cumplimiento`
                      }
                    </div>
                  </div>
                  <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
                    {[
                      { label: "Meetings", val: fmt(selected.meetCom) },
                      { label: "Cierres", val: fmt(selected.cierreCom) },
                      { label: "Total", val: fmt(selected.total), highlight: true },
                    ].map(s => (
                      <div key={s.label} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 10, color: C.persian, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 2 }}>{s.label}</div>
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: s.highlight ? C.mindaro : C.snow }}>{s.val}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meetings Detail */}
                <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", marginBottom: 14 }}>
                  <div style={{ background: "rgba(20,45,43,0.06)", padding: "10px 16px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 12, color: C.darkGreen }}>
                    Meetings ({selected.meetings.length})
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                        {["Deal", "Origin", "Size", "Quality", "Comentario", "Valor"].map(h => (
                          <th key={h} style={{ padding: "8px 14px", textAlign: h === "Valor" ? "right" : "left", fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 600, color: C.textMuted, textTransform: "uppercase" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {selected.meetings.map((m, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? "#fff" : "rgba(20,45,43,0.02)" }}>
                          <td style={{ padding: "9px 14px", fontSize: 12, color: C.darkGreen, maxWidth: 200 }}>{m.deal}</td>
                          <td style={{ padding: "9px 14px" }}>
                            <span style={{
                              fontSize: 10, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif",
                              background: m.origin === "LEADGEN" ? C.persian : m.origin === "WEB PAID MEDIA" ? C.dogwood : C.lavender,
                              color: m.origin === "LEADGEN" ? C.snow : C.darkGreen,
                              padding: "2px 8px", borderRadius: 10,
                            }}>{m.origin}</span>
                          </td>
                          <td style={{ padding: "9px 14px", fontSize: 12, color: C.textMuted }}>{m.size}</td>
                          <td style={{ padding: "9px 14px", fontSize: 12, color: C.textMuted }}>{m.quality}</td>
                          <td style={{ padding: "9px 14px", fontSize: 12, color: C.textMuted, fontStyle: "italic" }}>{m.comment}</td>
                          <td style={{ padding: "9px 14px", textAlign: "right", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color: m.valor > 0 ? C.darkGreen : C.textMuted }}>
                            {m.valor > 0 ? fmt(m.valor) : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Cierres Detail */}
                {selected.cierresDetail.length > 0 && (
                  <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
                    <div style={{ background: "rgba(20,45,43,0.06)", padding: "10px 16px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 12, color: C.darkGreen }}>
                      Cierres ({selected.cierresDetail.length})
                    </div>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                          {["Deal", "Size", "Comisión", "Revenue facturado"].map(h => (
                            <th key={h} style={{ padding: "8px 14px", textAlign: h !== "Deal" ? "right" : "left", fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 600, color: C.textMuted, textTransform: "uppercase" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {selected.cierresDetail.map((c, i) => (
                          <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                            <td style={{ padding: "9px 14px", fontSize: 12, color: C.darkGreen }}>{c.deal}</td>
                            <td style={{ padding: "9px 14px", fontSize: 12, color: C.textMuted, textAlign: "right" }}>{c.size}</td>
                            <td style={{ padding: "9px 14px", textAlign: "right", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color: C.darkGreen }}>{fmt(c.valor)}</td>
                            <td style={{ padding: "9px 14px", textAlign: "right", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, color: C.persian }}>{fmt(c.revenue)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "60px 0", color: C.textMuted, fontSize: 13 }}>
                Seleccioná un BD para ver el detalle de sus meetings y cierres
              </div>
            )}
          </div>
        )}

        {/* ── RANKING TAB ── */}
        {activeTab === "ranking" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Ranking comisiones */}
            <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
              <div style={{ background: C.darkGreen, padding: "12px 16px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 12, color: C.mindaro }}>
                🏆 Ranking por comisión total
              </div>
              {sorted.map((bd, i) => (
                <div key={bd.name} style={{
                  padding: "12px 16px", display: "flex", alignItems: "center", gap: 12,
                  borderBottom: i < sorted.length - 1 ? `1px solid ${C.border}` : "none",
                }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                    background: i === 0 ? "#f4d03f" : i === 1 ? "#bdc3c7" : i === 2 ? "#ca8a57" : C.border,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11,
                    color: i < 3 ? "#fff" : C.textMuted,
                  }}>{i + 1}</div>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, flex: 1, color: C.darkGreen }}>{bd.name}</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: C.darkGreen }}>{fmt(bd.total)}</span>
                </div>
              ))}
            </div>

            {/* Ranking revenue */}
            <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
              <div style={{ background: C.persian, padding: "12px 16px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 12, color: C.snow }}>
                💰 Ranking por revenue generado
              </div>
              {[...bdData].sort((a, b) => b.revenue - a.revenue).map((bd, i) => (
                <div key={bd.name} style={{
                  padding: "12px 16px", display: "flex", alignItems: "center", gap: 12,
                  borderBottom: i < bdData.length - 1 ? `1px solid ${C.border}` : "none",
                  background: bd.revenue === 0 ? "rgba(20,45,43,0.02)" : "#fff",
                }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                    background: i === 0 ? "#f4d03f" : i === 1 ? "#bdc3c7" : i === 2 ? "#ca8a57" : C.border,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11,
                    color: i < 3 ? "#fff" : C.textMuted,
                  }}>{i + 1}</div>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, flex: 1, color: bd.revenue === 0 ? C.textMuted : C.darkGreen }}>{bd.name}</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: bd.revenue > 0 ? C.persian : C.textMuted }}>
                    {bd.revenue > 0 ? fmt(bd.revenue) : "—"}
                  </span>
                </div>
              ))}
            </div>

            {/* KPIs */}
            <div style={{ gridColumn: "1 / -1", background: C.darkGreen, borderRadius: 12, padding: "20px 24px" }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 12, color: C.persian, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                KPIs del mes
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                {[
                  { label: "Mejor BD (comisión)", value: sorted[0].name, sub: fmt(sorted[0].total) },
                  { label: "Mayor revenue", value: [...bdData].sort((a,b)=>b.revenue-a.revenue)[0].name, sub: fmt([...bdData].sort((a,b)=>b.revenue-a.revenue)[0].revenue) },
                  { label: "ROI promedio", value: TOTAL_REVENUE > 0 ? `${((TOTAL_COM / TOTAL_REVENUE) * 100).toFixed(1)}%` : "—", sub: "Comisión / Revenue" },
                  { label: "Meetings promedio", value: `${(TOTAL_MEETINGS / bdData.filter(b=>b.target>0).length).toFixed(1)}`, sub: "por BD (excl. nuevas)" },
                ].map(k => (
                  <div key={k.label}>
                    <div style={{ fontSize: 10, color: C.persian, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 4 }}>{k.label}</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: C.mindaro }}>{k.value}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,247,243,0.45)", marginTop: 2 }}>{k.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {showSlack && <SlackModal onClose={() => setShowSlack(false)} />}
    </div>
  );
}
