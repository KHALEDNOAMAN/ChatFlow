<div align="center">

# 💬 ChatFlow

**Real-Time Team Communication Platform with Channels, Typing Indicators & Online Presence**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

A modern real-time chat platform inspired by Slack and Discord. Features instant messaging with WebSockets, multiple chat channels, typing indicators, online/offline presence, emoji reactions, and message history. Built with a demo mode for frontend-only deployment.

</div>

---

## ✨ Features

- 💬 **Real-Time Messaging** - Instant message delivery using Socket.io WebSockets
- 📢 **Chat Channels** - Multiple channels (General, Development, Design, Random, Announcements)
- ⌨️ **Typing Indicators** - "User is typing..." with real-time updates
- 🟢 **Online Presence** - See who's online/offline/away in real-time
- 😊 **Emoji Reactions** - React to messages with emoji
- 🔍 **Message Search** - Search through message history
- 📱 **Responsive Design** - Mobile-first dark theme inspired by Discord
- 🤖 **Demo Mode** - Full interactive demo without backend (simulated bot responses)
- 🔔 **Unread Badges** - Channel notification counts
- 📎 **File Sharing UI** - Attachment interface for images and files

## 🏗️ Architecture

```
┌─────────────────┐     WebSocket      ┌──────────────────┐
│  React Client   │◄──────────────────►│  Express Server  │
│  (TypeScript)   │   Socket.io         │  (Socket.io)     │
│  Port: 5173     │                     │  Port: 3001      │
└─────────────────┘                     └──────────────────┘
       │                                        │
       │  Demo Mode (no server needed)          │
       └── Simulated bot responses              └── In-memory store
```

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI components |
| TypeScript 5 | Type safety |
| Socket.io Client | WebSocket communication |
| Vite 5 | Build tool |
| Node.js + Express | WebSocket server |
| Socket.io Server | Real-time event handling |

## 🚀 Quick Start

### Frontend Only (Demo Mode)
```bash
cd client
npm install
npm run dev
```

### Full Stack (With Server)
```bash
# Terminal 1 - Server
cd server
npm install
npm run dev

# Terminal 2 - Client
cd client
npm install
npm run dev
```

## 📝 License
MIT License - see [LICENSE](LICENSE) file.

---
<div align="center">

Built by [Khaled Noaman](https://github.com/KHALEDNOAMAN) — Aspiring Engineering Manager 🚀

</div>
