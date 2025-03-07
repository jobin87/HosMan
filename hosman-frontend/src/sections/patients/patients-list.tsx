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
import { io } from "socket.io-client";
import { paths } from "src/routes/paths";
import { useAppDispatch, useAppSelector } from "src/store";
import { requestGetPatient } from "src/store/patient/patientThunk";

// Sample data for patients

export default function PatientList() {
  const dispatch = useAppDispatch();
  const navigate= useNavigate()
  const { data ,loading } = useAppSelector((state) => state.patients.patientlist);
  const role = useAppSelector((state) => state.app.auth.role);

  const socket = io("https://hosman-backend-sdne.onrender.com/");

  useEffect(() => {
    if (!data || data.length === 0) {
      const params={} as any
      dispatch(requestGetPatient(params)); // ✅ Fetch only if data is missing
        socket.on("updateAppointments", () => {
          dispatch(requestGetPatient(params)); // ✅ Refresh appointment list when updated
        });
    
        return () => {
          socket.off("updateAppointments");
        };
    }
  }, [dispatch, data]); // ✅ Runs only when `data` is empty
  

  const handleAddPatientClick = () => {
    navigate(paths.dashboard.patients.patientForm); // Navigate to patient form page
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <Typography>
        Fetching patients... ⏳
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "row",
            sm: "row", // Keep row direction for sm and above devices
          },
          width: {
            xs: "85vw",
            lg: "auto",
          },
          justifyContent: "space-between",
          zIndex: 1,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Patients List
        </Typography>
        {role && (
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              mr: { xs: 0, lg: 8 },
              flexWrap: "wrap", // Allow buttons to wrap on smaller screens
              mb:.2
            }}
          >
            {role === "Manager" && (
              <>
                <Button sx={{mb:2}}
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={handleAddPatientClick}
                >
                  Add Patient
                </Button>
                
              </>
            )}
          </Box>
        )}
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
