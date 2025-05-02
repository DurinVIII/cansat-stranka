import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="dashboard-header">
      <div className="header-content">
        <h1>Artemis CanSat 2025</h1>
        <p className="subtitle">Realtime telemetria satelitu</p>
      </div>
      <div className="header-badge">
        <span className="live-dot"></span>
        LIVE DATA
      </div>
    </header>
  );
};

export default Header;