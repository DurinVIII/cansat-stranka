import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Temperature = ({ data }) => {
  return (
    <div className="chart-container">
      <h3>Teplota (°C)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[15, 35]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#ff6384"
            strokeWidth={2}
            activeDot={{ r: 8 }}
            name="Teplota"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Temperature;