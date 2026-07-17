import React from 'react';
import { useDemoMode } from './hooks/useDemoMode';
import ServerSidebar from './components/ServerSidebar';
import ChannelSidebar from './components/ChannelSidebar';
import ChatArea from './components/ChatArea';
import UserList from './components/UserList';
import './styles/index.css';

const App: React.FC = () => {
  const {
    currentUser,
    messages,
    channels,
    users,
    typingUsers,
    activeChannelId,
    activeChannel,
    sendMessage,
    addReaction,
    switchChannel,
  } = useDemoMode();

  return (
    <div className="app-layout">
      <ServerSidebar />
      <ChannelSidebar
        channels={channels}
        activeChannelId={activeChannelId}
        currentUser={currentUser}
        onChannelSelect={switchChannel}
      />
      <ChatArea
        messages={messages}
        activeChannel={activeChannel}
        currentUser={currentUser}
        typingUsers={typingUsers}
        users={users}
        onSendMessage={sendMessage}
        onReaction={addReaction}
      />
      <UserList
        users={users}
        currentUser={currentUser}
      />
    </div>
  );
};

export default App;
