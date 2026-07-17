import { useState, useEffect, useCallback, useRef } from 'react';
import { Message, Channel, User, TypingUser } from '../types';
import {
  currentUser,
  botUsers,
  allUsers,
  defaultChannels,
  initialMessages,
  botResponses,
} from '../utils/demoData';

let messageIdCounter = 100;
function generateId(): string {
  return `msg-${++messageIdCounter}`;
}

export function useDemoMode() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [channels, setChannels] = useState<Channel[]>(defaultChannels);
  const [users, setUsers] = useState<User[]>(allUsers);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const [activeChannelId, setActiveChannelId] = useState<string>('general');

  const botTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const presenceIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Cleanup on unmount ──────────────────────────────────────────────
  useEffect(() => {
    return () => {
      botTimeoutsRef.current.forEach(clearTimeout);
      if (presenceIntervalRef.current) clearInterval(presenceIntervalRef.current);
    };
  }, []);

  // ── Simulate random presence changes every 30-60s ───────────────────
  useEffect(() => {
    const runPresenceSimulation = () => {
      const delay = 30000 + Math.random() * 30000;
      presenceIntervalRef.current = setInterval(() => {
        setUsers((prev) => {
          const bots = prev.filter((u) => u.id !== currentUser.id);
          const randomBot = bots[Math.floor(Math.random() * bots.length)];
          if (!randomBot) return prev;

          const statuses: Array<'online' | 'idle' | 'dnd' | 'offline'> = [
            'online',
            'idle',
            'dnd',
            'offline',
          ];
          const currentStatus = randomBot.status;
          let newStatus = statuses[Math.floor(Math.random() * statuses.length)];
          // Bias towards online
          if (Math.random() < 0.5) newStatus = 'online';
          if (newStatus === currentStatus) return prev;

          return prev.map((u) =>
            u.id === randomBot.id ? { ...u, status: newStatus } : u
          );
        });
      }, delay);
    };

    runPresenceSimulation();
    return () => {
      if (presenceIntervalRef.current) clearInterval(presenceIntervalRef.current);
    };
  }, []);

  // ── Send a message (from the current user) ─────────────────────────
  const sendMessage = useCallback(
    (text: string) => {
      const newMessage: Message = {
        id: generateId(),
        channelId: activeChannelId,
        userId: currentUser.id,
        username: currentUser.username,
        color: currentUser.color,
        text,
        timestamp: new Date().toISOString(),
        reactions: {},
      };

      setMessages((prev) => [...prev, newMessage]);

      // ── Trigger a bot response after 1-3 seconds ──────────────────
      const delay = 1000 + Math.random() * 2000;
      const channelId = activeChannelId;

      // Pick a random bot that is "online" or "idle"
      const availableBots = botUsers.filter((b) => {
        const userState = users.find((u) => u.id === b.id);
        return userState && (userState.status === 'online' || userState.status === 'idle');
      });

      if (availableBots.length === 0) return;

      const bot = availableBots[Math.floor(Math.random() * availableBots.length)];
      const responses = botResponses[channelId] || botResponses.general;
      const responseText = responses[Math.floor(Math.random() * responses.length)];

      // Show typing indicator ~1s before message appears
      const typingDelay = Math.max(delay - 1200, 300);

      const typingTimeout = setTimeout(() => {
        setTypingUsers((prev) => [
          ...prev.filter(
            (t) => !(t.userId === bot.id && t.channelId === channelId)
          ),
          { userId: bot.id, username: bot.username, channelId },
        ]);
      }, typingDelay);

      const messageTimeout = setTimeout(() => {
        // Remove typing indicator
        setTypingUsers((prev) =>
          prev.filter(
            (t) => !(t.userId === bot.id && t.channelId === channelId)
          )
        );

        // Add bot message
        const botMessage: Message = {
          id: generateId(),
          channelId,
          userId: bot.id,
          username: bot.username,
          color: bot.color,
          text: responseText,
          timestamp: new Date().toISOString(),
          reactions: {},
        };

        setMessages((prev) => [...prev, botMessage]);

        // Update unread count if the message is in a non-active channel
        setChannels((prev) =>
          prev.map((ch) =>
            ch.id === channelId && channelId !== activeChannelId
              ? { ...ch, unreadCount: ch.unreadCount + 1 }
              : ch
          )
        );
      }, delay);

      botTimeoutsRef.current.push(typingTimeout, messageTimeout);

      // ── Occasionally trigger a second bot response ──────────────────
      if (Math.random() < 0.3 && availableBots.length > 1) {
        const secondBot = availableBots.find((b) => b.id !== bot.id) || bot;
        const secondDelay = delay + 1500 + Math.random() * 2000;
        const secondResponse =
          responses[Math.floor(Math.random() * responses.length)];

        const secondTypingTimeout = setTimeout(() => {
          setTypingUsers((prev) => [
            ...prev.filter(
              (t) => !(t.userId === secondBot.id && t.channelId === channelId)
            ),
            { userId: secondBot.id, username: secondBot.username, channelId },
          ]);
        }, secondDelay - 1000);

        const secondMessageTimeout = setTimeout(() => {
          setTypingUsers((prev) =>
            prev.filter(
              (t) => !(t.userId === secondBot.id && t.channelId === channelId)
            )
          );

          const secondBotMessage: Message = {
            id: generateId(),
            channelId,
            userId: secondBot.id,
            username: secondBot.username,
            color: secondBot.color,
            text: secondResponse,
            timestamp: new Date().toISOString(),
            reactions: {},
          };

          setMessages((prev) => [...prev, secondBotMessage]);
        }, secondDelay);

        botTimeoutsRef.current.push(secondTypingTimeout, secondMessageTimeout);
      }
    },
    [activeChannelId, users]
  );

  // ── Add / toggle reaction on a message ──────────────────────────────
  const addReaction = useCallback(
    (messageId: string, emoji: string) => {
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id !== messageId) return msg;

          const reactions = { ...msg.reactions };
          const existing = reactions[emoji] ? [...reactions[emoji]] : [];

          const userIndex = existing.indexOf(currentUser.username);
          if (userIndex > -1) {
            existing.splice(userIndex, 1);
            if (existing.length === 0) {
              delete reactions[emoji];
            } else {
              reactions[emoji] = existing;
            }
          } else {
            reactions[emoji] = [...existing, currentUser.username];
          }

          return { ...msg, reactions };
        })
      );
    },
    []
  );

  // ── Switch active channel ───────────────────────────────────────────
  const switchChannel = useCallback((channelId: string) => {
    setActiveChannelId(channelId);
    // Clear unread count for this channel
    setChannels((prev) =>
      prev.map((ch) => (ch.id === channelId ? { ...ch, unreadCount: 0 } : ch))
    );
  }, []);

  // ── Get messages for the active channel ─────────────────────────────
  const channelMessages = messages.filter(
    (m) => m.channelId === activeChannelId
  );

  // ── Get typing users for the active channel ─────────────────────────
  const channelTypingUsers = typingUsers.filter(
    (t) => t.channelId === activeChannelId
  );

  // ── Get the active channel object ───────────────────────────────────
  const activeChannel =
    channels.find((ch) => ch.id === activeChannelId) || channels[0];

  return {
    currentUser,
    messages: channelMessages,
    allMessages: messages,
    channels,
    users,
    typingUsers: channelTypingUsers,
    activeChannelId,
    activeChannel,
    sendMessage,
    addReaction,
    switchChannel,
  };
}
