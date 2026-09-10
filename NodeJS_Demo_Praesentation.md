# Node.js Demo-Präsentation (B1 Niveau)

In unserem Projekt gibt es verschiedene Demos. Sie helfen uns, Node.js besser zu verstehen. Ich erkläre kurz, wie jede Demo funktioniert, was wir sehen und welche Technologie dahinter steckt.

---

## 1. Event-System Demo (`events-demo.js`)

**Was passiert?**  
Wir sehen einen Chatraum. Benutzer kommen, schreiben Nachrichten und gehen wieder.  
Jede Aktion löst ein Event aus:  
- Benutzer kommt: `userJoined`
- Benutzer geht: `userLeft`
- Nachricht wird gesendet: `message`
- Fehler beim Senden: `error`

**Technologie:**  
- EventEmitter (Events)
- Event-Loop (wie Node.js Events verarbeitet)
- Asynchrone Aktionen (mit `setTimeout`)

**Was lernen wir?**  
Wir verstehen, wie Node.js mit Events arbeitet.  
Wir sehen, wie Event-Loop funktioniert.  
Wir lernen, wie man EventEmitter benutzt.

**Wie kann ich das sehen?**  
Im Terminal:  
```bash
node demos/events-demo.js
```
Die Aktionen und Events werden direkt angezeigt.

---

## 2. File System Demo (`fs-demo.js`)

**Was passiert?**  
Wir lesen und schreiben Dateien.  
Wir sehen, welche Dateien im Ordner sind.  
Wir prüfen, ob bestimmte Dateien existieren.

**Technologie:**  
- File System Modul (`fs`)
- Synchrone und asynchrone Methoden
- Promises (asynchrone Programmierung)

**Was lernen wir?**  
Wir lernen, wie man mit Dateien arbeitet.  
Wir sehen Unterschied zwischen synchron und asynchron.  
Wir verstehen, wie Promises funktionieren.

**Wie kann ich das sehen?**  
Im Terminal:  
```bash
node demos/fs-demo.js
```
Ergebnisse werden direkt angezeigt.

---

## 3. HTTP Server Demo (`http-demo.js`)

**Was passiert?**  
Wir starten einen einfachen Webserver.  
Der Server zeigt verschiedene Endpunkte:  
- `/api/info` – Server-Infos  
- `/api/time` – aktuelle Zeit  
- `/api/headers` – HTTP-Header  
- `/api/random` – Zufallszahl

**Technologie:**  
- HTTP Modul
- Event-Loop (Server verarbeitet viele Anfragen)
- Asynchrone Verarbeitung

**Was lernen wir?**  
Wir sehen, wie ein Webserver in Node.js funktioniert.  
Wir verstehen, wie Endpunkte und Routing gehen.  
Wir lernen, wie Node.js viele Anfragen gleichzeitig verarbeitet.

**Wie kann ich das sehen?**  
Im Terminal starten:  
```bash
node demos/http-demo.js
```
Im Browser öffnen:  
[http://localhost:3001](http://localhost:3001)  
Hier sieht man die Endpunkte und kann sie testen.

---

## 4. Express.js API Demo

**Was passiert?**  
Wir nutzen das Express-Framework.  
Wir können Benutzer abfragen und erstellen:  
- `GET /api/users` – Liste der Benutzer  
- `POST /api/users` – neuen Benutzer hinzufügen

**Technologie:**  
- Express.js (Framework)
- Routing
- Middleware
- Asynchrone Verarbeitung

**Was lernen wir?**  
Wir lernen, wie moderne Web-APIs gebaut werden.  
Wir sehen, wie Express das Arbeiten mit Node.js einfacher macht.

**Wie kann ich das sehen?**  
Im Terminal starten:  
```bash
npm start
```
Im Browser öffnen:  
[http://localhost:3000](http://localhost:3000)  
API kann mit Buttons oder Tools wie Postman getestet werden.

---

## 5. Echtzeit-Chat Demo (Socket.io)

**Was passiert?**  
Benutzer können Nachrichten in Echtzeit senden und empfangen.  
Alle sehen sofort neue Nachrichten.

**Technologie:**  
- Socket.io (WebSockets)
- Event-Loop
- Asynchrone Kommunikation

**Was lernen wir?**  
Wir verstehen, wie Echtzeit-Kommunikation funktioniert.  
Wir sehen, wie Events und Nachrichten direkt übertragen werden.

**Wie kann ich das sehen?**  
Im Browser:  
[http://localhost:3000/chat](http://localhost:3000/chat)  
Hier kann man live chatten.

---

## 6. System-Umgebung Demo

**Was passiert?**  
Wir sehen Infos über das System:  
- Node.js Version  
- Betriebssystem  
- Laufzeit

**Technologie:**  
- OS Modul
- Prozess-Objekt

**Was lernen wir?**  
Wir lernen, wie man Systeminfos abfragt.

**Wie kann ich das sehen?**  
Im Browser:  
[http://localhost:3000/env](http://localhost:3000/env)

---

## 7. Live-Server-Statistiken

**Was passiert?**  
Wir sehen, wie viele Anfragen der Server bekommt und wie lange er läuft.

**Technologie:**  
- Prozess-Objekt
- Event-Loop
- Asynchrone Verarbeitung

**Was lernen wir?**  
Wir verstehen, wie man Statistiken in Node.js sammelt.

**Wie kann ich das sehen?**  
Im Browser:  
[http://localhost:3000/stats](http://localhost:3000/stats)

---

# Fazit

Mit diesen Demos lernen wir:
- Wie Node.js mit Events und Event-Loop arbeitet
- Wie man mit Dateien und Webservern umgeht
- Wie asynchrone Programmierung funktioniert
- Wie Echtzeit-Kommunikation möglich ist

Alle Demos sind einfach zu testen und zeigen die wichtigsten Node.js-Technologien
