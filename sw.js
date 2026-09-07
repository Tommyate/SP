// StudyPilot Service Worker
// Cached wird nur die lokale App-Hülle (HTML/JS/Icons), NICHT die KI-Anfragen
// oder die CDN-Bibliotheken – die brauchen ohnehin eine aktive Internetverbindung.
const CACHE_NAME = "studypilot-shell-v3";
const APP_SHELL = [
  "./",
  "./index.html",
  "./app.jsx",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  // Nur eigene (same-origin) Anfragen aus dem Cache bedienen; alles andere (CDN, KI-APIs)
  // geht immer live über das Netzwerk.
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});

// --- Push-Benachrichtigungen (nur relevant, wenn "Erinnerungen aktivieren" genutzt wurde) ---
self.addEventListener("push", (event) => {
  let payload = { title: "StudyPilot", body: "Es gibt etwas Neues für dich." };
  try { if (event.data) payload = { ...payload, ...event.data.json() }; } catch (e) { /* Fallback-Text verwenden */ }
  event.waitUntil(
    self.registration.showNotification(payload.title || "StudyPilot", {
      body: payload.body || "",
      icon: "./icon-192.png",
      badge: "./icon-192.png",
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) { if ("focus" in client) return client.focus(); }
      return clients.openWindow("./");
    })
  );
});
