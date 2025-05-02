import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Temperature from './components/charts/Temperature';
import Pressure from './components/charts/Pressure';
import TVOC from './components/charts/TVOC';
import CO2 from './components/charts/CO2';
import Altitude from './components/charts/Altitude';
import SatelliteMap from './components/SatelliteMap';
import './App.css';

function App() {
  const [data, setData] = useState({
    temperature: [],
    pressure: [],
    tvoc: [],
    co2: [],
    altitude: [],
    position: { lat: 48.1486, lng: 17.1077 } // Bratislava
  });

  // Simulácia dát
  useEffect(() => {
    const intervals = [];
    
    const updateData = () => {
      const now = new Date();
      const time = now.toLocaleTimeString();
      
      setData(prev => ({
        temperature: [...prev.temperature.slice(-9), { time, value: +(20 + Math.random() * 10).toFixed(1) }],
        pressure: [...prev.pressure.slice(-9), { time, value: +(980 + Math.random() * 40).toFixed(1) }],
        tvoc: [...prev.tvoc.slice(-9), { time, value: +(Math.random() * 500).toFixed(1) }],
        co2: [...prev.co2.slice(-9), { time, value: +(400 + Math.random() * 600).toFixed(1) }],
        altitude: [...prev.altitude.slice(-9), { time, value: +(100 + Math.random() * 50).toFixed(1) }],
        position: prev.position
      }));
    };
    
    const updatePosition = () => {
      setData(prev => ({
        ...prev,
        position: {
          lat: +(prev.position.lat + (Math.random() * 0.01 - 0.005)).toFixed(6),
          lng: +(prev.position.lng + (Math.random() * 0.01 - 0.005)).toFixed(6)
        }
      }));
    };
    
    intervals.push(setInterval(updateData, 2000));
    intervals.push(setInterval(updatePosition, 5000));
    updateData();
    
    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="app-container">
      <Header />
      
      <div className="dashboard-grid">
        <div className="chart-card temperature">
          <Temperature data={data.temperature} />
        </div>
        
        <div className="chart-card pressure">
          <Pressure data={data.pressure} />
        </div>
        
        <div className="chart-card tvoc">
          <TVOC data={data.tvoc} />
        </div>
        
        <div className="chart-card co2">
          <CO2 data={data.co2} />
        </div>
        
        <div className="chart-card altitude">
          <Altitude data={data.altitude} />
        </div>
        
        <div className="map-card">
          <SatelliteMap position={data.position} />
        </div>
      </div>
    </div>
  );
}

export default App;