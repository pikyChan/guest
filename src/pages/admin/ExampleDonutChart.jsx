import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Label } from 'recharts';

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
        value: value,
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching guest book data:", error);
    }
  };

  useEffect(() => {
    fetchGuestBookData();
  }, []);

  // Define colors for the pie chart slices
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];

  return (
    <ResponsiveContainer width="" height={400}>
      <PieChart>
        <Tooltip />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="45%"
          cy="50%"
          outerRadius={110} // Increased outer radius for a larger donut
          innerRadius={80}  // Set inner radius for the donut effect
          fill="#8884d8"
          labelLine={false} // Disable label line for better positioning
          label={({ name, percent }) => `${name}: ${Math.round(percent * 100)}%` } // Custom label for outside
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          {/* Add a Label to show total count or any other info */}
          <Label value="Guest Book Data" position="center" fontSize={20} />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default GuestBookChart;
