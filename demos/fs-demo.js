// 📁 Demonstration des File Systems in Node.js

const fs = require("fs");
const path = require("path");

console.log("🎯 Demo: File System Operationen\n");

// 1. Datei lesen
console.log("1️⃣ Datei lesen:");
try {
  const data = fs.readFileSync("package.json", "utf8");
  const pkg = JSON.parse(data);
  console.log(`   📦 Projektname: ${pkg.name}`);
  console.log(`   🔢 Version: ${pkg.version}\n`);
} catch (error) {
  console.log(`   ❌ Fehler: ${error.message}\n`);
}

// 2. Datei erstellen
console.log("2️⃣ Datei erstellen:");
const testContent = `Hallo von Node.js!
Diese Datei wurde automatisch erstellt am ${new Date().toLocaleString("de-DE")}

Node.js ermöglicht:
- 📖 Dateien lesen
- ✍️ Dateien erstellen  
- 🗂️ Mit Ordnern arbeiten
- 👀 Änderungen überwachen`;

try {
  fs.writeFileSync(path.join(__dirname, "test-file.txt"), testContent);
  console.log("   ✅ Datei test-file.txt erfolgreich erstellt!\n");
} catch (error) {
  console.log(`   ❌ Fehler beim Erstellen der Datei: ${error.message}\n`);
}

// 3. Ordnerinhalt lesen
console.log("3️⃣ Inhalt des aktuellen Ordners:");
try {
  const files = fs.readdirSync("./");
  files.forEach((file) => {
    const stats = fs.statSync(file);
    const icon = stats.isDirectory() ? "📁" : "📄";
    const size = stats.isFile() ? ` (${Math.round(stats.size / 1024)}KB)` : "";
    console.log(`   ${icon} ${file}${size}`);
  });
  console.log();
} catch (error) {
  console.log(`   ❌ Fehler beim Lesen des Ordners: ${error.message}\n`);
}

// 4. Überprüfung der Dateiexistenz
console.log("4️⃣ Überprüfung der Dateiexistenz:");
const filesToCheck = ["package.json", "index.js", "nichtexistent.txt"];
filesToCheck.forEach((file) => {
  const exists = fs.existsSync(file);
  const status = exists ? "✅ existiert" : "❌ nicht gefunden";
  console.log(`   📄 ${file}: ${status}`);
});
console.log();

// 5. Asynchrones Lesen (mit Callbacks)
console.log("5️⃣ Asynchrones Lesen einer Datei:");
fs.readFile("package.json", "utf8", (err, data) => {
  if (err) {
    console.log(`   ❌ Fehler: ${err.message}`);
    return;
  }

  try {
    const pkg = JSON.parse(data);
    console.log("   📊 Asynchron erhaltene Projektinformationen:");
    console.log(`   🎯 Hauptdatei: ${pkg.main}`);
    console.log(`   📜 Beschreibung: ${pkg.description || "Nicht angegeben"}`);
  } catch (parseError) {
    console.log(`   ❌ Parsing-Fehler: ${parseError.message}`);
  }
});

// 6. Demonstration von Promises (fs.promises)
console.log("6️⃣ Verwendung von Promises:");
const fsPromises = require("fs").promises;

fsPromises
  .readFile("package.json", "utf8")
  .then((data) => {
    const pkg = JSON.parse(data);
    console.log("   🎉 Promise erfolgreich ausgeführt!");
    console.log(
      `   📋 Abhängigkeiten: ${
        Object.keys(pkg.dependencies || {}).length
      } Stück`
    );
  })
  .catch((error) => {
    console.log(`   ❌ Promise abgelehnt: ${error.message}`);
  });

console.log(
  "\n🎓 Lektion: Node.js bietet mächtige Werkzeuge für die Arbeit mit dem Dateisystem!"
);
console.log(
  "💡 Man kann synchrone, asynchrone Methoden mit Callbacks oder Promises verwenden"
);
