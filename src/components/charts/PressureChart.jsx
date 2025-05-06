import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PressureChart = ({ data, isDemoMode }) => (
  <div className={`chart-card ${isDemoMode ? 'demo-mode' : ''}`}>
    <h3>Pressure (hPa) {isDemoMode && '(DEMO)'}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={[950, 1050]} />
        <Tooltip formatter={(value) => [`${value} hPa`, 'Pressure']} />
        <Legend />
        <Line type="monotone" dataKey="value" stroke={isDemoMode ? "#888" : "#36a2eb"} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default PressureChart;