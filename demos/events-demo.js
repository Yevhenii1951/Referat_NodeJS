// ⚡ Demonstration von Events in Node.js

const EventEmitter = require("events");

console.log("🎯 Demo: Node.js Event-System\n");

// Erstellen eines eigenen Event-Emitters
class ChatRoom extends EventEmitter {
  constructor(name) {
    super();
    this.name = name;
    this.users = [];
  }

  addUser(username) {
    this.users.push(username);
    this.emit("userJoined", username);
    return this;
  }

  removeUser(username) {
    this.users = this.users.filter((user) => user !== username);
    this.emit("userLeft", username);
    return this;
  }

  sendMessage(username, message) {
    if (!this.users.includes(username)) {
      this.emit("error", new Error(`Benutzer ${username} ist nicht im Chat`));
      return this;
    }

    this.emit("message", { username, message, timestamp: new Date() });
    return this;
  }
}

// Erstellen eines Chat-Raums
const chatRoom = new ChatRoom("Node.js Studienraum");

// Event-Listener registrieren
chatRoom.on("userJoined", (username) => {
  console.log(`✅ ${username} ist dem Chat "${chatRoom.name}" beigetreten`);
  console.log(`👥 Benutzer im Chat: ${chatRoom.users.length}`);
});

chatRoom.on("userLeft", (username) => {
  console.log(`❌ ${username} hat den Chat verlassen`);
  console.log(`👥 Benutzer im Chat: ${chatRoom.users.length}`);
});

chatRoom.on("message", (data) => {
  console.log(
    `💬 [${data.timestamp.toLocaleTimeString("de-DE")}] ${data.username}: ${
      data.message
    }`
  );
});

chatRoom.on("error", (error) => {
  console.log(`🚨 Fehler im Chat: ${error.message}`);
});

// Einmaliges Event
chatRoom.once("firstMessage", () => {
  console.log("🎉 Erste Nachricht im Chat gesendet!\n");
});

console.log("📡 Chat-Demonstration wird gestartet...\n");

// Chat-Aktivität simulieren
setTimeout(() => {
  chatRoom.addUser("Alex");
}, 500);

setTimeout(() => {
  chatRoom.addUser("Maria");
}, 1000);

setTimeout(() => {
  chatRoom.addUser("Thomas");
}, 1500);

setTimeout(() => {
  chatRoom.emit("firstMessage");
  chatRoom.sendMessage("Alex", "Hallo zusammen! Lernen wir Node.js?");
}, 2000);

setTimeout(() => {
  chatRoom.sendMessage("Maria", "Ja! Events sind wirklich cool 😍");
}, 2500);

setTimeout(() => {
  chatRoom.sendMessage(
    "Thomas",
    "Stimmt zu! Event-driven Architektur ist super!"
  );
}, 3000);

setTimeout(() => {
  chatRoom.sendMessage(
    "UnbekannterBenutzer",
    "Versuch, eine Nachricht zu senden"
  );
}, 3500);

setTimeout(() => {
  chatRoom.removeUser("Thomas");
}, 4000);

setTimeout(() => {
  chatRoom.sendMessage("Maria", "Wo ist Thomas?");
}, 4500);

setTimeout(() => {
  chatRoom.sendMessage(
    "Alex",
    "Ist wohl gegangen. Aber wir lernen weiter Node.js!"
  );
}, 5000);

// Demonstration verschiedener EventEmitter-Methoden
setTimeout(() => {
  console.log("\n📊 Event-Statistiken:");
  console.log(
    `👂 Listener für "message" Event: ${chatRoom.listenerCount("message")}`
  );
  console.log(`📋 Alle Events: ${chatRoom.eventNames().join(", ")}`);

  // Maximale Anzahl von Listenern
  console.log(`🔢 Max. Listener: ${chatRoom.getMaxListeners()}`);

  // Neues Maximum setzen
  chatRoom.setMaxListeners(20);
  console.log(`🔄 Neues Max. Listener: ${chatRoom.getMaxListeners()}`);
}, 6000);

// Listener entfernen
setTimeout(() => {
  console.log('🔇 Entferne "userJoined" Event-Listener...');
  chatRoom.removeAllListeners("userJoined");

  // Versuche Benutzer nach Listener-Entfernung hinzuzufügen
  chatRoom.addUser("Neuling");
  console.log(
    "👤 Neuling hinzugefügt, aber keine Benachrichtigung (Listener entfernt)"
  );
}, 7000);

// Demonstration von prepend (Listener am Anfang hinzufügen)
setTimeout(() => {
  console.log("⬆️ Füge prioritären Listener hinzu...");

  chatRoom.prependListener("message", (data) => {
    if (data.message.includes("wichtig")) {
      console.log(`🚨 WICHTIGE NACHRICHT VON ${data.username.toUpperCase()}!`);
    }
  });

  chatRoom.sendMessage(
    "Alex",
    "Das ist wichtig: Node.js wird bei der NASA verwendet!"
  );
}, 8000);

setTimeout(() => {
  console.log("\n🎓 Lektion beendet!");
  console.log(
    "💡 Events in Node.js ermöglichen flexible und skalierbare Anwendungen"
  );
  console.log("🔥 Viele eingebaute Node.js Module erben von EventEmitter");
  console.log(
    "🌟 Das ist die Grundlage für Chats, Benachrichtigungen, Spiele und vieles mehr!"
  );
}, 9000);
