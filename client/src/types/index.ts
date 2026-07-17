export interface Message {
  id: string;
  channelId: string;
  userId: string;
  username: string;
  color: string;
  text: string;
  timestamp: string;
  reactions: Record<string, string[]>;
}

export interface Channel {
  id: string;
  name: string;
  icon: string;
  description: string;
  unreadCount: number;
}

export interface User {
  id: string;
  username: string;
  color: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
}

export interface TypingUser {
  userId: string;
  username: string;
  channelId: string;
}
