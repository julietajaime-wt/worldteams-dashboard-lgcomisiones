// WorldTeams LeadGen Dashboard — Abril 2026
// Dependencies: react, recharts
// Usage: import Dashboard from './Dashboard'
// Fonts: add to index.html → <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Manrope:wght@400;500&display=swap" rel="stylesheet">

import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, Legend
} from "recharts";

// ─── BRAND COLORS ────────────────────────────────────────────────────────────
const C = {
  pink:    "#ffbdf4",
  lime:    "#d2f176",
  teal:    "#58958c",
  cream:   "#fff7f3",
  darkPurple: "#3e0d2a",
  magenta: "#f900a8",
  sand:    "#d4b5aa",
  darkGreen: "#142d2b",
  black:   "#131313",
  bg:      "#ffffff",
  bgAlt:   "#f9f9f7",
  border:  "rgba(0,0,0,0.08)",
  text:    "#131313",
  textMuted: "#6b6b68",
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const BD_CONFIG = {
  Luna:       { color: C.teal,       textColor: "#fff",        target: 6,  lg: 6,  pct: 100, nivel: "100%"  },
  Luisa:      { color: C.magenta,    textColor: "#fff",        target: 6,  lg: 9,  pct: 150, nivel: "140%+" },
  Renata:     { color: C.lime,       textColor: C.darkGreen,   target: 6,  lg: 5,  pct: 83,  nivel: "80%"   },
  Mia:        { color: C.pink,       textColor: C.darkPurple,  target: 6,  lg: 6,  pct: 100, nivel: "100%"  },
  "Sofi S":   { color: C.sand,       textColor: C.darkPurple,  target: 4,  lg: 4,  pct: 100, nivel: "100%"  },
  Daniel:     { color: C.darkGreen,  textColor: C.lime,        target: 5,  lg: 3,  pct: 60,  nivel: "<80%"  },
  Luciana:    { color: C.black,      textColor: C.sand,        target: 6,  lg: 3,  pct: 50,  nivel: "<80%"  },
  "Ana Paula":{ color: C.darkPurple, textColor: C.pink,        target: 5,  lg: 1,  pct: 20,  nivel: "<80%"  },
};

const BD_NAMES = ["Luna","Luisa","Renata","Mia","Sofi S","Daniel","Luciana","Ana Paula"];

const MEETINGS_DATA = [
  { deal:"Blueprint & Co - Trevor Dickson",     origin:"LEADGEN",       size:"Small",  who:"Luna",     lq:"Mid low",       comment:"Se abonan al 100%",           valor:100 },
  { deal:"Todd & Associates - Shelley C.",       origin:"LEADGEN",       size:"Mid",    who:"Luna",     lq:"Mid high",      comment:"Se abonan al 100%",           valor:150 },
  { deal:"AE Works - David Andros",             origin:"LEADGEN",       size:"Mid",    who:"Luna",     lq:"Mid high",      comment:"Se abonan al 100%",           valor:150 },
  { deal:"Matlock Homes - Byron Matlock",       origin:"LEADGEN",       size:"Small",  who:"Luna",     lq:"Low",           comment:"Low - Se abonan al 100% (tope)", valor:100 },
  { deal:"LGI Homes - Luke Lansman",            origin:"LEADGEN",       size:"Big",    who:"Luna",     lq:"Mid low",       comment:"Se abonan al 100%",           valor:150 },
  { deal:"SPT Architecture - Jeff Koch",        origin:"LEADGEN",       size:"Mid",    who:"Luna",     lq:"Mid high",      comment:"Se abonan al 100%",           valor:150 },
  { deal:"Jensen Architects - Steven Huegli",   origin:"LEADGEN",       size:"Mid",    who:"Luisa",    lq:"Mid high",      comment:"Se abonan al 140%",           valor:200 },
  { deal:"Firm Ground Architects - T. Wasmoen", origin:"LEADGEN",       size:"Small",  who:"Luisa",    lq:"Mid high",      comment:"Se abonan al 140%",           valor:140 },
  { deal:"Giampiero Tagliaferri - Rebecca",     origin:"LEADGEN",       size:"Mid",    who:"Luisa",    lq:"Mid high",      comment:"Se abonan al 140%",           valor:200 },
  { deal:"DOXworks Architecture - J. Ginnis",   origin:"LEADGEN",       size:"Small",  who:"Luisa",    lq:"Mid low",       comment:"Se abonan al 140%",           valor:140 },
  { deal:"Cooney Homes - Nick Girard",          origin:"LEADGEN",       size:"Small",  who:"Luisa",    lq:"Mid high",      comment:"Se abonan al 140%",           valor:140 },
  { deal:"Hadar Interiors - New Deal",          origin:"LEADGEN",       size:"Small",  who:"Luisa",    lq:"Mid low",       comment:"Se abonan al 140%",           valor:140 },
  { deal:"Camillo Companies - Nathan Siems",    origin:"LEADGEN",       size:"Big",    who:"Luisa",    lq:"Mid high",      comment:"Se abonan al 140%",           valor:200 },
  { deal:"Just Decorate - Anna Young",          origin:"LEADGEN",       size:"Small",  who:"Luisa",    lq:"Low",           comment:"Low - Se abonan al 100% (tope)", valor:100 },
  { deal:"Novo Domus Design - E. Perez",        origin:"LEADGEN",       size:"Small",  who:"Luisa",    lq:"Mid low",       comment:"Se abonan al 140%",           valor:140 },
  { deal:"Maxim Popov - Metro craft",           origin:"WEB PAID MEDIA",size:"Small",  who:"Luisa",    lq:"Low",           comment:"Se abonan al 100%",           valor:100 },
  { deal:"Mike Stake - studio 4/8/26",          origin:"WEB PAID MEDIA",size:"Small",  who:"Luisa",    lq:"Mid low",       comment:"Se abonan al 100%",           valor:100 },
  { deal:"Tessere - John Ford",                 origin:"LEADGEN",       size:"Big",    who:"Renata",   lq:"High potential",comment:"Se abonan al 80%",            valor:120 },
  { deal:"SEK Architects - S. Kowalski",        origin:"LEADGEN",       size:"Small",  who:"Renata",   lq:"Mid high",      comment:"Se abonan al 80%",            valor:80  },
  { deal:"AOTA Design Studio - T. Evans",       origin:"LEADGEN",       size:"Small",  who:"Renata",   lq:"Mid low",       comment:"Se abonan al 80%",            valor:80  },
  { deal:"Cultivateland - Jake Salzman",        origin:"LEADGEN",       size:"Small",  who:"Renata",   lq:"Mid low",       comment:"Se abonan al 80%",            valor:80  },
  { deal:"Creative Contracting - M. Streicher", origin:"LEADGEN",       size:"Mid",    who:"Renata",   lq:"Mid high",      comment:"Se abonan al 80%",            valor:120 },
  { deal:"Century Communities - J. Kollman",    origin:"LEADGEN",       size:"Big",    who:"Mia",      lq:"Mid high",      comment:"Se abonan al 100%",           valor:150 },
  { deal:"Balding Design Build - N. Balding",   origin:"LEADGEN",       size:"Small",  who:"Mia",      lq:"Mid low",       comment:"Se abonan al 100%",           valor:100 },
  { deal:"FunCycled - Sarah Trop",              origin:"LEADGEN",       size:"Small",  who:"Mia",      lq:"Mid low",       comment:"Se abonan al 100%",           valor:100 },
  { deal:"LJI Design - Jodi and Lindsey",       origin:"LEADGEN",       size:"Mid",    who:"Mia",      lq:"Mid low",       comment:"Se abonan al 100%",           valor:150 },
  { deal:"Guzman Engineering - R. Guzman",      origin:"LEADGEN",       size:"Small",  who:"Mia",      lq:"Mid low",       comment:"Se abonan al 100%",           valor:100 },
  { deal:"EDM Engineering - J. Richardson",     origin:"LEADGEN",       size:"Small",  who:"Mia",      lq:"High potential",comment:"Se abonan al 100%",           valor:100 },
  { deal:"4RM+ULA - James Garrett Jr",          origin:"LEADGEN",       size:"Small",  who:"Sofi S",   lq:"Mid low",       comment:"Se abonan al 100%",           valor:100 },
  { deal:"Perigon Design - M. Demetriou",       origin:"LEADGEN",       size:"Small",  who:"Sofi S",   lq:"Mid low",       comment:"Se abonan al 100%",           valor:100 },
  { deal:"Designed to Build - A. Privette",     origin:"LEADGEN",       size:"Small",  who:"Sofi S",   lq:"Low",           comment:"Low - Se abonan al 100% (tope)", valor:100 },
  { deal:"Ghatit Studio - Adham el Ghatit",     origin:"LEADGEN",       size:"Small",  who:"Sofi S",   lq:"Mid low",       comment:"Se abonan al 100%",           valor:100 },
  { deal:"Ramirez Johnson & Associates",        origin:"LEADGEN",       size:"Mid",    who:"Daniel",   lq:"Mid high",      comment:"No aplica",                   valor:0   },
  { deal:"Huitt Zollars - John Jarrard",        origin:"LEADGEN",       size:"Big",    who:"Daniel",   lq:"Mid high",      comment:"No aplica",                   valor:0   },
  { deal:"Summit Water Engineers",              origin:"LEADGEN",       size:"Small",  who:"Daniel",   lq:"Mid low",       comment:"No aplica",                   valor:0   },
  { deal:"Clements Engineering Inc",            origin:"LEADGEN",       size:"Small",  who:"Luciana",  lq:"Mid low",       comment:"No aplica",                   valor:0   },
  { deal:"Michael Barron-Wike Architect",       origin:"LEADGEN",       size:"Small",  who:"Luciana",  lq:"Low",           comment:"No aplica",                   valor:0   },
  { deal:"Jewel Toned Interiors - B. Ferren",   origin:"LEADGEN",       size:"Small",  who:"Luciana",  lq:"Mid high",      comment:"No aplica",                   valor:0   },
  { deal:"Blue Frog Design Group",              origin:"LEADGEN",       size:"Small",  who:"Ana Paula",lq:"Mid low",       comment:"No aplica",                   valor:0   },
];

const CIERRES_DATA = [
  { deal:"Ray Renders - Caleb Ray",                 origin:"LEADGEN", size:"Small", who:"Renata",   valor:50,  revenue:1767   },
  { deal:"Meredith Rebolledo Interior Design",      origin:"LEADGEN", size:"Small", who:"Luisa",    valor:50,  revenue:1656   },
  { deal:"GO WEST Architecture + Nick Otto",        origin:"LEADGEN", size:"Small", who:"Mia",      valor:50,  revenue:1400   },
  { deal:"Willingham & Towne - Andrew W.",          origin:"LEADGEN", size:"Small", who:"Luciana",  valor:50,  revenue:1330   },
  { deal:"Gladwin Vaughn Architecture",             origin:"LEADGEN", size:"Small", who:"Renata",   valor:50,  revenue:840    },
  { deal:"Libby Langdon Interiors",                 origin:"LEADGEN", size:"Small", who:"Mia",      valor:50,  revenue:300    },
  { deal:"Egan Simon - Rene R. Rodriguez",          origin:"LEADGEN", size:"Small", who:"Sofi S",   valor:50,  revenue:857.5  },
  { deal:"Hadar Interiors - New Deal",              origin:"LEADGEN", size:"Small", who:"Luisa",    valor:50,  revenue:350    },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const usd = (v) => v > 0 ? `$${v.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "-";
const pct = (v) => `${Math.round(v)}%`;

function initials(name) {
  return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

function bdMeetingsComision(name) {
  return MEETINGS_DATA.filter(m => m.who === name).reduce((a, m) => a + m.valor, 0);
}
function bdCierresComision(name) {
  return CIERRES_DATA.filter(c => c.who === name).reduce((a, c) => a + c.valor, 0);
}
function bdCierresRevenue(name) {
  return CIERRES_DATA.filter(c => c.who === name).reduce((a, c) => a + c.revenue, 0);
}
function bdCierresCount(name) {
  return CIERRES_DATA.filter(c => c.who === name).length;
}
function bdTotal(name) {
  return bdMeetingsComision(name) + bdCierresComision(name);
}

// ─── LEVEL BADGE ─────────────────────────────────────────────────────────────
function LevelBadge({ nivel }) {
  const styles = {
    "140%+": { bg: C.pink,    color: C.darkPurple },
    "100%":  { bg: C.lime,    color: C.darkGreen  },
    "80%":   { bg: "#fff3c4", color: "#7a5400"    },
    "<80%":  { bg: "#fde0e0", color: "#8b1a1a"    },
  };
  const s = styles[nivel] || styles["<80%"];
  return (
    <span style={{
      background: s.bg, color: s.color,
      fontSize: 10, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif",
      padding: "2px 8px", borderRadius: 10, whiteSpace: "nowrap",
    }}>
      {nivel}
    </span>
  );
}

// ─── AVATAR ───────────────────────────────────────────────────────────────────
function Avatar({ name, size = 28 }) {
  const cfg = BD_CONFIG[name] || { color: C.teal, textColor: "#fff" };
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: cfg.color, color: cfg.textColor,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Space Grotesk', sans-serif", fontSize: size * 0.38, fontWeight: 600,
      flexShrink: 0,
    }}>
      {initials(name)}
    </div>
  );
}

// ─── METRIC CARD ─────────────────────────────────────────────────────────────
function MetricCard({ label, value, accent }) {
  return (
    <div style={{
      background: C.bgAlt, borderRadius: 10, padding: "14px 16px",
      borderLeft: accent ? `3px solid ${accent}` : "none",
    }}>
      <div style={{ fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6, fontFamily: "'Manrope', sans-serif" }}>
        {label}
      </div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 600, color: C.text }}>
        {value}
      </div>
    </div>
  );
}

// ─── SECTION TITLE ───────────────────────────────────────────────────────────
function SectionTitle({ children }) {
  return (
    <div style={{
      fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 500,
      color: C.text, marginBottom: 12, paddingBottom: 8,
      borderBottom: `0.5px solid ${C.border}`, marginTop: 28,
    }}>
      {children}
    </div>
  );
}

// ─── CUSTOM TOOLTIP ──────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload) return null;
  return (
    <div style={{
      background: "#fff", border: `0.5px solid ${C.border}`,
      borderRadius: 8, padding: "10px 14px", fontSize: 12,
      fontFamily: "'Manrope', sans-serif", boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
    }}>
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, marginBottom: 6, color: C.text }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, margin: "2px 0" }}>
          {p.name}: <strong>{usd(p.value)}</strong>
        </p>
      ))}
    </div>
  );
}


// ─── SLACK CONFIG ────────────────────────────────────────────────────────────
const SLACK_WEBHOOK = "https://hooks.slack.com/services/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";
const DASHBOARD_URL = "https://worldteams-dashboard-lgcomisiones.vercel.app";
const MES = "Abril 2026";

// ─── SLACK MODAL ─────────────────────────────────────────────────────────────
function SlackModal({ onClose }) {
  const mensaje = `Hola! Soy Claudita, la asistente IA de Juli Jaime. Les comparto las comisiones de Lead Gen del mes ${MES}. Revisar y confirmar a la brevedad! Gracias totales!

🔗 ${DASHBOARD_URL}`;
  const [copiado, setCopiado] = useState(false);

  function copiar() {
    navigator.clipboard.writeText(mensaje).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    });
  }

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, padding: 24,
    }}>
      <div style={{
        background: "#fff", borderRadius: 16, padding: 28,
        maxWidth: 500, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600 }}>
            Mensaje para Slack
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: C.textMuted }}>✕</button>
        </div>

        {/* Preview estilo Slack */}
        <div style={{
          background: "#f8f8f8", borderRadius: 10, padding: 16,
          marginBottom: 16, border: `0.5px solid ${C.border}`,
        }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8, flexShrink: 0,
              background: C.darkGreen, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 18,
            }}>🤖</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                Claudita <span style={{ fontSize: 10, color: C.textMuted, fontWeight: 400 }}>hoy</span>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.6, color: C.text, whiteSpace: "pre-line" }}>
                {mensaje}
              </div>
            </div>
          </div>
        </div>

        {/* Instrucción */}
        <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 14, textAlign: "center" }}>
          Copiá el mensaje y pegalo en el canal de Slack
        </div>

        {/* Botones */}
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{
            background: "none", border: `0.5px solid ${C.border}`, borderRadius: 20,
            padding: "8px 20px", fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 13, cursor: "pointer", color: C.textMuted,
          }}>Cerrar</button>
          <button onClick={copiar} style={{
            background: copiado ? C.teal : C.darkGreen,
            color: copiado ? "#fff" : C.lime,
            border: "none", borderRadius: 20,
            padding: "8px 24px", fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            transition: "background 0.2s",
          }}>
            {copiado ? "✅ ¡Copiado!" : "📋 Copiar mensaje"}
          </button>
        </div>
      </div>
    </div>
  );
}


export default function Dashboard() {
  const [meetingsFilter, setMeetingsFilter] = useState("all");
  const [detailSearch, setDetailSearch] = useState("");
  const [showSlack, setShowSlack] = useState(false);

  const totalComMeetings = MEETINGS_DATA.reduce((a, m) => a + m.valor, 0);
  const totalComCierres  = CIERRES_DATA.reduce((a, c) => a + c.valor, 0);
  const totalCom         = totalComMeetings + totalComCierres;
  const totalMeetingsLG  = MEETINGS_DATA.filter(m => m.origin === "LEADGEN").length;
  const totalCierresLG   = CIERRES_DATA.length;
  const totalRevenue     = CIERRES_DATA.reduce((a, c) => a + c.revenue, 0);

  // Bar chart data
  const barData = BD_NAMES.map(name => ({
    name: name === "Ana Paula" ? "A. Paula" : name === "Sofi S" ? "Sofi S" : name,
    fullName: name,
    leadgen:  MEETINGS_DATA.filter(m => m.who === name && m.origin === "LEADGEN").reduce((a, m) => a + m.valor, 0),
    paid:     MEETINGS_DATA.filter(m => m.who === name && m.origin !== "LEADGEN").reduce((a, m) => a + m.valor, 0),
    cierres:  CIERRES_DATA.filter(c => c.who === name).reduce((a, c) => a + c.valor, 0),
  }));

  // Rankings
  const rankComision = [...BD_NAMES].sort((a, b) => bdTotal(b) - bdTotal(a));
  const rankCierres  = [...BD_NAMES].sort((a, b) => bdCierresCount(b) - bdCierresCount(a)).filter(n => bdCierresCount(n) > 0);
  const rankRevenue  = [...BD_NAMES].sort((a, b) => bdCierresRevenue(b) - bdCierresRevenue(a)).filter(n => bdCierresRevenue(n) > 0);

  const maxCom     = bdTotal(rankComision[0]) || 1;
  const maxRev     = bdCierresRevenue(rankRevenue[0]) || 1;
  const maxCierres = bdCierresCount(rankCierres[0]) || 1;

  // Detail table filter
  const allMeetingsRows = MEETINGS_DATA.map(m => ({ ...m, type: "Meeting" }));
  const allCierresRows  = CIERRES_DATA.map(c => ({ ...c, type: "Cierre" }));
  const allRows = [...allMeetingsRows, ...allCierresRows];
  const filteredRows = allRows.filter(r => {
    const q = detailSearch.toLowerCase();
    if (!q) return true;
    return r.deal.toLowerCase().includes(q) || r.who.toLowerCase().includes(q) || r.origin.toLowerCase().includes(q);
  });

  return (
    <div style={{
      fontFamily: "'Manrope', sans-serif",
      background: C.bg,
      minHeight: "100vh",
      padding: "0",
    }}>
      {showSlack && <SlackModal onClose={() => setShowSlack(false)} />}
      {/* HEADER */}
      <div style={{
        background: C.darkGreen, padding: "18px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 600, color: C.lime, letterSpacing: "-0.5px" }}>
            WorldTeams <span style={{ color: "#fff", fontWeight: 400 }}>/ LeadGen</span>
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2, fontFamily: "'Manrope', sans-serif" }}>
            Dashboard de comisiones
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{
            background: C.lime, color: C.darkGreen,
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
            padding: "6px 16px", borderRadius: 20,
          }}>
            Abril 2026
          </div>
          <button
            onClick={() => setShowSlack(true)}
            style={{
              background: C.magenta, color: "#fff", border: "none", borderRadius: 20,
              padding: "6px 16px", fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
            }}
          >
            📣 Enviar a Slack
          </button>
        </div>
      </div>

      <div style={{ padding: "24px 32px", maxWidth: 1100, margin: "0 auto" }}>

        {/* INDICADORES MACRO */}
        <SectionTitle>Resumen del mes</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: 8 }}>
          <MetricCard label="Comisiones meetings"  value={usd(totalComMeetings)} accent={C.teal}    />
          <MetricCard label="Comisiones cierres"   value={usd(totalComCierres)}  accent={C.lime}    />
          <MetricCard label="Total comisiones"     value={usd(totalCom)}         accent={C.magenta} />
          <MetricCard label="Meetings LEADGEN"     value={totalMeetingsLG}       accent={C.sand}    />
          <MetricCard label="Cierres LEADGEN"      value={totalCierresLG}        accent={C.darkGreen} />
        </div>

        {/* PERFORMANCE POR BD — CHART */}
        <SectionTitle>Performance por Business Developer</SectionTitle>

        <div style={{
          background: C.bgAlt, borderRadius: 12, padding: "16px 16px 8px",
          border: `0.5px solid ${C.border}`, marginBottom: 12,
        }}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 12, fontSize: 11, color: C.textMuted, fontFamily: "'Manrope', sans-serif" }}>
            {[
              { color: C.teal,    label: "Meetings LEADGEN" },
              { color: C.pink,    label: "Paid / Newsletter" },
              { color: C.lime,    label: "Cierres" },
            ].map(l => (
              <span key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: l.color, display: "inline-block" }} />
                {l.label}
              </span>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={barData} margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", fill: C.textMuted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: C.textMuted }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="leadgen"  name="LEADGEN"  stackId="a" fill={C.teal}    radius={[0,0,0,0]} />
              <Bar dataKey="paid"     name="Paid/NL"  stackId="a" fill={C.pink}    radius={[0,0,0,0]} />
              <Bar dataKey="cierres"  name="Cierres"  stackId="a" fill={C.lime}    radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* BD CARDS — RESUMEN */}
        <div style={{ display: "grid", gap: 8 }}>
          {BD_NAMES.map(name => {
            const cfg = BD_CONFIG[name];
            const meet = bdMeetingsComision(name);
            const cierr = bdCierresComision(name);
            const tot = bdTotal(name);
            const barW = Math.min(cfg.pct, 100);
            const barColor = cfg.pct >= 100 ? C.teal : cfg.pct >= 80 ? "#d4a017" : "#c0392b";

            return (
              <div key={name} style={{
                background: "#fff", border: `0.5px solid ${C.border}`,
                borderRadius: 10, padding: "12px 16px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <Avatar name={name} size={30} />
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 500, flex: 1 }}>{name}</span>
                  <LevelBadge nivel={cfg.nivel} />
                </div>

                {/* progress bar */}
                <div style={{ height: 4, background: "rgba(0,0,0,0.06)", borderRadius: 2, marginBottom: 10, overflow: "hidden" }}>
                  <div style={{ width: `${barW}%`, height: 4, background: barColor, borderRadius: 2 }} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, textAlign: "center" }}>
                  {[
                    { label: "Meet / Target", val: `${cfg.lg} / ${cfg.target}` },
                    { label: "Comis. meetings", val: meet > 0 ? usd(meet) : "-" },
                    { label: `Cierres (${bdCierresCount(name)})`, val: cierr > 0 ? usd(cierr) : "-" },
                    { label: "Total", val: tot > 0 ? usd(tot) : "-", accent: C.teal },
                  ].map(s => (
                    <div key={s.label}>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 500, color: s.accent || C.text }}>{s.val}</div>
                      <div style={{ fontSize: 10, color: C.textMuted, marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* REVENUE DE CIERRES */}
        <SectionTitle>Revenue de clientes cerrados en abril (LEADGEN)</SectionTitle>
        <div style={{ display: "grid", gap: 8, marginBottom: 4 }}>
          {["Luisa","Mia","Renata","Sofi S","Luciana"].map(name => {
            const clients = CIERRES_DATA.filter(c => c.who === name);
            const totalRev = clients.reduce((a, c) => a + c.revenue, 0);
            return (
              <div key={name} style={{
                background: "#fff", border: `0.5px solid ${C.border}`,
                borderRadius: 10, overflow: "hidden",
              }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 14px", background: C.bgAlt,
                  borderBottom: `0.5px solid ${C.border}`,
                }}>
                  <Avatar name={name} size={26} />
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 500, flex: 1 }}>{name}</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: C.teal, fontWeight: 600 }}>
                    {usd(totalRev)} revenue
                  </span>
                </div>
                {clients.map((c, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", padding: "8px 14px", gap: 10,
                    borderBottom: i < clients.length - 1 ? `0.5px solid ${C.border}` : "none",
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, flex: 1, color: C.text }}>{c.deal}</span>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 500, color: C.text }}>
                      {usd(c.revenue)}
                    </span>
                    <span style={{ fontSize: 10, color: C.textMuted }}>comisión: {usd(c.valor)}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* RANKINGS */}
        <SectionTitle>Rankings</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, marginBottom: 4 }}>

          {/* Ranking Comisión */}
          <div style={{ background: C.bgAlt, borderRadius: 10, padding: "14px 16px", border: `0.5px solid ${C.border}` }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 500, marginBottom: 10, color: C.textMuted }}>Por comisión total</div>
            {rankComision.map((name, i) => {
              const val = bdTotal(name);
              const w = Math.round(val / maxCom * 100);
              return (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: C.textMuted, width: 16 }}>{i + 1}</span>
                  <Avatar name={name} size={22} />
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, flex: 1 }}>{name}</span>
                  <div style={{ width: 60, height: 4, background: "rgba(0,0,0,0.06)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: `${w}%`, height: 4, background: C.teal, borderRadius: 2 }} />
                  </div>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, minWidth: 52, textAlign: "right" }}>{usd(val)}</span>
                </div>
              );
            })}
          </div>

          {/* Ranking Cierres */}
          <div style={{ background: C.bgAlt, borderRadius: 10, padding: "14px 16px", border: `0.5px solid ${C.border}` }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 500, marginBottom: 10, color: C.textMuted }}>Por cantidad de cierres</div>
            {rankCierres.map((name, i) => {
              const val = bdCierresCount(name);
              const w = Math.round(val / maxCierres * 100);
              return (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: C.textMuted, width: 16 }}>{i + 1}</span>
                  <Avatar name={name} size={22} />
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, flex: 1 }}>{name}</span>
                  <div style={{ width: 60, height: 4, background: "rgba(0,0,0,0.06)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: `${w}%`, height: 4, background: C.lime, borderRadius: 2 }} />
                  </div>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, minWidth: 52, textAlign: "right" }}>{val} cierre{val > 1 ? "s" : ""}</span>
                </div>
              );
            })}
          </div>

          {/* Ranking Revenue */}
          <div style={{ background: C.bgAlt, borderRadius: 10, padding: "14px 16px", border: `0.5px solid ${C.border}` }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 500, marginBottom: 10, color: C.textMuted }}>Por revenue de cierres</div>
            {rankRevenue.map((name, i) => {
              const val = bdCierresRevenue(name);
              const w = Math.round(val / maxRev * 100);
              return (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: C.textMuted, width: 16 }}>{i + 1}</span>
                  <Avatar name={name} size={22} />
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, flex: 1 }}>{name}</span>
                  <div style={{ width: 60, height: 4, background: "rgba(0,0,0,0.06)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: `${w}%`, height: 4, background: C.magenta, borderRadius: 2 }} />
                  </div>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, minWidth: 52, textAlign: "right" }}>{usd(val)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* DETAIL TABLE */}
        <SectionTitle>Detalle completo — Pestaña Resultados</SectionTitle>

        <div style={{ marginBottom: 12 }}>
          <input
            type="text"
            placeholder="Buscar por deal, BD u origin..."
            value={detailSearch}
            onChange={e => setDetailSearch(e.target.value)}
            style={{
              width: "100%", padding: "8px 14px", borderRadius: 8,
              border: `0.5px solid ${C.border}`, fontSize: 13,
              fontFamily: "'Manrope', sans-serif", background: C.bgAlt,
              outline: "none", color: C.text,
            }}
          />
        </div>

        <div style={{ overflowX: "auto", borderRadius: 10, border: `0.5px solid ${C.border}` }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ background: C.bgAlt }}>
                {["Tipo","BD","Deal","Origin","Size","Lead Quality","Comentario","Valor"].map(h => (
                  <th key={h} style={{
                    padding: "8px 12px", textAlign: "left", fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 10, fontWeight: 500, color: C.textMuted,
                    textTransform: "uppercase", letterSpacing: "0.4px",
                    borderBottom: `0.5px solid ${C.border}`, whiteSpace: "nowrap",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((r, i) => {
                const isEven = i % 2 === 0;
                const isMeeting = r.type === "Meeting";
                return (
                  <tr key={i} style={{ background: isEven ? "#fff" : C.bgAlt }}>
                    <td style={{ padding: "7px 12px", borderBottom: `0.5px solid ${C.border}` }}>
                      <span style={{
                        fontSize: 10, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif",
                        padding: "2px 7px", borderRadius: 8,
                        background: isMeeting ? "#e8f4f2" : "#f0f7e0",
                        color: isMeeting ? C.teal : C.darkGreen,
                      }}>
                        {r.type}
                      </span>
                    </td>
                    <td style={{ padding: "7px 12px", borderBottom: `0.5px solid ${C.border}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Avatar name={r.who} size={20} />
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12 }}>{r.who}</span>
                      </div>
                    </td>
                    <td style={{ padding: "7px 12px", borderBottom: `0.5px solid ${C.border}`, maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: C.text }}>{r.deal}</td>
                    <td style={{ padding: "7px 12px", borderBottom: `0.5px solid ${C.border}`, whiteSpace: "nowrap" }}>
                      <span style={{
                        fontSize: 10, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif",
                        padding: "2px 7px", borderRadius: 8,
                        background: r.origin === "LEADGEN" ? "#e8f4f2" : r.origin === "WEB PAID MEDIA" ? "#fff0f8" : "#f5f5f5",
                        color: r.origin === "LEADGEN" ? C.teal : r.origin === "WEB PAID MEDIA" ? C.magenta : C.textMuted,
                      }}>
                        {r.origin}
                      </span>
                    </td>
                    <td style={{ padding: "7px 12px", borderBottom: `0.5px solid ${C.border}`, color: C.textMuted }}>{r.size || "-"}</td>
                    <td style={{ padding: "7px 12px", borderBottom: `0.5px solid ${C.border}`, color: C.textMuted }}>{r.lq || "-"}</td>
                    <td style={{ padding: "7px 12px", borderBottom: `0.5px solid ${C.border}`, color: C.textMuted, fontSize: 11 }}>{r.comment || "-"}</td>
                    <td style={{
                      padding: "7px 12px", borderBottom: `0.5px solid ${C.border}`,
                      fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
                      color: r.valor > 0 ? C.teal : C.textMuted,
                    }}>
                      {r.valor > 0 ? usd(r.valor) : "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{ background: C.darkGreen }}>
                <td colSpan={7} style={{ padding: "8px 12px", fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: C.lime }}>
                  Total ({filteredRows.length} filas)
                </td>
                <td style={{ padding: "8px 12px", fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: C.lime }}>
                  {usd(filteredRows.reduce((a, r) => a + r.valor, 0))}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>


        {/* SHEET LINK */}
        <div style={{ textAlign: "center", paddingBottom: 32 }}>
          <a
            href="https://docs.google.com/spreadsheets/d/1EyCqQ9AP-zvjIMW4PJnftBMhfokUPRCkympAN4hCIHI/edit"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 12,
              color: C.teal,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 16px",
              border: `0.5px solid ${C.teal}`,
              borderRadius: 20,
            }}
          >
            Ver hoja LeadGen – Comisiones en Google Sheets ↗
          </a>
        </div>

      </div>
    </div>
  );
}
