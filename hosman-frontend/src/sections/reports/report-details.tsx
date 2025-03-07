import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/store";
import {
  createAssigningReports,
  getReportList,
} from "src/store/report/reportThunk";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DashboardContent } from "src/layouts/dashboard";
import { requestAllStaffList } from "src/store/all-staff/allStaffThunk";
import { paths } from "src/routes/paths";

export default function ReportDetailsView() {
  const { id } = useParams<{ id: string }>(); // Get category ID from URL
  const dispatch = useAppDispatch();

  const reportData = useAppSelector(
    (state) => state.report.reportDetails.data || []
  );
  const staffGroups = useAppSelector(
    (state) => state.allstaff.getStaffDetails?.data?.groupedStaff || {}
  );

  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [workerName, setWorkerName] = useState("");
  const navigate = useNavigate()

  // ✅ Fetch reports and staff details on component mount
  useEffect(() => {
    dispatch(getReportList({})).then(() => setLoading(false));
    dispatch(requestAllStaffList());
  }, [dispatch]);

  if (loading) {
    return <Typography>Loading reports...</Typography>;
  }

  // ✅ Find the selected category by ID
  const selectedCategory = reportData.find(
    (category: any) => category._id === id
  );

  // ✅ Extract reports from the selected category
  const filteredReports = selectedCategory ? selectedCategory.reports : [];

  console.log("Selected Category Reports:", filteredReports);

  // ✅ Open Dialog to Assign Worker
  const handleDialogOpen = (report: any) => {
    setSelectedReport(report);
    setWorkerName(report.workerAssigned || ""); // Default to assigned worker if exists
    setOpenDialog(true);
    console.log("Selected Report:", report);
  };

  // ✅ Close Dialog
  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedReport(null);
  };

  // ✅ Assign Worker to Report
  const assignWorkerToReport = async () => {
    if (!selectedReport || !workerName) {
      console.error(
        "Missing report or worker name:",
        selectedReport,
        workerName
      );
      return;
    }

    try {
      const response = await dispatch(
        createAssigningReports({
          reportId: selectedReport._id, // ✅ Ensure _id is sent!
          assignedWorker: workerName,
        })
      );

      if (response.meta.requestStatus === "fulfilled") {
        navigate(paths.dashboard.Reports.root)
        console.log("✅ Worker assigned successfully:", selectedReport._id);

        // ✅ Update the UI immediately
        setSelectedReport((prev:any) =>
          prev ? { ...prev, workerAssigned: workerName } : prev
        );

        // ✅ Update the state to reflect the assigned worker in reports
        const updatedReports = filteredReports.map((report:any) =>
          report._id === selectedReport._id
            ? { ...report, workerAssigned: workerName }
            : report
        );

        // ✅ Refresh report list after assignment
        dispatch(getReportList({}));

        console.log("Updated Reports List:", updatedReports);
      } else {
        console.error("❌ Assignment failed:", response);
      }

      setOpenDialog(false);
    } catch (error) {
      console.error("❌ Error assigning worker:", error);
    }
  };

  return (
    <DashboardContent>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Reports for Category:{" "}
        {selectedCategory ? selectedCategory._id : "Unknown"}
      </Typography>

      {/* ✅ Display Reports Table */}
      {filteredReports.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Seq. No</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Room No</TableCell>
                <TableCell>Assign Worker</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReports.map((report: any, index: number) => (
                <TableRow key={report._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{report.description}</TableCell>
                  <TableCell>{report.roomNo}</TableCell>
                  <TableCell>
                    {report.isAssigned ? ( // ✅ Check if `isAssigned` is true
                      <Typography sx={{ fontWeight: "bold", color: "green" }}>
                        Assigned
                      </Typography>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleDialogOpen(report)}
                      >
                        Assign
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No reports found for this category.</Typography>
      )}

      {/* ✅ Assign Worker Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Assign Worker</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Assign a worker to the selected report
          </Typography>
          <FormControl fullWidth margin="dense">
            <InputLabel id="worker-select-label">Worker</InputLabel>
            <Select
              labelId="worker-select-label"
              value={workerName}
              onChange={(e) => setWorkerName(e.target.value)}
              label="Worker Name"
            >
              {staffGroups &&
                Object.entries(staffGroups).flatMap(([_, staffList]) =>
                  (staffList as { _id: string; Name: string }[]).map(
                    (worker) => (
                      <MenuItem key={worker._id} value={worker.Name}>
                        {worker.Name}
                      </MenuItem>
                    )
                  )
                )}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={assignWorkerToReport} color="primary">
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
