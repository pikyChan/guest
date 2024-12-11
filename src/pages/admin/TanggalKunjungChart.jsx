import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TanggalKunjungChart = () => {
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

      const dateCount = guestBookData.reduce((acc, item) => {
        const date = new Date(item.tanggal_kunjungan).toLocaleDateString('en-CA');
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date]++;
        return acc;
      }, {});

      const formattedData = Object.entries(dateCount).map(([key, value]) => ({
        name: key,
        visits: value,
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
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        style={{ backgroundColor: 'white', padding: '10px', borderRadius: '8px' }} // White background for the chart container
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid stroke="#333333" strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ fill: '#000000' }}
          label={{ value: 'Date', position: 'insideBottomRight', offset: -5, fill: '#000000' }}
        />
        <YAxis
          tick={{ fill: '#000000' }}
          label={{ value: 'Visits', angle: -90, position: 'insideLeft', fill: '#000000' }}
        />
        <Tooltip
          contentStyle={{ backgroundColor: '#333333', borderColor: '#000000', color: '#FFFFFF' }}
          itemStyle={{ color: '#FFFFFF' }}
          labelStyle={{ color: '#FFFFFF' }}
        />
        <Legend wrapperStyle={{ color: '#000000' }} />
        <Line type="monotone" dataKey="visits" stroke="#000000" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TanggalKunjungChart;
