import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TVOC = ({ data }) => {
  return (
    <div className="chart-container">
      <h3>TVOC (ppb)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[0, 500]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#ff9f40"
            strokeWidth={2}
            name="TVOC"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TVOC;