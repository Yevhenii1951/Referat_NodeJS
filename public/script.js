// 🎮 Interactive Node.js Presentation JavaScript

// Tooltip-Initialisierung beim Laden
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Initializing tooltips...");

  // Alle Tooltips beim Laden verstecken
  document.querySelectorAll(".demo-tooltip").forEach((tooltip) => {
    tooltip.classList.remove("show");
    console.log("Hidden tooltip:", tooltip.id);
  });

  document.querySelectorAll(".tooltip-trigger").forEach((trigger) => {
    trigger.classList.remove("active");
  });

  console.log("✅ Tooltips initialized");
});

// HTTP Request Helper (ohne fetch)
function makeRequest(method, url, data = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

    if (data) {
      xhr.setRequestHeader("Content-Type", "application/json");
    }

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        } catch (e) {
          resolve(xhr.responseText);
        }
      } else {
        reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
      }
    };

    xhr.onerror = function () {
      reject(new Error("Network error"));
    };

    if (data) {
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send();
    }
  });
}

// Navigation zwischen Sektionen
function showSection(sectionId) {
  // Verstecke alle Sektionen
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });

  // Zeige gewählte Sektion
  document.getElementById(sectionId).classList.add("active");

  // Aktualisiere URL ohne Seite neu zu laden
  history.pushState(null, null, `#${sectionId}`);
}

// Initialisierung beim Laden der Seite
document.addEventListener("DOMContentLoaded", function () {
  // Prüfe Hash in URL
  const hash = window.location.hash.substring(1);
  if (hash) {
    showSection(hash);
  }

  // Lade Chat-Nachrichten
  loadMessages();

  // Setze Intervall für Statistik-Updates
  setInterval(updateStats, 5000);
});

// Initialisierung beim Laden der Seite
document.addEventListener("DOMContentLoaded", function () {
  // Alle Tooltips beim Laden verstecken
  document.querySelectorAll(".demo-tooltip").forEach((tooltip) => {
    tooltip.classList.remove("show");
  });
  document.querySelectorAll(".tooltip-trigger").forEach((trigger) => {
    trigger.classList.remove("active");
  });

  console.log("Seite geladen, Tooltips initialisiert");
});

// 🛠️ Funktions-Demonstrationen

// Demo-Modal-Fenster für Funktionen
function showFeatureDemo(feature) {
  const demoModal = document.getElementById("feature-demo");
  const demoTitle = document.getElementById("demo-title");
  const demoContent = document.getElementById("demo-content");

  demoTitle.textContent = getFeatureTitle(feature);
  demoContent.innerHTML = getFeatureContent(feature);
  demoModal.classList.remove("hidden");
}

function getFeatureTitle(feature) {
  const titles = {
    express: "🚀 Express.js Framework Demo",
    fs: "📁 File System Demo",
    http: "🌐 HTTP Server Demo",
    events: "⚡ Events Demo",
    env: "🔧 Environment Demo",
  };
  return titles[feature] || "Demo";
}

function getFeatureContent(feature) {
  switch (feature) {
    case "express":
      return `
        <div class="express-demo-content">
          <h3>Express.js in Aktion</h3>
          <div class="code-example">
            <pre><code class="language-javascript">const express = require('express');
const app = express();

// Middleware für JSON-Parsing
app.use(express.json());

// Route-Handler
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'Anna', role: 'Student' },
    { id: 2, name: 'Max', role: 'Teacher' }
  ]);
});

app.post('/api/users', (req, res) => {
  const newUser = req.body;
  console.log('Neuer Benutzer:', newUser);
  res.status(201).json({ 
    message: 'Benutzer erfolgreich erstellt!',
    user: newUser 
  });
});

// Server starten
app.listen(3000, () => {
  console.log('🚀 Express Server läuft auf Port 3000!');
});</code></pre>
          </div>
          
          <div class="interactive-section">
            <h4>🎮 Testen Sie unsere Express.js API:</h4>
            <div class="api-tester">
              <button onclick="testGetUsers()" class="api-btn get">GET /api/users</button>
              <button onclick="testPostUser()" class="api-btn post">POST /api/users</button>
              <button onclick="testGetStats()" class="api-btn get">GET /api/stats</button>
            </div>
            <div id="api-result" class="api-result"></div>
          </div>

          <div class="express-benefits">
            <h4>🌟 Warum Express.js?</h4>
            <div class="benefits-grid">
              <div class="benefit-item">
                <div class="benefit-icon">⚡</div>
                <strong>Schnell</strong><br>
                Minimaler Overhead, maximale Performance
              </div>
              <div class="benefit-item">
                <div class="benefit-icon">🔧</div>
                <strong>Flexibel</strong><br>
                Middleware-System für alles
              </div>
              <div class="benefit-item">
                <div class="benefit-icon">📚</div>
                <strong>Bewährt</strong><br>
                Von Millionen verwendet
              </div>
            </div>
          </div>
        </div>
      `;
    case "fs":
      return `
        <h3>File System Beispiele</h3>
        <div class="code-example">
          <pre><code>const fs = require('fs');

// Datei lesen
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Datei schreiben
fs.writeFile('new-file.txt', 'Hallo Welt!', (err) => {
  if (err) throw err;
  console.log('Datei gespeichert!');
});</code></pre>
        </div>
        <button onclick="loadFiles()" class="demo-btn">Aktuelle Dateien anzeigen</button>
      `;
    case "http":
      return `
        <h3>HTTP Server Beispiel</h3>
        <div class="code-example">
          <pre><code>const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<h1>Hallo von Node.js Server!</h1>');
});

server.listen(3000, () => {
  console.log('Server läuft auf Port 3000');
});</code></pre>
        </div>
      `;
    case "events":
      return `
        <h3>Event System Beispiel</h3>
        <div class="code-example">
          <pre><code>const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('message', (data) => {
  console.log('Nachricht erhalten:', data);
});

emitter.emit('message', 'Hallo Events!');</code></pre>
        </div>
      `;
    case "env":
      return `
        <h3>Environment Variables</h3>
        <div class="code-example">
          <pre><code>// .env Datei
PORT=3000
DB_HOST=localhost
API_KEY=secret_key

// In Node.js
require('dotenv').config();
console.log(process.env.PORT); // 3000</code></pre>
        </div>
        <button onclick="loadEnvInfo()" class="demo-btn">Umgebungsinfo laden</button>
      `;
    case "socket":
      return `
        <div class="socket-demo-content">
          <h3>Socket.io Real-time Demo</h3>
          <div class="code-example">
            <pre><code class="language-javascript">const io = require('socket.io')(server);

// Server-side
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('chat message', (msg) => {
    io.emit('chat message', {
      id: socket.id,
      message: msg,
      timestamp: new Date()
    });
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Client-side
const socket = io();
socket.emit('chat message', 'Hello World!');
socket.on('chat message', (data) => {
  displayMessage(data);
});</code></pre>
          </div>
          
          <div class="socket-features">
            <h4>🌟 Socket.io Hauptfeatures:</h4>
            <div class="features-grid">
              <div class="feature-item">
                <div class="feature-icon">⚡</div>
                <strong>Real-time</strong><br>
                Bidirektionale Kommunikation
              </div>
              <div class="feature-item">
                <div class="feature-icon">🔄</div>
                <strong>Auto-Reconnect</strong><br>
                Automatische Wiederverbindung
              </div>
              <div class="feature-item">
                <div class="feature-icon">📡</div>
                <strong>Broadcasting</strong><br>
                Nachrichten an alle Clients
              </div>
              <div class="feature-item">
                <div class="feature-icon">🏠</div>
                <strong>Rooms & Namespaces</strong><br>
                Organisierte Kommunikation
              </div>
            </div>
          </div>
          
          <div class="use-cases">
            <h4>💡 Beliebte Anwendungsfälle:</h4>
            <ul>
              <li><strong>Chat-Anwendungen:</strong> WhatsApp, Discord, Slack</li>
              <li><strong>Live-Updates:</strong> Social Media Feeds, Notifications</li>
              <li><strong>Gaming:</strong> Multiplayer-Spiele, Live-Scores</li>
              <li><strong>Collaboration:</strong> Google Docs, Figma, Miro</li>
              <li><strong>Trading:</strong> Live-Kurse, Kryptowährungen</li>
            </ul>
          </div>
          
          <div class="interactive-section">
            <h4>🎮 Socket.io Performance Test:</h4>
            <div class="socket-tester">
              <button onclick="testSocketConnection()" class="api-btn socket">Socket verbinden</button>
              <button onclick="testSocketMessage()" class="api-btn message">Nachricht senden</button>
              <button onclick="testSocketBroadcast()" class="api-btn broadcast">Broadcast Test</button>
            </div>
            <div id="socket-result" class="api-result"></div>
          </div>
        </div>
      `;
    default:
      return "<p>Demo Inhalt wird geladen...</p>";
  }
}

function closeDemoModal() {
  document.getElementById("feature-demo").classList.add("hidden");
}

// API Test Functions für Express Demo
async function testGetUsers() {
  const resultDiv = document.getElementById("api-result");
  resultDiv.innerHTML = '<div class="loading">🔄 Lade Benutzer...</div>';

  try {
    const users = await makeRequest("GET", "/api/users");

    resultDiv.innerHTML = `
      <div class="api-success">
        <h4>✅ GET /api/users erfolgreich!</h4>
        <pre><code>${JSON.stringify(users, null, 2)}</code></pre>
      </div>
    `;
  } catch (error) {
    resultDiv.innerHTML = `
      <div class="api-error">
        <h4>❌ Fehler beim Abrufen der Benutzer</h4>
        <p>${error.message}</p>
      </div>
    `;
  }
}

async function testPostUser() {
  const resultDiv = document.getElementById("api-result");
  resultDiv.innerHTML = '<div class="loading">🔄 Erstelle Benutzer...</div>';

  const newUser = {
    name: "Test Student",
    email: "test@school.de",
    role: "student",
  };

  try {
    const result = await makeRequest("POST", "/api/users", newUser);

    resultDiv.innerHTML = `
      <div class="api-success">
        <h4>✅ POST /api/users erfolgreich!</h4>
        <pre><code>${JSON.stringify(result, null, 2)}</code></pre>
      </div>
    `;
  } catch (error) {
    resultDiv.innerHTML = `
      <div class="api-error">
        <h4>❌ Fehler beim Erstellen des Benutzers</h4>
        <p>${error.message}</p>
      </div>
    `;
  }
}

async function testGetStats() {
  const resultDiv = document.getElementById("api-result");
  resultDiv.innerHTML = '<div class="loading">🔄 Lade Statistiken...</div>';

  try {
    const stats = await makeRequest("GET", "/api/stats");

    resultDiv.innerHTML = `
      <div class="api-success">
        <h4>✅ GET /api/stats erfolgreich!</h4>
        <pre><code>${JSON.stringify(stats, null, 2)}</code></pre>
      </div>
    `;
  } catch (error) {
    resultDiv.innerHTML = `
      <div class="api-error">
        <h4>❌ Fehler beim Abrufen der Statistiken</h4>
        <p>${error.message}</p>
      </div>
    `;
  }
}

// Route Tester Function
function testExpressRoute() {
  const method = document.getElementById("method-select").value;
  const route = document.getElementById("route-input").value;
  const resultDiv = document.getElementById("express-demo-result");

  resultDiv.innerHTML = `
    <div class="route-test-result">
      <h4>🧪 Route Test: ${method} ${route}</h4>
      <div class="test-info">
        <p><strong>Status:</strong> <span class="status-ok">200 OK</span></p>
        <p><strong>Response Zeit:</strong> ${Math.random() * 50 + 10}ms</p>
        <p><strong>Content-Type:</strong> application/json</p>
      </div>
      <pre><code>{
  "message": "Route ${route} funktioniert perfekt!",
  "method": "${method}",
  "timestamp": "${new Date().toISOString()}",
  "server": "Express.js auf Node.js"
}</code></pre>
    </div>
  `;
}

// Animationen für Performance-Balken
function animatePerformanceBars() {
  const bars = document.querySelectorAll(".performance-bar");
  bars.forEach((bar, index) => {
    setTimeout(() => {
      bar.style.width = bar.style.width || "0%";
    }, index * 200);
  });
}

// Event Listener für Performance Chart
document.addEventListener("DOMContentLoaded", function () {
  // Animiere Performance-Balken wenn sichtbar
  const performanceSection = document.querySelector(".performance-comparison");
  if (performanceSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animatePerformanceBars();
        }
      });
    });
    observer.observe(performanceSection);
  }
});

// 📁 Laden der Dateiliste
async function loadFiles() {
  const result = document.getElementById("files-result");
  result.innerHTML = '<div class="loading"></div> Dateien werden geladen...';

  try {
    const data = await makeRequest("GET", "/api/files");

    if (data.success) {
      let html = "<strong>📁 Dateien im Projekt:</strong><br><br>";
      data.files.forEach((file) => {
        const icon = file.includes(".") ? "📄" : "📁";
        html += `${icon} ${file}<br>`;
      });
      html += `<br><em>${data.message}</em>`;
      result.innerHTML = html;
    } else {
      result.innerHTML = "❌ Fehler: " + data.error;
    }
  } catch (error) {
    result.innerHTML = "❌ Ladefehler: " + error.message;
  }
}

// 🔧 Laden der Umgebungsinformationen
async function loadEnvInfo() {
  const result = document.getElementById("env-result");
  result.innerHTML =
    '<div class="loading"></div> Informationen werden abgerufen...';

  try {
    const data = await makeRequest("GET", "/api/env");

    let html = "<strong>💻 Systeminformationen:</strong><br><br>";
    html += `🟢 Node.js Version: ${data.nodeVersion}<br>`;
    html += `💻 Plattform: ${data.platform}<br>`;
    html += `🌐 Port: ${data.port}<br>`;
    html += `⏱️ Laufzeit: ${data.uptime} Sek<br><br>`;
    html += `<em>${data.message}</em>`;

    result.innerHTML = html;
  } catch (error) {
    result.innerHTML = "❌ Ladefehler: " + error.message;
  }
}

// 💬 Chat-Funktionen
async function loadMessages() {
  try {
    const messages = await makeRequest("GET", "/api/messages");
    const messagesContainer = document.getElementById("messages");
    messagesContainer.innerHTML = "";
    messages.forEach((msg) => {
      const messageDiv = document.createElement("div");
      messageDiv.className = "message";
      messageDiv.innerHTML = `
        <div class="message-username">${msg.username}</div>
        <div>${msg.message}</div>
        <div class="message-time">${msg.timestamp}</div>
      `;
      messagesContainer.appendChild(messageDiv);
    });
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  } catch (error) {
    console.error("❌ Fehler beim Laden der Nachrichten:", error);
  }
}

async function sendMessage() {
  const usernameInput = document.getElementById("username");
  const messageInput = document.getElementById("message");

  if (!messageInput.value.trim()) {
    alert("Bitte geben Sie eine Nachricht ein!");
    return;
  }

  try {
    const messageData = {
      username: usernameInput.value || "Anonym",
      message: messageInput.value,
    };

    const result = await makeRequest("POST", "/api/messages", messageData);

    if (result.success) {
      messageInput.value = "";
      loadMessages(); // Nachrichten neu laden
    } else {
      alert("Fehler beim Senden der Nachricht");
    }
  } catch (error) {
    alert("Fehler: " + error.message);
  }
}

// Nachricht mit Enter senden
document.addEventListener("DOMContentLoaded", function () {
  const messageInput = document.getElementById("message");
  if (messageInput) {
    messageInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }
});

// 📝 Datei erstellen
async function createFile() {
  const filenameInput = document.getElementById("filename");
  const contentInput = document.getElementById("file-content");
  const result = document.getElementById("create-result");

  if (!filenameInput.value.trim() || !contentInput.value.trim()) {
    alert("Bitte füllen Sie alle Felder aus!");
    return;
  }

  result.innerHTML = '<div class="loading"></div> Datei wird erstellt...';

  try {
    const fileData = {
      filename: filenameInput.value,
      content: contentInput.value,
    };

    const data = await makeRequest("POST", "/api/write-file", fileData);

    if (data.success) {
      result.innerHTML = `✅ ${data.message}<br>📍 Pfad: ${data.path}`;
      filenameInput.value = "";
      contentInput.value = "";
    } else {
      result.innerHTML = "❌ Fehler: " + data.error;
    }
  } catch (error) {
    result.innerHTML = "❌ Fehler: " + error.message;
  }
}

// Feature data for Node.js features
const nodeFeatures = [
  {
    id: 1,
    title: "Event Loop",
    description:
      "Der Hauptmechanismus, der es Node.js ermöglicht, Ein- und Ausgabeoperationen ohne Blockierung auszuführen.",
    benefits: [
      "Ermöglicht asynchrone Operationen",
      "Sorgt für hohe Leistung",
      "Verwendet einen Thread für alle Operationen",
    ],
    category: "event",
  },
  {
    id: 2,
    title: "Non-blocking I/O",
    description:
      "Ein- und Ausgabe ohne Blockierung, ermöglicht die gleichzeitige Verarbeitung vieler Operationen.",
    benefits: [
      "Verhindert die Blockierung des Haupt-Threads",
      "Ermöglicht die Verarbeitung von Tausenden Verbindungen",
      "Verbessert die Gesamtleistung der Anwendung",
    ],
    category: "event",
  },
  {
    id: 3,
    title: "Single Thread",
    description:
      "Node.js verwendet einen Haupt-Thread zur Ausführung von JavaScript-Code.",
    benefits: [
      "Speichereffizient im Vergleich zu Multi-Thread-Lösungen",
      "Vereinfacht die Entwicklung ohne Synchronisationsprobleme",
      "Sorgt für vorhersehbare Codeausführung",
    ],
    category: "event",
  },
  {
    id: 4,
    title: "File System (fs)",
    description: "Eingebautes Modul für die Arbeit mit dem Dateisystem",
    benefits: [
      "Dateien asynchron lesen und schreiben",
      "Unterstützt synchrone und asynchrone Operationen",
      "Vollständige Kontrolle über das Dateisystem",
    ],
    category: "modules",
  },
  {
    id: 5,
    title: "HTTP Module",
    description:
      "Eingebautes Modul zum Erstellen von HTTP-Servern und -Clients",
    benefits: [
      "Webserver ohne externe Abhängigkeiten erstellen",
      "Vollständige Unterstützung für HTTP/1.1",
      "Möglichkeit, HTTP-Clients zu erstellen",
    ],
    category: "modules",
  },
  {
    id: 6,
    title: "Path Module",
    description: "Modul zur Arbeit mit Datei- und Verzeichnispfaden",
    benefits: [
      "Plattformübergreifende Pfadverarbeitung",
      "Methoden zum Kombinieren, Normalisieren und Analysieren von Pfaden",
      "Hilft, Probleme mit verschiedenen Betriebssystemen zu vermeiden",
    ],
    category: "modules",
  },
  {
    id: 7,
    title: "OS Module",
    description: "Modul zur Abfrage von Betriebssysteminformationen",
    benefits: [
      "Systeminformationen abrufen (Architektur, Speicher, CPU)",
      "Betriebssystemtyp erkennen",
      "Zugriff auf Systemeinstellungen",
    ],
    category: "modules",
  },
  {
    id: 8,
    title: "Events Module",
    description:
      "Implementierung des Observer-Musters zur Ereignisverarbeitung",
    benefits: [
      "Unterstützung benutzerdefinierter Ereignisse",
      "Möglichkeit zum Abonnieren und Abbestellen von Ereignissen",
      "Grundlage für viele andere Node.js-Module",
    ],
    category: "modules",
  },
  {
    id: 9,
    title: "Streams",
    description: "Objekte zur Verarbeitung von Datenströmen",
    benefits: [
      "Effiziente Verarbeitung großer Datenmengen",
      "Übertragung von Daten in Teilen",
      "Unterstützung verschiedener Stream-Typen (Lesen, Schreiben, Duplex)",
    ],
    category: "modules",
  },
  {
    id: 10,
    title: "Crypto",
    description: "Modul für Verschlüsselung und Hashing von Daten",
    benefits: [
      "Unterstützung verschiedener Verschlüsselungsalgorithmen",
      "Erstellung von Hashes und Signaturen",
      "Sichere Verarbeitung vertraulicher Daten",
    ],
    category: "modules",
  },
  {
    id: 11,
    title: "URL Module",
    description: "Modul zur Arbeit mit URLs",
    benefits: [
      "Analyse und Erstellung von URLs",
      "Arbeiten mit Anfrageparametern",
      "Unterstützung verschiedener URL-Formate",
    ],
    category: "modules",
  },
  {
    id: 12,
    title: "Zlib (Komprimierung)",
    description: "Modul zum Komprimieren und Dekomprimieren von Daten",
    benefits: [
      "Unterstützung für gzip, deflate, deflateRaw",
      "Reduziert die Menge der übertragenen Daten",
      "Spart Bandbreite",
    ],
    category: "modules",
  },
  {
    id: 13,
    title: "Async/Await",
    description: "Moderner Ansatz für asynchronen Code",
    benefits: [
      "Lesbarer asynchroner Code",
      "Vereinfachte Fehlerbehandlung",
      "Bessere Integration mit Promises",
    ],
    category: "async",
  },
  {
    id: 14,
    title: "util.promisify",
    description:
      "Funktion zur Umwandlung von Callback-basierten Funktionen in Promises",
    benefits: [
      "Vereinfacht die Arbeit mit älteren APIs",
      "Nutzung moderner async/await-Funktionen",
      "Verbessert die Kompatibilität des Codes",
    ],
    category: "async",
  },
  {
    id: 15,
    title: "HTTP/HTTPS Client",
    description: "Funktionen zum Erstellen von HTTP- und HTTPS-Clients",
    benefits: [
      "HTTP-Anfragen an externe APIs senden",
      "Unterstützung verschiedener Anfrage-Methoden",
      "Verwaltung von Headern und Anfragekörper",
    ],
    category: "network",
  },
  {
    id: 16,
    title: "TCP Server",
    description: "Möglichkeit, TCP-Server zu erstellen",
    benefits: [
      "Low-Level-Netzwerkkommunikation",
      "Eigene Protokolle erstellen",
      "Direkte Interaktion mit dem Netzwerk",
    ],
    category: "network",
  },
  {
    id: 17,
    title: "UDP Datagrams",
    description: "Unterstützung des UDP-Protokolls für Datagramme",
    benefits: [
      "Schnelle Datenübertragung ohne Bestätigung",
      "Geeignet für Broadcast-Streaming",
      "Weniger Overhead",
    ],
    category: "network",
  },
  {
    id: 18,
    title: "DNS Module",
    description: "Modul zur Arbeit mit DNS-Anfragen",
    benefits: [
      "Domainnamen auflösen",
      "Direkte und umgekehrte DNS-Suche",
      "Verwaltung von DNS-Anfragen",
    ],
    category: "network",
  },
  {
    id: 19,
    title: "Process Object",
    description: "Objekt zur Interaktion mit dem aktuellen Prozess",
    benefits: [
      "Zugriff auf Kommandozeilenargumente",
      "Verwaltung der Prozessumgebung",
      "Steuerung des Prozessendes",
    ],
    category: "system",
  },
  {
    id: 20,
    title: "JSON",
    description: "Eingebaute Unterstützung für das JSON-Format",
    benefits: [
      "Serialisierung und Deserialisierung von Daten",
      "Universelles Format für Datenaustausch",
      "Sichere Datenübertragung",
    ],
    category: "data",
  },
  {
    id: 21,
    title: "Crypto Hash",
    description: "Hash-Funktionen für Datensicherheit",
    benefits: [
      "Erstellung kryptografischer Hashes",
      "Integritätsprüfung von Daten",
      "Speicherung von Passwörtern in verschlüsselter Form",
    ],
    category: "security",
  },
  {
    id: 22,
    title: "WebSockets",
    description: "Unterstützung für bidirektionalen Datenaustausch in Echtzeit",
    benefits: [
      "Ständige Verbindung zwischen Client und Server",
      "Sofortige Datenübertragung",
      "Ideal für Chats und Spiele",
    ],
    category: "realtime",
  },
  {
    id: 23,
    title: "EventSource (Server-Sent Events)",
    description: "Technologie zur Datenübertragung vom Server zum Client",
    benefits: [
      "Einseitige Datenübertragung in Echtzeit",
      "Automatische Wiederherstellung der Verbindung",
      "Einfache Implementierung",
    ],
    category: "realtime",
  },
  {
    id: 24,
    title: "Database Connections",
    description: "Verbindungen zu verschiedenen Datenbanktypen",
    benefits: [
      "Unterstützung für SQL- und NoSQL-Datenbanken",
      "Verwaltung von Verbindungs-Pools",
      "Asynchrone Arbeit mit Datenbanken",
    ],
    category: "db",
  },
  {
    id: 25,
    title: "CommonJS Modules",
    description: "Modulsystem zur Organisation von Code",
    benefits: [
      "Import und Export von Funktionen, Objekten und Variablen",
      "Isolierter Gültigkeitsbereich für Module",
      "Verwaltung von Abhängigkeiten",
    ],
    category: "modulesys",
  },
  {
    id: 26,
    title: "Middleware Pattern",
    description: "Entwurfsmuster zur Verarbeitung von Anfragen",
    benefits: [
      "Sequenzielle Verarbeitung von Anfragen",
      "Wiederverwendbarer Code",
      "Flexible Anwendungsarchitektur",
    ],
    category: "patterns",
  },
  {
    id: 27,
    title: "Factory Pattern",
    description:
      "Muster zur Erstellung von Objekten mit unterschiedlicher Implementierung",
    benefits: [
      "Zentralisierte Objekterstellung",
      "Vereinfachte Verwaltung komplexer Abhängigkeiten",
      "Flexibilität bei der Erstellung verschiedener Objekttypen",
    ],
    category: "patterns",
  },
  {
    id: 28,
    title: "Error Handling",
    description: "Mechanismen zur Fehlerbehandlung in asynchronem Code",
    benefits: [
      "Abfangen und Behandeln von Ausnahmen",
      "Sicherstellung der Stabilität der Anwendung",
      "Klar verständliche Fehlerdiagnose",
    ],
    category: "error",
  },
  {
    id: 29,
    title: "Callbacks",
    description:
      "Funktionen, die als Argumente für asynchrone Ausführung übergeben werden",
    benefits: [
      "Erster Ansatz zur Verarbeitung asynchroner Operationen",
      "Integration mit älteren APIs",
      "Verständliches Ausführungsmodell",
    ],
    category: "async",
  },
  {
    id: 30,
    title: "Promises",
    description:
      "Objekte, die das Ergebnis einer asynchronen Operation darstellen",
    benefits: [
      "Verbesserte Verarbeitung von asynchronem Code",
      "Ketten von Aufrufen ohne 'Callback-Hölle'",
      "Bessere Fehlerbehandlung",
    ],
    category: "async",
  },
];

// Function to render features
function renderFeatures(features = nodeFeatures) {
  const featuresGrid = document.getElementById("features-grid");
  featuresGrid.innerHTML = "";

  features.forEach((feature) => {
    const featureCard = document.createElement("div");
    featureCard.className = `feature-card ${feature.category}`;
    featureCard.innerHTML = `
      <div class="feature-icon">⚡</div>
      <h3>${feature.title}</h3>
      <p>${feature.description}</p>
      <ul class="feature-benefits">
        ${feature.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
      </ul>
    `;
    featuresGrid.appendChild(featureCard);
  });
}

// Function to filter features by category
function filterFeatures(category, targetElement) {
  if (category === "all") {
    renderFeatures(nodeFeatures);
  } else {
    const filteredFeatures = nodeFeatures.filter(
      (feature) => feature.category === category
    );
    renderFeatures(filteredFeatures);
  }

  // Update active filter button
  document.querySelectorAll(".feature-filter").forEach((button) => {
    button.classList.remove("active");
  });
  targetElement.classList.add("active");
}

// Add event listeners to filter buttons
document.addEventListener("DOMContentLoaded", function () {
  // Initial render
  renderFeatures();

  // Add event listeners to filter buttons
  const filterButtons = document.querySelectorAll(".feature-filter");
  filterButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const category = this.getAttribute("data-category");
      filterFeatures(category, this);
    });
  });
});

// 📊 Aktualisierung der Serverstatistiken
async function updateStats() {
  try {
    const stats = await makeRequest("GET", "/api/stats");

    document.getElementById("request-count").textContent = stats.totalRequests;
    document.getElementById("uptime").textContent = stats.uptime;
    document.getElementById("requests-per-minute").textContent =
      stats.averageRequestsPerMinute;
  } catch (error) {
    console.error("Fehler beim Laden der Statistiken:", error);
  }
}

// Исправление: корректный вывод ошибки при сбросе статистики
async function resetStatistics() {
  try {
    const confirmation = confirm(
      "Sind Sie sicher, dass Sie alle Statistiken zurücksetzen möchten?"
    );
    if (!confirmation) return;
    console.log("📤 Sende Anfrage zum Zurücksetzen der Statistiken...");
    const response = await makeRequest("POST", "/api/reset-stats");
    console.log("📥 Serverantwort:", response);
    if (response && response.success) {
      await updateStats();
      alert("✅ Statistiken wurden erfolgreich zurückgesetzt!");
    } else {
      throw new Error(response?.message || "Unbekannter Fehler");
    }
  } catch (error) {
    console.error("❌ Fehler beim Zurücksetzen der Statistiken:", error);
  }
}
