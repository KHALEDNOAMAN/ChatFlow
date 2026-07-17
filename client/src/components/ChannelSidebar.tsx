import React from 'react';
import { Channel, User } from '../types';

interface ChannelSidebarProps {
  channels: Channel[];
  activeChannelId: string;
  currentUser: User;
  onChannelSelect: (channelId: string) => void;
}

const ChannelSidebar: React.FC<ChannelSidebarProps> = ({
  channels,
  activeChannelId,
  currentUser,
  onChannelSelect,
}) => {
  return (
    <aside className="channel-sidebar">
      {/* Server header */}
      <div className="channel-sidebar-header">
        <h2>Khaled's Team</h2>
        <span className="dropdown-arrow">▼</span>
      </div>

      {/* Channel list */}
      <div className="channel-list-container">
        <div className="channel-category-header">
          <span>▾</span> Text Channels
        </div>

        {channels.map((channel) => {
          const isActive = channel.id === activeChannelId;
          const isUnread = channel.unreadCount > 0;

          return (
            <div
              key={channel.id}
              className={`channel-item${isActive ? ' active' : ''}${isUnread ? ' unread' : ''}`}
              onClick={() => onChannelSelect(channel.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onChannelSelect(channel.id);
                }
              }}
            >
              <span className="channel-icon">{channel.icon}</span>
              <span className="channel-name">{channel.name}</span>
              {isUnread && (
                <span className="channel-badge">{channel.unreadCount}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* User profile bar at bottom */}
      <div className="user-profile-bar">
        <div
          className="user-profile-avatar"
          style={{ backgroundColor: currentUser.color }}
        >
          {currentUser.username[0]}
          <div className={`status-dot ${currentUser.status}`} />
        </div>
        <div className="user-profile-info">
          <div className="user-profile-name">{currentUser.username}</div>
          <div className="user-profile-status">Online</div>
        </div>
        <button className="user-profile-settings" aria-label="User Settings">
          ⚙
        </button>
      </div>
    </aside>
  );
};

export default ChannelSidebar;
