import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import TemperatureChart from './components/charts/TemperatureChart';
import PressureChart from './components/charts/PressureChart';
import TVOCChart from './components/charts/TVOCChart';
import CO2Chart from './components/charts/CO2Chart';
import AltitudeChart from './components/charts/AltitudeChart';
import AQIChart from './components/charts/AQIChart';
import AltitudePressureChart from './components/charts/AltitudePressureChart';
import SatelliteMap from './components/SatelliteMap';
import './App.css';

function App() {
  const [sensorData, setSensorData] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({ lat: 48.1486, lng: 17.1077 });
  const [isOnline, setIsOnline] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [lastUpdateTime, setLastUpdateTime] = useState(null);

  const generateDemoData = useCallback(() => {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const randomFactor = Math.random();
    
    return {
      time,
      temperature: +(20 + randomFactor * 10).toFixed(1),
      pressure: +(980 + randomFactor * 40).toFixed(1),
      tvoc: +(randomFactor * 500).toFixed(1),
      co2: +(400 + randomFactor * 600).toFixed(1),
      altitude: +(100 + randomFactor * 50).toFixed(1),
      aqi: Math.floor(randomFactor * 5) + 1,
      altitudePressure: +(50 + randomFactor * 100).toFixed(1),
      position: {
        lat: currentPosition.lat + (randomFactor * 0.01 - 0.005),
        lng: currentPosition.lng + (randomFactor * 0.01 - 0.005)
      }
    };
  }, [currentPosition]);

  const checkOnlineStatus = useCallback(async () => {
    try {
      const response = await fetch('http://194.160.224.5:3000/online', {
        signal: AbortSignal.timeout(5000)
      });
      const status = await response.json();
      setIsOnline(status === true);
      return status === true;
    } catch (error) {
      console.error('Online check failed:', error);
      setIsOnline(false);
      return false;
    }
  }, []);

  const fetchLatestData = useCallback(async () => {
    try {
      const response = await fetch('http://194.160.224.5:3000/latest', {
        signal: AbortSignal.timeout(5000)
      });
      const data = await response.json();
      
      // Parse the message string
      const sensorValues = JSON.parse(data.message);
      
      const newDataPoint = {
        time: data.time,
        temperature: 0, // Not in your response
        pressure: sensorValues.PRESS / 100,
        tvoc: sensorValues.TVOC,
        co2: sensorValues.CO2,
        altitude: sensorValues.ALT,
        aqi: sensorValues.AQI,
        altitudePressure: sensorValues.ALT_P,
        position: {
          lat: sensorValues.LAT / 100,
          lng: sensorValues.LON / 100
        }
      };

      setCurrentPosition(newDataPoint.position);
      setSensorData(prev => [...prev.slice(-19), newDataPoint]);
      setLastUpdateTime(Date.now());
      setConnectionError(null);
    } catch (error) {
      console.error('Failed to fetch latest data:', error);
      setConnectionError('Failed to get latest data');
    }
  }, []);

  const fetchAllData = useCallback(async () => {
    try {
      const response = await fetch('http://194.160.224.5:3000/all', {
        signal: AbortSignal.timeout(5000)
      });
      const data = await response.json();
      
      // Process all data points
      const processedData = data.map(item => {
        const sensorValues = JSON.parse(item.message);
        return {
          time: item.time,
          temperature: 0,
          pressure: sensorValues.PRESS / 100,
          tvoc: sensorValues.TVOC,
          co2: sensorValues.CO2,
          altitude: sensorValues.ALT,
          aqi: sensorValues.AQI,
          altitudePressure: sensorValues.ALT_P,
          position: {
            lat: sensorValues.LAT / 100,
            lng: sensorValues.LON / 100
          }
        };
      });

      if (processedData.length > 0) {
        setCurrentPosition(processedData[processedData.length - 1].position);
      }
      setSensorData(processedData.slice(-20));
      setLastUpdateTime(Date.now());
      setConnectionError(null);
    } catch (error) {
      console.error('Failed to fetch all data:', error);
      setConnectionError('Failed to get historical data');
    }
  }, []);

  const updateData = useCallback(async () => {
    const online = await checkOnlineStatus();
    
    if (online) {
      try {
        if (sensorData.length === 0) {
          await fetchAllData();
        } else {
          await fetchLatestData();
        }
        setIsDemoMode(false);
      } catch (error) {
        console.error('Data update failed:', error);
        setIsDemoMode(true);
      }
    } else {
      setIsDemoMode(true);
      const demoData = generateDemoData();
      setCurrentPosition(demoData.position);
      setSensorData(prev => [...prev.slice(-19), demoData]);
      setLastUpdateTime(Date.now());
    }
  }, [sensorData.length, checkOnlineStatus, fetchAllData, fetchLatestData, generateDemoData]);

  useEffect(() => {
    // Initial data load
    updateData();
    
    // Setup intervals
    const onlineCheckInterval = setInterval(checkOnlineStatus, 10000); // Check online status every 10s
    const dataUpdateInterval = setInterval(updateData, 2000); // Update data every 2s
    
    return () => {
      clearInterval(onlineCheckInterval);
      clearInterval(dataUpdateInterval);
    };
  }, [updateData, checkOnlineStatus]);

  return (
    <div className="app-container">
      <Header isOnline={isOnline} isDemoMode={isDemoMode} lastUpdateTime={lastUpdateTime} />
      
      {connectionError && (
        <div className="connection-error">
          {connectionError} - {isDemoMode ? 'Using demo data' : 'Trying to reconnect...'}
        </div>
      )}
      
      <div className="charts-container">
        <div className="chart-row">
          <TemperatureChart data={sensorData.map(d => ({ time: d.time, value: d.temperature }))} />
          <PressureChart data={sensorData.map(d => ({ time: d.time, value: d.pressure }))} />
        </div>
        <div className="chart-row">
          <TVOCChart data={sensorData.map(d => ({ time: d.time, value: d.tvoc }))} />
          <CO2Chart data={sensorData.map(d => ({ time: d.time, value: d.co2 }))} />
        </div>
        <div className="chart-row">
          <AltitudeChart data={sensorData.map(d => ({ time: d.time, value: d.altitude }))} />
          <AQIChart data={sensorData.map(d => ({ time: d.time, value: d.aqi }))} />
        </div>
        <div className="chart-row">
          <AltitudePressureChart data={sensorData.map(d => ({ time: d.time, value: d.altitudePressure }))} />
        </div>
      </div>

      <div className="map-container">
        <SatelliteMap position={currentPosition} isDemoMode={isDemoMode} />
      </div>
    </div>
  );
}

export default App;