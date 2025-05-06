import React, { useEffect, useState } from 'react';
import './Header.css';

const Header = ({ isOnline, isDemoMode, lastUpdateTime }) => {
  const [lastUpdateString, setLastUpdateString] = useState('');

  useEffect(() => {
    const updateTimeString = () => {
      if (!lastUpdateTime) {
        setLastUpdateString('No data received');
        return;
      }
      
      const now = new Date();
      const updateTime = new Date(lastUpdateTime);
      const diffSeconds = Math.floor((now - updateTime) / 1000);
      
      if (diffSeconds < 60) {
        setLastUpdateString(`${diffSeconds} seconds ago`);
      } else if (diffSeconds < 3600) {
        setLastUpdateString(`${Math.floor(diffSeconds / 60)} minutes ago`);
      } else {
        setLastUpdateString(updateTime.toLocaleTimeString());
      }
    };

    updateTimeString();
    const interval = setInterval(updateTimeString, 10000);
    return () => clearInterval(interval);
  }, [lastUpdateTime]);

  const getStatusClass = () => {
    if (isDemoMode) return 'demo-mode';
    if (!isOnline) return 'offline';
    return 'online';
  };

  return (
    <header className="dashboard-header">
      <div className="header-content">
        <h1>Artemis CanSat 2025</h1>
        <p className="subtitle">Realtime telemetria satelitu</p>
      </div>
      <div className="header-status">
        <div className={`status-badge ${getStatusClass()}`}>
          <span className="status-dot"></span>
          {isDemoMode ? 'DEMO MODE' : (isOnline ? 'LIVE DATA' : 'OFFLINE')}
        </div>
        <div className="last-update">
          Last update: {lastUpdateString}
        </div>
      </div>
    </header>
  );
};

export default Header;