const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
  },
});

// ── In-memory data store ──────────────────────────────────────────────
const channels = [
  { id: 'general', name: 'general', icon: '💬', description: 'General team discussion', unreadCount: 0 },
  { id: 'development', name: 'development', icon: '💻', description: 'Dev talk, PRs, and code reviews', unreadCount: 0 },
  { id: 'design', name: 'design', icon: '🎨', description: 'UI/UX design discussions', unreadCount: 0 },
  { id: 'random', name: 'random', icon: '🎲', description: 'Off-topic fun and memes', unreadCount: 0 },
  { id: 'announcements', name: 'announcements', icon: '📢', description: 'Important team announcements', unreadCount: 0 },
];

const messages = {};    // channelId -> Message[]
const users = new Map(); // socketId -> User
const typingUsers = new Map(); // `${socketId}-${channelId}` -> timeout

channels.forEach((ch) => {
  messages[ch.id] = [];
});

// ── Socket.io event handling ──────────────────────────────────────────
io.on('connection', (socket) => {
  console.log(`⚡ User connected: ${socket.id}`);

  // Join the server
  socket.on('join', (userData) => {
    const user = {
      id: socket.id,
      username: userData.username,
      color: userData.color || '#5865F2',
      status: 'online',
    };
    users.set(socket.id, user);

    // Send initial data to the connecting user
    socket.emit('init', {
      channels,
      messages,
      users: Array.from(users.values()),
      currentUser: user,
    });

    // Broadcast updated user list to everyone
    io.emit('users-update', Array.from(users.values()));
    io.emit('presence-change', { userId: user.id, username: user.username, status: 'online' });
  });

  // Join a specific channel room
  socket.on('join-channel', (channelId) => {
    // Leave all channel rooms first
    channels.forEach((ch) => socket.leave(ch.id));
    socket.join(channelId);
  });

  // Handle incoming messages
  socket.on('message', (data) => {
    const user = users.get(socket.id);
    if (!user) return;

    const message = {
      id: uuidv4(),
      channelId: data.channelId,
      userId: user.id,
      username: user.username,
      color: user.color,
      text: data.text,
      timestamp: new Date().toISOString(),
      reactions: {},
    };

    if (!messages[data.channelId]) {
      messages[data.channelId] = [];
    }
    messages[data.channelId].push(message);

    // Broadcast message to everyone
    io.emit('new-message', message);
  });

  // Handle typing indicators
  socket.on('typing', (channelId) => {
    const user = users.get(socket.id);
    if (!user) return;

    const key = `${socket.id}-${channelId}`;

    // Clear existing timeout
    if (typingUsers.has(key)) {
      clearTimeout(typingUsers.get(key));
    }

    // Broadcast typing to others in the channel
    socket.to(channelId).emit('user-typing', {
      userId: user.id,
      username: user.username,
      channelId,
    });

    // Auto-clear typing after 3 seconds
    const timeout = setTimeout(() => {
      socket.to(channelId).emit('user-stop-typing', {
        userId: user.id,
        channelId,
      });
      typingUsers.delete(key);
    }, 3000);

    typingUsers.set(key, timeout);
  });

  socket.on('stop-typing', (channelId) => {
    const user = users.get(socket.id);
    if (!user) return;

    const key = `${socket.id}-${channelId}`;
    if (typingUsers.has(key)) {
      clearTimeout(typingUsers.get(key));
      typingUsers.delete(key);
    }

    socket.to(channelId).emit('user-stop-typing', {
      userId: user.id,
      channelId,
    });
  });

  // Handle reactions
  socket.on('reaction', (data) => {
    const user = users.get(socket.id);
    if (!user) return;

    const { messageId, channelId, emoji } = data;
    const channelMessages = messages[channelId];
    if (!channelMessages) return;

    const message = channelMessages.find((m) => m.id === messageId);
    if (!message) return;

    if (!message.reactions[emoji]) {
      message.reactions[emoji] = [];
    }

    const userIndex = message.reactions[emoji].indexOf(user.username);
    if (userIndex > -1) {
      message.reactions[emoji].splice(userIndex, 1);
      if (message.reactions[emoji].length === 0) {
        delete message.reactions[emoji];
      }
    } else {
      message.reactions[emoji].push(user.username);
    }

    io.emit('reaction-update', {
      messageId,
      channelId,
      reactions: message.reactions,
    });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      io.emit('presence-change', { userId: user.id, username: user.username, status: 'offline' });
      users.delete(socket.id);
      io.emit('users-update', Array.from(users.values()));
    }

    // Clean up typing timeouts
    for (const [key, timeout] of typingUsers.entries()) {
      if (key.startsWith(socket.id)) {
        clearTimeout(timeout);
        typingUsers.delete(key);
      }
    }

    console.log(`💤 User disconnected: ${socket.id}`);
  });
});

// ── Health check endpoint ─────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({ status: 'ChatFlow server running', channels: channels.length, users: users.size });
});

// ── Start server ──────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 ChatFlow server listening on port ${PORT}`);
});
