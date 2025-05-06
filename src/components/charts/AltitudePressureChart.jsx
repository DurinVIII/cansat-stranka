import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AltitudePressureChart = ({ data, isDemoMode }) => (
  <div className={`chart-card ${isDemoMode ? 'demo-mode' : ''}`}>
    <h3>Altitude from Pressure (m) {isDemoMode && '(DEMO)'}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={[0, 150]} />
        <Tooltip formatter={(value) => [`${value} m`, 'Altitude (P)']} />
        <Legend />
        <Line type="monotone" dataKey="value" stroke={isDemoMode ? "#888" : "#ff7300"} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default AltitudePressureChart;