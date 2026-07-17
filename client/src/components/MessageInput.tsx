import React, { useState, useRef, useCallback, useEffect } from 'react';
import EmojiPicker from './EmojiPicker';

interface MessageInputProps {
  channelName: string;
  onSendMessage: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ channelName, onSendMessage }) => {
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [text]);

  const handleSend = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setText('');
    // Refocus
    textareaRef.current?.focus();
  }, [text, onSendMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleEmojiSelect = useCallback((emoji: string) => {
    setText((prev) => prev + emoji);
    setShowEmojiPicker(false);
    textareaRef.current?.focus();
  }, []);

  const hasText = text.trim().length > 0;

  return (
    <div className="message-input-container">
      <div className="message-input-wrapper">
        {/* Attach button */}
        <button className="input-btn" title="Attach file" aria-label="Attach file">
          📎
        </button>

        {/* Text input */}
        <textarea
          ref={textareaRef}
          className="message-textarea"
          placeholder={`Message #${channelName}`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />

        {/* Emoji button */}
        <div style={{ position: 'relative' }}>
          <button
            className="input-btn"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            title="Emoji"
            aria-label="Open emoji picker"
          >
            😊
          </button>

          {showEmojiPicker && (
            <EmojiPicker
              onSelect={handleEmojiSelect}
              onClose={() => setShowEmojiPicker(false)}
              position={{ bottom: 44, right: 0 }}
            />
          )}
        </div>

        {/* Send button */}
        <button
          className={`input-btn send-btn${hasText ? ' visible' : ''}`}
          onClick={handleSend}
          title="Send message"
          aria-label="Send message"
          disabled={!hasText}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
