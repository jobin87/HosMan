import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/store";
import { getReportList } from "src/store/report/reportThunk";
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
import axios from 'axios'; // Assuming you're using axios for API requests

export default function ReportDetailsView() {
  const { id } = useParams<{ id: string }>(); // Retrieve the category or report id from URL params
  const dispatch = useAppDispatch();

  // Fetching the report data from the Redux store
  const reportData = useAppSelector((state) => state.report.reportDetails.data || []);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility
  const [selectedReport, setSelectedReport] = useState<any>(null); // State to store selected report for assignment
  const [workerName, setWorkerName] = useState(""); // State for selected worker ID
  const [assignedWorker, setAssignedWorker] = useState<string | null>(null); // State to track assigned worker

  useEffect(() => {
    dispatch(getReportList({})).then(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <Typography>Loading reports...</Typography>;
  }

  // Loop through the grouped report data and find the specific category or report
  const selectedCategory = reportData.find((category: any) => category._id === id);
  const filteredReports = selectedCategory ? selectedCategory.reports : [];

  // Handle dialog open for a specific report
  const handleDialogOpen = (report: any) => {
    setSelectedReport(report); // Set the selected report
    setAssignedWorker(report.workerAssigned || null); // Set the current assigned worker if any
    setOpenDialog(true); // Open the dialog
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setOpenDialog(false); // Close the dialog
    setSelectedReport(null); // Clear selected report
    setWorkerName(""); // Clear worker selection
  };

  // Handle worker assignment (POST request)
  const assignWorkerToReport = async () => {
    try {
      // Sending POST request to backend
      const response = await axios.post('/api/reports/assign-worker', {
        reportId: selectedReport._id,
        workerName: workerName,
      });
      console.log("Worker assigned:", response.data);

      // Update assigned worker state to trigger button text change
      setAssignedWorker(workerName);

      // Optionally, update the Redux store or UI to reflect the assignment
      handleDialogClose(); // Close dialog after assignment
    } catch (error) {
      console.error("Error assigning worker:", error);
    }
  };

  return (
    <DashboardContent>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Reports for Category: {selectedCategory ? selectedCategory._id : "Unknown"}
      </Typography>

      {/* Display the reports for the selected category */}
      {filteredReports.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Seq. No</TableCell> {/* Display sequential number */}
                <TableCell>Description</TableCell>
                <TableCell>Room No</TableCell>
                <TableCell>Assign Worker</TableCell> {/* Button column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReports.map((report: any, index: number) => (
                <TableRow key={report._id}>
                  <TableCell>{index + 1}</TableCell> {/* Sequential ID starts from 1 */}
                  <TableCell>{report.description}</TableCell>
                  <TableCell>{report.roomNo}</TableCell>
                  <TableCell>
                    {/* Assign Worker Button */}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDialogOpen(report)}
                      disabled={!!assignedWorker} // Disable if worker is already assigned
                    >
                      {assignedWorker ? 'Assigned' : 'Assign'} {/* Change button text */}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No reports found for this category.</Typography>
      )}

      {/* Dialog for assigning worker */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Assign Worker</DialogTitle>
        <DialogContent>
          <Typography variant="body2">Assign a worker to the selected report</Typography>
          <FormControl fullWidth margin="dense">
            <InputLabel id="worker-select-label">Worker</InputLabel>
            <Select
              labelId="worker-select-label"
              value={workerName}
              onChange={(e) => setWorkerName(e.target.value)}
              label="Worker Name"
            >
              {/* Replace with your actual worker list */}
              <MenuItem value="worker1">Worker 1</MenuItem>
              <MenuItem value="worker2">Worker 2</MenuItem>
              <MenuItem value="worker3">Worker 3</MenuItem>
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
