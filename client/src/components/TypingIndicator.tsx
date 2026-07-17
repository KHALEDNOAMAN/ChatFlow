import React from 'react';

interface TypingIndicatorProps {
  usernames: string[];
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ usernames }) => {
  if (usernames.length === 0) {
    return <div className="typing-indicator" />;
  }

  let text: React.ReactNode;
  if (usernames.length === 1) {
    text = (
      <>
        <strong>{usernames[0]}</strong> is typing
      </>
    );
  } else if (usernames.length === 2) {
    text = (
      <>
        <strong>{usernames[0]}</strong> and <strong>{usernames[1]}</strong> are typing
      </>
    );
  } else {
    text = (
      <>
        <strong>{usernames[0]}</strong>, <strong>{usernames[1]}</strong>, and others are typing
      </>
    );
  }

  return (
    <div className="typing-indicator">
      <div className="typing-dots">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
      <span className="typing-text">{text}…</span>
    </div>
  );
};

export default TypingIndicator;
