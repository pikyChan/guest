import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const InstansiChart = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const fetchGuestBookData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/bukutamu", {
        //headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch guest book data");
      }

      const guestBookData = await response.json();

      // Count occurrences by "Asal Instansi"
      const instansiCount = guestBookData.reduce((acc, item) => {
        const instansi = item.asal_instansi || 'Unknown';
        if (!acc[instansi]) {
          acc[instansi] = 0;
        }
        acc[instansi]++;
        return acc;
      }, {});

      // Convert to array format for the chart
      const formattedData = Object.entries(instansiCount).map(([key, value]) => ({
        name: key,
        count: value,
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching guest book data:", error);
    }
  };

  useEffect(() => {
    fetchGuestBookData();
  }, []);

  return (
    <div style={{ width: '100%', height: 300, backgroundColor: 'none', padding: '10px', borderRadius: '8px' }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#FFFFFF" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#FFFFFF' }}
            label={{ value: '', position: 'insideBottomRight', offset: -5, fill: '#FFFFFF' }}
          />
          <YAxis 
            tick={{ fill: '#FFFFFF' }}
            label={{ value: 'Count', angle: -90, position: 'insideLeft', fill: '#FFFFFF' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#333333', borderColor: '#FFFFFF', color: '#FFFFFF' }}
            itemStyle={{ color: '#FFFFFF' }}
            labelStyle={{ color: '#FFFFFF' }}
          />
          <Area type="monotone" dataKey="count" stroke="#FFFFFF" fill="#FFFFFF" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InstansiChart;
