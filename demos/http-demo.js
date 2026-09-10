// 🌐 Демонстрация HTTP Server в Node.js

const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

console.log("🎯 Demo: HTTP Server mit reinem Node.js\n");

// Создаём простой веб-сервер
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Устанавливаем заголовки
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");

  console.log(`📨 Запрос: ${req.method} ${pathname}`);

  // Роутинг
  if (pathname === "/") {
    res.writeHead(200);
    res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Node.js HTTP Demo</title>
                <style>
                    body { font-family: Arial; max-width: 800px; margin: 0 auto; padding: 20px; }
                    .endpoint { background: #f0f0f0; padding: 10px; margin: 10px 0; border-radius: 5px; }
                </style>
            </head>
            <body>
                <h1>🚀 Node.js HTTP Server Demo</h1>
                <p>Server läuft! Probieren Sie verschiedene Endpoints aus:</p>
                
                <div class="endpoint">
                    <h3>📊 <a href="/api/info">/api/info</a></h3>
                    <p>Server-Informationen</p>
                </div>
                
                <div class="endpoint">
                    <h3>⏰ <a href="/api/time">/api/time</a></h3>
                    <p>Aktuelle Zeit</p>
                </div>
                
                <div class="endpoint">
                    <h3>📋 <a href="/api/headers">/api/headers</a></h3>
                    <p>Ihre HTTP-Header</p>
                </div>
                
                <div class="endpoint">
                    <h3>🎲 <a href="/api/random">/api/random</a></h3>
                    <p>Zufallszahl</p>
                </div>
                
                <div class="endpoint">
                    <h3>❓ <a href="/nonexistent">/nonexistent</a></h3>
                    <p>404-Seite</p>
                </div>
            </body>
            </html>
        `);
  } else if (pathname === "/api/info") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(
      JSON.stringify(
        {
          message: "Server-Informationen",
          nodeVersion: process.version,
          platform: process.platform,
          uptime: Math.round(process.uptime()),
          pid: process.pid,
          memory: process.memoryUsage(),
          timestamp: new Date().toISOString(),
        },
        null,
        2
      )
    );
  } else if (pathname === "/api/time") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(
      JSON.stringify(
        {
          currentTime: new Date().toLocaleString("de-DE"),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          timestamp: Date.now(),
          iso: new Date().toISOString(),
        },
        null,
        2
      )
    );
  } else if (pathname === "/api/headers") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(
      JSON.stringify(
        {
          message: "Ihre HTTP-Header",
          method: req.method,
          url: req.url,
          headers: req.headers,
          userAgent: req.headers["user-agent"],
          ip: req.connection.remoteAddress,
        },
        null,
        2
      )
    );
  } else if (pathname === "/api/random") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(
      JSON.stringify(
        {
          randomNumber: Math.floor(Math.random() * 1000),
          randomFloat: Math.random(),
          dice: Math.floor(Math.random() * 6) + 1,
          coin: Math.random() > 0.5 ? "Kopf" : "Zahl",
          uuid: "xxxx-xxxx-4xxx-yxxx".replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          }),
        },
        null,
        2
      )
    );
  } else {
    // 404 Seite
    res.writeHead(404);
    res.end(`
            <!DOCTYPE html>
            <html>
            <head><title>404 - Seite nicht gefunden</title></head>
            <body style="font-family: Arial; text-align: center; margin-top: 100px;">
                <h1>🔍 404 - Seite nicht gefunden</h1>
                <p>Pfad <code>${pathname}</code> existiert nicht</p>
                <a href="/">← Zurück zur Startseite</a>
            </body>
            </html>
        `);
  }
});

// Server-Fehlerbehandlung
server.on("error", (err) => {
  console.error("🚨 Server-Fehler:", err.message);
});

// Verbindungsbehandlung
server.on("connection", (socket) => {
  console.log("🔌 Neue Verbindung von:", socket.remoteAddress);
});

// Server starten
const PORT = 3001; // Anderer Port um Konflikte mit dem Hauptserver zu vermeiden
server.listen(PORT, () => {
  console.log(`✅ HTTP-Server gestartet auf Port ${PORT}`);
  console.log(`🌐 Browser öffnen: http://localhost:${PORT}`);
  console.log(`📊 Prozess-PID: ${process.pid}`);
  console.log(`⚡ Node.js Version: ${process.version}\n`);

  // Server-Informationen anzeigen
  console.log("📋 Server-Informationen:");
  console.log(`   🖥️  Plattform: ${process.platform}`);
  console.log(`   🏗️  Architektur: ${process.arch}`);
  console.log(`   📁 Arbeitsverzeichnis: ${process.cwd()}`);
  console.log(
    `   🔢 Startargumente: ${process.argv.slice(2).join(" ") || "keine"}`
  );

  console.log("\n🎯 Versuchen Sie Anfragen zu senden:");
  console.log("   curl http://localhost:3001/api/info");
  console.log("   curl http://localhost:3001/api/time");
  console.log("   curl http://localhost:3001/api/headers");
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n\n🛑 SIGINT-Signal empfangen, Server wird beendet...");
  server.close(() => {
    console.log("✅ HTTP-Server gestoppt");
    console.log("👋 Auf Wiedersehen!");
    process.exit(0);
  });
});

// Demonstration von setTimeout und setInterval
setTimeout(() => {
  console.log("\n⏰ Server läuft bereits 10 Sekunden!");
}, 10000);

let requestCount = 0;
const startTime = Date.now();

// Handler für Anfragenzählung neu definieren
const originalListener = server.listeners("request")[0];
server.removeAllListeners("request");
server.on("request", (req, res) => {
  requestCount++;
  originalListener(req, res);
});

// Statistiken alle 30 Sekunden
const statsInterval = setInterval(() => {
  const uptime = Math.round((Date.now() - startTime) / 1000);
  const avgReqPerMin =
    requestCount > 0 ? Math.round((requestCount / uptime) * 60) : 0;

  console.log(`\n📊 Statistiken (${uptime}s Laufzeit):`);
  console.log(`   📈 Gesamt Anfragen: ${requestCount}`);
  console.log(`   ⚡ Anfragen pro Minute: ${avgReqPerMin}`);
  console.log(
    `   💾 Speicherverbrauch: ${Math.round(
      process.memoryUsage().rss / 1024 / 1024
    )}MB`
  );
}, 30000);

console.log("\n💡 Drücken Sie Ctrl+C zum Stoppen des Servers");
console.log(
  "🎓 Dieser Server zeigt die HTTP-Grundlagen in Node.js ohne Frameworks!"
);
