import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Pressure = ({ data }) => {
  return (
    <div className="chart-container">
      <h3>Tlak (hPa)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[950, 1050]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#36a2eb"
            strokeWidth={2}
            name="Tlak"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Pressure;