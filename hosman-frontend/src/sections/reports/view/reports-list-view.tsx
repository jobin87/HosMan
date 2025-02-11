import { useState, useEffect } from "react";
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
import { getReportList } from "src/store/report/reportThunk";

export default function ReportListView() {
  const [searchCategory, setSearchCategory] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Fetching report data from the Redux store
  const reportData = useAppSelector((state) => state.report.reportDetails.data || []);

  // Fetch reports on component mount
  useEffect(() => {
    dispatch(getReportList({}));
  }, [dispatch]);

  // Filter reports based on search category
  const filteredCategories = reportData.filter((report: any) =>
    report._id.toLowerCase().includes(searchCategory.toLowerCase())
  );

  // Handle navigation to report details page
  const handleCategoryClick = (category: string) => {
    navigate(`${paths.dashboard.Reports.details.replace(":id", category)}`);
  };

  return (
    <DashboardContent>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Total Reports: {filteredCategories.reduce((acc:any, category:any) => acc + category.count, 0)}
      </Typography>

      {/* Category Grid with Count */}
      <Grid container spacing={2}>
        {filteredCategories.map((category: any, index: number) => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
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
                  {category._id}
                </Typography>
                <Typography variant="body2" sx={{ color: "gray", fontSize: "0.75rem" }}>
                  {category.count} Reports
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleCategoryClick(category._id)}
                sx={{
                  fontSize: "0.75rem",
                  py: 0.25,
                  px: 1,
                  marginTop: 1,
                  "&:hover": { backgroundColor: "skyblue" },
                }}
              >
                View Details
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DashboardContent>
  );
}
