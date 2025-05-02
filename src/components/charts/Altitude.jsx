import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Altitude = ({ data }) => {
  return (
    <div className="chart-container">
      <h3>Výška (m)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[50, 200]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#9966ff"
            strokeWidth={2}
            name="Výška"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Altitude;