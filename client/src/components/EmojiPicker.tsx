import React from 'react';

const EMOJIS = [
  '👍', '❤️', '😂', '😮', '😢', '🔥',
  '🚀', '👀', '🎉', '💯', '✅', '💡',
  '👏', '🤔', '😍', '🙌', '💪', '⭐',
  '🌟', '♻️', '📝', '🎯', '🤝', '💎',
];

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
  position?: { top?: number; bottom?: number; left?: number; right?: number };
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect, onClose, position }) => {
  const style: React.CSSProperties = {};
  if (position) {
    if (position.top !== undefined) style.top = position.top;
    if (position.bottom !== undefined) style.bottom = position.bottom;
    if (position.left !== undefined) style.left = position.left;
    if (position.right !== undefined) style.right = position.right;
  }

  return (
    <>
      <div className="emoji-picker-overlay" onClick={onClose} />
      <div className="emoji-picker" style={style}>
        <div className="emoji-picker-grid">
          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              className="emoji-picker-item"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(emoji);
              }}
              aria-label={`Emoji ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default EmojiPicker;
