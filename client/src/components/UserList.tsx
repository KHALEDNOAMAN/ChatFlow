import React from 'react';
import { User } from '../types';

interface UserListProps {
  users: User[];
  currentUser: User;
}

const ROLE_MAP: Record<string, string> = {
  Khaled: 'Tech Lead',
  Sara: 'Senior Developer',
  Omar: 'Full-Stack Developer',
  Lina: 'UI/UX Designer',
  Ahmed: 'Backend Developer',
  Noor: 'DevOps Engineer',
};

const UserList: React.FC<UserListProps> = ({ users, currentUser }) => {
  const onlineUsers = users.filter(
    (u) => u.status === 'online' || u.status === 'idle' || u.status === 'dnd'
  );
  const offlineUsers = users.filter((u) => u.status === 'offline');

  return (
    <aside className="user-list" aria-label="Members">
      {/* Online section */}
      <div className="user-list-category">
        Online — {onlineUsers.length}
      </div>
      {onlineUsers.map((user) => (
        <div
          key={user.id}
          className="user-list-item"
        >
          <div
            className="user-list-avatar"
            style={{ backgroundColor: user.color }}
          >
            {user.username[0]}
            <div className={`status-dot ${user.status}`} />
          </div>
          <div className="user-list-info">
            <div className="user-list-name">
              {user.username}
              {user.id === currentUser.id && ' (you)'}
            </div>
            <div className="user-list-role">{ROLE_MAP[user.username] || 'Member'}</div>
          </div>
        </div>
      ))}

      {/* Offline section */}
      {offlineUsers.length > 0 && (
        <>
          <div className="user-list-category">
            Offline — {offlineUsers.length}
          </div>
          {offlineUsers.map((user) => (
            <div
              key={user.id}
              className="user-list-item offline"
            >
              <div
                className="user-list-avatar"
                style={{ backgroundColor: user.color }}
              >
                {user.username[0]}
                <div className="status-dot offline" />
              </div>
              <div className="user-list-info">
                <div className="user-list-name">{user.username}</div>
                <div className="user-list-role">{ROLE_MAP[user.username] || 'Member'}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </aside>
  );
};

export default UserList;
