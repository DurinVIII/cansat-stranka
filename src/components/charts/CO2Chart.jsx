import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CO2Chart = ({ data, isDemoMode }) => (
  <div className={`chart-card ${isDemoMode ? 'demo-mode' : ''}`}>
    <h3>CO₂ (ppm) {isDemoMode && '(DEMO)'}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={[400, 1000]} />
        <Tooltip formatter={(value) => [`${value} ppm`, 'CO₂']} />
        <Legend />
        <Line type="monotone" dataKey="value" stroke={isDemoMode ? "#888" : "#4bc0c0"} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default CO2Chart;