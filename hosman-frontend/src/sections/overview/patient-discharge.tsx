import { useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const currentYearData = [
  { date: "Jan", discharged: 60 },
  { date: "Feb", discharged: 95 },
];

const lastYearData = [
  { date: "Jan", discharged: 60 },
  { date: "Feb", discharged: 45 },
  { date: "Mar", discharged: 70 },
  { date: "Apr", discharged: 110 },
  { date: "May", discharged: 85 },
  { date: "Jun", discharged: 120 },
  { date: "Jul", discharged: 90 },
  { date: "Aug", discharged: 105 },
  { date: "Sep", discharged: 100 },
  { date: "Oct", discharged: 115 },
  { date: "Nov", discharged: 95 },
  { date: "Dec", discharged: 130 },
];

export const Patientsdischarge = () => {
  const [showPreviousYear, setShowPreviousYear] = useState(false);

  return (
    <Box sx={{ p: 2, textAlign: "center", mb:4 }}>
      {/* Title Updates Dynamically */}
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 5 }}>
        Discharged Patients ({showPreviousYear ? "Previous Year" : "Current Year"})
      </Typography>

      {/* Chart Container */}
      <ResponsiveContainer width="100%" height={180} >
        <LineChart data={showPreviousYear ? lastYearData : currentYearData}>
          <XAxis dataKey="date" stroke={showPreviousYear ? "#aaa" : "#8884d8"} />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Line 
            type="monotone" 
            dataKey="discharged" 
            stroke={showPreviousYear ? "#aaa" : "#8884d8"} 
            strokeWidth={2} 
            dot={{ r: 5 }} 
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Toggle Button */}
      <Button
        variant="contained"
        size="small"
        sx={{ mb: 2 }}
        onClick={() => setShowPreviousYear(!showPreviousYear)}
      >
        {showPreviousYear ? "Show Current Year" : "Show Previous Year"}
      </Button>
    </Box>
  );
};
