import { Box,Typography } from "@mui/material";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// Sample Data for Appointments
const appointmentStats = [
  { month: "Jan", appointments: 50 },
  { month: "Feb", appointments: 80 },
  { month: "Mar", appointments: 70 },
  { month: "Apr", appointments: 100 },
  { month: "May", appointments: 60 },
  { month: "Jun", appointments: 90 },
  { month: "Jul", appointments: 110 },
  { month: "Aug", appointments: 85 },
  { month: "Sep", appointments: 95 },
  { month: "Oct", appointments: 120 },
  { month: "Nov", appointments: 105 },
  { month: "Dec", appointments: 130 },
];
const LastyearAppointmentState=[
    { month: "Jan", appointments:  30},
  { month: "Feb", appointments:29  },
  { month: "Mar", appointments: 3 },
  { month: "Apr", appointments:  78},
  { month: "May", appointments: 23 },
  { month: "Jun", appointments: 98 },
  { month: "Jul", appointments: 34 },
  { month: "Aug", appointments:2  },
  { month: "Sep", appointments:12  },
  { month: "Oct", appointments:  35},
  { month: "Nov", appointments: 89 },
  { month: "Dec", appointments: 80 },

]


export default function AppointmentsChartPage() {
      const [showPreviousYear] = useState(false);
    
  return (
    <Box >

      <Box >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Monthly Appointments
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={showPreviousYear ? LastyearAppointmentState : appointmentStats}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="appointments" fill="#8884d8" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </Box>


    </Box>
  );
}
