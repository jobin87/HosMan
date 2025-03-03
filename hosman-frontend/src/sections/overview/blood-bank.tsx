import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Sample Data for Monthly Blood Donations
const donationStats = [
  { month: "Jan", donations: 120 },
  { month: "Feb", donations: 150 },
  { month: "Mar", donations: 90 },
  { month: "Apr", donations: 170 },
  { month: "May", donations: 140 },
  { month: "Jun", donations: 160 },
  { month: "Jul", donations: 110 },
  { month: "Aug", donations: 130 },
  { month: "Sep", donations: 180 },
  { month: "Oct", donations: 190 },
  { month: "Nov", donations: 160 },
  { month: "Dec", donations: 200 },
];

// Blood Availability Data (Units Available)
const bloodAvailability = [
  { name: "A+", value: 120 },
  { name: "A-", value: 60 },
  { name: "B+", value: 100 },
  { name: "B-", value: 50 },
  { name: "O+", value: 140 },
  { name: "O-", value: 70 },
  { name: "AB+", value: 80 },
  { name: "AB-", value: 30 },
];

// Colors for Blood Groups (User-Interactive)
const BLOOD_COLORS: Record<string, string> = {
  "A+": "#D32F2F", // Dark Red
  "A-": "#F44336", // Bright Red
  "B+": "#1976D2", // Deep Blue
  "B-": "#2196F3", // Bright Blue
  "O+": "#388E3C", // Dark Green
  "O-": "#4CAF50", // Bright Green
  "AB+": "#7B1FA2", // Deep Purple
  "AB-": "#9C27B0", // Bright Purple
};


// Recent Blood Donations
const recentDonations = [
  { id: "BD001", donor: "John Doe", bloodType: "A+", date: "2025-02-20", units: 2 },
  { id: "BD002", donor: "Jane Smith", bloodType: "O-", date: "2025-02-19", units: 1 },
  { id: "BD003", donor: "Michael Johnson", bloodType: "B+", date: "2025-02-18", units: 3 },
  { id: "BD004", donor: "Emily Davis", bloodType: "AB-", date: "2025-02-17", units: 2 },
];

export default function BloodBankPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        🩸 Blood Bank Overview
      </Typography>

      {/* Blood Donation Summary */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center", bgcolor: "#FF9A6B" }}>
            <Typography variant="h6">Total Donations</Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>1,750</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center", bgcolor: "#69FFCF" }}>
            <Typography variant="h6">Available Blood Units</Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>730</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center", bgcolor: "#DBA78F" }}>
            <Typography variant="h6">Urgent Requests</Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>5</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Blood Donations Bar Chart */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          📊 Monthly Blood Donations
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={donationStats}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="donations" fill="#FF6666" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Recent Blood Donations Table */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          ⏳ Recent Blood Donations
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                <TableCell><b>Donation ID</b></TableCell>
                <TableCell><b>Donor</b></TableCell>
                <TableCell><b>Blood Type</b></TableCell>
                <TableCell><b>Date</b></TableCell>
                <TableCell><b>Units</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentDonations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>{donation.id}</TableCell>
                  <TableCell>{donation.donor}</TableCell>
                  <TableCell sx={{ color: BLOOD_COLORS[donation.bloodType], fontWeight: "bold" }}>
                    {donation.bloodType}
                  </TableCell>
                  <TableCell>{donation.date}</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {donation.units} Unit(s)
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Blood Availability Pie Chart */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          🩸 Current Blood Availability
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={bloodAvailability}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {bloodAvailability.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={BLOOD_COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
