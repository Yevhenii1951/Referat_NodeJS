// 🚀 Node.js Presentation Server
// Interaktive Präsentation über Node.js für Studenten

const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const { createReadStream, createWriteStream } = require("fs");
require("dotenv").config();

// 🚨 Globale Fehlerbehandlung
process.on("uncaughtException", (error) => {
  console.error("🚨 Nicht abgefangene Ausnahme:", error.message);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error(
    "🚨 Nicht behandelte Ablehnung bei:",
    promise,
    "Grund:",
    reason
  );
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// 🎯 Hauptseite - Präsentation
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 📊 API für File System Demo
app.get("/api/files", (req, res) => {
  try {
    const files = fs.readdirSync("./");
    res.json({
      success: true,
      files: files,
      message: "Node.js kann das Dateisystem lesen!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// 🌍 API für Environment Variables Demo
app.get("/api/env", (req, res) => {
  res.json({
    nodeVersion: process.version,
    platform: process.platform,
    port: PORT,
    uptime: Math.round(process.uptime()),
    message: "Node.js hat Zugriff auf Systeminformationen!",
  });
});

// 📝 API für Dateierstellung Demo
app.post("/api/write-file", (req, res) => {
  const { filename, content } = req.body;

  if (!filename || !content) {
    return res.status(400).json({
      success: false,
      message: "Dateiname und Inhalt erforderlich",
    });
  }

  try {
    const filePath = path.join(__dirname, "examples", filename);
    fs.writeFileSync(filePath, content);
    res.json({
      success: true,
      message: `Datei ${filename} erfolgreich erstellt!`,
      path: filePath,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// 🎮 Demo: Simple Chat API (Events)
let messages = [];

app.get("/api/messages", (req, res) => {
  res.json(messages);
});

app.post("/api/messages", (req, res) => {
  const { username, message } = req.body;
  const newMessage = {
    id: Date.now(),
    username: username || "Anonym",
    message,
    timestamp: new Date().toLocaleString("de-DE"),
  };

  messages.push(newMessage);

  // Begrenzen der Nachrichtenanzahl
  if (messages.length > 10) {
    messages.shift();
  }

  res.json({
    success: true,
    message: newMessage,
  });
});

// 🔄 Demo: Prozessinformationen
app.get("/api/process", (req, res) => {
  res.json({
    pid: process.pid,
    version: process.version,
    platform: process.platform,
    arch: process.arch,
    uptime: Math.round(process.uptime()),
    memory: process.memoryUsage(),
    cwd: process.cwd(),
  });
});

// 📈 Demo: Performance-Überwachung
let requestCount = 0;
let startTime = Date.now();

app.use((req, res, next) => {
  requestCount++;
  console.log(`📊 Anfrage #${requestCount}: ${req.method} ${req.path}`);
  next();
});

// 🚀 Express.js Demo APIs
let users = [
  { id: 1, name: "Anna Mueller", email: "anna@school.de", role: "student" },
  { id: 2, name: "Max Schmidt", email: "max@school.de", role: "teacher" },
  { id: 3, name: "Lisa Weber", email: "lisa@school.de", role: "student" },
];

let nextUserId = 4;

// GET /api/users - Alle Benutzer abrufen
app.get("/api/users", (req, res) => {
  res.json({
    success: true,
    data: users,
    count: users.length,
    message: "Benutzer erfolgreich abgerufen",
    timestamp: new Date().toISOString(),
  });
});

// GET /api/users/:id - Einzelnen Benutzer abrufen
app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: `Benutzer mit ID ${userId} nicht gefunden`,
    });
  }

  res.json({
    success: true,
    data: user,
    message: "Benutzer erfolgreich abgerufen",
  });
});

// POST /api/users - Neuen Benutzer erstellen
app.post("/api/users", (req, res) => {
  const { name, email, role } = req.body;

  // Validierung
  if (!name || !email || !role) {
    return res.status(400).json({
      success: false,
      message: "Name, E-Mail und Rolle sind erforderlich",
      required: ["name", "email", "role"],
    });
  }

  // Prüfen ob E-Mail bereits existiert
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "Benutzer mit dieser E-Mail existiert bereits",
    });
  }

  const newUser = {
    id: nextUserId++,
    name,
    email,
    role,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    data: newUser,
    message: "Benutzer erfolgreich erstellt",
    totalUsers: users.length,
  });
});

// PUT /api/users/:id - Benutzer aktualisieren
app.put("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Benutzer mit ID ${userId} nicht gefunden`,
    });
  }

  const { name, email, role } = req.body;
  const updatedUser = {
    ...users[userIndex],
    ...(name && { name }),
    ...(email && { email }),
    ...(role && { role }),
    updatedAt: new Date().toISOString(),
  };

  users[userIndex] = updatedUser;

  res.json({
    success: true,
    data: updatedUser,
    message: "Benutzer erfolgreich aktualisiert",
  });
});

// DELETE /api/users/:id - Benutzer löschen
app.delete("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Benutzer mit ID ${userId} nicht gefunden`,
    });
  }

  const deletedUser = users.splice(userIndex, 1)[0];

  res.json({
    success: true,
    data: deletedUser,
    message: "Benutzer erfolgreich gelöscht",
    remainingUsers: users.length,
  });
});

// 📊 Erweiterte Statistiken API
app.get("/api/stats", (req, res) => {
  res.json({
    totalRequests: requestCount,
    uptime: Math.round((Date.now() - startTime) / 1000),
    averageRequestsPerMinute: Math.round(
      requestCount / ((Date.now() - startTime) / 60000)
    ),
  });
});

// � API zum Zurücksetzen der Statistiken
app.post("/api/reset-stats", (req, res) => {
  try {
    const oldRequestCount = requestCount;
    const oldUptime = Math.round((Date.now() - startTime) / 1000);

    // Zurücksetzen der Statistiken
    requestCount = 0;
    startTime = Date.now();

    // Chat-Nachrichten auch zurücksetzen
    messages.length = 0;

    // Benutzer-Array zurücksetzen (auf Standard)
    users = [
      { id: 1, name: "Anna Mueller", email: "anna@school.de", role: "student" },
      { id: 2, name: "Max Schmidt", email: "max@school.de", role: "teacher" },
      { id: 3, name: "Lisa Weber", email: "lisa@school.de", role: "student" },
    ];
    nextUserId = 4;

    console.log(
      `🔄 Statistiken zurückgesetzt! Vorherige Werte: ${oldRequestCount} Anfragen, ${oldUptime}s Laufzeit`
    );

    res.json({
      success: true,
      message: "Alle Statistiken erfolgreich zurückgesetzt!",
      resetData: {
        previousRequests: oldRequestCount,
        previousUptime: oldUptime,
        newStartTime: new Date().toISOString(),
        resetItems: [
          "Request Counter",
          "Server Uptime",
          "Chat Messages",
          "User Database",
        ],
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Fehler beim Zurücksetzen der Statistiken:", error);
    res.status(500).json({
      success: false,
      message: "Fehler beim Zurücksetzen der Statistiken",
      error: error.message,
    });
  }
});

// �🔍 API für Express.js Routing Demo
app.get("/api/demo/routing", (req, res) => {
  res.json({
    success: true,
    message: "GET Route funktioniert perfekt!",
    route: "/api/demo/routing",
    method: "GET",
    query: req.query,
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/demo/routing", (req, res) => {
  res.json({
    success: true,
    message: "POST Route funktioniert perfekt!",
    route: "/api/demo/routing",
    method: "POST",
    body: req.body,
    timestamp: new Date().toISOString(),
  });
});

// 🎯 Express.js Middleware Demo
app.use("/api/middleware-demo", (req, res, next) => {
  console.log(
    `🔧 Middleware: ${req.method} ${
      req.originalUrl
    } - ${new Date().toISOString()}`
  );
  req.middlewareTimestamp = Date.now();
  next();
});

app.get("/api/middleware-demo", (req, res) => {
  const processingTime = Date.now() - req.middlewareTimestamp;
  res.json({
    success: true,
    message: "Middleware Demo erfolgreich!",
    middlewareInfo: {
      processed: true,
      processingTime: `${processingTime}ms`,
      middlewareChain: ["CORS", "JSON Parser", "Logger", "Route Handler"],
    },
    timestamp: new Date().toISOString(),
  });
});

// 🏥 Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// � Installation & Packages Guide API
app.get("/api/installation-guide", (req, res) => {
  const installationGuide = {
    officialSite: "https://nodejs.org",
    downloadOptions: {
      lts: "Long Term Support (Empfohlen für Produktion)",
      current: "Aktuelle Version (Neue Features)",
    },
    installationSteps: {
      windows: [
        "1. Besuchen Sie nodejs.org",
        "2. Laden Sie den Windows Installer herunter",
        "3. Führen Sie die .msi Datei aus",
        "4. Folgen Sie dem Setup-Assistenten",
        "5. Öffnen Sie CMD/PowerShell und prüfen: node --version",
      ],
      mac: [
        "1. Besuchen Sie nodejs.org und laden Sie den Installer herunter",
        "2. Oder verwenden Sie Homebrew: brew install node",
        "3. Prüfen Sie die Installation: node --version",
      ],
      linux: [
        "1. Ubuntu/Debian: curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -",
        "2. sudo apt-get install -y nodejs",
        "3. Oder verwenden Sie nvm (Node Version Manager)",
        "4. Prüfen Sie: node --version && npm --version",
      ],
    },
    verification: {
      node: "node --version",
      npm: "npm --version",
      firstProject: "mkdir my-app && cd my-app && npm init -y",
    },
  };

  res.json({
    success: true,
    guide: installationGuide,
    message: "Node.js Installation Guide erfolgreich abgerufen",
    timestamp: new Date().toISOString(),
  });
});

// � Beliebte NPM Packages API
app.get("/api/popular-packages", (req, res) => {
  const topPackages = [
    {
      name: "express",
      downloads: "30+ Million/Woche",
      description: "Fast, minimalist web framework für Node.js",
      installation: "npm install express",
      usage: "Web-Server, APIs, Routing, Middleware",
      example: "const express = require('express'); const app = express();",
    },
    {
      name: "lodash",
      downloads: "25+ Million/Woche",
      description: "Moderne JavaScript Utility-Bibliothek",
      installation: "npm install lodash",
      usage: "Array/Object Manipulation, Utilities",
      example: "const _ = require('lodash'); _.isEmpty({});",
    },
    {
      name: "axios",
      downloads: "20+ Million/Woche",
      description: "Promise-basierter HTTP Client",
      installation: "npm install axios",
      usage: "HTTP Requests, API Calls, REST Client",
      example: "const axios = require('axios'); axios.get('url');",
    },
    {
      name: "bcrypt",
      downloads: "8+ Million/Woche",
      description: "Passwort Hashing Bibliothek",
      installation: "npm install bcrypt",
      usage: "Passwort verschlüsseln, Authentication",
      example: "const bcrypt = require('bcrypt'); bcrypt.hash('password', 10);",
    },
    {
      name: "cors",
      downloads: "15+ Million/Woche",
      description: "Cross-Origin Resource Sharing Middleware",
      installation: "npm install cors",
      usage: "CORS Headers, Cross-Domain Requests",
      example: "const cors = require('cors'); app.use(cors());",
    },
    {
      name: "jsonwebtoken",
      downloads: "12+ Million/Woche",
      description: "JSON Web Token Implementation",
      installation: "npm install jsonwebtoken",
      usage: "JWT Authentication, Token Generation",
      example:
        "const jwt = require('jsonwebtoken'); jwt.sign({id: 1}, 'secret');",
    },
    {
      name: "mongoose",
      downloads: "6+ Million/Woche",
      description: "MongoDB Object Modeling für Node.js",
      installation: "npm install mongoose",
      usage: "MongoDB ODM, Database Schemas, Models",
      example:
        "const mongoose = require('mongoose'); mongoose.connect('mongodb://...');",
    },
    {
      name: "dotenv",
      downloads: "18+ Million/Woche",
      description: "Lädt Umgebungsvariablen aus .env Dateien",
      installation: "npm install dotenv",
      usage: "Environment Variables, Configuration",
      example: "require('dotenv').config(); process.env.PORT;",
    },
  ];

  const packageCategories = {
    webFrameworks: ["express", "koa", "fastify", "hapi"],
    databases: ["mongoose", "sequelize", "prisma", "typeorm"],
    authentication: ["jsonwebtoken", "passport", "bcrypt", "argon2"],
    utilities: ["lodash", "moment", "ramda", "date-fns"],
    httpClients: ["axios", "node-fetch", "request", "superagent"],
    testing: ["jest", "mocha", "chai", "supertest"],
    buildTools: ["webpack", "gulp", "grunt", "parcel"],
    realtime: ["socket.io", "ws", "express-ws"],
  };

  res.json({
    success: true,
    topPackages: topPackages,
    categories: packageCategories,
    npmTips: [
      "npm install --save für Produktionsabhängigkeiten",
      "npm install --save-dev für Entwicklungsabhängigkeiten",
      "npm ls zeigt installierte Pakete",
      "npm outdated zeigt veraltete Pakete",
      "npm audit überprüft Sicherheitslücken",
    ],
    totalNpmPackages: "2+ Millionen verfügbare Pakete",
    timestamp: new Date().toISOString(),
  });
});

// 🚀 Server starten
app.listen(PORT, () => {
  console.log("-  Node.js Präsentations-Server gestartet!");
  console.log(`-  Browser öffnen: http://localhost:${PORT}`);
  console.log(`-  Node.js Version: ${process.version}`);
});
