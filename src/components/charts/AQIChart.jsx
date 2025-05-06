import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AQIChart = ({ data, isDemoMode }) => (
  <div className={`chart-card ${isDemoMode ? 'demo-mode' : ''}`}>
    <h3>Air Quality Index {isDemoMode && '(DEMO)'}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
        <Tooltip formatter={(value) => [`Level ${value}`, 'AQI']} />
        <Legend />
        <Line type="monotone" dataKey="value" stroke={isDemoMode ? "#888" : "#8884d8"} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default AQIChart;