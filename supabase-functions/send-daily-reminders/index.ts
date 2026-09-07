// StudyPilot Cloud - Edge Function: send-daily-reminders
//
// WICHTIG (bitte lesen): Dies ist eine BEWUSST VEREINFACHTE Reminder-Logik, kein 1:1-Abbild
// der vollen To-Do-Berechnung aus der App (die lebt in app.jsx und läuft im Browser). Diese
// Function deckt nur die zwei häufigsten Fälle ab:
//   1) Eine Prüfung (Abfrage/Ex/Schulaufgabe/Referat) ist morgen fällig
//   2) Eine Hausaufgabe ist heute oder überfällig
// Spaced-Repetition-Fälligkeiten und Lernplan-Tage werden hier NICHT geprüft, weil das die
// komplette Lernplan-Logik aus app.jsx duplizieren würde. Wer mehr will, kann das erweitern -
// die Grundstruktur (Daten laden, filtern, Push senden) steht.
//
// Deployment: `supabase functions deploy send-daily-reminders` (erfordert Supabase CLI).
// Secrets vorher setzen: `supabase secrets set VAPID_PUBLIC_KEY=... VAPID_PRIVATE_KEY=... VAPID_SUBJECT=mailto:deine@email.de`

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import webpush from "https://esm.sh/web-push@3.6.7";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const VAPID_PUBLIC_KEY = Deno.env.get("VAPID_PUBLIC_KEY");
const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY");
const VAPID_SUBJECT = Deno.env.get("VAPID_SUBJECT") || "mailto:example@example.com";

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function tomorrowISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

Deno.serve(async () => {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    return new Response(JSON.stringify({ error: "Fehlende Umgebungsvariablen (VAPID-Keys oder Supabase-Zugang)." }), { status: 500 });
  }
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

  const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
  const { data: subs, error: subsError } = await supabaseAdmin.from("push_subscriptions").select("user_id, subscription");
  if (subsError) return new Response(JSON.stringify({ error: subsError.message }), { status: 500 });

  const today = todayISO();
  const tomorrow = tomorrowISO();
  let sent = 0;
  let skipped = 0;
  let failed = 0;

  for (const row of subs || []) {
    try {
      const { data: kvRows } = await supabaseAdmin.from("storage_kv").select("key, value").eq("user_id", row.user_id);
      const kv = Object.fromEntries((kvRows || []).map((r) => [r.key, r.value]));
      const subjects = JSON.parse(kv.subjects || "[]");
      const exams = JSON.parse(kv.exams || "[]");
      const homework = JSON.parse(kv.homework || "[]");

      const subjectName = (id) => subjects.find((s) => s.id === id)?.name || "einem Fach";
      const examsTomorrow = exams.filter((e) => e.date === tomorrow);
      const homeworkDueToday = homework.filter((h) => !h.done && h.dueDate && h.dueDate <= today);

      const parts = [];
      examsTomorrow.forEach((e) => parts.push(`Morgen ${e.type} in ${subjectName(e.subjectId)}`));
      if (homeworkDueToday.length > 0) parts.push(`${homeworkDueToday.length} Hausaufgabe${homeworkDueToday.length > 1 ? "n" : ""} fällig`);

      if (parts.length === 0) { skipped++; continue; }

      await webpush.sendNotification(row.subscription, JSON.stringify({
        title: "StudyPilot",
        body: parts.join(" · "),
      }));
      sent++;
    } catch (err) {
      failed++;
      // Abgelaufene/ungültige Push-Abos laufen hier absichtlich nur in den Fehlerzähler,
      // damit ein einzelnes kaputtes Abo nicht den ganzen Lauf abbricht.
    }
  }

  return new Response(JSON.stringify({ sent, skipped, failed, total: (subs || []).length }), {
    headers: { "Content-Type": "application/json" },
  });
});
