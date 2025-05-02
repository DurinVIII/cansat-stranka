import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CO2 = ({ data }) => {
  return (
    <div className="chart-container">
      <h3>CO₂ (ppm)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[300, 1000]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4bc0c0"
            strokeWidth={2}
            name="CO₂"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CO2;