import { Box, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";

// Sample Data for Leave Requests by Department
const departmentLeaveStats = [
  { department: "Cardiology", requests: 15 },
  { department: "Surgery", requests: 20 },
  { department: "Emergency", requests: 10 },
  { department: "Pediatrics", requests: 8 },
  { department: "Radiology", requests: 12 },
  { department: "Neurology", requests: 18 },
];

// Sample Data for Leave Status Breakdown
const leaveStatusData = [
  { name: "Approved", value: 50 },
  { name: "Pending", value: 20 },
  { name: "Rejected", value: 10 },
];

// Colors for Pie Chart
const COLORS = ["#66B3FF", "#FFD966", "#FF6666"];

// Sample Data for Recent Leave Requests
const recentLeaveRequests = [
  { id: "L001", staff: "Dr. John Doe", department: "Cardiology", date: "2025-02-20", status: "Pending" },
  { id: "L002", staff: "Nurse Jane Smith", department: "Emergency", date: "2025-02-19", status: "Approved" },
  { id: "L003", staff: "Dr. Michael Johnson", department: "Neurology", date: "2025-02-18", status: "Rejected" },
  { id: "L004", staff: "Technician Emily Davis", department: "Radiology", date: "2025-02-17", status: "Pending" },
];

export default function StaffLeavePage() {
  return (
    <Box sx={{ p: 3 }}>
      {/* Recent Leave Requests Table */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Recent Leave Requests
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                <TableCell><b>Request ID</b></TableCell>
                <TableCell><b>Staff</b></TableCell>
                <TableCell><b>Department</b></TableCell>
                <TableCell><b>Date</b></TableCell>
                <TableCell><b>Status</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentLeaveRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{request.staff}</TableCell>
                  <TableCell>{request.department}</TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color:
                          request.status === "Approved"
                            ? "green"
                            : request.status === "Pending"
                            ? "orange"
                            : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {request.status}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
