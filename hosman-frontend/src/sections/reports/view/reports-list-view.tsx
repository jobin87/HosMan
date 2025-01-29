import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { paths } from "src/routes/paths";
import { DashboardContent } from "src/layouts/dashboard";

export default function ReportListView() {
  // Static data for the categories and latest assigned reports
  const reportCategories = [
    { id: 1, name: "Room Maintenance", reportCount: 5 },
    { id: 2, name: "Lab Equipment Issues", reportCount: 3 },
    { id: 3, name: "Inventory Needs", reportCount: 8 },
    { id: 4, name: "Patient Needs", reportCount: 2 },
    { id: 5, name: "Staff Shortages", reportCount: 4 },
  ];

  const latestReports = [
    {
      id: 101,
      title: "Broken Lab Equipment",
      category: "Lab Equipment Issues",
      status: "started",
    },
    {
      id: 102,
      title: "Inventory Restock Needed",
      category: "Inventory Needs",
      status: "Pending",
    },
    {
      id: 103,
      title: "Staff Request for Shift Change",
      category: "Staff Shortages",
      status: "completed",
    },
  ];

  const [searchCategory, setSearchCategory] = useState("");
  const navigate = useNavigate();

  // Filter categories based on search input
  const filteredCategories = reportCategories.filter((category) =>
    category.name.toLowerCase().includes(searchCategory.toLowerCase())
  );

  // Navigate to detailed category view
  const handleCategoryClick = (id: number) => {
    navigate(`${paths.dashboard.Reports.details.replace(":id", String(id))}`);
  };

  return (
    <DashboardContent>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Total Reports: {filteredCategories.length}
      </Typography>

      {/* Category Grid */}
      <Grid container spacing={2}>
        {filteredCategories.map((category) => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={category.id}>
            <Card
              sx={{
                textAlign: "center",
                height: 120,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 1,
              }}
            >
              <CardContent sx={{ pb: 0 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "0.875rem",
                    whiteSpace: "nowrap", // Prevent the text from wrapping to the next line
                    overflow: "hidden", // Hide the overflowing text
                    textOverflow: "ellipsis", // Display ellipsis for overflowing text
                    maxWidth: "100%", // Ensure it doesn't overflow horizontally
                    textAlign: "center", // Align text in the center
                  }}
                >
                  {category.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "gray", fontSize: "0.75rem" }}
                >
                  {category.reportCount} Reports
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleCategoryClick(category.id)}
                sx={{
                  fontSize: "0.75rem",
                  py: 0.25,
                  px: 1,
                  marginTop: 1,
                  "&:hover": { backgroundColor: "skyblue" },
                }}
              >
                View
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Latest Assigned Reports Table */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Latest Assigned Reports
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {latestReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.id}</TableCell>
                <TableCell>{report.title}</TableCell>
                <TableCell>{report.category}</TableCell>
                <TableCell>{report.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardContent>
  );
}
