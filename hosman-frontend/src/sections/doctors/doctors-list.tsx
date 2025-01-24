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
import { useAppSelector } from "src/store";


import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { requestAllDoctorsList } from "src/store/all-staff/allStaffThunk";


export default function DoctorList() {
  const dispatch = useDispatch();
  const doctors = useAppSelector((state) => state.allstaff.doctorsList.data) || [];
  

  // Fetch doctors list on component mount
  useEffect(() => {
    dispatch(requestAllDoctorsList());
  }, [dispatch]);

  console.log("Doctors List:", doctors);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Doctor List</Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ textTransform: "none" }}
      >
        Add Doctor
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Specialization</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {doctors.length >= 0 ? (
              doctors.map((doctor: any) => (
                <TableRow key={doctor.doctorRegId}>
                  <TableCell>{doctor.doctorRegId}</TableCell>
                  <TableCell>{doctor.doctorName}</TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>
                    <Chip
                      label={doctor.status}
                      color={doctor.status === "Active" ? "success" : "error"}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No doctors found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
