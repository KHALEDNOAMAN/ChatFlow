import React, { useState } from 'react';

interface ServerSidebarProps {
  // Currently only one server, but the sidebar is ready for more
}

const ServerSidebar: React.FC<ServerSidebarProps> = () => {
  const [hoveredServer, setHoveredServer] = useState<string | null>(null);

  return (
    <nav className="server-sidebar" aria-label="Servers">
      {/* ChatFlow Logo */}
      <div
        className="server-icon server-icon-logo"
        onMouseEnter={() => setHoveredServer('logo')}
        onMouseLeave={() => setHoveredServer(null)}
      >
        CF
        <span className="server-tooltip" style={{ opacity: hoveredServer === 'logo' ? 1 : undefined }}>
          ChatFlow Home
        </span>
      </div>

      <div className="server-separator" />

      {/* Khaled's Server */}
      <div
        className="server-icon server-icon-server active"
        onMouseEnter={() => setHoveredServer('server')}
        onMouseLeave={() => setHoveredServer(null)}
      >
        {/* Active indicator pill */}
        <div className="server-indicator active" />
        K
        <span className="server-tooltip" style={{ opacity: hoveredServer === 'server' ? 1 : undefined }}>
          Khaled's Team
        </span>
      </div>
    </nav>
  );
};

export default ServerSidebar;
