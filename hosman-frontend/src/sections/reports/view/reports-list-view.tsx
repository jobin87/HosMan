import { useEffect, useState } from "react";
import {
  Box,
  Typography,
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
import { useAppDispatch, useAppSelector } from "src/store";
import { getRoomRoles } from "src/store/roles/roleThunk";
import { getReportList } from "src/store/report/reportThunk";
import { setRolesDetails } from "src/store/roles/roleReducer";

export default function ReportListView() {
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
  const dispatch = useAppDispatch();

  const roomData = useAppSelector(
    (state) => state.role.roomRolesDetails.data || []
  );
  const reportData = useAppSelector(
    (state) => state.report.reportDetails.data || []
  );

  useEffect(() => {
    // Sequential API calls to ensure room roles are fetched first
    (async () => {
      await dispatch(getRoomRoles({}));
      dispatch(getReportList({}));
    })();

    // Clear role details on mount
    dispatch(setRolesDetails({}));
  }, [dispatch]);

  useEffect(() => {
    if (roomData.length) {
      console.log("roomdata:", roomData);
    }
  }, [roomData]);

  useEffect(() => {
    if (reportData.length) {
      console.log("reportdata:", reportData);
    }
  }, [reportData]);

  const filteredCategories = reportCategories.filter((category) =>
    category.name.toLowerCase().includes(searchCategory.toLowerCase())
  );

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
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                    textAlign: "center",
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
                Assign
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

      {/* Registered Rooms and Categories */}
      <Card sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Registered Rooms and Categories
        </Typography>
        {roomData.length > 0 ? (
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Room Number</TableCell>
                  <TableCell>Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roomData.map((room: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>{room.roomNo}</TableCell>
                    <TableCell>{room.category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        ) : (
          <Typography>No registered rooms found.</Typography>
        )}
      </Card>
    </DashboardContent>
  );
}
