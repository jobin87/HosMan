import { useEffect } from "react";
import {
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
  Box,
  CircularProgress, // ✅ Loading indicator
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { paths } from "src/routes/paths";
import { DashboardContent } from "src/layouts/dashboard";
import { useAppDispatch, useAppSelector } from "src/store";
import { getReportList } from "src/store/report/reportThunk";
import { io } from "socket.io-client";

export default function ReportListView() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const socket = io("https://hosman-backend-sdne.onrender.com/");


  // ✅ Ensure data is initialized correctly
  const { data, loading } = useAppSelector(
    (state) => state.report.reportDetails
  ) || { data: [] };
  console.log("datederer", data);

  // ✅ Fetch only if data is missing
  useEffect(() => {
    if (!data || data.length === 0) {
      const params = {} as any;
      dispatch(getReportList(params));
        socket.on("updateAppointments", () => {
          dispatch(getReportList(params)); // ✅ Refresh appointment list when updated
        });
    
        return () => {
          socket.off("updateAppointments");
        };
    }
  }, [dispatch, data]);

  // ✅ Ensure data exists before accessing properties
  const assignedReports = (data ?? [])
    .flatMap((category: any) =>
      category.reports.filter((report: any) => report.isAssigned)
    )
    .sort(
      (a: any, b: any) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

  const unassignedCategories = (data ?? [])
    .map((category: any) => ({
      ...category,
      reports: category.reports
        .filter((report: any) => !report.isAssigned)
        .sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        ),
    }))
    .filter((category: any) => category.reports.length > 0);

  // ✅ Handle navigation
  const handleCategoryClick = (category: string) => {
    navigate(`${paths.dashboard.Reports.details.replace(":id", category)}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <Typography>
        Fetching reports... ⏳
        </Typography>
      </Box>
    );
  }

  return (
    <DashboardContent>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Total Reports:{" "}
        {(data && Array.isArray(data) ? data : []).reduce(
          (acc: any, category: any) => acc + (category.count || 0),
          0
        )}
      </Typography>

      {/* ✅ Show Unassigned Reports at the Top */}
      {unassignedCategories.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Unassigned Reports
          </Typography>
          <Grid container spacing={2}>
            {unassignedCategories.map((category: any, index: number) => (
              <Grid item xs={6} sm={6} md={3} lg={2.7} key={index}>
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
                      {category._id}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "gray", fontSize: "0.75rem" }}
                    >
                      {category.reports.length} Reports
                    </Typography>
                  </CardContent>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleCategoryClick(category._id)}
                    sx={{
                      fontSize: "0.75rem",
                      py: 0.5,
                      px: 1.5,
                      mt: 1,
                      width: "auto",
                      display: "block",
                      margin: "0 auto",
                      border: "2px solid gainsboro",
                      transition: "transform 0.2s ease-in",
                      "&:hover": {
                        transform: "scale(1.02)",
                        borderColor: "GrayText",
                      },
                    }}
                  >
                    View
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* ✅ Show Assigned Reports at the Bottom */}
      {assignedReports.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Assigned Reports
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Room No</TableCell>
                  <TableCell>Assigned Worker</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assignedReports.map((report: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{report.description}</TableCell>
                    <TableCell>{report.category}</TableCell>
                    <TableCell>{report.roomNo}</TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: "bold", color: "green" }}>
                        {report.assignedWorker}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </DashboardContent>
  );
}
