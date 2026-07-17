import React, { useRef, useEffect } from 'react';
import { Message, Channel, User, TypingUser } from '../types';
import MessageItem from './MessageItem';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';

interface ChatAreaProps {
  messages: Message[];
  activeChannel: Channel;
  currentUser: User;
  typingUsers: TypingUser[];
  users: User[];
  onSendMessage: (text: string) => void;
  onReaction: (messageId: string, emoji: string) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  activeChannel,
  currentUser,
  typingUsers,
  users,
  onSendMessage,
  onReaction,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Determine message grouping
  const isFirstInGroup = (index: number): boolean => {
    if (index === 0) return true;
    const prev = messages[index - 1];
    const curr = messages[index];
    if (prev.userId !== curr.userId) return true;

    // Group messages within 5 minutes
    const prevTime = new Date(prev.timestamp).getTime();
    const currTime = new Date(curr.timestamp).getTime();
    return currTime - prevTime > 5 * 60 * 1000;
  };

  const onlineCount = users.filter(
    (u) => u.status === 'online' || u.status === 'idle' || u.status === 'dnd'
  ).length;

  return (
    <main className="chat-area">
      {/* Channel Header */}
      <div className="chat-header">
        <div className="chat-header-channel">
          <span className="chat-header-hash">#</span>
          <span className="chat-header-name">{activeChannel.name}</span>
        </div>
        <div className="chat-header-divider" />
        <span className="chat-header-description">{activeChannel.description}</span>
        <div className="chat-header-actions">
          <button className="chat-header-btn" title="Members" aria-label="Toggle member list">
            👥
          </button>
          <button className="chat-header-btn" title={`${onlineCount} online`} aria-label="Online members">
            🟢
          </button>
          <button className="chat-header-btn" title="Search" aria-label="Search messages">
            🔍
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="messages-container" ref={containerRef}>
        <div className="messages-list">
          {/* Channel welcome */}
          <div className="channel-welcome">
            <div className="channel-welcome-icon">{activeChannel.icon}</div>
            <h3>Welcome to #{activeChannel.name}!</h3>
            <p>This is the start of the <strong>#{activeChannel.name}</strong> channel. {activeChannel.description}</p>
          </div>

          {/* Message list */}
          {messages.map((msg, index) => (
            <MessageItem
              key={msg.id}
              message={msg}
              isFirstInGroup={isFirstInGroup(index)}
              currentUsername={currentUser.username}
              onReaction={onReaction}
            />
          ))}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Typing indicator */}
      <TypingIndicator usernames={typingUsers.map((t) => t.username)} />

      {/* Message input */}
      <MessageInput
        channelName={activeChannel.name}
        onSendMessage={onSendMessage}
      />
    </main>
  );
};

export default ChatArea;
