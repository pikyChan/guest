import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GuestBookChart = () => {
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

      // Format data to count guests by purpose of visit
      const purposeCount = guestBookData.reduce((acc, item) => {
        const purpose = item.tujuan || 'Unknown';
        if (!acc[purpose]) {
          acc[purpose] = 0;
        }
        acc[purpose]++;
        return acc;
      }, {});

      // Convert to array format for the chart
      const formattedData = Object.entries(purposeCount).map(([key, value]) => ({
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
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#7DA4D6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GuestBookChart;
