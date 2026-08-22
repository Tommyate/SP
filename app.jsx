import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  LayoutDashboard, CalendarDays, BookOpen, ClipboardCheck, ListTodo, Settings as SettingsIcon,
  Search, Camera, Upload, Plus, X, Check, ChevronRight, ChevronLeft, Moon, Sun, Sparkles,
  FileText, Flame, Clock, MapPin, User, GraduationCap, TrendingUp, AlertCircle, Layers,
  Zap, Menu, Calculator, Languages, Globe2, Landmark, Atom, Leaf, FlaskConical, Dumbbell,
  Palette, Music2, ImagePlus, Trash2, ArrowLeft, CheckCircle2, Circle, RotateCcw, Loader2,
  BrainCircuit, ScanText, Wand2, Tags, School, Pencil, Download, UploadCloud, FileJson, Bot, Send
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

/* ------------------------------------------------------------------ */
/* Theme tokens                                                        */
/* ------------------------------------------------------------------ */
const THEME_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

.sp-root{
  --radius-lg: 22px;
  --radius-md: 16px;
  --radius-sm: 11px;
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.sp-root[data-theme="light"]{
  --bg: #FAF9F7;
  --bg-elevated: #FFFFFF;
  --bg-soft: #F1EFEB;
  --bg-hover: #EDEBE6;
  --border: #E7E4DE;
  --border-strong: #D9D5CD;
  --text: #211F1C;
  --text-muted: #78756E;
  --text-faint: #A6A29A;
  --accent: #5B57F2;
  --accent-2: #7A76FF;
  --accent-soft: #ECEBFE;
  --accent-contrast: #FFFFFF;
  --teal: #0EA394;
  --teal-soft: #E1F5F2;
  --amber: #DB8B15;
  --amber-soft: #FBF0DD;
  --rose: #E0455D;
  --rose-soft: #FBE7EA;
  --shadow-card: 0 1px 2px rgba(30,25,15,0.04), 0 8px 24px -12px rgba(30,25,15,0.10);
  --shadow-pop: 0 12px 40px -8px rgba(30,25,15,0.22);
  --glass-bg: rgba(255,255,255,0.66);
  --glass-border: rgba(255,255,255,0.5);
}
.sp-root[data-theme="dark"]{
  --bg: #131316;
  --bg-elevated: #1C1C20;
  --bg-soft: #202024;
  --bg-hover: #26262B;
  --border: #2C2C31;
  --border-strong: #38383F;
  --text: #F2F1EE;
  --text-muted: #9C9AA4;
  --text-faint: #6C6A73;
  --accent: #8481FF;
  --accent-2: #9B98FF;
  --accent-soft: #26244A;
  --accent-contrast: #FFFFFF;
  --teal: #2DD4BF;
  --teal-soft: #16302D;
  --amber: #F0AC3D;
  --amber-soft: #332A17;
  --rose: #F0687D;
  --rose-soft: #37202A;
  --shadow-card: 0 1px 2px rgba(0,0,0,0.2), 0 12px 28px -10px rgba(0,0,0,0.5);
  --shadow-pop: 0 20px 50px -10px rgba(0,0,0,0.6);
  --glass-bg: rgba(28,28,32,0.7);
  --glass-border: rgba(255,255,255,0.08);
}
.sp-root{ background: var(--bg); color: var(--text); }
.sp-font-display{ font-family: 'Sora', 'Inter', system-ui, sans-serif; }
.sp-card{
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
}
.sp-card-hover:hover{ transform: translateY(-2px); border-color: var(--border-strong); }
.sp-glass{
  background: var(--glass-bg);
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  border-bottom: 1px solid var(--glass-border);
}
.sp-btn-primary{
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: var(--accent-contrast);
  border-radius: 999px;
  font-weight: 600;
  transition: transform .15s ease, box-shadow .15s ease, opacity .15s ease;
  box-shadow: 0 6px 20px -6px color-mix(in srgb, var(--accent) 60%, transparent);
}
.sp-btn-primary:hover{ transform: translateY(-1px) scale(1.015); opacity: .95; }
.sp-btn-primary:active{ transform: translateY(0px) scale(0.98); }
.sp-btn-secondary{
  background: var(--bg-soft);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-weight: 500;
  transition: all .15s ease;
}
.sp-btn-secondary:hover{ background: var(--bg-hover); border-color: var(--border-strong); }
.sp-input{
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text);
  transition: border-color .15s ease, background .15s ease;
}
.sp-input:focus{ outline: none; border-color: var(--accent); background: var(--bg-elevated); }
.sp-nav-item{
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  transition: all .15s ease;
}
.sp-nav-item:hover{ background: var(--bg-soft); color: var(--text); }
.sp-nav-item.active{ background: var(--accent-soft); color: var(--accent); font-weight: 600; }
.sp-fade-in{ animation: spFadeIn .35s cubic-bezier(.22,1,.36,1) both; }
@keyframes spFadeIn{ from{ opacity:0; transform: translateY(6px);} to{opacity:1; transform:none;} }
.sp-pop-in{ animation: spPopIn .3s cubic-bezier(.22,1,.36,1) both; }
@keyframes spPopIn{ from{opacity:0; transform: scale(.96) translateY(8px);} to{opacity:1; transform:none;} }
.sp-pulse-dot{ animation: spPulse 2s ease-in-out infinite; }
@keyframes spPulse{ 0%,100%{ box-shadow: 0 0 0 0 currentColor22;} 50%{ box-shadow: 0 0 0 6px transparent;} }
.sp-scroll::-webkit-scrollbar{ width:6px; height:6px; }
.sp-scroll::-webkit-scrollbar-thumb{ background: var(--border-strong); border-radius: 10px; }
.sp-shimmer{
  background: linear-gradient(90deg, var(--bg-soft) 25%, var(--bg-hover) 37%, var(--bg-soft) 63%);
  background-size: 400% 100%;
  animation: spShimmer 1.4s ease infinite;
}
@keyframes spShimmer{ 0%{background-position: 100% 50%;} 100%{background-position: 0 50%;} }
.sp-flip-card{ perspective: 1200px; }
.sp-flip-inner{ transition: transform .5s cubic-bezier(.22,1,.36,1); transform-style: preserve-3d; }
.sp-flip-inner.flipped{ transform: rotateY(180deg); }
.sp-flip-face{ backface-visibility: hidden; }
.sp-flip-back{ transform: rotateY(180deg); }
.sp-progress-track{ background: var(--bg-soft); border-radius: 999px; overflow:hidden; }
.sp-progress-fill{ background: linear-gradient(90deg, var(--accent), var(--teal)); border-radius: 999px; transition: width .6s cubic-bezier(.22,1,.36,1); }
`;

/* ------------------------------------------------------------------ */
/* Constants & helpers                                                 */
/* ------------------------------------------------------------------ */
const DAYS = [
  { key: "MO", label: "Montag", short: "Mo" },
  { key: "DI", label: "Dienstag", short: "Di" },
  { key: "MI", label: "Mittwoch", short: "Mi" },
  { key: "DO", label: "Donnerstag", short: "Do" },
  { key: "FR", label: "Freitag", short: "Fr" },
];

const SUBJECT_PALETTE = ["#5B57F2", "#0EA394", "#DB8B15", "#E0455D", "#3B82C4", "#7C9A3B", "#B15CC9", "#C97A3D"];

const SUBJECT_ICONS = {
  mathe: Calculator, mathematik: Calculator,
  deutsch: Languages, englisch: Globe2, franz: Globe2, spanisch: Globe2, latein: Landmark,
  geschichte: Landmark, geo: Globe2, erdkunde: Globe2, politik: Landmark, sozialkunde: Landmark,
  physik: Atom, chemie: FlaskConical, biologie: Leaf, bio: Leaf,
  sport: Dumbbell, kunst: Palette, musik: Music2,
};
function iconForSubject(name) {
  const key = (name || "").toLowerCase();
  for (const k in SUBJECT_ICONS) if (key.includes(k)) return SUBJECT_ICONS[k];
  return BookOpen;
}

const EXAM_TYPES = ["Abfrage", "Ex", "Schulaufgabe", "Referat"];
const EXAM_TYPE_META = {
  Abfrage: { color: "amber", verb: "Letzte Stunde intensiv wiederholen" },
  Ex: { color: "rose", verb: "Letzte zwei Unterrichtsstunden zusammenfassen" },
  Schulaufgabe: { color: "rose", verb: "Gesamten Stoff seit Stoffbeginn wiederholen" },
  Referat: { color: "teal", verb: "Referat vorbereiten & Quellen sichten" },
};

const IS_STANDALONE = typeof window !== "undefined" && !!window.STUDYPILOT_STANDALONE;
const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
const todayISO = () => new Date().toISOString().slice(0, 10);
const fmtDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("de-DE", { day: "2-digit", month: "short" });
};
const fmtDateLong = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("de-DE", { weekday: "long", day: "2-digit", month: "long" });
};
function daysUntil(iso) {
  const d = new Date(iso + "T00:00:00");
  const t = new Date(); t.setHours(0, 0, 0, 0);
  return Math.round((d - t) / 86400000);
}
function untilLabel(iso) {
  const n = daysUntil(iso);
  if (n < 0) return "vorbei";
  if (n === 0) return "heute";
  if (n === 1) return "morgen";
  return `in ${n} Tagen`;
}
function isoWeekday(date) { // 1=Mon .. 7=Sun
  const d = date.getDay();
  return d === 0 ? 7 : d;
}
function addDays(date, n) { const d = new Date(date); d.setDate(d.getDate() + n); return d; }

function computeTargetSchoolDay() {
  // returns {date, dayKey, rolledWeek(bool)}
  let cursor = addDays(new Date(), 1);
  let rolled = false;
  while (isoWeekday(cursor) > 5) { cursor = addDays(cursor, 1); rolled = true; }
  if (isoWeekday(addDays(new Date(), 0)) >= isoWeekday(cursor) && cursor - new Date() > 86400000 * 0) {
    // if the resulting day's weekday index is <= today's, we've rolled into next week
  }
  const todayWd = isoWeekday(new Date());
  const targetWd = isoWeekday(cursor);
  if (targetWd <= todayWd) rolled = true;
  const dayKey = DAYS[targetWd - 1]?.key || "MO";
  return { date: cursor, dayKey, rolled };
}

function computeLearningPlan({ schedule, exams, subjects, currentWeekType }) {
  const { date, dayKey, rolled } = computeTargetSchoolDay();
  const targetWeekType = rolled ? (currentWeekType === "A" ? "B" : "A") : currentWeekType;
  const targetISO = date.toISOString().slice(0, 10);

  const lessonsTomorrow = schedule.filter(
    (l) => l.day === dayKey && (l.week === "ALL" || l.week === targetWeekType)
  );
  const examsTomorrow = exams.filter((e) => e.date === targetISO);

  const bySubject = new Map();
  lessonsTomorrow.forEach((l) => {
    if (bySubject.has(l.subjectId)) return;
    const subj = subjects.find((s) => s.id === l.subjectId);
    const frequent = subj?.quizFrequency === "frequent";
    // Fächer mit häufigen (z.B. jede-Stunde-)Abfragen bekommen automatisch die intensivere Lernstufe,
    // auch ohne dass für jede einzelne Stunde eine Prüfung manuell eingetragen wurde.
    bySubject.set(l.subjectId, frequent
      ? { subjectId: l.subjectId, reason: "Abfrage jederzeit möglich", verb: "Letzte Stunde intensiv wiederholen", level: 2, exam: null }
      : { subjectId: l.subjectId, reason: "Unterricht", verb: "Letzte Stunde wiederholen", level: 1, exam: null });
  });
  examsTomorrow.forEach((e) => {
    const meta = EXAM_TYPE_META[e.type] || EXAM_TYPE_META.Abfrage;
    bySubject.set(e.subjectId, {
      subjectId: e.subjectId,
      reason: `Morgen ${e.type}`,
      verb: meta.verb,
      level: 3,
      exam: e,
    });
  });

  const list = Array.from(bySubject.values()).map((item) => ({
    ...item,
    subject: subjects.find((s) => s.id === item.subjectId),
  })).filter((i) => i.subject);

  list.sort((a, b) => b.level - a.level);
  return { targetDate: targetISO, targetLabel: fmtDateLong(targetISO), items: list };
}

const MASTERY_TIERS = [
  { max: 1, label: "Unsicher", color: "var(--rose)", bg: "var(--rose-soft)" },
  { max: 3, label: "Wird besser", color: "var(--amber)", bg: "var(--amber-soft)" },
  { max: 6, label: "Sitzt", color: "var(--teal)", bg: "var(--teal-soft)" },
];
function masteryTier(box) {
  const b = box || 1;
  return MASTERY_TIERS.find((t) => b <= t.max) || MASTERY_TIERS[MASTERY_TIERS.length - 1];
}
// Sammelt alle Begriffe eines oder mehrerer Fächer, sortiert von "am wenigsten sicher" nach "sitzt".
// Nutzt die srsBox aus dem Lernmodus (Leitner-System) als Mastery-Signal – keine neuen Daten nötig.
function computeWeakSpots(entries, subjects) {
  const bySubject = new Map((subjects || []).map((s) => [s.id, s]));
  const terms = entries.flatMap((e) => (e.terms || []).map((t) => ({
    ...t,
    entryDate: e.date,
    subjectId: e.subjectId,
    subject: bySubject.get(e.subjectId) || null,
  })));
  terms.sort((a, b) => {
    const boxDiff = (a.srsBox || 1) - (b.srsBox || 1);
    if (boxDiff !== 0) return boxDiff;
    return (a.srsDue || "").localeCompare(b.srsDue || "");
  });
  return terms;
}

function relevantEntriesForExam(exam, entries) {
  const subjectEntries = entries
    .filter((e) => e.subjectId === exam.subjectId && e.date <= exam.date)
    .sort((a, b) => b.date.localeCompare(a.date));
  if (exam.type === "Schulaufgabe") {
    if (exam.stoffbeginn) return subjectEntries.filter((e) => e.date >= exam.stoffbeginn).reverse();
    return [...subjectEntries].reverse();
  }
  if (exam.type === "Ex") return subjectEntries.slice(0, 2).reverse();
  return subjectEntries.slice(0, 1);
}

// Proaktiver Lernplan: verteilt den relevanten Stoff auf die verfügbaren Tage bis zur Prüfung,
// statt nur reaktiv "was ist morgen" zu zeigen. Rein algorithmisch (kein KI-Call), damit immer
// zuverlässig und ohne Wartezeit ein Plan entsteht.
function computeStudyPlan(exam, relevantEntries) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const examDate = new Date(exam.date + "T00:00:00");
  const totalDays = Math.round((examDate - today) / 86400000);

  if (totalDays <= 0) return { days: [], tooLate: true, reason: "Die Prüfung ist heute oder vorbei – jetzt nur noch schnell wiederholen." };
  if (!relevantEntries.length) return { days: [], tooLate: true, reason: "Noch keine Hefteinträge zu diesem Stoff vorhanden." };

  const sorted = [...relevantEntries].sort((a, b) => a.date.localeCompare(b.date));
  // Ziel: ~30% der verfügbaren Tage (mind. 1, max. 3) für Wiederholung reservieren, Rest für neuen Stoff.
  const reviewDaysTarget = Math.min(3, Math.max(1, Math.round(totalDays * 0.3)));
  const workDays = Math.min(Math.max(totalDays - reviewDaysTarget, 0), sorted.length);

  const days = [];
  let dayOffset = 0;

  if (workDays > 0) {
    const chunkSize = Math.ceil(sorted.length / workDays);
    for (let i = 0; i < workDays; i++) {
      const chunk = sorted.slice(i * chunkSize, (i + 1) * chunkSize);
      if (chunk.length === 0) continue;
      days.push({
        date: addDays(today, dayOffset).toISOString().slice(0, 10),
        phase: "erarbeiten",
        entries: chunk,
        title: `Stoff durcharbeiten (${chunk.length} Eintrag${chunk.length > 1 ? "e" : ""})`,
      });
      dayOffset++;
    }
  }

  while (dayOffset < totalDays) {
    days.push({
      date: addDays(today, dayOffset).toISOString().slice(0, 10),
      phase: "festigen",
      entries: sorted,
      title: "Zwischenwiederholung – gesamten Stoff überfliegen",
    });
    dayOffset++;
  }

  if (days.length > 0) days[days.length - 1].title = "Finale Wiederholung – alles nochmal komplett durchgehen";
  return { days, tooLate: false };
}

// Fasst aufeinanderfolgende Tage mit identischer Aufgabe zu einem Zeitraum zusammen (nur fürs UI).
function groupPlanDays(days) {
  const groups = [];
  for (const d of days) {
    const last = groups[groups.length - 1];
    if (last && last.title === d.title && last.phase === d.phase) {
      last.endDate = d.date;
      last.count++;
    } else {
      groups.push({ startDate: d.date, endDate: d.date, phase: d.phase, title: d.title, entries: d.entries, count: 1 });
    }
  }
  return groups;
}

function downscaleImage(file, maxW = 900, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ------------------------------------------------------------------ */
/* Echte KI-Anbindung (Claude in-app, kostenlos) + OpenRouter (eigener Key) */
/* ------------------------------------------------------------------ */
function buildAnalysisPrompt(subjectNames) {
  return `Du bist ein sorgfältiger Schulassistent. Dir werden ein oder mehrere Fotos EINES zusammenhängenden handschriftlichen Hefteintrags gezeigt (ggf. mehrere Seiten/Ausschnitte derselben Stunde).

Bekannte Fächer des Nutzers: ${subjectNames.join(", ") || "unbekannt"}.

Vorgehen:
1. Lies zunächst den gesamten sichtbaren Text sorgfältig, auch bei unordentlicher Handschrift, Streichungen, Pfeilen, Unterstreichungen oder Randnotizen. Wenn mehrere Bilder vorhanden sind, behandle sie als fortlaufenden Inhalt derselben Stunde.
2. Falls einzelne Wörter wirklich nicht entzifferbar sind, überspringe sie sinnvoll, statt sie zu erfinden – erfinde keine Fakten, Zahlen oder Formeln, die nicht erkennbar sind.
3. Bevorzuge bei der Fach-Erkennung eindeutige Hinweise (Heftaufschrift, Fachbegriffe, Themengebiet) vor reinem Raten.

Antworte AUSSCHLIESSLICH mit einem einzigen validen JSON-Objekt (keine Markdown-Codeblöcke, kein Fließtext davor oder danach) mit exakt diesen Feldern:

{
  "detectedSubject": "wahrscheinlichstes Fach aus der obigen Liste, oder bestes Schätzfach falls keins eindeutig passt",
  "detectedDate": "YYYY-MM-DD, nur falls auf dem Bild wirklich ein Datum erkennbar ist, sonst leerer String",
  "ocrText": "der roh erkannte, leicht bereinigte Text des Hefteintrags (max. 500 Zeichen, keine Erfindungen)",
  "summary": "eine flüssige, inhaltlich korrekte Zusammenfassung des Stundeninhalts in 2-4 Sätzen auf Deutsch, basierend NUR auf dem tatsächlich Erkennbaren",
  "bullets": ["3-6 knappe, konkrete Stichpunkte zum tatsächlichen Inhalt"],
  "terms": [{"term": "wichtiger, im Text vorkommender Fachbegriff", "def": "kurze, korrekte Definition basierend auf dem Kontext"}],
  "formulas": ["nur Formeln, die wirklich im Bild zu erkennen sind, sonst leeres Array"],
  "merkkasten": "ein einprägsamer, inhaltlich passender Merksatz oder Lerntipp zu diesem konkreten Inhalt (1-2 Sätze)"
}

Wenn ein Bild komplett unleserlich, leer oder erkennbar KEIN Hefteintrag ist, setze "summary" auf einen ehrlichen Hinweis darauf (z.B. "Der Text auf dem Foto war leider nicht lesbar genug für eine Analyse.") und lasse "terms"/"formulas" leer, statt Inhalte zu erfinden. Antworte nur mit dem JSON-Objekt, sonst nichts.`;
}

function parseAIJson(raw) {
  let text = (raw || "").trim();
  text = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("Keine gültige JSON-Antwort erhalten");
  const parsed = JSON.parse(text.slice(start, end + 1));
  return {
    detectedSubject: parsed.detectedSubject || "",
    detectedDate: parsed.detectedDate || "",
    ocrText: parsed.ocrText || "",
    summary: parsed.summary || "",
    bullets: Array.isArray(parsed.bullets) ? parsed.bullets : [],
    terms: Array.isArray(parsed.terms) ? parsed.terms : [],
    formulas: Array.isArray(parsed.formulas) ? parsed.formulas : [],
    merkkasten: parsed.merkkasten || "",
  };
}

// dataUrl -> { mediaType, base64 }
function splitDataUrl(dataUrl) {
  const m = /^data:(.+?);base64,(.*)$/.exec(dataUrl || "");
  if (!m) return { mediaType: "image/jpeg", base64: "" };
  return { mediaType: m[1], base64: m[2] };
}

async function callClaudeVision(images, subjectNames) {
  const prompt = buildAnalysisPrompt(subjectNames);
  const content = [
    ...images.map((img) => {
      const { mediaType, base64 } = splitDataUrl(img);
      return { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } };
    }),
    { type: "text", text: prompt },
  ];
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      messages: [{ role: "user", content }],
    }),
  });
  if (!response.ok) throw new Error(`Claude-Anfrage fehlgeschlagen (${response.status})`);
  const data = await response.json();
  const textBlock = (data.content || []).find((b) => b.type === "text");
  if (!textBlock) throw new Error("Keine Textantwort von Claude erhalten");
  return parseAIJson(textBlock.text);
}

async function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function callOpenRouterVision(apiKey, model, images, subjectNames) {
  const prompt = buildAnalysisPrompt(subjectNames);
  const content = [
    { type: "text", text: prompt },
    ...images.map((img) => ({ type: "image_url", image_url: { url: img } })),
  ];
  const doRequest = async () => {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://claude.ai",
        "X-Title": "StudyPilot",
      },
      body: JSON.stringify({
        model: model || "google/gemma-4-31b-it:free",
        messages: [{ role: "user", content }],
      }),
    });
    return response;
  };

  let lastError;
  // Bis zu 3 Versuche mit steigender Wartezeit, insbesondere für 429 (Ratenlimit kostenloser Modelle)
  for (let attempt = 0; attempt < 3; attempt++) {
    let response;
    try {
      response = await doRequest();
    } catch (networkErr) {
      lastError = new Error("OpenRouter nicht erreichbar (Netzwerk-/CORS-Fehler). Prüfe deine Verbindung oder wechsle zu „Claude (integriert)“.");
      await sleep(600 * (attempt + 1));
      continue;
    }
    if (response.status === 429) {
      lastError = new Error("OpenRouter-Ratenlimit erreicht (kostenlose Modelle sind begrenzt). Versuche es gleich noch einmal.");
      await sleep(1200 * (attempt + 1));
      continue;
    }
    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      throw new Error(`OpenRouter-Anfrage fehlgeschlagen (${response.status}) ${errText.slice(0, 120)}`);
    }
    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;
    if (!text) throw new Error("Keine Textantwort von OpenRouter erhalten");
    return parseAIJson(text);
  }
  throw lastError || new Error("OpenRouter-Anfrage fehlgeschlagen");
}

async function runAIAnalysis({ provider, openrouterApiKey, openrouterModel, images, subjectNames }) {
  if (provider === "openrouter") {
    if (!openrouterApiKey) throw new Error("Kein OpenRouter-API-Key hinterlegt (Einstellungen → KI).");
    return callOpenRouterVision(openrouterApiKey, openrouterModel, images, subjectNames);
  }
  return callClaudeVision(images, subjectNames);
}

/* KI-Tutor: beantwortet Fragen NUR auf Basis der eigenen Hefteinträge des Fachs ------ */
function buildTutorContext(entries, maxChars = 7000) {
  // Neueste zuerst einbeziehen, falls der Stoff insgesamt zu lang für den Kontext wäre.
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  const parts = [];
  let used = 0;
  for (const e of sorted) {
    const block = [
      `### Eintrag vom ${e.date}`,
      e.summary ? `Zusammenfassung: ${e.summary}` : "",
      e.bullets?.length ? `Stichpunkte: ${e.bullets.join("; ")}` : "",
      e.terms?.length ? `Begriffe: ${e.terms.map((t) => `${t.term} = ${t.def}`).join(" | ")}` : "",
      e.formulas?.length ? `Formeln: ${e.formulas.join(", ")}` : "",
      e.merkkasten ? `Merksatz: ${e.merkkasten}` : "",
    ].filter(Boolean).join("\n");
    if (used + block.length > maxChars) break;
    parts.push(block);
    used += block.length;
  }
  return parts.join("\n\n");
}

function buildTutorSystemPrompt(subjectName, contextText) {
  return `Du bist ein geduldiger Nachhilfelehrer für das Fach "${subjectName}" einer Schülerin/eines Schülers. Du kennst NUR den folgenden Stoff aus ihrem/seinem eigenen Unterricht (aus hochgeladenen Hefteinträgen):

---
${contextText || "(Noch keine Hefteinträge für diesen Lernumfang vorhanden.)"}
---

Regeln:
- Beantworte Fragen bevorzugt anhand des obigen Stoffs, mit derselben Terminologie wie im Unterricht verwendet.
- Erkläre verständlich und in kleinen Schritten, wie ein guter Nachhilfelehrer – nicht nur Fakten auflisten, sondern wirklich erklären.
- Wenn eine Frage über den oben gezeigten Stoff hinausgeht oder du es aus dem Kontext nicht sicher beantworten kannst, sag das ehrlich (z.B. "Das kommt in deinen bisherigen Einträgen nicht vor, aber allgemein gilt...") und gib dann trotzdem eine hilfreiche, korrekte Erklärung.
- Erfinde keine Fakten, die dem Stoff widersprechen.
- Antworte auf Deutsch, in kurzen bis mittellangen Absätzen, gerne mit einem kleinen Beispiel.`;
}

async function callClaudeTutor(systemPrompt, history) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 800,
      system: systemPrompt,
      messages: history.map((m) => ({ role: m.role, content: m.content })),
    }),
  });
  if (!response.ok) throw new Error(`Claude-Anfrage fehlgeschlagen (${response.status})`);
  const data = await response.json();
  const textBlock = (data.content || []).find((b) => b.type === "text");
  if (!textBlock) throw new Error("Keine Textantwort von Claude erhalten");
  return textBlock.text;
}

async function callOpenRouterTutor(apiKey, model, systemPrompt, history) {
  const messages = [{ role: "system", content: systemPrompt }, ...history.map((m) => ({ role: m.role, content: m.content }))];
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}`, "HTTP-Referer": "https://claude.ai", "X-Title": "StudyPilot" },
    body: JSON.stringify({ model: model || "google/gemma-4-31b-it:free", messages }),
  });
  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(`OpenRouter-Anfrage fehlgeschlagen (${response.status}) ${errText.slice(0, 120)}`);
  }
  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("Keine Textantwort von OpenRouter erhalten");
  return text;
}

async function runTutorChat({ provider, openrouterApiKey, openrouterModel, subjectName, contextEntries, history }) {
  const systemPrompt = buildTutorSystemPrompt(subjectName, buildTutorContext(contextEntries));
  if (provider === "openrouter") {
    if (!openrouterApiKey) throw new Error("Kein OpenRouter-API-Key hinterlegt (Einstellungen → KI).");
    return callOpenRouterTutor(openrouterApiKey, openrouterModel, systemPrompt, history);
  }
  return callClaudeTutor(systemPrompt, history);
}

/* Stundenplan aus Foto einlesen ------------------------------------- */
function buildScheduleImportPrompt(subjectNames) {
  return `Du bist ein Schulassistent. Dir wird ein Foto eines Stundenplans gezeigt (Tabelle mit Tagen Montag-Freitag und Unterrichtsstunden).

Bekannte Fächer des Nutzers: ${subjectNames.join(", ") || "noch keine"}.

Antworte AUSSCHLIESSLICH mit einem validen JSON-Array (keine Codeblöcke, kein Fließtext) von Unterrichtsstunden mit exakt diesen Feldern je Eintrag:
[{"day":"MO|DI|MI|DO|FR","start":"HH:MM","end":"HH:MM","subject":"Fachname wie im Stundenplan geschrieben","week":"ALL|A|B","teacher":"","room":""}]

Regeln: "week" ist "ALL" außer der Plan zeigt erkennbar A/B-Wochen-Kennzeichnung. Wenn Lehrer oder Raum nicht erkennbar sind, leere Strings verwenden. Gib nur Stunden zurück, die du tatsächlich im Bild erkennen kannst. Antworte nur mit dem JSON-Array.`;
}

function parseScheduleJson(raw) {
  let text = (raw || "").trim();
  text = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start === -1 || end === -1) throw new Error("Keine gültige JSON-Antwort erhalten");
  const parsed = JSON.parse(text.slice(start, end + 1));
  if (!Array.isArray(parsed)) throw new Error("Unerwartetes Antwortformat");
  return parsed.filter((r) => r && r.day && r.start && r.subject);
}

async function callClaudeScheduleImport(images, subjectNames) {
  const prompt = buildScheduleImportPrompt(subjectNames);
  const content = [
    ...images.map((img) => {
      const { mediaType, base64 } = splitDataUrl(img);
      return { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } };
    }),
    { type: "text", text: prompt },
  ];
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1500, messages: [{ role: "user", content }] }),
  });
  if (!response.ok) throw new Error(`Claude-Anfrage fehlgeschlagen (${response.status})`);
  const data = await response.json();
  const textBlock = (data.content || []).find((b) => b.type === "text");
  if (!textBlock) throw new Error("Keine Textantwort von Claude erhalten");
  return parseScheduleJson(textBlock.text);
}

async function callOpenRouterScheduleImport(apiKey, model, images, subjectNames) {
  const prompt = buildScheduleImportPrompt(subjectNames);
  const content = [{ type: "text", text: prompt }, ...images.map((img) => ({ type: "image_url", image_url: { url: img } }))];
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}`, "HTTP-Referer": "https://claude.ai", "X-Title": "StudyPilot" },
    body: JSON.stringify({ model: model || "google/gemma-4-31b-it:free", messages: [{ role: "user", content }] }),
  });
  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(`OpenRouter-Anfrage fehlgeschlagen (${response.status}) ${errText.slice(0, 120)}`);
  }
  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("Keine Textantwort von OpenRouter erhalten");
  return parseScheduleJson(text);
}

async function runScheduleImport({ provider, openrouterApiKey, openrouterModel, images, subjectNames }) {
  if (provider === "openrouter") {
    if (!openrouterApiKey) throw new Error("Kein OpenRouter-API-Key hinterlegt (Einstellungen → KI).");
    return callOpenRouterScheduleImport(openrouterApiKey, openrouterModel, images, subjectNames);
  }
  return callClaudeScheduleImport(images, subjectNames);
}


const MOCK_OCR_LINES = [
  "Merksatz: Wiederholung festigt das Langzeitgedächtnis.",
  "Wichtig für die nächste Stunde markiert.",
  "Tafelbild vom Lehrer übernommen.",
  "Beispielaufgabe mit Lösungsweg notiert.",
  "Zusatzinfo am Rand ergänzt.",
];

function generateMockAI(subjectName, dateISO) {
  const name = (subjectName || "").toLowerCase();
  const base = {
    summary: `In dieser Stunde zu ${subjectName} wurden die zentralen Grundlagen des aktuellen Themas eingeführt und an Beispielen verdeutlicht. Der Fokus lag auf dem Verständnis der Zusammenhänge sowie deren Anwendung in Übungsaufgaben.`,
    bullets: [
      "Einführung in das neue Teilthema",
      "Gemeinsame Erarbeitung an der Tafel",
      "Übungsaufgaben zur Vertiefung",
      "Hausaufgabe zur Wiederholung notiert",
    ],
    terms: [
      { term: "Kernbegriff A", def: "Zentrale Definition, die als Grundlage für die folgenden Stunden dient." },
      { term: "Kernbegriff B", def: "Erweiterter Begriff, der in Zusammenhang mit Kernbegriff A steht." },
    ],
    formulas: [],
    merkkasten: "Diese Inhalte bauen auf der letzten Stunde auf – vor der nächsten Stunde kurz wiederholen.",
  };

  if (name.includes("mathe")) {
    base.summary = "Es wurden neue Rechenregeln eingeführt und anhand mehrerer Beispielaufgaben Schritt für Schritt hergeleitet. Anschließend wurden die Regeln in Partnerarbeit an Übungsaufgaben angewendet.";
    base.terms = [
      { term: "Variable", def: "Platzhalter für eine noch unbekannte oder veränderliche Zahl." },
      { term: "Term", def: "Rechenausdruck aus Zahlen, Variablen und Rechenzeichen." },
    ];
    base.formulas = ["a² + b² = c²", "A = ½ · g · h"];
    base.merkkasten = "Merke: Klammern immer zuerst auflösen (Punkt- vor Strichrechnung, Klammern vor allem).";
  } else if (name.includes("englisch") || name.includes("franz") || name.includes("spanisch")) {
    base.summary = "Neue Vokabeln und eine Grammatikstruktur wurden eingeführt und in Beispielsätzen geübt. Zusätzlich wurde ein kurzer Text gelesen und inhaltlich besprochen.";
    base.terms = [
      { term: "Present Perfect", def: "Zeitform für Handlungen mit Bezug zur Gegenwart: have/has + past participle." },
      { term: "Vocabulary", def: "Neue Wörter aus dem Kapitel, siehe Liste im Heft." },
    ];
    base.merkkasten = "Vokabeln bis zur nächsten Stunde auswendig lernen – kurze Wiederholung reicht meist aus.";
  } else if (name.includes("geschichte") || name.includes("politik") || name.includes("sozial")) {
    base.summary = "Ein historisches Ereignis wurde in seinen Ursachen, seinem Verlauf und seinen Folgen besprochen. Anhand einer Quelle wurden zentrale Aussagen herausgearbeitet.";
    base.terms = [
      { term: "Quelle", def: "Zeitgenössisches Zeugnis, das zur historischen Analyse herangezogen wird." },
      { term: "Ursache–Folge", def: "Zusammenhang zwischen auslösendem Ereignis und dessen Auswirkungen." },
    ];
  } else if (name.includes("physik") || name.includes("chemie")) {
    base.summary = "Ein neues physikalisches bzw. chemisches Prinzip wurde anhand eines Experiments eingeführt und die Beobachtungen gemeinsam ausgewertet.";
    base.terms = [
      { term: "Hypothese", def: "Begründete Vermutung, die durch ein Experiment überprüft wird." },
      { term: "Messgröße", def: "Physikalische Größe, die im Experiment erfasst wurde." },
    ];
    base.formulas = ["F = m · a"];
    base.merkkasten = "Einheiten nicht vergessen – jede Formel braucht die passende Maßeinheit.";
  } else if (name.includes("bio")) {
    base.summary = "Ein biologischer Prozess wurde anhand eines Modells erklärt und die Fachbegriffe dazu eingeführt.";
    base.terms = [{ term: "Zelle", def: "Kleinste strukturelle und funktionelle Einheit von Lebewesen." }];
  }

  return { ...base, ocrRaw: MOCK_OCR_LINES.slice(0, 2 + Math.floor(Math.random() * 3)).join(" ") };
}

/* ------------------------------------------------------------------ */
/* Default / seed data                                                 */
/* ------------------------------------------------------------------ */
function seedSubjects() {
  const names = ["Mathe", "Deutsch", "Englisch", "Geschichte", "Physik", "Biologie"];
  const frequentByDefault = new Set(["Mathe", "Englisch"]);
  return names.map((n, i) => ({
    id: uid(), name: n, color: SUBJECT_PALETTE[i % SUBJECT_PALETTE.length],
    quizFrequency: frequentByDefault.has(n) ? "frequent" : "occasional",
  }));
}
function seedSchedule(subjects) {
  const byName = (n) => subjects.find((s) => s.name === n)?.id;
  const rows = [
    ["MO", "08:00", "08:45", "Mathe", "ALL"],
    ["MO", "08:50", "09:35", "Deutsch", "ALL"],
    ["MO", "09:50", "10:35", "Englisch", "ALL"],
    ["DI", "08:00", "08:45", "Physik", "A"],
    ["DI", "08:00", "08:45", "Biologie", "B"],
    ["DI", "08:50", "09:35", "Geschichte", "ALL"],
    ["MI", "08:00", "08:45", "Mathe", "ALL"],
    ["MI", "08:50", "09:35", "Englisch", "ALL"],
    ["DO", "08:00", "08:45", "Deutsch", "ALL"],
    ["DO", "08:50", "09:35", "Geschichte", "ALL"],
    ["FR", "08:00", "08:45", "Mathe", "ALL"],
    ["FR", "08:50", "09:35", "Physik", "B"],
    ["FR", "08:50", "09:35", "Biologie", "A"],
  ];
  return rows.map(([day, start, end, subj, week]) => ({
    id: uid(), day, start, end, week, subjectId: byName(subj), teacher: "", room: "",
  }));
}

const DEFAULT_SETTINGS = {
  name: "", grade: "9", school: "", className: "", theme: "light", currentWeekType: "A",
  onboarded: false,
  // KI-Anbieter: "claude" nutzt die in StudyPilot eingebaute, kostenlose Claude-Anbindung (kein Key nötig).
  // "openrouter" nutzt ein kostenloses Modell über den eigenen OpenRouter-Key.
  aiProvider: (typeof window !== "undefined" && window.STUDYPILOT_STANDALONE) ? "openrouter" : "claude",
  openrouterApiKey: "",
  openrouterModel: "google/gemma-4-31b-it:free",
};

/* ------------------------------------------------------------------ */
/* Small UI atoms                                                      */
/* ------------------------------------------------------------------ */
function Chip({ children, color = "muted", style }) {
  const map = {
    muted: { bg: "var(--bg-soft)", fg: "var(--text-muted)" },
    accent: { bg: "var(--accent-soft)", fg: "var(--accent)" },
    teal: { bg: "var(--teal-soft)", fg: "var(--teal)" },
    amber: { bg: "var(--amber-soft)", fg: "var(--amber)" },
    rose: { bg: "var(--rose-soft)", fg: "var(--rose)" },
  };
  const c = map[color] || map.muted;
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap"
      style={{ background: c.bg, color: c.fg, ...style }}
    >
      {children}
    </span>
  );
}

function SectionTitle({ icon: Icon, title, action }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        {Icon && <Icon size={17} style={{ color: "var(--text-muted)" }} />}
        <h2 className="sp-font-display font-semibold text-[15px]" style={{ color: "var(--text)" }}>{title}</h2>
      </div>
      {action}
    </div>
  );
}

function EmptyState({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "var(--bg-soft)" }}>
        <Icon size={24} style={{ color: "var(--text-faint)" }} />
      </div>
      <p className="font-medium text-[15px]" style={{ color: "var(--text)" }}>{title}</p>
      {subtitle && <p className="text-sm mt-1 max-w-xs" style={{ color: "var(--text-muted)" }}>{subtitle}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

function Avatar({ subject, size = 34 }) {
  const Icon = iconForSubject(subject?.name);
  return (
    <div
      className="flex items-center justify-center rounded-xl shrink-0"
      style={{ width: size, height: size, background: `${subject?.color}1A` }}
    >
      <Icon size={size * 0.5} style={{ color: subject?.color || "var(--text-muted)" }} />
    </div>
  );
}

function Modal({ open, onClose, children, wide }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(20,18,14,0.45)", backdropFilter: "blur(3px)" }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className={`sp-card sp-pop-in w-full ${wide ? "sm:max-w-xl" : "sm:max-w-md"} max-h-[92vh] overflow-y-auto sp-scroll rounded-b-none sm:rounded-b-[22px]`}
        style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
      >
        {children}
      </div>
    </div>
  );
}

function ModalHeader({ title, onClose }) {
  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-3 sticky top-0 z-10" style={{ background: "var(--bg-elevated)" }}>
      <h3 className="sp-font-display font-semibold text-lg">{title}</h3>
      <button onClick={onClose} className="p-1.5 rounded-full sp-nav-item"><X size={18} /></button>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="mb-3.5">
      <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>{label}</label>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dashboard                                                           */
/* ------------------------------------------------------------------ */
function LearnPulse({ items, subjects, entries }) {
  const total = items.length || 1;
  const covered = items.filter((i) => entries.some((e) => e.subjectId === i.subjectId)).length;
  const pct = Math.round((covered / total) * 100) || 0;
  const data = [{ name: "pulse", value: items.length ? pct : 100, fill: "var(--accent)" }];
  return (
    <div className="relative flex items-center justify-center" style={{ width: 108, height: 108 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart innerRadius="72%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="value" cornerRadius={20} background={{ fill: "var(--bg-soft)" }} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="sp-font-display font-bold text-xl">{items.length}</span>
        <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{items.length === 1 ? "Fach" : "Fächer"}</span>
      </div>
    </div>
  );
}

function Dashboard({ data, subjects, onOpenSubject, onUpload, onGoPage }) {
  const plan = useMemo(() => computeLearningPlan({
    schedule: data.schedule, exams: data.exams, subjects, currentWeekType: data.settings.currentWeekType,
  }), [data.schedule, data.exams, subjects, data.settings.currentWeekType]);

  const upcomingExams = useMemo(() =>
    [...data.exams].filter((e) => daysUntil(e.date) >= 0).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4),
    [data.exams]);
  const upcomingHomework = useMemo(() =>
    [...data.homework].filter((h) => !h.done).sort((a, b) => (a.dueDate || "9999").localeCompare(b.dueDate || "9999")).slice(0, 4),
    [data.homework]);
  const recentEntries = useMemo(() =>
    [...data.entries].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4),
    [data.entries]);

  const chartData = useMemo(() => subjects.map((s) => ({
    name: s.name, count: data.entries.filter((e) => e.subjectId === s.id).length, fill: s.color,
  })), [subjects, data.entries]);

  const todayPlanTasks = useMemo(() => {
    const today = todayISO();
    const tasks = [];
    data.exams.filter((e) => daysUntil(e.date) >= 0).forEach((exam) => {
      const relevant = relevantEntriesForExam(exam, data.entries);
      const plan = computeStudyPlan(exam, relevant);
      if (plan.tooLate) return;
      const todayEntry = plan.days.find((d) => d.date === today);
      if (todayEntry) {
        const subj = subjects.find((s) => s.id === exam.subjectId);
        tasks.push({ exam, subject: subj, title: todayEntry.title });
      }
    });
    return tasks;
  }, [data.exams, data.entries, subjects]);

  const firstName = data.settings.name?.split(" ")[0];
  const hour = new Date().getHours();
  const greeting = hour < 11 ? "Guten Morgen" : hour < 17 ? "Hallo" : "Guten Abend";

  return (
    <div className="sp-fade-in max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-24 sm:pb-10">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>{greeting}{firstName ? `, ${firstName}` : ""} 👋</p>
          <h1 className="sp-font-display font-bold text-[26px] sm:text-3xl mt-0.5">Dein Lernpuls heute</h1>
        </div>
        <button onClick={onUpload} className="sp-btn-primary px-5 py-3 flex items-center gap-2 text-sm">
          <Camera size={17} /> Hefteintrag hochladen
        </button>
      </div>

      {/* Hero */}
      <div className="sp-card p-5 sm:p-6 mb-5 flex flex-col sm:flex-row items-center gap-6" style={{ borderColor: "var(--border)" }}>
        <LearnPulse items={plan.items} subjects={subjects} entries={data.entries} />
        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 mb-1">
            <Flame size={15} style={{ color: "var(--amber)" }} />
            <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Für {plan.targetLabel}</p>
          </div>
          {plan.items.length === 0 ? (
            <p className="sp-font-display font-semibold text-lg">Nichts Dringendes — genieß den Tag 🎉</p>
          ) : (
            <p className="sp-font-display font-semibold text-lg mb-3">Das solltest du heute lernen</p>
          )}
          <div className="flex flex-wrap gap-2">
            {plan.items.map((item) => (
              <button
                key={item.subjectId}
                onClick={() => onOpenSubject(item.subjectId)}
                className="sp-card sp-card-hover flex items-center gap-2.5 pl-2 pr-3.5 py-2 text-left"
                style={{ borderRadius: 999 }}
              >
                <Avatar subject={item.subject} size={30} />
                <div>
                  <p className="text-sm font-semibold leading-tight">{item.subject.name}</p>
                  <p className="text-[11px] leading-tight" style={{ color: item.level === 3 ? "var(--rose)" : "var(--text-muted)" }}>{item.reason}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {todayPlanTasks.length > 0 && (
        <div className="sp-card p-5 mb-5" style={{ background: "var(--teal-soft)" }}>
          <div className="flex items-center gap-2 mb-3">
            <CalendarDays size={15} style={{ color: "var(--teal)" }} />
            <p className="text-sm font-semibold" style={{ color: "var(--teal)" }}>Laut Lernplan heute</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {todayPlanTasks.map((t, i) => (
              <button
                key={i}
                onClick={() => onOpenSubject(t.exam.subjectId)}
                className="sp-card sp-card-hover flex items-center gap-2.5 pl-2 pr-3.5 py-2 text-left"
                style={{ borderRadius: 999 }}
              >
                <Avatar subject={t.subject} size={30} />
                <div>
                  <p className="text-sm font-semibold leading-tight">{t.subject?.name}</p>
                  <p className="text-[11px] leading-tight" style={{ color: "var(--text-muted)" }}>{t.title} · für {t.exam.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        {/* Prüfungen */}
        <div className="sp-card p-5">
          <SectionTitle icon={ClipboardCheck} title="Nächste Prüfungen" action={
            <button onClick={() => onGoPage("exams")} className="text-xs font-medium flex items-center gap-0.5" style={{ color: "var(--accent)" }}>Alle <ChevronRight size={13} /></button>
          } />
          {upcomingExams.length === 0 ? (
            <p className="text-sm py-4 text-center" style={{ color: "var(--text-faint)" }}>Keine Prüfungen geplant</p>
          ) : (
            <div className="space-y-1">
              {upcomingExams.map((e) => {
                const subj = subjects.find((s) => s.id === e.subjectId);
                return (
                  <div key={e.id} className="flex items-center gap-3 py-2 px-1 rounded-xl sp-nav-item" style={{ cursor: "pointer" }} onClick={() => onOpenSubject(e.subjectId)}>
                    <Avatar subject={subj} size={32} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{e.title || e.type}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{subj?.name} · {e.type}</p>
                    </div>
                    <Chip color={daysUntil(e.date) <= 1 ? "rose" : "amber"}>{untilLabel(e.date)}</Chip>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Hausaufgaben */}
        <div className="sp-card p-5">
          <SectionTitle icon={ListTodo} title="Nächste Hausaufgaben" action={
            <button onClick={() => onGoPage("homework")} className="text-xs font-medium flex items-center gap-0.5" style={{ color: "var(--accent)" }}>Alle <ChevronRight size={13} /></button>
          } />
          {upcomingHomework.length === 0 ? (
            <p className="text-sm py-4 text-center" style={{ color: "var(--text-faint)" }}>Alles erledigt ✨</p>
          ) : (
            <div className="space-y-1">
              {upcomingHomework.map((h) => {
                const subj = subjects.find((s) => s.id === h.subjectId);
                return (
                  <div key={h.id} className="flex items-center gap-3 py-2 px-1 rounded-xl">
                    <Avatar subject={subj} size={32} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{h.description}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{subj?.name}</p>
                    </div>
                    <Chip color="muted">{h.dueDate ? untilLabel(h.dueDate) : "—"}</Chip>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        {/* Letzte Hefteinträge */}
        <div className="sp-card p-5">
          <SectionTitle icon={FileText} title="Letzte Hefteinträge" />
          {recentEntries.length === 0 ? (
            <p className="text-sm py-4 text-center" style={{ color: "var(--text-faint)" }}>Noch keine Einträge hochgeladen</p>
          ) : (
            <div className="space-y-1">
              {recentEntries.map((e) => {
                const subj = subjects.find((s) => s.id === e.subjectId);
                return (
                  <div key={e.id} className="flex items-center gap-3 py-2 px-1 rounded-xl sp-nav-item" style={{ cursor: "pointer" }} onClick={() => onOpenSubject(e.subjectId)}>
                    {e.image ? (
                      <img src={e.image} className="w-9 h-9 rounded-lg object-cover shrink-0" style={{ border: "1px solid var(--border)" }} />
                    ) : <Avatar subject={subj} size={36} />}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{subj?.name}</p>
                      <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{e.summary?.slice(0, 44)}...</p>
                    </div>
                    <span className="text-[11px] shrink-0" style={{ color: "var(--text-faint)" }}>{fmtDate(e.date)}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Lernfortschritt */}
        <div className="sp-card p-5">
          <SectionTitle icon={TrendingUp} title="Lernfortschritt" />
          <div style={{ height: 168 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ left: -22, right: 4, top: 4 }}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} interval={0} angle={-20} textAnchor="end" height={38} />
                <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} allowDecimals={false} width={22} />
                <Tooltip contentStyle={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <WeakSpotHeatmap
        entries={data.entries}
        subjects={subjects}
        onOpenSubject={onOpenSubject}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stundenplan                                                         */
/* ------------------------------------------------------------------ */
function LessonModal({ open, onClose, onSave, onDelete, subjects, initial, day }) {
  const [form, setForm] = useState(initial || { day: day || "MO", start: "08:00", end: "08:45", week: "ALL", subjectId: subjects[0]?.id || "", teacher: "", room: "" });
  useEffect(() => { setForm(initial || { day: day || "MO", start: "08:00", end: "08:45", week: "ALL", subjectId: subjects[0]?.id || "", teacher: "", room: "" }); }, [initial, day, open]);
  if (!open) return null;
  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader title={initial ? "Stunde bearbeiten" : "Neue Stunde"} onClose={onClose} />
      <div className="px-5 pb-5">
        <Field label="Fach">
          <select className="sp-input w-full px-3 py-2.5 text-sm" value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })}>
            {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Tag">
            <select className="sp-input w-full px-3 py-2.5 text-sm" value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })}>
              {DAYS.map((d) => <option key={d.key} value={d.key}>{d.label}</option>)}
            </select>
          </Field>
          <Field label="Woche">
            <select className="sp-input w-full px-3 py-2.5 text-sm" value={form.week} onChange={(e) => setForm({ ...form, week: e.target.value })}>
              <option value="ALL">Jede Woche</option>
              <option value="A">A-Woche</option>
              <option value="B">B-Woche</option>
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Start"><input type="time" className="sp-input w-full px-3 py-2.5 text-sm" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} /></Field>
          <Field label="Ende"><input type="time" className="sp-input w-full px-3 py-2.5 text-sm" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Lehrer (optional)"><input className="sp-input w-full px-3 py-2.5 text-sm" value={form.teacher} onChange={(e) => setForm({ ...form, teacher: e.target.value })} placeholder="Frau Müller" /></Field>
          <Field label="Raum (optional)"><input className="sp-input w-full px-3 py-2.5 text-sm" value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} placeholder="R204" /></Field>
        </div>
        <div className="flex gap-2 mt-4">
          {initial && <button onClick={() => { onDelete(initial.id); onClose(); }} className="sp-btn-secondary px-4 py-2.5 text-sm flex items-center gap-1.5" style={{ color: "var(--rose)" }}><Trash2 size={15} />Löschen</button>}
          <button onClick={() => { onSave({ ...form, id: initial?.id || uid() }); onClose(); }} className="sp-btn-primary px-4 py-2.5 text-sm flex-1">Speichern</button>
        </div>
      </div>
    </Modal>
  );
}

function ScheduleImportModal({ open, onClose, subjects, settings, onImport }) {
  const [step, setStep] = useState("select");
  const [images, setImages] = useState([]);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  useEffect(() => { if (open) { setStep("select"); setImages([]); setRows([]); setError(null); } }, [open]);

  const handleFiles = async (files) => {
    const arr = Array.from(files).slice(0, 4);
    const previews = await Promise.all(arr.map((f) => downscaleImage(f, 1100, 0.75)));
    setImages((prev) => [...prev, ...previews]);
  };

  const analyze = async () => {
    setStep("processing"); setError(null);
    try {
      const parsed = await runScheduleImport({
        provider: settings.aiProvider, openrouterApiKey: settings.openrouterApiKey, openrouterModel: settings.openrouterModel,
        images, subjectNames: subjects.map((s) => s.name),
      });
      setRows(parsed.map((r) => ({ ...r, id: uid(), include: true })));
      setStep("result");
    } catch (e) {
      setError(e.message || "Analyse fehlgeschlagen");
      setStep("select");
    }
  };

  const confirm = () => {
    const included = rows.filter((r) => r.include);
    onImport(included);
    onClose();
  };

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} wide>
      {step === "select" && (
        <>
          <ModalHeader title="Stundenplan aus Foto importieren" onClose={onClose} />
          <div className="px-5 pb-5">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <button type="button" onClick={() => cameraInputRef.current?.click()} className="rounded-2xl border-2 border-dashed p-5 flex flex-col items-center justify-center text-center gap-1.5" style={{ borderColor: "var(--border-strong)", background: "var(--bg-soft)" }}>
                <Camera size={22} style={{ color: "var(--text-faint)" }} />
                <p className="text-sm font-medium">Foto aufnehmen</p>
                <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }} />
              </button>
              <button type="button" onClick={() => galleryInputRef.current?.click()} className="rounded-2xl border-2 border-dashed p-5 flex flex-col items-center justify-center text-center gap-1.5" style={{ borderColor: "var(--border-strong)", background: "var(--bg-soft)" }}>
                <ImagePlus size={22} style={{ color: "var(--text-faint)" }} />
                <p className="text-sm font-medium">Aus Fotos wählen</p>
                <input ref={galleryInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }} />
              </button>
            </div>
            <p className="text-xs mb-3" style={{ color: "var(--text-faint)" }}>Am besten die ganze Tabelle in einem Bild</p>
            {images.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-4">
                {images.map((img, i) => (
                  <div key={i} className="relative">
                    <img src={img} className="w-16 h-16 rounded-xl object-cover" style={{ border: "1px solid var(--border)" }} />
                    <button onClick={() => setImages(images.filter((_, j) => j !== i))} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "var(--rose)", color: "#fff" }}><X size={11} /></button>
                  </div>
                ))}
              </div>
            )}
            {error && <div className="sp-card p-3 mb-3 text-sm" style={{ background: "var(--rose-soft)", color: "var(--rose)" }}>{error}</div>}
            <button disabled={images.length === 0} onClick={analyze} className="sp-btn-primary w-full py-3 text-sm disabled:opacity-40 flex items-center justify-center gap-2"><Sparkles size={16} />Analysieren</button>
          </div>
        </>
      )}
      {step === "processing" && (
        <div className="px-6 py-14 flex flex-col items-center text-center">
          <Loader2 size={26} className="animate-spin mb-4" style={{ color: "var(--accent)" }} />
          <p className="sp-font-display font-semibold">StudyPilot liest deinen Stundenplan...</p>
        </div>
      )}
      {step === "result" && (
        <>
          <ModalHeader title={`${rows.length} Stunden erkannt`} onClose={onClose} />
          <div className="px-5 pb-5">
            <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>Prüfe die Erkennung und entferne fehlerhafte Zeilen bei Bedarf. Unbekannte Fächer werden automatisch angelegt.</p>
            <div className="space-y-2 max-h-96 overflow-y-auto sp-scroll mb-4">
              {rows.map((r) => (
                <div key={r.id} className="sp-card p-3 flex items-center gap-3" style={{ opacity: r.include ? 1 : 0.4 }}>
                  <button onClick={() => setRows(rows.map((x) => x.id === r.id ? { ...x, include: !x.include } : x))}>
                    {r.include ? <CheckCircle2 size={20} style={{ color: "var(--teal)" }} /> : <Circle size={20} style={{ color: "var(--text-faint)" }} />}
                  </button>
                  <div className="flex-1 text-sm">
                    <span className="font-semibold">{DAYS.find((d) => d.key === r.day)?.short || r.day}</span>{" "}
                    <span style={{ color: "var(--text-muted)" }}>{r.start}–{r.end}</span>{" · "}
                    <span>{r.subject}</span>
                    {r.week !== "ALL" && <Chip color="accent" style={{ marginLeft: 6 }}>{r.week}-Woche</Chip>}
                  </div>
                </div>
              ))}
              {rows.length === 0 && <p className="text-sm text-center py-6" style={{ color: "var(--text-faint)" }}>Keine Stunden erkannt.</p>}
            </div>
            <button disabled={rows.filter((r) => r.include).length === 0} onClick={confirm} className="sp-btn-primary w-full py-3 text-sm disabled:opacity-40">In Stundenplan übernehmen</button>
          </div>
        </>
      )}
    </Modal>
  );
}

function SchedulePage({ data, setData, subjects }) {
  const [modalDay, setModalDay] = useState(null);
  const [editLesson, setEditLesson] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [weekFilter, setWeekFilter] = useState("ALL");

  const saveLesson = (lesson) => {
    setData((d) => {
      const exists = d.schedule.some((l) => l.id === lesson.id);
      return { ...d, schedule: exists ? d.schedule.map((l) => (l.id === lesson.id ? lesson : l)) : [...d.schedule, lesson] };
    });
  };
  const deleteLesson = (id) => setData((d) => ({ ...d, schedule: d.schedule.filter((l) => l.id !== id) }));

  const importRows = (rows) => {
    setData((d) => {
      let subjectsNext = [...d.subjects];
      const findOrCreate = (name) => {
        const match = subjectsNext.find((s) => s.name.toLowerCase() === (name || "").toLowerCase());
        if (match) return match.id;
        const created = { id: uid(), name: (name || "Unbekannt").trim(), color: SUBJECT_PALETTE[subjectsNext.length % SUBJECT_PALETTE.length] };
        subjectsNext = [...subjectsNext, created];
        return created.id;
      };
      const newLessons = rows.map((r) => ({
        id: uid(), day: r.day, start: r.start, end: r.end,
        week: ["A", "B"].includes(r.week) ? r.week : "ALL",
        subjectId: findOrCreate(r.subject), teacher: r.teacher || "", room: r.room || "",
      }));
      return { ...d, subjects: subjectsNext, schedule: [...d.schedule, ...newLessons] };
    });
  };

  const byDay = (dayKey) => data.schedule
    .filter((l) => l.day === dayKey && (weekFilter === "ALL" || l.week === "ALL" || l.week === weekFilter))
    .sort((a, b) => a.start.localeCompare(b.start));

  return (
    <div className="sp-fade-in max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-24 sm:pb-10">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="sp-font-display font-bold text-2xl">Stundenplan</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Aktuelle Woche: {data.settings.currentWeekType}-Woche</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => setImportOpen(true)} className="sp-btn-secondary px-3.5 py-2 text-xs flex items-center gap-1.5"><Camera size={14} />Foto importieren</button>
          <div className="sp-btn-secondary p-1 flex text-xs" style={{ borderRadius: 999 }}>
            {["ALL", "A", "B"].map((w) => (
              <button key={w} onClick={() => setWeekFilter(w)} className="px-3 py-1.5 rounded-full transition-all" style={{ background: weekFilter === w ? "var(--accent)" : "transparent", color: weekFilter === w ? "#fff" : "var(--text-muted)" }}>
                {w === "ALL" ? "Alle" : `${w}-Woche`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {DAYS.map((day) => (
          <div key={day.key} className="sp-card p-3 sm:min-h-[360px] flex flex-col">
            <div className="flex items-center justify-between px-1 mb-2">
              <p className="font-semibold text-sm sp-font-display">{day.label}</p>
              <button onClick={() => { setEditLesson(null); setModalDay(day.key); setModalOpen(true); }} className="p-1 rounded-full sp-nav-item"><Plus size={15} /></button>
            </div>
            <div className="space-y-1.5 flex-1">
              {byDay(day.key).length === 0 && <p className="text-xs text-center py-6" style={{ color: "var(--text-faint)" }}>Keine Stunden</p>}
              {byDay(day.key).map((l) => {
                const subj = subjects.find((s) => s.id === l.subjectId);
                return (
                  <button
                    key={l.id}
                    onClick={() => { setEditLesson(l); setModalDay(day.key); setModalOpen(true); }}
                    className="w-full text-left p-2.5 rounded-xl sp-card-hover flex items-start gap-2"
                    style={{ background: `${subj?.color}12`, border: `1px solid ${subj?.color}30` }}
                  >
                    <div className="w-1.5 self-stretch rounded-full shrink-0" style={{ background: subj?.color }} />
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold truncate" style={{ color: subj?.color }}>{subj?.name}</p>
                      <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>{l.start}–{l.end}</p>
                      {(l.teacher || l.room) && <p className="text-[11px] truncate" style={{ color: "var(--text-faint)" }}>{l.teacher}{l.teacher && l.room ? " · " : ""}{l.room}</p>}
                      {l.week !== "ALL" && <Chip color="accent" style={{ marginTop: 4, padding: "1px 7px" }}>{l.week}-Woche</Chip>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <LessonModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={saveLesson}
        onDelete={deleteLesson}
        subjects={subjects}
        initial={editLesson}
        day={modalDay}
      />
      <ScheduleImportModal open={importOpen} onClose={() => setImportOpen(false)} subjects={subjects} settings={data.settings} onImport={importRows} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Upload flow                                                         */
/* ------------------------------------------------------------------ */
const PROCESS_STEPS = [
  { label: "Bilder werden vorbereitet", icon: Upload },
  { label: "KI liest den Hefteintrag (OCR)", icon: ScanText },
  { label: "Text wird verbessert & strukturiert", icon: Wand2 },
  { label: "Fach & Datum werden erkannt", icon: Tags },
  { label: "Zusammenfassung wird erstellt", icon: BrainCircuit },
];

function UploadModal({ open, onClose, subjects, defaultSubjectId, settings, onSave }) {
  const [step, setStep] = useState("select"); // select -> processing -> result
  const [subjectId, setSubjectId] = useState(defaultSubjectId || subjects[0]?.id || "");
  const [date, setDate] = useState(todayISO());
  const [images, setImages] = useState([]);
  const [processStep, setProcessStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [usedFallback, setUsedFallback] = useState(false);
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const cancelledRef = useRef(false);

  useEffect(() => {
    if (open) {
      setStep("select"); setSubjectId(defaultSubjectId || subjects[0]?.id || ""); setDate(todayISO());
      setImages([]); setProcessStep(0); setResult(null); setError(null); setUsedFallback(false);
      cancelledRef.current = false;
    } else {
      cancelledRef.current = true;
    }
  }, [open]);

  const handleFiles = async (files) => {
    const arr = Array.from(files).slice(0, 6);
    const previews = await Promise.all(arr.map((f) => downscaleImage(f)));
    setImages((prev) => [...prev, ...previews]);
  };

  const runStepAnimation = (onDone) => {
    let s = 0;
    const tick = () => {
      if (cancelledRef.current) return;
      setProcessStep(s);
      s += 1;
      if (s < PROCESS_STEPS.length) setTimeout(tick, 450 + Math.random() * 250);
      else setTimeout(onDone, 350);
    };
    setTimeout(tick, 300);
  };

  const startProcessing = () => {
    setStep("processing");
    setError(null);
    const subj = subjects.find((x) => x.id === subjectId);
    const subjectNames = subjects.map((s) => s.name);

    runStepAnimation(async () => {
      try {
        const ai = await runAIAnalysis({
          provider: settings.aiProvider,
          openrouterApiKey: settings.openrouterApiKey,
          openrouterModel: settings.openrouterModel,
          images,
          subjectNames,
        });
        if (cancelledRef.current) return;
        // KI-Vorschlag für Fach übernehmen, falls ein passendes Fach existiert
        const matched = subjects.find((s) => s.name.toLowerCase() === (ai.detectedSubject || "").toLowerCase());
        if (matched) setSubjectId(matched.id);
        if (ai.detectedDate && /^\d{4}-\d{2}-\d{2}$/.test(ai.detectedDate)) setDate(ai.detectedDate);
        setResult(ai);
        setUsedFallback(false);
        setStep("result");
      } catch (e) {
        if (cancelledRef.current) return;
        // Kein Abbruch der App: Offline-/Fehler-Fallback mit lokal generiertem Platzhalter
        const gen = generateMockAI(subj?.name, date);
        setResult(gen);
        setUsedFallback(true);
        setError(e.message || "KI nicht erreichbar");
        setStep("result");
      }
    });
  };

  const finish = () => {
    const subj = subjects.find((x) => x.id === subjectId);
    const termsWithSrs = (result.terms || []).map((t) => ({
      ...t, id: uid(), srsBox: 1, srsDue: todayISO(),
    }));
    onSave({
      id: uid(), subjectId, date, images: images, image: images[0] || null, createdAt: Date.now(),
      ocrText: result.ocrText || result.ocrRaw || "", summary: result.summary, bullets: result.bullets,
      terms: termsWithSrs, formulas: result.formulas, merkkasten: result.merkkasten,
    });
    onClose();
  };

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} wide>
      {step === "select" && (
        <>
          <ModalHeader title="Hefteintrag hochladen" onClose={onClose} />
          <div className="px-5 pb-5">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Fach (Vorschlag, KI passt ihn ggf. an)">
                <select className="sp-input w-full px-3 py-2.5 text-sm" value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
                  {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </Field>
              <Field label="Datum">
                <input type="date" className="sp-input w-full px-3 py-2.5 text-sm" value={date} onChange={(e) => setDate(e.target.value)} />
              </Field>
            </div>

            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Bilder</label>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="rounded-2xl border-2 border-dashed p-5 flex flex-col items-center justify-center text-center gap-1.5"
                style={{ borderColor: "var(--border-strong)", background: "var(--bg-soft)" }}
              >
                <Camera size={22} style={{ color: "var(--text-faint)" }} />
                <p className="text-sm font-medium">Foto aufnehmen</p>
                <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }} />
              </button>
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="rounded-2xl border-2 border-dashed p-5 flex flex-col items-center justify-center text-center gap-1.5"
                style={{ borderColor: "var(--border-strong)", background: "var(--bg-soft)" }}
              >
                <ImagePlus size={22} style={{ color: "var(--text-faint)" }} />
                <p className="text-sm font-medium">Aus Fotos wählen</p>
                <input ref={galleryInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }} />
              </button>
            </div>
            <p className="text-xs mb-3" style={{ color: "var(--text-faint)" }}>Mehrere Bilder gleichzeitig möglich (bis zu 6)</p>

            {images.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-4">
                {images.map((img, i) => (
                  <div key={i} className="relative">
                    <img src={img} className="w-16 h-16 rounded-xl object-cover" style={{ border: "1px solid var(--border)" }} />
                    <button onClick={() => setImages(images.filter((_, j) => j !== i))} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "var(--rose)", color: "#fff" }}>
                      <X size={11} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-1.5 mb-3 text-xs" style={{ color: "var(--text-faint)" }}>
              <BrainCircuit size={13} />
              {settings.aiProvider === "openrouter"
                ? `KI-Anbieter: OpenRouter (${settings.openrouterModel || "kein Modell gewählt"})`
                : "KI-Anbieter: Claude (kostenlos, in StudyPilot integriert)"}
            </div>

            <button disabled={images.length === 0} onClick={startProcessing} className="sp-btn-primary w-full py-3 text-sm disabled:opacity-40 flex items-center justify-center gap-2">
              <Sparkles size={16} /> Hochladen & analysieren
            </button>
          </div>
        </>
      )}

      {step === "processing" && (
        <div className="px-6 py-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ background: "var(--accent-soft)" }}>
            <Loader2 size={26} className="animate-spin" style={{ color: "var(--accent)" }} />
          </div>
          <p className="sp-font-display font-semibold text-lg mb-6">StudyPilot analysiert deinen Eintrag</p>
          <div className="w-full max-w-xs space-y-3">
            {PROCESS_STEPS.map((s, i) => {
              const Icon = s.icon;
              const done = i < processStep;
              const active = i === processStep;
              return (
                <div key={i} className="flex items-center gap-3 text-left">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: done ? "var(--teal-soft)" : active ? "var(--accent-soft)" : "var(--bg-soft)" }}>
                    {done ? <Check size={14} style={{ color: "var(--teal)" }} /> : <Icon size={14} style={{ color: active ? "var(--accent)" : "var(--text-faint)" }} className={active ? "animate-pulse" : ""} />}
                  </div>
                  <span className="text-sm" style={{ color: done || active ? "var(--text)" : "var(--text-faint)" }}>{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {step === "result" && result && (
        <>
          <ModalHeader title={usedFallback ? "Analyse nicht verfügbar" : "Fertig analysiert ✨"} onClose={onClose} />
          <div className="px-5 pb-5">
            {usedFallback && (
              <div className="sp-card p-3.5 mb-4 flex items-start gap-2.5" style={{ background: "var(--rose-soft)" }}>
                <AlertCircle size={16} style={{ color: "var(--rose)" }} className="shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--rose)" }}>Die KI war gerade nicht erreichbar.</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{error} — Es wurde ein Platzhalter-Eintrag erstellt. Prüfe deine Internetverbindung bzw. deinen OpenRouter-Key in den Einstellungen und versuche es erneut.</p>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Field label="Fach">
                <select className="sp-input w-full px-3 py-2 text-sm" value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
                  {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </Field>
              <Field label="Datum">
                <input type="date" className="sp-input w-full px-2.5 py-2 text-sm" value={date} onChange={(e) => setDate(e.target.value)} />
              </Field>
            </div>
            <div className="sp-card p-4 mb-3" style={{ background: "var(--bg-soft)" }}>
              <p className="text-xs font-semibold mb-1.5" style={{ color: "var(--text-muted)" }}>ZUSAMMENFASSUNG</p>
              <p className="text-sm leading-relaxed">{result.summary}</p>
            </div>
            <div className="sp-card p-4 mb-3" style={{ background: "var(--bg-soft)" }}>
              <p className="text-xs font-semibold mb-1.5" style={{ color: "var(--text-muted)" }}>STICHPUNKTE</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                {result.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
            <div className="sp-card p-4 mb-3" style={{ background: "var(--bg-soft)" }}>
              <p className="text-xs font-semibold mb-1.5" style={{ color: "var(--text-muted)" }}>WICHTIGE BEGRIFFE</p>
              <div className="space-y-1.5">
                {result.terms.map((t, i) => (
                  <p key={i} className="text-sm"><span className="font-semibold">{t.term}:</span> <span style={{ color: "var(--text-muted)" }}>{t.def}</span></p>
                ))}
              </div>
            </div>
            {result.formulas.length > 0 && (
              <div className="sp-card p-4 mb-3" style={{ background: "var(--bg-soft)" }}>
                <p className="text-xs font-semibold mb-1.5" style={{ color: "var(--text-muted)" }}>FORMELN</p>
                <div className="flex flex-wrap gap-2">
                  {result.formulas.map((f, i) => <span key={i} className="sp-font-display font-semibold text-sm px-3 py-1.5 rounded-lg" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>{f}</span>)}
                </div>
              </div>
            )}
            <div className="sp-card p-4 mb-4" style={{ background: "var(--amber-soft)" }}>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--amber)" }}>MERKKASTEN</p>
              <p className="text-sm">{result.merkkasten}</p>
            </div>
            <div className="flex gap-2">
              {usedFallback && <button onClick={startProcessing} className="sp-btn-secondary px-4 py-3 text-sm flex items-center gap-1.5"><RotateCcw size={14} />Erneut versuchen</button>}
              <button onClick={finish} className="sp-btn-primary flex-1 py-3 text-sm">Speichern</button>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Subjects list + detail                                              */
/* ------------------------------------------------------------------ */
function SubjectsPage({ data, setData, subjects, onOpenSubject, onAddSubject }) {
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const renameSubject = (id, name) => setData((d) => ({ ...d, subjects: d.subjects.map((s) => s.id === id ? { ...s, name } : s) }));
  const deleteSubject = (id) => setData((d) => {
    const nextChats = { ...d.chats };
    delete nextChats[id];
    return {
      ...d,
      subjects: d.subjects.filter((s) => s.id !== id),
      schedule: d.schedule.filter((l) => l.subjectId !== id),
      exams: d.exams.filter((e) => e.subjectId !== id),
      homework: d.homework.filter((h) => h.subjectId !== id),
      entries: d.entries.filter((e) => e.subjectId !== id),
      chats: nextChats,
    };
  });

  return (
    <div className="sp-fade-in max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-24 sm:pb-10">
      <div className="flex items-center justify-between mb-5">
        <h1 className="sp-font-display font-bold text-2xl">Fächer</h1>
        <button onClick={() => setAdding(true)} className="sp-btn-secondary px-4 py-2 text-sm flex items-center gap-1.5"><Plus size={15} />Fach</button>
      </div>
      {adding && (
        <div className="sp-card p-4 mb-4 flex gap-2 items-center">
          <input autoFocus className="sp-input flex-1 px-3 py-2 text-sm" placeholder="Fachname, z.B. Kunst" value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && newName && (onAddSubject(newName), setNewName(""), setAdding(false))} />
          <button onClick={() => { if (newName) { onAddSubject(newName); setNewName(""); } setAdding(false); }} className="sp-btn-primary px-4 py-2 text-sm">Hinzufügen</button>
          <button onClick={() => setAdding(false)} className="sp-btn-secondary px-3 py-2 text-sm">Abbrechen</button>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {subjects.map((s) => {
          const entryCount = data.entries.filter((e) => e.subjectId === s.id).length;
          const examCount = data.exams.filter((e) => e.subjectId === s.id && daysUntil(e.date) >= 0).length;
          const isEditing = editingId === s.id;
          const isConfirming = confirmDeleteId === s.id;
          return (
            <div key={s.id} className="sp-card p-4 flex flex-col gap-3 relative group">
              <button onClick={() => !isEditing && !isConfirming && onOpenSubject(s.id)} className="flex flex-col gap-3 text-left">
                <Avatar subject={s} size={40} />
                {isEditing ? (
                  <input autoFocus className="sp-input px-2 py-1.5 text-sm" value={editName} onChange={(e) => setEditName(e.target.value)} onClick={(e) => e.stopPropagation()} onKeyDown={(e) => { if (e.key === "Enter" && editName.trim()) { renameSubject(s.id, editName.trim()); setEditingId(null); } if (e.key === "Escape") setEditingId(null); }} />
                ) : (
                  <div>
                    <p className="font-semibold sp-font-display">{s.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{entryCount} Einträge{examCount > 0 ? ` · ${examCount} Prüfung${examCount > 1 ? "en" : ""}` : ""}</p>
                  </div>
                )}
              </button>
              {isConfirming ? (
                <div className="flex gap-1.5">
                  <button onClick={() => { deleteSubject(s.id); setConfirmDeleteId(null); }} className="flex-1 sp-btn-secondary py-1.5 text-xs" style={{ color: "var(--rose)" }}>Endgültig löschen</button>
                  <button onClick={() => setConfirmDeleteId(null)} className="sp-btn-secondary px-2.5 py-1.5 text-xs">Abbr.</button>
                </div>
              ) : isEditing ? (
                <div className="flex gap-1.5">
                  <button onClick={() => { if (editName.trim()) renameSubject(s.id, editName.trim()); setEditingId(null); }} className="flex-1 sp-btn-primary py-1.5 text-xs">Speichern</button>
                  <button onClick={() => setEditingId(null)} className="sp-btn-secondary px-2.5 py-1.5 text-xs">Abbr.</button>
                </div>
              ) : (
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute top-3 right-3">
                  <button onClick={(e) => { e.stopPropagation(); setEditingId(s.id); setEditName(s.name); }} className="p-1.5 rounded-full sp-nav-item" style={{ background: "var(--bg-elevated)" }}><Pencil size={13} /></button>
                  <button onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(s.id); }} className="p-1.5 rounded-full sp-nav-item" style={{ background: "var(--bg-elevated)" }}><Trash2 size={13} style={{ color: "var(--rose)" }} /></button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Flashcard({ term, def }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="sp-flip-card" style={{ height: 150 }} onClick={() => setFlipped((f) => !f)}>
      <div className={`sp-flip-inner relative w-full h-full cursor-pointer ${flipped ? "flipped" : ""}`}>
        <div className="sp-flip-face absolute inset-0 sp-card flex items-center justify-center p-4 text-center" style={{ background: "var(--accent-soft)" }}>
          <p className="font-semibold sp-font-display" style={{ color: "var(--accent)" }}>{term}</p>
        </div>
        <div className="sp-flip-face sp-flip-back absolute inset-0 sp-card flex items-center justify-center p-4 text-center">
          <p className="text-sm">{def}</p>
        </div>
      </div>
    </div>
  );
}

const SRS_INTERVALS = [1, 2, 4, 8, 16, 32]; // Tage je Box (Leitner-System)

function LearnSession({ subjectId, entries, onUpdateTerm, onExit }) {
  const dueTerms = useMemo(() => {
    const today = todayISO();
    const list = [];
    entries.forEach((e) => e.terms.forEach((t) => {
      if (!t.srsDue || t.srsDue <= today) list.push({ ...t, entryId: e.id });
    }));
    // shuffle
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }, [entries]);

  const [queue, setQueue] = useState(dueTerms);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [stats, setStats] = useState({ correct: 0, again: 0 });
  const [done, setDone] = useState(dueTerms.length === 0);

  const current = queue[index];

  const answer = (knewIt) => {
    if (!current) return;
    const box = knewIt ? Math.min((current.srsBox || 1) + 1, SRS_INTERVALS.length) : 1;
    const interval = SRS_INTERVALS[box - 1];
    const due = new Date(); due.setDate(due.getDate() + interval);
    onUpdateTerm(current.entryId, current.id, { srsBox: box, srsDue: due.toISOString().slice(0, 10) });
    setStats((s) => ({ correct: s.correct + (knewIt ? 1 : 0), again: s.again + (knewIt ? 0 : 1) }));
    setFlipped(false);
    if (index + 1 < queue.length) setIndex(index + 1);
    else setDone(true);
  };

  if (done) {
    return (
      <div className="sp-card p-8 text-center sp-pop-in">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "var(--teal-soft)" }}>
          <CheckCircle2 size={26} style={{ color: "var(--teal)" }} />
        </div>
        <p className="sp-font-display font-semibold text-lg mb-1">{queue.length === 0 ? "Heute nichts fällig 🎉" : "Session abgeschlossen!"}</p>
        {queue.length > 0 && <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>{stats.correct} gewusst · {stats.again} wiederholen</p>}
        <button onClick={onExit} className="sp-btn-primary px-5 py-2.5 text-sm">Zurück zum Quiz</button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <button onClick={onExit} className="text-sm flex items-center gap-1 sp-nav-item px-2 py-1 rounded-lg -ml-2" style={{ color: "var(--text-muted)" }}><ArrowLeft size={14} />Beenden</button>
        <span className="text-xs" style={{ color: "var(--text-faint)" }}>{index + 1} / {queue.length}</span>
      </div>
      <div className="sp-progress-track h-1.5 mb-6"><div className="sp-progress-fill h-full" style={{ width: `${((index) / queue.length) * 100}%` }} /></div>
      <div className="sp-flip-card mx-auto max-w-md" style={{ height: 220 }} onClick={() => setFlipped((f) => !f)}>
        <div className={`sp-flip-inner relative w-full h-full cursor-pointer ${flipped ? "flipped" : ""}`}>
          <div className="sp-flip-face absolute inset-0 sp-card flex flex-col items-center justify-center p-6 text-center gap-2" style={{ background: "var(--accent-soft)" }}>
            <p className="text-xs" style={{ color: "var(--text-faint)" }}>Begriff</p>
            <p className="font-semibold sp-font-display text-lg" style={{ color: "var(--accent)" }}>{current?.term}</p>
            <p className="text-xs mt-2" style={{ color: "var(--text-faint)" }}>Tippen zum Umdrehen</p>
          </div>
          <div className="sp-flip-face sp-flip-back absolute inset-0 sp-card flex flex-col items-center justify-center p-6 text-center gap-2">
            <p className="text-xs" style={{ color: "var(--text-faint)" }}>Definition</p>
            <p className="text-sm">{current?.def}</p>
          </div>
        </div>
      </div>
      {flipped && (
        <div className="flex gap-3 justify-center mt-6 sp-fade-in">
          <button onClick={() => answer(false)} className="sp-btn-secondary px-5 py-2.5 text-sm flex items-center gap-1.5" style={{ color: "var(--rose)" }}><RotateCcw size={14} />Nochmal üben</button>
          <button onClick={() => answer(true)} className="sp-btn-primary px-5 py-2.5 text-sm flex items-center gap-1.5"><Check size={14} />Wusste ich</button>
        </div>
      )}
      {!flipped && <p className="text-center text-xs mt-6" style={{ color: "var(--text-faint)" }}>Karte umdrehen, um zu antworten</p>}
    </div>
  );
}

function shuffleArr(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function MCQuiz({ allTerms, onExit }) {
  const questions = useMemo(() => {
    const pool = allTerms.filter((t) => t.def);
    return shuffleArr(pool).map((t) => {
      const distractors = shuffleArr(pool.filter((o) => o.term !== t.term)).slice(0, 3).map((o) => o.def);
      const options = shuffleArr([t.def, ...distractors]);
      return { term: t.term, correct: t.def, options };
    });
  }, [allTerms]);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = questions[index];

  const choose = (opt) => {
    if (selected) return;
    setSelected(opt);
    if (opt === q.correct) setScore((s) => s + 1);
  };
  const next = () => {
    setSelected(null);
    if (index + 1 < questions.length) setIndex(index + 1); else setDone(true);
  };

  if (done) {
    return (
      <div className="sp-card p-8 text-center sp-pop-in">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "var(--accent-soft)" }}>
          <BrainCircuit size={26} style={{ color: "var(--accent)" }} />
        </div>
        <p className="sp-font-display font-semibold text-lg mb-1">{score} / {questions.length} richtig</p>
        <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>{score === questions.length ? "Perfekt! 🎉" : "Weiter so – Übung macht den Meister."}</p>
        <button onClick={onExit} className="sp-btn-primary px-5 py-2.5 text-sm">Zurück zum Quiz</button>
      </div>
    );
  }
  if (!q) return <EmptyState icon={BrainCircuit} title="Mindestens 4 Begriffe nötig" subtitle="Lade weitere Hefteinträge hoch, damit StudyPilot Multiple-Choice-Fragen erstellen kann." />;

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-between mb-3">
        <button onClick={onExit} className="text-sm flex items-center gap-1 sp-nav-item px-2 py-1 rounded-lg -ml-2" style={{ color: "var(--text-muted)" }}><ArrowLeft size={14} />Beenden</button>
        <span className="text-xs" style={{ color: "var(--text-faint)" }}>{index + 1} / {questions.length}</span>
      </div>
      <div className="sp-card p-5 mb-4">
        <p className="text-xs mb-1.5" style={{ color: "var(--text-faint)" }}>Was bedeutet:</p>
        <p className="sp-font-display font-semibold text-lg">{q.term}</p>
      </div>
      <div className="space-y-2">
        {q.options.map((opt, i) => {
          let style = { borderColor: "var(--border)" };
          if (selected) {
            if (opt === q.correct) style = { borderColor: "var(--teal)", background: "var(--teal-soft)" };
            else if (opt === selected) style = { borderColor: "var(--rose)", background: "var(--rose-soft)" };
          }
          return (
            <button key={i} onClick={() => choose(opt)} className="sp-card w-full text-left p-3.5 text-sm" style={{ ...style, borderWidth: 2 }}>
              {opt}
            </button>
          );
        })}
      </div>
      {selected && <button onClick={next} className="sp-btn-primary w-full py-3 text-sm mt-4">{index + 1 < questions.length ? "Weiter" : "Ergebnis anzeigen"}</button>}
    </div>
  );
}

function EntryEditModal({ open, onClose, entry, subjects, onSave, onDelete }) {
  const toLines = (arr) => (arr || []).join("\n");
  const toTermLines = (arr) => (arr || []).map((t) => `${t.term}: ${t.def}`).join("\n");
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (open && entry) {
      setForm({
        subjectId: entry.subjectId, date: entry.date, summary: entry.summary || "",
        bullets: toLines(entry.bullets), terms: toTermLines(entry.terms), formulas: toLines(entry.formulas),
        merkkasten: entry.merkkasten || "",
      });
    }
  }, [open, entry]);

  if (!open || !form) return null;

  const save = () => {
    const oldTermsByName = {};
    (entry.terms || []).forEach((t) => { oldTermsByName[t.term.trim().toLowerCase()] = t; });
    const newTerms = form.terms.split("\n").map((l) => l.trim()).filter(Boolean).map((line) => {
      const idx = line.indexOf(":");
      const term = idx === -1 ? line : line.slice(0, idx).trim();
      const def = idx === -1 ? "" : line.slice(idx + 1).trim();
      const old = oldTermsByName[term.toLowerCase()];
      return old ? { ...old, term, def } : { id: uid(), term, def, srsBox: 1, srsDue: todayISO() };
    });
    onSave({
      ...entry,
      subjectId: form.subjectId, date: form.date, summary: form.summary,
      bullets: form.bullets.split("\n").map((l) => l.trim()).filter(Boolean),
      terms: newTerms,
      formulas: form.formulas.split("\n").map((l) => l.trim()).filter(Boolean),
      merkkasten: form.merkkasten,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} wide>
      <ModalHeader title="Hefteintrag bearbeiten" onClose={onClose} />
      <div className="px-5 pb-5">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Fach">
            <select className="sp-input w-full px-3 py-2.5 text-sm" value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })}>
              {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </Field>
          <Field label="Datum"><input type="date" className="sp-input w-full px-3 py-2.5 text-sm" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></Field>
        </div>
        <Field label="Zusammenfassung"><textarea className="sp-input w-full px-3 py-2.5 text-sm resize-none" rows={3} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} /></Field>
        <Field label="Stichpunkte (eine Zeile je Punkt)"><textarea className="sp-input w-full px-3 py-2.5 text-sm resize-none" rows={3} value={form.bullets} onChange={(e) => setForm({ ...form, bullets: e.target.value })} /></Field>
        <Field label="Begriffe (Format: Begriff: Definition, eine Zeile je Begriff)"><textarea className="sp-input w-full px-3 py-2.5 text-sm resize-none" rows={3} value={form.terms} onChange={(e) => setForm({ ...form, terms: e.target.value })} /></Field>
        <Field label="Formeln (eine Zeile je Formel, optional)"><textarea className="sp-input w-full px-3 py-2.5 text-sm resize-none" rows={2} value={form.formulas} onChange={(e) => setForm({ ...form, formulas: e.target.value })} /></Field>
        <Field label="Merkkasten"><textarea className="sp-input w-full px-3 py-2.5 text-sm resize-none" rows={2} value={form.merkkasten} onChange={(e) => setForm({ ...form, merkkasten: e.target.value })} /></Field>
        <div className="flex gap-2 mt-2">
          <button onClick={() => { onDelete(entry.id); onClose(); }} className="sp-btn-secondary px-4 py-2.5 text-sm flex items-center gap-1.5" style={{ color: "var(--rose)" }}><Trash2 size={15} />Löschen</button>
          <button onClick={save} className="sp-btn-primary flex-1 py-2.5 text-sm">Speichern</button>
        </div>
      </div>
    </Modal>
  );
}

function WeakSpotHeatmap({ entries, subjects, onPracticeWeak, onOpenSubject }) {
  const weakSpots = useMemo(() => computeWeakSpots(entries, subjects), [entries, subjects]);
  const [selected, setSelected] = useState(null);

  if (weakSpots.length === 0) {
    return (
      <div className="sp-card p-5 mt-4">
        <SectionTitle icon={Flame} title="Schwachstellen" />
        <EmptyState icon={Flame} title="Noch keine Daten" subtitle="Sobald du Begriffe im Lernmodus übst, siehst du hier, welche Themen noch nicht sitzen." />
      </div>
    );
  }

  const weakest = weakSpots.slice(0, 5);
  const tierCounts = MASTERY_TIERS.map((tier) => ({
    ...tier,
    count: weakSpots.filter((t) => masteryTier(t.srsBox).label === tier.label).length,
  }));

  return (
    <div className="sp-card p-5 mt-4">
      <SectionTitle icon={Flame} title="Schwachstellen" />

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        {tierCounts.map((t) => (
          <div key={t.label} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: t.color }} />
            {t.label} ({t.count})
          </div>
        ))}
      </div>

      <div className="grid gap-1.5 mb-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(22px, 1fr))" }}>
        {weakSpots.map((t, i) => {
          const tier = masteryTier(t.srsBox);
          return (
            <button
              key={t.id || i}
              onClick={() => setSelected(t)}
              title={t.term}
              className="rounded-md transition-transform hover:scale-110"
              style={{ aspectRatio: "1", background: tier.color, opacity: selected === t ? 1 : 0.85, outline: selected === t ? "2px solid var(--text)" : "none" }}
            />
          );
        })}
      </div>

      {selected && (
        <div className="sp-card p-3.5 mb-4 sp-fade-in flex items-start justify-between gap-3" style={{ background: masteryTier(selected.srsBox).bg }}>
          <div className="min-w-0">
            <p className="text-sm font-semibold">{selected.term}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{selected.def}</p>
            {selected.subject && <p className="text-[11px] mt-1" style={{ color: "var(--text-faint)" }}>{selected.subject.name}</p>}
          </div>
          <Chip color={selected.srsBox <= 1 ? "rose" : selected.srsBox <= 3 ? "amber" : "teal"}>{masteryTier(selected.srsBox).label}</Chip>
        </div>
      )}

      <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>AM WENIGSTEN SICHER</p>
      <div className="space-y-1.5">
        {weakest.map((t, i) => (
          <div key={t.id || i} className="flex items-center gap-2.5 py-1.5">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: masteryTier(t.srsBox).color }} />
            <button
              onClick={() => t.subject && onOpenSubject && onOpenSubject(t.subjectId)}
              className="flex-1 min-w-0 text-left"
              disabled={!onOpenSubject}
            >
              <p className="text-sm truncate">{t.term}{t.subject ? <span style={{ color: "var(--text-faint)" }}> · {t.subject.name}</span> : ""}</p>
            </button>
          </div>
        ))}
      </div>

      {onPracticeWeak && (
        <button onClick={onPracticeWeak} className="sp-btn-primary w-full py-2.5 text-sm mt-4 flex items-center justify-center gap-1.5">
          <Flame size={14} />Schwachstellen im Lernmodus üben
        </button>
      )}
    </div>
  );
}

function TutorChat({ subject, scopedEntries, scopeLabel, settings, messages, onSendMessage, onClearChat }) {
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, sending]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setError(null);
    const userMsg = { id: uid(), role: "user", content: text, createdAt: Date.now() };
    const nextMessages = [...messages, userMsg];
    onSendMessage(nextMessages);
    setInput("");
    setSending(true);
    try {
      const reply = await runTutorChat({
        provider: settings.aiProvider, openrouterApiKey: settings.openrouterApiKey, openrouterModel: settings.openrouterModel,
        subjectName: subject.name, contextEntries: scopedEntries,
        history: nextMessages.map((m) => ({ role: m.role, content: m.content })),
      });
      onSendMessage([...nextMessages, { id: uid(), role: "assistant", content: reply, createdAt: Date.now() }]);
    } catch (e) {
      setError(e.message || "Der Tutor ist gerade nicht erreichbar.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col" style={{ height: "min(70vh, 640px)" }}>
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <p className="text-xs" style={{ color: "var(--text-faint)" }}>
          Der Tutor kennt nur den Stoff im gewählten Lernumfang: <strong>{scopeLabel}</strong>
        </p>
        {messages.length > 0 && (
          <button onClick={onClearChat} className="sp-btn-secondary px-3 py-1.5 text-xs flex items-center gap-1.5"><Trash2 size={12} />Chat leeren</button>
        )}
      </div>

      {scopedEntries.length === 0 && (
        <div className="sp-card p-3.5 mb-3" style={{ background: "var(--amber-soft)" }}>
          <p className="text-xs" style={{ color: "var(--amber)" }}>Für den gewählten Lernumfang gibt es noch keine Hefteinträge – der Tutor kann dir dazu noch nichts aus deinem Unterricht erklären, versucht es aber trotzdem allgemein.</p>
        </div>
      )}

      <div ref={scrollRef} className="flex-1 overflow-y-auto sp-scroll sp-card p-4 mb-3 flex flex-col gap-3" style={{ background: "var(--bg-soft)" }}>
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-2 py-8">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "var(--accent-soft)" }}>
              <Bot size={22} style={{ color: "var(--accent)" }} />
            </div>
            <p className="text-sm font-medium">Frag mich etwas zu {subject.name}</p>
            <p className="text-xs max-w-xs" style={{ color: "var(--text-faint)" }}>z.B. „Erklär mir nochmal den Unterschied aus der letzten Stunde" oder „Warum ist das so?"</p>
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className="max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap"
              style={m.role === "user"
                ? { background: "var(--accent)", color: "#fff", borderBottomRightRadius: 4 }
                : { background: "var(--bg-elevated)", border: "1px solid var(--border)", borderBottomLeftRadius: 4 }}
            >
              {m.content}
            </div>
          </div>
        ))}
        {sending && (
          <div className="flex justify-start">
            <div className="px-4 py-2.5 rounded-2xl flex items-center gap-1.5" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
              <Loader2 size={14} className="animate-spin" style={{ color: "var(--text-faint)" }} />
              <span className="text-xs" style={{ color: "var(--text-faint)" }}>denkt nach...</span>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="sp-card p-3 mb-2 text-xs flex items-start gap-2" style={{ background: "var(--rose-soft)", color: "var(--rose)" }}>
          <AlertCircle size={14} className="shrink-0 mt-0.5" /> {error}
        </div>
      )}

      <div className="flex gap-2 items-end">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Frag den Tutor..."
          rows={1}
          className="sp-input flex-1 px-3.5 py-2.5 text-sm resize-none"
        />
        <button onClick={send} disabled={sending || !input.trim()} className="sp-btn-primary p-3 disabled:opacity-40 shrink-0">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

function SubjectDetail({ subject, data, setData, onBack, onUpload }) {
  const [tab, setTab] = useState("entries");
  const [quizMode, setQuizMode] = useState("cards"); // cards | learn | mc
  const [editEntry, setEditEntry] = useState(null);
  const [scopeType, setScopeType] = useState("all"); // all | abfrage | ex | sa
  const [saMode, setSaMode] = useState("ab"); // ab | alles
  const [saDate, setSaDate] = useState("");
  const entries = data.entries.filter((e) => e.subjectId === subject.id).sort((a, b) => b.createdAt - a.createdAt);
  const exams = data.exams.filter((e) => e.subjectId === subject.id).sort((a, b) => a.date.localeCompare(b.date));

  // Lernumfang: bestimmt, welche Hefteinträge für Zusammenfassungen/Quiz/Themen herangezogen werden.
  const distinctDatesDesc = useMemo(() => {
    const set = new Set(entries.map((e) => e.date));
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, [entries]);

  const scopedEntries = useMemo(() => {
    if (scopeType === "abfrage") {
      const lastDate = distinctDatesDesc[0];
      return lastDate ? entries.filter((e) => e.date === lastDate) : [];
    }
    if (scopeType === "ex") {
      const lastTwo = distinctDatesDesc.slice(0, 2);
      return entries.filter((e) => lastTwo.includes(e.date));
    }
    if (scopeType === "sa") {
      if (saMode === "alles") return entries;
      if (saMode === "ab" && saDate) return entries.filter((e) => e.date >= saDate);
      return entries; // noch kein Datum gewählt -> vorerst alles zeigen
    }
    return entries; // "all"
  }, [scopeType, saMode, saDate, entries, distinctDatesDesc]);

  const scopeActive = scopeType !== "all";
  const scopeLabel = scopeType === "abfrage" ? "Abfrage – letzter Eintrag"
    : scopeType === "ex" ? "Ex – letzte 2 Tage"
    : scopeType === "sa" ? (saMode === "alles" ? "Schulaufgabe – gesamter Stoff" : saDate ? `Schulaufgabe – ab ${fmtDate(saDate)}` : "Schulaufgabe – Datum wählen")
    : "Alle Einträge";

  const allTerms = scopedEntries.flatMap((e) => e.terms.map((t) => ({ ...t, date: e.date })));
  const dueCount = useMemo(() => allTerms.filter((t) => !t.srsDue || t.srsDue <= todayISO()).length, [allTerms]);

  const monthly = useMemo(() => {
    const map = {};
    entries.forEach((e) => {
      const m = e.date.slice(0, 7);
      map[m] = (map[m] || 0) + 1;
    });
    return Object.entries(map).sort().slice(-6).map(([m, c]) => ({ name: m.slice(5) + "." + m.slice(2, 4), count: c }));
  }, [entries]);

  const updateTermSrs = (entryId, termId, patch) => {
    setData((d) => ({
      ...d,
      entries: d.entries.map((e) => e.id !== entryId ? e : { ...e, terms: e.terms.map((t) => t.id === termId ? { ...t, ...patch } : t) }),
    }));
  };
  const saveEntry = (updated) => setData((d) => ({ ...d, entries: d.entries.map((e) => e.id === updated.id ? updated : e) }));
  const deleteEntry = (id) => setData((d) => ({ ...d, entries: d.entries.filter((e) => e.id !== id) }));

  const tabs = [
    { key: "entries", label: "Hefteinträge", icon: FileText },
    { key: "summaries", label: "Zusammenfassungen", icon: Layers },
    { key: "tutor", label: "Tutor", icon: Bot },
    { key: "quiz", label: "Quiz", icon: BrainCircuit },
    { key: "stats", label: "Lernstatistik", icon: TrendingUp },
    { key: "topics", label: "Themen", icon: Tags },
  ];

  return (
    <div className="sp-fade-in max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-24 sm:pb-10">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm mb-4 sp-nav-item px-2 py-1 rounded-lg -ml-2" style={{ color: "var(--text-muted)" }}>
        <ArrowLeft size={15} /> Zurück
      </button>
      <div className="flex items-center gap-4 mb-6">
        <Avatar subject={subject} size={52} />
        <div className="flex-1">
          <h1 className="sp-font-display font-bold text-2xl">{subject.name}</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>{entries.length} Hefteinträge · {exams.length} Prüfungen</p>
        </div>
        <button onClick={() => onUpload(subject.id)} className="sp-btn-primary px-4 py-2.5 text-sm flex items-center gap-2"><Camera size={15} />Upload</button>
      </div>

      <div className="sp-card p-3.5 mb-5 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs font-medium shrink-0" style={{ color: "var(--text-muted)" }}>
          <AlertCircle size={13} /> Abfragehäufigkeit
        </div>
        <div className="sp-btn-secondary p-1 flex text-xs" style={{ borderRadius: 999 }}>
          {[
            { key: "occasional", label: "Selten / geplant" },
            { key: "frequent", label: "Jede Stunde möglich" },
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => setData((d) => ({ ...d, subjects: d.subjects.map((s) => s.id === subject.id ? { ...s, quizFrequency: opt.key } : s) }))}
              className="px-3 py-1.5 rounded-full transition-all"
              style={{ background: (subject.quizFrequency || "occasional") === opt.key ? "var(--accent)" : "transparent", color: (subject.quizFrequency || "occasional") === opt.key ? "#fff" : "var(--text-muted)" }}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <p className="text-xs basis-full" style={{ color: "var(--text-faint)" }}>
          Bei „Jede Stunde möglich" empfiehlt StudyPilot vor jeder Unterrichtsstunde in diesem Fach automatisch die intensive Wiederholung – auch ohne eingetragene Prüfung.
        </p>
      </div>

      <div className="flex gap-1 mb-5 overflow-x-auto sp-scroll pb-1">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.key} onClick={() => { setTab(t.key); setQuizMode("cards"); }} className="sp-nav-item px-3.5 py-2 text-sm flex items-center gap-1.5 shrink-0" style={tab === t.key ? { background: "var(--accent-soft)", color: "var(--accent)", fontWeight: 600, borderRadius: 11 } : { borderRadius: 11 }}>
              <Icon size={14} /> {t.label}
              {t.key === "quiz" && dueCount > 0 && <Chip color="rose" style={{ padding: "0 6px", marginLeft: 2 }}>{dueCount}</Chip>}
            </button>
          );
        })}
      </div>

      {["summaries", "quiz", "topics", "tutor"].includes(tab) && (
        <div className="sp-card p-3.5 mb-5">
          <div className="flex items-center gap-1.5 text-xs font-medium mb-2.5" style={{ color: "var(--text-muted)" }}>
            <Layers size={13} /> Lernumfang – wofür lernst du gerade?
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              { key: "all", label: "Alles" },
              { key: "abfrage", label: "Abfrage" },
              { key: "ex", label: "Ex" },
              { key: "sa", label: "Schulaufgabe" },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => setScopeType(opt.key)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                style={{ background: scopeType === opt.key ? "var(--accent)" : "var(--bg-soft)", color: scopeType === opt.key ? "#fff" : "var(--text-muted)", border: "1px solid " + (scopeType === opt.key ? "var(--accent)" : "var(--border)") }}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {scopeType === "sa" && (
            <div className="flex flex-wrap items-center gap-2 mt-2.5 sp-fade-in">
              <div className="sp-btn-secondary p-1 flex text-xs" style={{ borderRadius: 999 }}>
                {[{ key: "ab", label: "Ab Datum" }, { key: "alles", label: "Alles" }].map((m) => (
                  <button key={m.key} onClick={() => setSaMode(m.key)} className="px-3 py-1.5 rounded-full transition-all" style={{ background: saMode === m.key ? "var(--accent)" : "transparent", color: saMode === m.key ? "#fff" : "var(--text-muted)" }}>
                    {m.label}
                  </button>
                ))}
              </div>
              {saMode === "ab" && (
                <input type="date" className="sp-input px-3 py-1.5 text-xs" value={saDate} onChange={(e) => setSaDate(e.target.value)} />
              )}
            </div>
          )}
          <p className="text-xs mt-2.5" style={{ color: "var(--text-faint)" }}>
            {scopeLabel} · {scopedEntries.length} Hefteintrag{scopedEntries.length === 1 ? "" : "e"} einbezogen
          </p>
        </div>
      )}

      {tab === "entries" && (
        entries.length === 0 ? (
          <EmptyState icon={FileText} title="Noch keine Hefteinträge" subtitle="Lade ein Foto deines Hefteintrags hoch – StudyPilot erledigt den Rest." action={<button onClick={() => onUpload(subject.id)} className="sp-btn-primary px-4 py-2 text-sm">Jetzt hochladen</button>} />
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {entries.map((e) => {
              const imgs = e.images && e.images.length ? e.images : (e.image ? [e.image] : []);
              return (
                <button key={e.id} onClick={() => setEditEntry(e)} className="sp-card sp-card-hover p-4 flex gap-3 text-left">
                  <div className="relative shrink-0">
                    {imgs[0] ? <img src={imgs[0]} className="w-20 h-20 rounded-xl object-cover" style={{ border: "1px solid var(--border)" }} /> : <div className="w-20 h-20 rounded-xl" style={{ background: "var(--bg-soft)" }} />}
                    {imgs.length > 1 && <span className="absolute -bottom-1.5 -right-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: "var(--accent)", color: "#fff" }}>+{imgs.length - 1}</span>}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs mb-1" style={{ color: "var(--text-faint)" }}>{fmtDateLong(e.date)}</p>
                      <Pencil size={13} style={{ color: "var(--text-faint)" }} />
                    </div>
                    <p className="text-sm line-clamp-3" style={{ color: "var(--text-muted)" }}>{e.summary}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )
      )}

      {tab === "summaries" && (
        scopedEntries.length === 0 ? <EmptyState icon={Layers} title="Keine Zusammenfassungen im gewählten Lernumfang" subtitle={scopeActive ? "Für diesen Zeitraum/Typ gibt es noch keine Hefteinträge. Wähle oben einen anderen Lernumfang." : "Sobald du Hefteinträge hochlädst, erscheinen hier automatisch erstellte Zusammenfassungen."} /> : (
          <div className="space-y-4">
            {scopedEntries.map((e) => (
              <div key={e.id} className="sp-card p-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold" style={{ color: "var(--text-faint)" }}>{fmtDateLong(e.date)}</p>
                  <button onClick={() => setEditEntry(e)} className="p-1 rounded-full sp-nav-item"><Pencil size={13} style={{ color: "var(--text-faint)" }} /></button>
                </div>
                <p className="text-sm leading-relaxed mb-3">{e.summary}</p>
                <ul className="text-sm space-y-1 list-disc list-inside mb-3" style={{ color: "var(--text-muted)" }}>
                  {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
                {e.formulas.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {e.formulas.map((f, i) => <span key={i} className="sp-font-display text-xs font-semibold px-2.5 py-1 rounded-lg" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>{f}</span>)}
                  </div>
                )}
                <div className="rounded-xl p-3 text-sm" style={{ background: "var(--amber-soft)", color: "var(--amber)" }}>💡 {e.merkkasten}</div>
              </div>
            ))}
          </div>
        )
      )}

      {tab === "quiz" && (
        allTerms.length === 0 ? <EmptyState icon={BrainCircuit} title="Noch kein Quiz im gewählten Lernumfang" subtitle={scopeActive ? "Für diesen Zeitraum/Typ gibt es noch keine Begriffe. Wähle oben einen anderen Lernumfang." : "Lade Hefteinträge hoch – StudyPilot erstellt automatisch Karteikarten aus den wichtigsten Begriffen."} /> : (
          <div>
            {quizMode === "cards" && (
              <>
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>Tippe auf eine Karte, um sie umzudrehen.</p>
                  <div className="flex gap-2">
                    <button onClick={() => setQuizMode("learn")} className="sp-btn-primary px-3.5 py-2 text-xs flex items-center gap-1.5"><Flame size={13} />Lernmodus{dueCount > 0 ? ` (${dueCount} fällig)` : ""}</button>
                    <button onClick={() => setQuizMode("mc")} className="sp-btn-secondary px-3.5 py-2 text-xs flex items-center gap-1.5"><BrainCircuit size={13} />Multiple Choice</button>
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {allTerms.map((t, i) => <Flashcard key={i} term={t.term} def={t.def} />)}
                </div>
              </>
            )}
            {quizMode === "learn" && (
              <LearnSession subjectId={subject.id} entries={scopedEntries} onUpdateTerm={updateTermSrs} onExit={() => setQuizMode("cards")} />
            )}
            {quizMode === "mc" && (
              <MCQuiz allTerms={allTerms} onExit={() => setQuizMode("cards")} />
            )}
          </div>
        )
      )}

      {tab === "stats" && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sp-card p-5">
            <SectionTitle icon={TrendingUp} title="Einträge pro Monat" />
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthly}>
                  <CartesianGrid vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} width={22} />
                  <Tooltip contentStyle={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]} fill={subject.color} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="sp-card p-5 flex flex-col gap-4">
            <SectionTitle icon={Zap} title="Überblick" />
            {[
              { label: "Hefteinträge gesamt", value: entries.length },
              { label: "Wichtige Begriffe gelernt", value: allTerms.length },
              { label: "Heute fällig (Lernmodus)", value: dueCount },
              { label: "Anstehende Prüfungen", value: exams.filter((e) => daysUntil(e.date) >= 0).length },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>{s.label}</span>
                <span className="sp-font-display font-bold text-lg">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "stats" && (
        <WeakSpotHeatmap
          entries={entries}
          subjects={null}
          onPracticeWeak={() => { setTab("quiz"); setQuizMode("learn"); }}
        />
      )}

      {tab === "topics" && (
        allTerms.length === 0 ? <EmptyState icon={Tags} title="Noch keine Themen erfasst" /> : (
          <div className="grid sm:grid-cols-2 gap-3">
            {allTerms.map((t, i) => (
              <div key={i} className="sp-card p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-sm">{t.term}</p>
                  <span className="text-[11px]" style={{ color: "var(--text-faint)" }}>{fmtDate(t.date)}</span>
                </div>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{t.def}</p>
              </div>
            ))}
          </div>
        )
      )}

      {tab === "tutor" && (
        <TutorChat
          subject={subject}
          scopedEntries={scopedEntries}
          scopeLabel={scopeLabel}
          settings={data.settings}
          messages={data.chats?.[subject.id] || []}
          onSendMessage={(msgs) => setData((d) => ({ ...d, chats: { ...d.chats, [subject.id]: msgs } }))}
          onClearChat={() => setData((d) => { const nc = { ...d.chats }; delete nc[subject.id]; return { ...d, chats: nc }; })}
        />
      )}

      <EntryEditModal open={!!editEntry} onClose={() => setEditEntry(null)} entry={editEntry} subjects={data.subjects} onSave={saveEntry} onDelete={deleteEntry} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Exams / Homework                                                    */
/* ------------------------------------------------------------------ */
function ExamModal({ open, onClose, onSave, subjects }) {
  const empty = { subjectId: subjects[0]?.id || "", type: "Abfrage", date: todayISO(), title: "", description: "", stoffbeginn: "" };
  const [form, setForm] = useState(empty);
  useEffect(() => { if (open) setForm(empty); }, [open]);
  if (!open) return null;
  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader title="Prüfung hinzufügen" onClose={onClose} />
      <div className="px-5 pb-5">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Fach">
            <select className="sp-input w-full px-3 py-2.5 text-sm" value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })}>
              {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </Field>
          <Field label="Art">
            <select className="sp-input w-full px-3 py-2.5 text-sm" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              {EXAM_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Titel"><input className="sp-input w-full px-3 py-2.5 text-sm" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="z.B. Bruchrechnen" /></Field>
        <Field label="Datum"><input type="date" className="sp-input w-full px-3 py-2.5 text-sm" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></Field>
        <Field label="Beschreibung"><textarea className="sp-input w-full px-3 py-2.5 text-sm resize-none" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Field>
        {form.type === "Schulaufgabe" && (
          <Field label="Stoffbeginn (optional)"><input type="date" className="sp-input w-full px-3 py-2.5 text-sm" value={form.stoffbeginn} onChange={(e) => setForm({ ...form, stoffbeginn: e.target.value })} /></Field>
        )}
        <button onClick={() => { onSave({ ...form, id: uid() }); onClose(); }} disabled={!form.title} className="sp-btn-primary w-full py-3 text-sm mt-2 disabled:opacity-40">Speichern</button>
      </div>
    </Modal>
  );
}

function StudyPlanView({ exam, relevantEntries }) {
  const plan = useMemo(() => computeStudyPlan(exam, relevantEntries), [exam, relevantEntries]);
  if (plan.tooLate) {
    return <p className="text-xs mt-2.5 sp-fade-in" style={{ color: "var(--text-faint)" }}>{plan.reason}</p>;
  }
  const groups = groupPlanDays(plan.days);
  const today = todayISO();
  return (
    <div className="mt-3 space-y-2 sp-fade-in">
      {groups.map((g, i) => {
        const isCurrent = today >= g.startDate && today <= g.endDate;
        const rangeLabel = g.startDate === g.endDate ? fmtDateLong(g.startDate) : `${fmtDate(g.startDate)} – ${fmtDate(g.endDate)}`;
        return (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-xl"
            style={{ background: isCurrent ? "var(--accent-soft)" : "var(--bg-soft)", border: isCurrent ? "1px solid var(--accent)" : "1px solid transparent" }}
          >
            <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: g.phase === "festigen" ? "var(--teal)" : "var(--accent)" }} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-xs font-semibold" style={{ color: isCurrent ? "var(--accent)" : "var(--text)" }}>{rangeLabel}</p>
                {isCurrent && <Chip color="accent">heute</Chip>}
                {g.count > 1 && <span className="text-[11px]" style={{ color: "var(--text-faint)" }}>({g.count} Tage)</span>}
              </div>
              <p className="text-sm mt-0.5">{g.title}</p>
              {g.phase === "erarbeiten" && (
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  {g.entries.map((e) => fmtDate(e.date)).join(", ")}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ExamsPage({ data, setData, subjects, onOpenSubject }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [planExpandedId, setPlanExpandedId] = useState(null);
  const list = [...data.exams].sort((a, b) => a.date.localeCompare(b.date));
  const addExam = (exam) => setData((d) => ({ ...d, exams: [...d.exams, exam] }));
  const removeExam = (id) => setData((d) => ({ ...d, exams: d.exams.filter((e) => e.id !== id) }));

  return (
    <div className="sp-fade-in max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-24 sm:pb-10">
      <div className="flex items-center justify-between mb-5">
        <h1 className="sp-font-display font-bold text-2xl">Prüfungen</h1>
        <button onClick={() => setModalOpen(true)} className="sp-btn-primary px-4 py-2.5 text-sm flex items-center gap-1.5"><Plus size={15} />Neu</button>
      </div>
      {list.length === 0 ? (
        <EmptyState icon={ClipboardCheck} title="Keine Prüfungen eingetragen" subtitle="Füge Abfragen, Exen, Schulaufgaben oder Referate hinzu." action={<button onClick={() => setModalOpen(true)} className="sp-btn-primary px-4 py-2 text-sm">Prüfung hinzufügen</button>} />
      ) : (
        <div className="space-y-2.5">
          {list.map((e) => {
            const subj = subjects.find((s) => s.id === e.subjectId);
            const meta = EXAM_TYPE_META[e.type] || EXAM_TYPE_META.Abfrage;
            const past = daysUntil(e.date) < 0;
            const relevant = relevantEntriesForExam(e, data.entries);
            const expanded = expandedId === e.id;
            const planExpanded = planExpandedId === e.id;
            return (
              <div key={e.id} className="sp-card p-4" style={{ opacity: past ? 0.5 : 1 }}>
                <div className="flex items-center gap-4">
                  <Avatar subject={subj} size={42} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm">{e.title}</p>
                      <Chip color={meta.color}>{e.type}</Chip>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{subj?.name} · {fmtDateLong(e.date)}{e.description ? ` · ${e.description}` : ""}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Chip color={daysUntil(e.date) <= 1 && !past ? "rose" : "muted"}>{untilLabel(e.date)}</Chip>
                    <button onClick={() => removeExam(e.id)} className="p-1.5 rounded-full sp-nav-item"><Trash2 size={14} style={{ color: "var(--text-faint)" }} /></button>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2.5 flex-wrap">
                  <button onClick={() => setExpandedId(expanded ? null : e.id)} className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "var(--accent)" }}>
                    <Layers size={12} /> {relevant.length === 0 ? "Kein passender Lernstoff gefunden" : `${relevant.length} relevante${relevant.length === 1 ? "r" : ""} Hefteintrag${relevant.length === 1 ? "" : "e"}`}
                    {relevant.length > 0 && (expanded ? <ChevronLeft size={12} style={{ transform: "rotate(-90deg)" }} /> : <ChevronRight size={12} />)}
                  </button>
                  {!past && relevant.length > 0 && (
                    <button onClick={() => setPlanExpandedId(planExpanded ? null : e.id)} className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "var(--teal)" }}>
                      <CalendarDays size={12} /> Lernplan
                      {planExpanded ? <ChevronLeft size={12} style={{ transform: "rotate(-90deg)" }} /> : <ChevronRight size={12} />}
                    </button>
                  )}
                </div>
                {expanded && relevant.length > 0 && (
                  <div className="mt-2.5 space-y-1.5 sp-fade-in">
                    {relevant.map((r) => (
                      <button key={r.id} onClick={() => onOpenSubject && onOpenSubject(r.subjectId)} className="w-full text-left flex items-center gap-2.5 p-2 rounded-xl sp-nav-item" style={{ background: "var(--bg-soft)" }}>
                        <span className="text-xs shrink-0" style={{ color: "var(--text-faint)" }}>{fmtDate(r.date)}</span>
                        <span className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{r.summary}</span>
                      </button>
                    ))}
                  </div>
                )}
                {planExpanded && <StudyPlanView exam={e} relevantEntries={relevant} />}
              </div>
            );
          })}
        </div>
      )}
      <ExamModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={addExam} subjects={subjects} />
    </div>
  );
}

function HomeworkModal({ open, onClose, onSave, subjects }) {
  const empty = { subjectId: subjects[0]?.id || "", description: "", dueDate: todayISO() };
  const [form, setForm] = useState(empty);
  useEffect(() => { if (open) setForm(empty); }, [open]);
  if (!open) return null;
  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader title="Hausaufgabe hinzufügen" onClose={onClose} />
      <div className="px-5 pb-5">
        <Field label="Fach">
          <select className="sp-input w-full px-3 py-2.5 text-sm" value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })}>
            {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </Field>
        <Field label="Beschreibung"><textarea className="sp-input w-full px-3 py-2.5 text-sm resize-none" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="z.B. Seite 42, Aufgabe 3-5" /></Field>
        <Field label="Fällig am"><input type="date" className="sp-input w-full px-3 py-2.5 text-sm" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} /></Field>
        <button onClick={() => { onSave({ ...form, id: uid(), done: false }); onClose(); }} disabled={!form.description} className="sp-btn-primary w-full py-3 text-sm mt-2 disabled:opacity-40">Speichern</button>
      </div>
    </Modal>
  );
}

function HomeworkPage({ data, setData, subjects }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const list = [...data.homework].filter((h) => showDone || !h.done).sort((a, b) => (a.dueDate || "9999").localeCompare(b.dueDate || "9999"));
  const addHw = (hw) => setData((d) => ({ ...d, homework: [...d.homework, hw] }));
  const toggleDone = (id) => setData((d) => ({ ...d, homework: d.homework.map((h) => (h.id === id ? { ...h, done: !h.done } : h)) }));
  const removeHw = (id) => setData((d) => ({ ...d, homework: d.homework.filter((h) => h.id !== id) }));

  return (
    <div className="sp-fade-in max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-24 sm:pb-10">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h1 className="sp-font-display font-bold text-2xl">Hausaufgaben</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowDone((s) => !s)} className="sp-btn-secondary px-3 py-2 text-xs">{showDone ? "Erledigte ausblenden" : "Erledigte anzeigen"}</button>
          <button onClick={() => setModalOpen(true)} className="sp-btn-primary px-4 py-2.5 text-sm flex items-center gap-1.5"><Plus size={15} />Neu</button>
        </div>
      </div>
      {list.length === 0 ? (
        <EmptyState icon={ListTodo} title="Keine offenen Hausaufgaben" subtitle="Schön aufgeräumt ✨" action={<button onClick={() => setModalOpen(true)} className="sp-btn-primary px-4 py-2 text-sm">Hausaufgabe hinzufügen</button>} />
      ) : (
        <div className="space-y-2">
          {list.map((h) => {
            const subj = subjects.find((s) => s.id === h.subjectId);
            return (
              <div key={h.id} className="sp-card p-4 flex items-center gap-3">
                <button onClick={() => toggleDone(h.id)}>
                  {h.done ? <CheckCircle2 size={22} style={{ color: "var(--teal)" }} /> : <Circle size={22} style={{ color: "var(--text-faint)" }} />}
                </button>
                <Avatar subject={subj} size={36} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ textDecoration: h.done ? "line-through" : "none", color: h.done ? "var(--text-faint)" : "var(--text)" }}>{h.description}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{subj?.name}</p>
                </div>
                <Chip color={!h.done && daysUntil(h.dueDate) <= 1 ? "rose" : "muted"}>{h.dueDate ? untilLabel(h.dueDate) : "—"}</Chip>
                <button onClick={() => removeHw(h.id)} className="p-1.5 rounded-full sp-nav-item"><Trash2 size={14} style={{ color: "var(--text-faint)" }} /></button>
              </div>
            );
          })}
        </div>
      )}
      <HomeworkModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={addHw} subjects={subjects} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Settings                                                             */
/* ------------------------------------------------------------------ */
function DataBackupSection({ data, setData }) {
  const fileRef = useRef(null);
  const [status, setStatus] = useState(null);

  const exportData = () => {
    const payload = {
      exportedAt: new Date().toISOString(), app: "StudyPilot", version: 2,
      settings: data.settings, subjects: data.subjects, schedule: data.schedule,
      exams: data.exams, homework: data.homework, entries: data.entries, chats: data.chats || {},
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `studypilot-backup-${todayISO()}.json`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatus({ type: "ok", msg: "Backup wurde heruntergeladen." });
  };

  const importData = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (!parsed.subjects || !parsed.schedule) throw new Error("Ungültige Backup-Datei");
        setData((d) => ({
          settings: { ...d.settings, ...(parsed.settings || {}) },
          subjects: parsed.subjects || [],
          schedule: parsed.schedule || [],
          exams: parsed.exams || [],
          homework: parsed.homework || [],
          entries: parsed.entries || [],
          chats: parsed.chats || {},
        }));
        setStatus({ type: "ok", msg: "Backup erfolgreich importiert." });
      } catch (err) {
        setStatus({ type: "error", msg: "Datei konnte nicht gelesen werden: " + err.message });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="sp-card p-5 mb-4">
      <SectionTitle icon={FileJson} title="Daten & Backup" />
      <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>Exportiere alle deine Daten als JSON-Datei oder stelle ein früheres Backup wieder her.</p>
      <div className="flex flex-wrap gap-2 mb-2">
        <button onClick={exportData} className="sp-btn-secondary px-4 py-2.5 text-sm flex items-center gap-1.5"><Download size={15} />Backup exportieren</button>
        <button onClick={() => fileRef.current?.click()} className="sp-btn-secondary px-4 py-2.5 text-sm flex items-center gap-1.5"><UploadCloud size={15} />Backup importieren</button>
        <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files[0] && importData(e.target.files[0])} />
      </div>
      {status && <p className="text-xs mt-1" style={{ color: status.type === "ok" ? "var(--teal)" : "var(--rose)" }}>{status.msg}</p>}
    </div>
  );
}

function SettingsPage({ data, setData, saveStatus, saveError }) {
  const s = data.settings;
  const upd = (patch) => setData((d) => ({ ...d, settings: { ...d.settings, ...patch } }));
  return (
    <div className="sp-fade-in max-w-2xl mx-auto px-4 sm:px-6 pt-6 pb-24 sm:pb-10">
      <h1 className="sp-font-display font-bold text-2xl mb-5">Einstellungen</h1>

      <div className="sp-card p-3.5 mb-4 flex items-center gap-2.5" style={{ background: saveStatus === "ok" ? "var(--teal-soft)" : saveStatus === "checking" ? "var(--bg-soft)" : "var(--rose-soft)" }}>
        {saveStatus === "ok" && <CheckCircle2 size={16} style={{ color: "var(--teal)" }} />}
        {saveStatus === "checking" && <Loader2 size={16} className="animate-spin" style={{ color: "var(--text-muted)" }} />}
        {(saveStatus === "unavailable" || saveStatus === "error") && <AlertCircle size={16} style={{ color: "var(--rose)" }} />}
        <p className="text-xs" style={{ color: saveStatus === "ok" ? "var(--teal)" : saveStatus === "checking" ? "var(--text-muted)" : "var(--rose)" }}>
          {saveStatus === "ok" && "Automatisches Speichern funktioniert – Änderungen werden an dein Konto gebunden gespeichert."}
          {saveStatus === "checking" && "Speicher-Status wird geprüft..."}
          {saveStatus === "unavailable" && `Automatisches Speichern nicht verfügbar${saveError ? `: ${saveError}` : ""}. Bitte regelmäßig Backup exportieren.`}
          {saveStatus === "error" && `Letztes Speichern fehlgeschlagen${saveError ? `: ${saveError}` : ""}.`}
        </p>
      </div>

      <div className="sp-card p-5 mb-4">
        <SectionTitle icon={User} title="Profil" />
        <Field label="Name"><input className="sp-input w-full px-3 py-2.5 text-sm" value={s.name} onChange={(e) => upd({ name: e.target.value })} placeholder="Dein Name" /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Klassenstufe"><input className="sp-input w-full px-3 py-2.5 text-sm" value={s.grade} onChange={(e) => upd({ grade: e.target.value })} placeholder="9" /></Field>
          <Field label="Klassenbezeichnung"><input className="sp-input w-full px-3 py-2.5 text-sm" value={s.className} onChange={(e) => upd({ className: e.target.value })} placeholder="9b" /></Field>
        </div>
        <Field label="Schule"><input className="sp-input w-full px-3 py-2.5 text-sm" value={s.school} onChange={(e) => upd({ school: e.target.value })} placeholder="Gymnasium ..." /></Field>
      </div>

      <div className="sp-card p-5 mb-4">
        <SectionTitle icon={BrainCircuit} title="KI für OCR & Zusammenfassungen" />
        <Field label="KI-Anbieter">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button onClick={() => !IS_STANDALONE && upd({ aiProvider: "claude" })} disabled={IS_STANDALONE} className="sp-card p-3 text-left" style={{ borderColor: s.aiProvider === "claude" ? "var(--accent)" : "var(--border)", borderWidth: 2, opacity: IS_STANDALONE ? 0.45 : 1, cursor: IS_STANDALONE ? "not-allowed" : "pointer" }}>
              <p className="text-sm font-semibold">Claude (integriert)</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{IS_STANDALONE ? "Nur innerhalb der Claude-App verfügbar" : "Kostenlos, kein eigener Key nötig – empfohlen"}</p>
            </button>
            <button onClick={() => upd({ aiProvider: "openrouter" })} className="sp-card p-3 text-left" style={{ borderColor: s.aiProvider === "openrouter" ? "var(--accent)" : "var(--border)", borderWidth: 2 }}>
              <p className="text-sm font-semibold">OpenRouter{IS_STANDALONE ? " (empfohlen)" : ""}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Eigener kostenloser API-Key, freie Modellwahl</p>
            </button>
          </div>
        </Field>
        {IS_STANDALONE && (
          <div className="rounded-xl p-3 text-xs mb-1" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
            ℹ️ Diese eigenständige Version läuft außerhalb der Claude-App und hat daher keinen kostenlosen Claude-Zugang. Trage unten deinen kostenlosen OpenRouter-Key ein, um OCR & KI-Zusammenfassungen zu nutzen.
          </div>
        )}

        {s.aiProvider === "openrouter" && (
          <>
            <Field label="OpenRouter API-Key">
              <input type="password" className="sp-input w-full px-3 py-2.5 text-sm" value={s.openrouterApiKey} onChange={(e) => upd({ openrouterApiKey: e.target.value })} placeholder="sk-or-v1-..." />
            </Field>
            <Field label="Modell-ID (:free)">
              <input className="sp-input w-full px-3 py-2.5 text-sm" value={s.openrouterModel} onChange={(e) => upd({ openrouterModel: e.target.value })} placeholder="google/gemma-4-31b-it:free" />
            </Field>
            <div className="rounded-xl p-3 text-xs mb-1" style={{ background: "var(--amber-soft)", color: "var(--amber)" }}>
              ⚠️ Kostenlose OpenRouter-Modelle ändern sich häufig und haben Ratenlimits (oft ~20 Anfragen/Minute). Aktuelle Modell-IDs findest du unter openrouter.ai/models (Filter „Free"). Der Key wird nur in deinem privaten StudyPilot-Speicher abgelegt und direkt von deinem Gerät an OpenRouter gesendet.
            </div>
            <p className="text-xs" style={{ color: "var(--text-faint)" }}>Hinweis: Manche Browser-/App-Umgebungen blockieren Anfragen an externe Domains. Falls die Analyse fehlschlägt, wechsle zu „Claude (integriert)".</p>
          </>
        )}
        {s.aiProvider === "claude" && (
          <p className="text-xs" style={{ color: "var(--text-faint)" }}>Nutzt die in StudyPilot eingebaute, kostenlose Claude-Anbindung – liest Fotos direkt aus (OCR) und erstellt Zusammenfassung, Begriffe, Formeln und Merkkasten.</p>
        )}
      </div>

      <div className="sp-card p-5 mb-4">
        <SectionTitle icon={CalendarDays} title="Stundenplan" />
        <Field label="Aktuelle Woche">
          <div className="sp-btn-secondary p-1 flex text-sm w-fit" style={{ borderRadius: 999 }}>
            {["A", "B"].map((w) => (
              <button key={w} onClick={() => upd({ currentWeekType: w })} className="px-4 py-1.5 rounded-full transition-all" style={{ background: s.currentWeekType === w ? "var(--accent)" : "transparent", color: s.currentWeekType === w ? "#fff" : "var(--text-muted)" }}>
                {w}-Woche
              </button>
            ))}
          </div>
        </Field>
      </div>

      <div className="sp-card p-5 mb-4">
        <SectionTitle icon={School} title="Geräte & Synchronisierung" />
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Deine Daten (Stundenplan, Fächer, Hefteinträge, Prüfungen, Hausaufgaben) werden an dein Claude-Konto gebunden gespeichert – nicht nur lokal im Browser. Öffnest du StudyPilot auf einem anderen Gerät (z. B. iPhone über die Claude-App), während du dort mit demselben Konto angemeldet bist, siehst du dieselben Daten. Eine gesonderte iCloud-Anbindung ist dafür nicht nötig.
        </p>
      </div>

      <DataBackupSection data={data} setData={setData} />

      <div className="sp-card p-5 mb-4">
        <SectionTitle icon={AlertCircle} title="Erinnerungen" />
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Push-Benachrichtigungen außerhalb der geöffneten App sind in dieser Umgebung nicht möglich. Was heute ansteht, siehst du zuverlässig im Dashboard, sobald du StudyPilot öffnest.
        </p>
      </div>

      <div className="sp-card p-5">
        <SectionTitle icon={Sun} title="Erscheinungsbild" />
        <div className="flex gap-3">
          <button onClick={() => upd({ theme: "light" })} className="flex-1 sp-card p-4 flex flex-col items-center gap-2" style={{ borderColor: s.theme === "light" ? "var(--accent)" : "var(--border)", borderWidth: 2 }}>
            <Sun size={20} style={{ color: s.theme === "light" ? "var(--accent)" : "var(--text-muted)" }} />
            <span className="text-sm font-medium">Hell</span>
          </button>
          <button onClick={() => upd({ theme: "dark" })} className="flex-1 sp-card p-4 flex flex-col items-center gap-2" style={{ borderColor: s.theme === "dark" ? "var(--accent)" : "var(--border)", borderWidth: 2 }}>
            <Moon size={20} style={{ color: s.theme === "dark" ? "var(--accent)" : "var(--text-muted)" }} />
            <span className="text-sm font-medium">Dunkel</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Search                                                               */
/* ------------------------------------------------------------------ */
function useSearchResults(query, data, subjects) {
  return useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const res = [];
    subjects.forEach((s) => { if (s.name.toLowerCase().includes(q)) res.push({ type: "Fach", label: s.name, sub: "Fach", nav: { page: "subject", id: s.id } }); });
    data.entries.forEach((e) => {
      const subj = subjects.find((s) => s.id === e.subjectId);
      if (e.summary?.toLowerCase().includes(q) || e.terms.some((t) => t.term.toLowerCase().includes(q))) {
        res.push({ type: "Hefteintrag", label: `${subj?.name} · ${fmtDate(e.date)}`, sub: e.summary?.slice(0, 50), nav: { page: "subject", id: e.subjectId } });
      }
    });
    data.exams.forEach((e) => { if (e.title.toLowerCase().includes(q)) res.push({ type: "Prüfung", label: e.title, sub: `${subjects.find((s) => s.id === e.subjectId)?.name} · ${fmtDate(e.date)}`, nav: { page: "exams" } }); });
    data.homework.forEach((h) => { if (h.description.toLowerCase().includes(q)) res.push({ type: "Hausaufgabe", label: h.description, sub: subjects.find((s) => s.id === h.subjectId)?.name, nav: { page: "homework" } }); });
    return res.slice(0, 8);
  }, [query, data, subjects]);
}

/* ------------------------------------------------------------------ */
/* Nav                                                                  */
/* ------------------------------------------------------------------ */
const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "schedule", label: "Stundenplan", icon: CalendarDays },
  { key: "subjects", label: "Fächer", icon: BookOpen },
  { key: "exams", label: "Prüfungen", icon: ClipboardCheck },
  { key: "homework", label: "Hausaufgaben", icon: ListTodo },
  { key: "settings", label: "Einstellungen", icon: SettingsIcon },
];
const MOBILE_NAV = ["dashboard", "schedule", "subjects", "exams", "settings"];

function Sidebar({ page, onNav, settings }) {
  return (
    <aside className="hidden sm:flex flex-col w-60 shrink-0 h-screen sticky top-0 p-4" style={{ borderRight: "1px solid var(--border)" }}>
      <div className="flex items-center gap-2 px-2 py-3 mb-4">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}>
          <Sparkles size={16} color="#fff" />
        </div>
        <span className="sp-font-display font-bold text-[17px]">StudyPilot</span>
      </div>
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.key} onClick={() => onNav(item.key)} className={`sp-nav-item flex items-center gap-3 px-3 py-2.5 text-sm ${page === item.key ? "active" : ""}`}>
              <Icon size={17} /> {item.label}
            </button>
          );
        })}
      </nav>
      <div className="mt-auto sp-card p-3 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
          {(settings.name || "S")[0].toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold truncate">{settings.name || "Schüler:in"}</p>
          <p className="text-[11px] truncate" style={{ color: "var(--text-faint)" }}>{settings.className || "Klasse"}{settings.school ? ` · ${settings.school}` : ""}</p>
        </div>
      </div>
    </aside>
  );
}

function BottomNav({ page, onNav }) {
  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-30 sp-glass flex items-stretch" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      {MOBILE_NAV.map((key) => {
        const item = NAV_ITEMS.find((n) => n.key === key);
        const Icon = item.icon;
        const active = page === key || (key === "subjects" && page === "subject");
        return (
          <button key={key} onClick={() => onNav(key)} className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5">
            <Icon size={20} style={{ color: active ? "var(--accent)" : "var(--text-faint)" }} />
            <span className="text-[10px] font-medium" style={{ color: active ? "var(--accent)" : "var(--text-faint)" }}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function StorageStatusBanner({ status, error, onGoBackup }) {
  if (status !== "unavailable" && status !== "error") return null;
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-3 sp-fade-in">
      <div className="sp-card p-3.5 flex items-start gap-2.5" style={{ background: "var(--rose-soft)" }}>
        <AlertCircle size={16} style={{ color: "var(--rose)" }} className="shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium" style={{ color: "var(--rose)" }}>
            {status === "unavailable" ? "Automatisches Speichern ist hier nicht verfügbar." : "Letzte Änderung konnte nicht gespeichert werden."}
          </p>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            Deine Eingaben bleiben nur für diese Sitzung erhalten und gehen beim Schließen verloren. {error ? `(${error})` : ""} Exportiere regelmäßig ein Backup, um nichts zu verlieren.
          </p>
        </div>
        <button onClick={onGoBackup} className="sp-btn-secondary px-3 py-1.5 text-xs shrink-0">Zum Backup</button>
      </div>
    </div>
  );
}

function Header({ query, setQuery, results, onNavResult, onOpenSearch, searchOpen, setSearchOpen, theme, onToggleTheme, onUpload, onMenu }) {
  return (
    <header className="sticky top-0 z-20 sp-glass">
      <div className="flex items-center gap-3 px-4 sm:px-6 py-3 max-w-6xl mx-auto">
        <button onClick={onMenu} className="sm:hidden p-1.5 rounded-lg sp-nav-item"><Menu size={19} /></button>
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-faint)" }} />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSearchOpen(true); }}
            onFocus={() => setSearchOpen(true)}
            placeholder="Suche nach Fächern, Themen, Prüfungen..."
            className="sp-input w-full pl-9 pr-3 py-2 text-sm"
          />
          {searchOpen && results.length > 0 && (
            <div className="sp-card sp-pop-in absolute top-full mt-2 left-0 right-0 p-1.5 z-30 max-h-80 overflow-y-auto sp-scroll">
              {results.map((r, i) => (
                <button key={i} onClick={() => onNavResult(r)} className="w-full text-left px-3 py-2 rounded-xl sp-nav-item flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{r.label}</p>
                    {r.sub && <p className="text-xs truncate" style={{ color: "var(--text-faint)" }}>{r.sub}</p>}
                  </div>
                  <Chip>{r.type}</Chip>
                </button>
              ))}
            </div>
          )}
        </div>
        <button onClick={onUpload} className="hidden sm:flex sp-btn-secondary px-3.5 py-2 text-sm items-center gap-1.5"><Camera size={15} />Upload</button>
        <button onClick={onToggleTheme} className="p-2 rounded-full sp-nav-item">
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Root App                                                             */
/* ------------------------------------------------------------------ */
/* Robuste Storage-Helfer: verschlucken keine Fehler mehr, sondern melden sie zurück -------- */
function storageApiAvailable() {
  return typeof window !== "undefined" && window.storage && typeof window.storage.set === "function" && typeof window.storage.get === "function";
}
async function safeStorageSet(key, value) {
  if (!storageApiAvailable()) return { ok: false, error: "window.storage ist in dieser Ansicht nicht verfügbar." };
  try {
    await window.storage.set(key, value, false);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e?.message || "Unbekannter Speicherfehler" };
  }
}
async function safeStorageGet(key) {
  if (!storageApiAvailable()) return { ok: false, value: null, error: "window.storage ist in dieser Ansicht nicht verfügbar." };
  try {
    const r = await window.storage.get(key, false);
    return { ok: true, value: r ? r.value : null };
  } catch (e) {
    // Nicht vorhandener Key wirft laut API einen Fehler statt null zurückzugeben – das ist beim ersten Start normal.
    return { ok: true, value: null };
  }
}

function sanitizeEntries(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter((e) => e && typeof e === "object" && e.subjectId).map((e) => ({
    id: e.id || uid(),
    subjectId: e.subjectId,
    date: typeof e.date === "string" ? e.date : todayISO(),
    images: Array.isArray(e.images) ? e.images : (e.image ? [e.image] : []),
    image: e.image || (Array.isArray(e.images) ? e.images[0] : null) || null,
    createdAt: typeof e.createdAt === "number" ? e.createdAt : Date.now(),
    ocrText: typeof e.ocrText === "string" ? e.ocrText : "",
    summary: typeof e.summary === "string" ? e.summary : "",
    bullets: Array.isArray(e.bullets) ? e.bullets.filter((b) => typeof b === "string") : [],
    terms: Array.isArray(e.terms) ? e.terms.filter((t) => t && typeof t === "object").map((t) => ({
      id: t.id || uid(),
      term: typeof t.term === "string" ? t.term : "",
      def: typeof t.def === "string" ? t.def : "",
      srsBox: typeof t.srsBox === "number" ? t.srsBox : 1,
      srsDue: typeof t.srsDue === "string" ? t.srsDue : todayISO(),
    })) : [],
    formulas: Array.isArray(e.formulas) ? e.formulas.filter((f) => typeof f === "string") : [],
    merkkasten: typeof e.merkkasten === "string" ? e.merkkasten : "",
  }));
}
function sanitizeSchedule(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter((l) => l && l.subjectId && l.day).map((l) => ({
    id: l.id || uid(), day: l.day, start: l.start || "08:00", end: l.end || "08:45",
    week: ["A", "B"].includes(l.week) ? l.week : "ALL", subjectId: l.subjectId,
    teacher: l.teacher || "", room: l.room || "",
  }));
}
function sanitizeExams(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter((e) => e && e.subjectId && e.date).map((e) => ({
    id: e.id || uid(), subjectId: e.subjectId, type: EXAM_TYPES.includes(e.type) ? e.type : "Abfrage",
    date: e.date, title: e.title || "", description: e.description || "", stoffbeginn: e.stoffbeginn || "",
  }));
}
function sanitizeHomework(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter((h) => h && h.subjectId).map((h) => ({
    id: h.id || uid(), subjectId: h.subjectId, description: h.description || "",
    dueDate: h.dueDate || "", done: !!h.done,
  }));
}
function sanitizeSubjects(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter((s) => s && s.id && s.name).map((s) => ({
    id: s.id, name: s.name, color: s.color || SUBJECT_PALETTE[0],
    quizFrequency: s.quizFrequency === "frequent" ? "frequent" : "occasional",
  }));
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("StudyPilot render error:", error, info?.componentStack);
  }
  handleReset = async () => {
    try {
      const keys = ["settings", "subjects", "schedule", "exams", "homework", "entries", "chats"];
      for (const k of keys) {
        try { await window.storage.delete(k, false); } catch (e) { /* Key existierte evtl. nicht */ }
      }
    } catch (e) { /* window.storage evtl. nicht verfügbar */ }
    window.location.reload();
  };
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "system-ui, sans-serif", background: "#FAF9F7" }}>
          <div style={{ maxWidth: 440, textAlign: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: "#FBE7EA", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <span style={{ fontSize: 24 }}>⚠️</span>
            </div>
            <p style={{ fontWeight: 700, fontSize: 17, marginBottom: 6, color: "#211F1C" }}>StudyPilot konnte nicht geladen werden</p>
            <p style={{ fontSize: 13, color: "#78756E", marginBottom: 14 }}>Tatsächlicher Fehler (statt "Script error"):</p>
            <pre style={{ fontSize: 11, textAlign: "left", background: "#FBE7EA", color: "#E0455D", padding: 12, borderRadius: 10, overflowX: "auto", marginBottom: 18, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {String(this.state.error?.stack || this.state.error?.message || this.state.error)}
            </pre>
            <p style={{ fontSize: 12, color: "#78756E", marginBottom: 14 }}>
              Meist hilft ein normales Neuladen. Falls es weiterhin passiert, könnten gespeicherte Daten beschädigt sein –
              „Speicher zurücksetzen" löscht deine lokal gespeicherten StudyPilot-Daten (Backup vorher exportieren, falls möglich).
            </p>
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button onClick={() => window.location.reload()} style={{ padding: "10px 16px", borderRadius: 999, border: "1px solid #D9D5CD", background: "#fff", fontSize: 13, cursor: "pointer" }}>Neu laden</button>
              <button onClick={this.handleReset} style={{ padding: "10px 16px", borderRadius: 999, border: "none", background: "#E0455D", color: "#fff", fontSize: 13, cursor: "pointer" }}>Speicher zurücksetzen</button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const SUGGESTED_SUBJECTS = [
  "Mathe", "Deutsch", "Englisch", "Französisch", "Latein", "Spanisch",
  "Geschichte", "Erdkunde", "Politik/Sozialkunde", "Physik", "Chemie", "Biologie",
  "Sport", "Kunst", "Musik", "Informatik", "Religion/Ethik",
];

function OnboardingWizard({ onComplete }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({ name: "", grade: "9", school: "", className: "" });
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [customSubject, setCustomSubject] = useState("");

  const toggleSubject = (name) => {
    setSelectedSubjects((prev) => (prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]));
  };
  const addCustom = () => {
    const name = customSubject.trim();
    if (name && !selectedSubjects.includes(name)) setSelectedSubjects((prev) => [...prev, name]);
    setCustomSubject("");
  };

  const buildSubjects = () => selectedSubjects.map((name, i) => ({
    id: uid(), name, color: SUBJECT_PALETTE[i % SUBJECT_PALETTE.length], quizFrequency: "occasional",
  }));

  const finish = (startPage) => onComplete({ profile, subjects: buildSubjects(), schedule: [], startPage });

  const loadDemo = () => {
    const demoSubjects = seedSubjects();
    onComplete({ profile: { name: "", grade: "9", school: "", className: "" }, subjects: demoSubjects, schedule: seedSchedule(demoSubjects), startPage: "dashboard" });
  };

  return (
    <div className="sp-root min-h-screen flex items-center justify-center p-5" data-theme="light">
      <style>{THEME_CSS}</style>
      <div className="sp-card w-full max-w-md p-7 sp-pop-in">
        {step === 0 && (
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}>
              <Sparkles size={26} color="#fff" />
            </div>
            <h1 className="sp-font-display font-bold text-2xl mb-2">Willkommen bei StudyPilot</h1>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Dein persönlicher KI-Schulassistent. Kurz einrichten, dauert unter einer Minute.</p>
            <button onClick={() => setStep(1)} className="sp-btn-primary w-full py-3 text-sm mb-3">Los geht's</button>
            <button onClick={loadDemo} className="text-xs" style={{ color: "var(--text-faint)" }}>Nur schnell testen? Demo-Daten laden</button>
          </div>
        )}

        {step === 1 && (
          <div>
            <p className="text-xs font-semibold mb-1" style={{ color: "var(--accent)" }}>SCHRITT 1 VON 3</p>
            <h2 className="sp-font-display font-bold text-xl mb-5">Wer bist du?</h2>
            <Field label="Name">
              <input autoFocus className="sp-input w-full px-3 py-2.5 text-sm" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Dein Name" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Klassenstufe">
                <input className="sp-input w-full px-3 py-2.5 text-sm" value={profile.grade} onChange={(e) => setProfile({ ...profile, grade: e.target.value })} placeholder="9" />
              </Field>
              <Field label="Klasse (optional)">
                <input className="sp-input w-full px-3 py-2.5 text-sm" value={profile.className} onChange={(e) => setProfile({ ...profile, className: e.target.value })} placeholder="9b" />
              </Field>
            </div>
            <Field label="Schule (optional)">
              <input className="sp-input w-full px-3 py-2.5 text-sm" value={profile.school} onChange={(e) => setProfile({ ...profile, school: e.target.value })} placeholder="Gymnasium ..." />
            </Field>
            <button onClick={() => setStep(2)} disabled={!profile.name.trim()} className="sp-btn-primary w-full py-3 text-sm mt-2 disabled:opacity-40">Weiter</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-xs font-semibold mb-1" style={{ color: "var(--accent)" }}>SCHRITT 2 VON 3</p>
            <h2 className="sp-font-display font-bold text-xl mb-1">Welche Fächer hast du?</h2>
            <p className="text-xs mb-4" style={{ color: "var(--text-faint)" }}>Tippe alle zutreffenden an, eigene Fächer kannst du unten ergänzen.</p>
            <div className="flex flex-wrap gap-2 mb-4 max-h-56 overflow-y-auto sp-scroll">
              {SUGGESTED_SUBJECTS.map((name) => {
                const active = selectedSubjects.includes(name);
                return (
                  <button
                    key={name}
                    onClick={() => toggleSubject(name)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                    style={{ background: active ? "var(--accent)" : "var(--bg-soft)", color: active ? "#fff" : "var(--text-muted)", border: "1px solid " + (active ? "var(--accent)" : "var(--border)") }}
                  >
                    {active && <Check size={11} style={{ display: "inline", marginRight: 4, verticalAlign: -1 }} />}{name}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2 mb-3">
              <input className="sp-input flex-1 px-3 py-2 text-sm" placeholder="Eigenes Fach hinzufügen" value={customSubject} onChange={(e) => setCustomSubject(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCustom()} />
              <button onClick={addCustom} className="sp-btn-secondary px-3.5 py-2 text-sm">Hinzufügen</button>
            </div>
            {selectedSubjects.filter((s) => !SUGGESTED_SUBJECTS.includes(s)).length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {selectedSubjects.filter((s) => !SUGGESTED_SUBJECTS.includes(s)).map((name) => (
                  <Chip key={name} color="accent">
                    {name} <button onClick={() => toggleSubject(name)} style={{ marginLeft: 4 }}><X size={10} /></button>
                  </Chip>
                ))}
              </div>
            )}
            <div className="flex gap-2 mt-2">
              <button onClick={() => setStep(1)} className="sp-btn-secondary px-4 py-3 text-sm"><ArrowLeft size={15} /></button>
              <button onClick={() => setStep(3)} disabled={selectedSubjects.length === 0} className="sp-btn-primary flex-1 py-3 text-sm disabled:opacity-40">
                Weiter ({selectedSubjects.length} Fach{selectedSubjects.length === 1 ? "" : "er"})
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "var(--teal-soft)" }}>
              <CheckCircle2 size={26} style={{ color: "var(--teal)" }} />
            </div>
            <h2 className="sp-font-display font-bold text-xl mb-2">Fast fertig{profile.name ? `, ${profile.name.split(" ")[0]}` : ""}!</h2>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              {selectedSubjects.length} Fach{selectedSubjects.length === 1 ? "" : "er"} hinzugefügt. Möchtest du jetzt gleich deinen Stundenplan einrichten?
            </p>
            <button onClick={() => finish("schedule")} className="sp-btn-primary w-full py-3 text-sm mb-3">Stundenplan jetzt einrichten</button>
            <button onClick={() => finish("dashboard")} className="sp-btn-secondary w-full py-3 text-sm">Später einrichten</button>
          </div>
        )}
      </div>
    </div>
  );
}

function StudyPilotAppInner() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({ settings: DEFAULT_SETTINGS, subjects: [], schedule: [], exams: [], homework: [], entries: [], chats: {} });
  const [page, setPage] = useState("dashboard");
  const [activeSubjectId, setActiveSubjectId] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadDefaultSubject, setUploadDefaultSubject] = useState(null);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState("checking"); // checking | ok | error | unavailable
  const [saveError, setSaveError] = useState(null);

  // Load + Canary-Test: schreibt/liest testweise einen Wert, um zu verifizieren,
  // dass Speichern in dieser Ansicht tatsächlich funktioniert (statt es stillschweigend anzunehmen).
  useEffect(() => {
    (async () => {
      const canaryKey = "__studypilot_storage_check__";
      const canaryValue = String(Date.now());
      const writeTest = await safeStorageSet(canaryKey, canaryValue);
      if (!writeTest.ok) {
        setSaveStatus("unavailable");
        setSaveError(writeTest.error);
      } else {
        const readTest = await safeStorageGet(canaryKey);
        if (readTest.ok && readTest.value === canaryValue) setSaveStatus("ok");
        else { setSaveStatus("unavailable"); setSaveError("Geschriebener Testwert konnte nicht zurückgelesen werden."); }
      }

      try {
        const keys = ["settings", "subjects", "schedule", "exams", "homework", "entries", "chats"];
        const loadedData = {};
        for (const k of keys) {
          const r = await safeStorageGet(k);
          try { loadedData[k] = r.value ? JSON.parse(r.value) : null; } catch { loadedData[k] = null; }
        }
        let subjects = sanitizeSubjects(loadedData.subjects);
        let schedule = sanitizeSchedule(loadedData.schedule);
        // Migration: bestehende Nutzer mit echten Fächern gelten automatisch als "onboarded",
        // auch wenn das Flag selbst (aus einer Version vor diesem Update) noch fehlt.
        const alreadyOnboarded = loadedData.settings?.onboarded === true || subjects.length > 0;
        setData({
          settings: { ...DEFAULT_SETTINGS, ...(loadedData.settings || {}), onboarded: alreadyOnboarded },
          subjects,
          schedule: schedule || [],
          exams: sanitizeExams(loadedData.exams),
          homework: sanitizeHomework(loadedData.homework),
          entries: sanitizeEntries(loadedData.entries),
          chats: (loadedData.chats && typeof loadedData.chats === "object" && !Array.isArray(loadedData.chats)) ? loadedData.chats : {},
        });
      } catch (e) {
        setData({ settings: DEFAULT_SETTINGS, subjects: [], schedule: [], exams: [], homework: [], entries: [], chats: {} });
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // Persist – Fehler werden jetzt sichtbar gemacht statt verschluckt
  const persistKey = useCallback((key, value) => {
    if (!loaded) return;
    safeStorageSet(key, JSON.stringify(value)).then((res) => {
      if (res.ok) { setSaveStatus("ok"); setSaveError(null); }
      else { setSaveStatus("error"); setSaveError(res.error); }
    });
  }, [loaded]);

  useEffect(() => { persistKey("settings", data.settings); }, [data.settings, loaded, persistKey]);
  useEffect(() => { persistKey("subjects", data.subjects); }, [data.subjects, loaded, persistKey]);
  useEffect(() => { persistKey("schedule", data.schedule); }, [data.schedule, loaded, persistKey]);
  useEffect(() => { persistKey("exams", data.exams); }, [data.exams, loaded, persistKey]);
  useEffect(() => { persistKey("homework", data.homework); }, [data.homework, loaded, persistKey]);
  useEffect(() => { persistKey("entries", data.entries); }, [data.entries, loaded, persistKey]);
  useEffect(() => { persistKey("chats", data.chats); }, [data.chats, loaded, persistKey]);

  const subjects = data.subjects;
  const searchResults = useSearchResults(query, data, subjects);

  const openSubject = (id) => { setActiveSubjectId(id); setPage("subject"); setMobileMenuOpen(false); window.scrollTo(0, 0); };
  const goPage = (p) => { setPage(p); setMobileMenuOpen(false); window.scrollTo(0, 0); };
  const openUpload = (subjectId) => { setUploadDefaultSubject(subjectId || null); setUploadOpen(true); };

  const addSubject = (name) => setData((d) => ({ ...d, subjects: [...d.subjects, { id: uid(), name, color: SUBJECT_PALETTE[d.subjects.length % SUBJECT_PALETTE.length], quizFrequency: "occasional" }] }));
  const saveEntry = (entry) => setData((d) => ({ ...d, entries: [...d.entries, entry] }));

  const navResult = (r) => {
    setSearchOpen(false); setQuery("");
    if (r.nav.page === "subject") openSubject(r.nav.id);
    else goPage(r.nav.page);
  };

  if (!loaded) {
    return (
      <div className="sp-root min-h-screen flex items-center justify-center" data-theme="light">
        <style>{THEME_CSS}</style>
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#5B57F2,#7A76FF)" }}>
            <Sparkles size={20} color="#fff" />
          </div>
          <Loader2 size={18} className="animate-spin" style={{ color: "#9C9AA4" }} />
        </div>
      </div>
    );
  }

  const handleOnboardingComplete = ({ profile, subjects: newSubjects, schedule: newSchedule, startPage }) => {
    setData((d) => ({
      ...d,
      settings: { ...d.settings, ...profile, onboarded: true },
      subjects: newSubjects,
      schedule: newSchedule || [],
    }));
    setPage(startPage || "dashboard");
  };

  if (loaded && !data.settings.onboarded) {
    return <OnboardingWizard onComplete={handleOnboardingComplete} />;
  }

  const activeSubject = subjects.find((s) => s.id === activeSubjectId);

  return (
    <div className="sp-root min-h-screen" data-theme={data.settings.theme} onClick={() => searchOpen && setSearchOpen(false)}>
      <style>{THEME_CSS}</style>
      <div className="flex">
        <Sidebar page={page} onNav={goPage} settings={data.settings} />
        <div className="flex-1 min-w-0">
          <div onClick={(e) => e.stopPropagation()}>
            <Header
              query={query} setQuery={setQuery} results={searchOpen ? searchResults : []}
              onNavResult={navResult} searchOpen={searchOpen} setSearchOpen={setSearchOpen}
              theme={data.settings.theme}
              onToggleTheme={() => setData((d) => ({ ...d, settings: { ...d.settings, theme: d.settings.theme === "dark" ? "light" : "dark" } }))}
              onUpload={() => openUpload(null)}
              onMenu={() => setMobileMenuOpen(true)}
            />
          </div>

          <StorageStatusBanner status={saveStatus} error={saveError} onGoBackup={() => goPage("settings")} />
          {page === "dashboard" && <Dashboard data={data} subjects={subjects} onOpenSubject={openSubject} onUpload={() => openUpload(null)} onGoPage={goPage} />}
          {page === "schedule" && <SchedulePage data={data} setData={setData} subjects={subjects} />}
          {page === "subjects" && <SubjectsPage data={data} setData={setData} subjects={subjects} onOpenSubject={openSubject} onAddSubject={addSubject} />}
          {page === "subject" && activeSubject && (
            <SubjectDetail key={activeSubject.id} subject={activeSubject} data={data} setData={setData} onBack={() => goPage("subjects")} onUpload={openUpload} />
          )}
          {page === "exams" && <ExamsPage data={data} setData={setData} subjects={subjects} onOpenSubject={openSubject} />}
          {page === "homework" && <HomeworkPage data={data} setData={setData} subjects={subjects} />}
          {page === "settings" && <SettingsPage data={data} setData={setData} saveStatus={saveStatus} saveError={saveError} />}
        </div>
      </div>

      <BottomNav page={page} onNav={goPage} />

      {/* mobile drawer for items not in bottom nav */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 sm:hidden" style={{ background: "rgba(20,18,14,0.45)" }} onClick={() => setMobileMenuOpen(false)}>
          <div className="sp-card sp-pop-in absolute top-0 left-0 bottom-0 w-64 p-4 rounded-l-none" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 px-1 py-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}>
                <Sparkles size={16} color="#fff" />
              </div>
              <span className="sp-font-display font-bold text-[17px]">StudyPilot</span>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.key} onClick={() => goPage(item.key)} className={`sp-nav-item flex items-center gap-3 px-3 py-2.5 text-sm ${page === item.key ? "active" : ""}`}>
                    <Icon size={17} /> {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        subjects={subjects}
        defaultSubjectId={uploadDefaultSubject}
        settings={data.settings}
        onSave={saveEntry}
      />

      {/* Mobile FAB fallback if no header button visible */}
    </div>
  );
}

export default function StudyPilotApp() {
  return (
    <ErrorBoundary>
      <StudyPilotAppInner />
    </ErrorBoundary>
  );
}

/* ------------------------------------------------------------------ */
/* Standalone-Mount (nur relevant außerhalb der Claude-Artefakt-Umgebung) */
/* ------------------------------------------------------------------ */
if (typeof window !== "undefined" && window.STUDYPILOT_STANDALONE) {
  try {
    const { createRoot } = await import("react-dom/client");
    const rootEl = document.getElementById("root");
    if (rootEl) {
      const root = createRoot(rootEl);
      root.render(React.createElement(StudyPilotApp));
    }
  } catch (mountError) {
    console.error("StudyPilot mount error:", mountError);
    const el = document.getElementById("boot-error");
    if (el) {
      el.style.display = "block";
      el.innerHTML =
        '<div style="margin-bottom:10px;">Fehler beim Starten:</div>' +
        '<pre style="text-align:left;background:#FBE7EA;padding:10px;border-radius:8px;white-space:pre-wrap;word-break:break-word;font-size:11px;">' +
        String(mountError?.stack || mountError?.message || mountError).replace(/</g, "&lt;") +
        '</pre>';
    }
  }
}
