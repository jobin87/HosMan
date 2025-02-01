import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppSelector } from "src/store";
import { getReportList } from "src/store/report/reportThunk";
import { z  as zod} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


export type newReportSchemaType = Zod.infer<typeof newReportSchema>;

export const newReportSchema = zod.object({
  description: zod.string().min(1, { message: "Description is required" }),
  status: zod.string().min(1, { message: "Status is required" }),
  category: zod.string().min(1, { message: "Category is required" }),
  priority: zod.string().min(1, { message: "Priority is required" }),

});

export default function ReportDetailsPage() {
  const { reportId } = useParams<{ reportId: string }>();
  const [loading, setLoading] = useState(false);
  const [updatedReports, setUpdatedReports] = useState<any[]>([]);
  const [selectedReportIndex, setSelectedReportIndex] = useState<number | null>(null);

  const assigneeOptions = ["John Doe", "Jane Smith", "Mike Johnson", "Anna Lee", "Emily Davis"];

  const { data } = useAppSelector((state) => state.report.details); // Fetching from Redux store
  console.log("Fetched Reportdetailspage Data: ", data);

  const defaultValues ={
    description: "",
    status: "",
    category: "",
    priority: "",

  }

    const methods = useForm<newReportSchemaType>({
      mode: "onSubmit",
      resolver: zodResolver(newReportSchema),
      defaultValues,
    });

    const {
      handleSubmit,
      formState: { isSubmitting, errors },
      setValue,
      watch,
    } = methods;
    console.log(errors)
    
  // Fetch report details based on the category (id)
  useEffect(() => {

      getReportList(data)
      console.log("reportgetted:", getReportList)
  
  }, [reportId]);



  const handleAssignClick = (index: number) => {
    setSelectedReportIndex(index);
  };

  const handleAssigneeSelection = (assignee: string) => {
    if (selectedReportIndex !== null) {
      const updated = [...updatedReports]; // Create a new array to avoid direct mutation
      updated[selectedReportIndex] = {
        ...updated[selectedReportIndex], // Spread the existing report
        assignedTo: assignee, // Update the assignee
        status: "Assigned", // Set the status to "Assigned"
      };
      setUpdatedReports(updated);
      setSelectedReportIndex(null);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Report Details - Category: {reportId}
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Assigned To</strong></TableCell>
                <TableCell><strong>Priority</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {updatedReports.length > 0 ? (
                updatedReports.map((report, index) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.description}</TableCell>
                    <TableCell>{report.status}</TableCell>
                    <TableCell>
                      {report.assignedTo || (
                        <Button variant="outlined" onClick={() => handleAssignClick(index)}>
                          Assign
                        </Button>
                      )}
                      {report.assignedTo}
                    </TableCell>
                    <TableCell>{report.priority}</TableCell>
                    <TableCell>{report.date}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography>No reports found for this category.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="contained">
          Submit Assignments
        </Button>
      </Box>

      {/* Dialog for Assignee Selection */}
      <Dialog open={selectedReportIndex !== null} onClose={() => setSelectedReportIndex(null)}>
        <DialogTitle>Select Assignee</DialogTitle>
        <DialogContent>
          {assigneeOptions.map((assignee) => (
            <Button
              key={assignee}
              fullWidth
              sx={{ my: 1 }}
              onClick={() => handleAssigneeSelection(assignee)}
            >
              {assignee}
            </Button>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedReportIndex(null)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
