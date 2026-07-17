import React, { useState, useCallback } from 'react';
import { Message } from '../types';
import EmojiPicker from './EmojiPicker';

interface MessageItemProps {
  message: Message;
  isFirstInGroup: boolean;
  currentUsername: string;
  onReaction: (messageId: string, emoji: string) => void;
}

function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (isToday) return `Today at ${timeStr}`;

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (isYesterday) return `Yesterday at ${timeStr}`;

  return `${date.toLocaleDateString()} ${timeStr}`;
}

function formatShortTime(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  isFirstInGroup,
  currentUsername,
  onReaction,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleReactionClick = useCallback(
    (emoji: string) => {
      onReaction(message.id, emoji);
    },
    [message.id, onReaction]
  );

  const handleEmojiSelect = useCallback(
    (emoji: string) => {
      onReaction(message.id, emoji);
      setShowEmojiPicker(false);
    },
    [message.id, onReaction]
  );

  const reactions = Object.entries(message.reactions);

  if (isFirstInGroup) {
    return (
      <div className="message-group">
        <div className="message-item message-item-full">
          {/* Avatar */}
          <div
            className="message-avatar"
            style={{ backgroundColor: message.color }}
          >
            {message.username[0]}
          </div>

          {/* Content */}
          <div className="message-content">
            <div className="message-header">
              <span
                className="message-username"
                style={{ color: message.color }}
              >
                {message.username}
              </span>
              <span className="message-timestamp">
                {formatTimestamp(message.timestamp)}
              </span>
            </div>
            <div className="message-text">{message.text}</div>

            {/* Reactions */}
            {reactions.length > 0 && (
              <div className="message-reactions">
                {reactions.map(([emoji, users]) => (
                  <button
                    key={emoji}
                    className={`reaction-pill${users.includes(currentUsername) ? ' user-reacted' : ''}`}
                    onClick={() => handleReactionClick(emoji)}
                    title={users.join(', ')}
                  >
                    <span>{emoji}</span>
                    <span className="reaction-count">{users.length}</span>
                  </button>
                ))}
                <button
                  className="reaction-add-btn"
                  onClick={() => setShowEmojiPicker(true)}
                  aria-label="Add reaction"
                >
                  +
                </button>
              </div>
            )}
          </div>

          {/* Hover action bar */}
          <div className="message-actions">
            <button
              className="message-action-btn"
              onClick={() => setShowEmojiPicker(true)}
              title="Add Reaction"
              aria-label="Add Reaction"
            >
              😀
            </button>
            <button
              className="message-action-btn"
              title="Reply"
              aria-label="Reply"
            >
              ↩
            </button>
            <button
              className="message-action-btn"
              title="More"
              aria-label="More options"
            >
              ⋯
            </button>
          </div>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <EmojiPicker
              onSelect={handleEmojiSelect}
              onClose={() => setShowEmojiPicker(false)}
              position={{ top: -8, right: 8 }}
            />
          )}
        </div>
      </div>
    );
  }

  // Continuation message (same user, no avatar/header)
  return (
    <div className="message-item message-item-continuation">
      <div className="message-avatar-spacer">
        <span className="message-continuation-time">
          {formatShortTime(message.timestamp)}
        </span>
      </div>
      <div className="message-content">
        <div className="message-text">{message.text}</div>

        {reactions.length > 0 && (
          <div className="message-reactions">
            {reactions.map(([emoji, users]) => (
              <button
                key={emoji}
                className={`reaction-pill${users.includes(currentUsername) ? ' user-reacted' : ''}`}
                onClick={() => handleReactionClick(emoji)}
                title={users.join(', ')}
              >
                <span>{emoji}</span>
                <span className="reaction-count">{users.length}</span>
              </button>
            ))}
            <button
              className="reaction-add-btn"
              onClick={() => setShowEmojiPicker(true)}
              aria-label="Add reaction"
            >
              +
            </button>
          </div>
        )}
      </div>

      {/* Hover action bar */}
      <div className="message-actions">
        <button
          className="message-action-btn"
          onClick={() => setShowEmojiPicker(true)}
          title="Add Reaction"
          aria-label="Add Reaction"
        >
          😀
        </button>
        <button className="message-action-btn" title="Reply" aria-label="Reply">
          ↩
        </button>
        <button className="message-action-btn" title="More" aria-label="More options">
          ⋯
        </button>
      </div>

      {showEmojiPicker && (
        <EmojiPicker
          onSelect={handleEmojiSelect}
          onClose={() => setShowEmojiPicker(false)}
          position={{ top: -8, right: 8 }}
        />
      )}
    </div>
  );
};

export default MessageItem;
