import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Box,
  Button,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "src/routes/paths";
import { useAppDispatch, useAppSelector } from "src/store";
import { requestGetPatient } from "src/store/patient/patientThunk";

// Sample data for patients

export default function PatientList() {
  const dispatch = useAppDispatch();
  const navigate= useNavigate()
  const { data } = useAppSelector((state) => state.patients.patientlist);

  useEffect(() => {
    dispatch(requestGetPatient(data));
    console.log("data:ss:", data);
  },[dispatch,data?.length]);

  const handleAddPatientClick = () => {
    navigate(paths.dashboard.patients.patientForm); // Navigate to patient form page
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          gap: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Patient List
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none" }}
          onClick={handleAddPatientClick}
        >
          Add Patient
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Disease</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data && Array.isArray(data) && data.length > 0 ? (
              data.map((patientList: any) => (
                <TableRow key={patientList.patientRegId}>
                  <TableCell>{patientList.patientRegId}</TableCell>
                  <TableCell>{patientList.patientName}</TableCell>
                  <TableCell>{patientList.age}</TableCell>
                  <TableCell>{patientList.disease}</TableCell>
                  <TableCell>{patientList.contactNumber}</TableCell>
                  <TableCell>
                    <Chip
                      label={patientList.status}
                      color={
                        patientList.status === "Active" ? "success" : "error"
                      }
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No patients found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
