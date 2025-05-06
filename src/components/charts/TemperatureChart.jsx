import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TemperatureChart = ({ data, isDemoMode }) => (
  <div className={`chart-card ${isDemoMode ? 'demo-mode' : ''}`}>
    <h3>Temperature (°C) {isDemoMode && '(DEMO)'}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={[15, 35]} />
        <Tooltip formatter={(value) => [`${value} °C`, 'Temperature']} />
        <Legend />
        <Line type="monotone" dataKey="value" stroke={isDemoMode ? "#888" : "#ff6384"} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default TemperatureChart;