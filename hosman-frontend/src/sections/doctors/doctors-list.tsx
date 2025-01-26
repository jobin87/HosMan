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
import { useAppDispatch, useAppSelector } from "src/store";
import { useEffect } from "react";
import { requestAllDoctorsList } from "src/store/all-staff/allStaffThunk";
import { useNavigate } from "react-router-dom";
import { paths } from "src/routes/paths";

export default function DoctorList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const doctors =
    useAppSelector((state) => state.allstaff.doctorsList.data) || [];
  const role = useAppSelector((state) => state.app.auth.role);
  console.log(role)

  const handledoctoradding = () => {
    navigate(paths.dashboard.doctors.doctorform);
  };

  // Fetch doctors list on component mount
  useEffect(() => {
    const doctorData = {
      contactNumber: "",
      createdAt: "",
      doctorName: "",
      doctorRegId: "",
      experience: "",
      specialization: "",
      status: "",
    };
    dispatch(requestAllDoctorsList(doctorData));
  }, [dispatch]);

  console.log("Doctors List:", doctors);

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "row",
          },
          justifyContent: "space-between",
          zIndex: 1, // Ensure it's above other content
        }}
      >
        <Typography variant="h4" gutterBottom>
          Doctor List
        </Typography>
        {role && 
        <Box sx={{
          display:"flex",
          gap:1,
          mr:8
        }}>
        {role=="Manager"&&(
         <>
           <Button variant="contained" color="info" size="small"  onClick={handledoctoradding}>
           Add Doctor
         </Button>
          <Button variant="contained" color="error" size="small"  onClick={handledoctoradding}>
           Delete Doctor
         </Button>
         </>
         
        )}

        </Box>}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead
            sx={{
              position: "sticky",
              top: 0, // Makes the table head sticky
              backgroundColor: "white", // Optional: to ensure it's visible over content
              zIndex: 1, // Ensure table header is above the table body
            }}
          >
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Specialization</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {doctors.length > 0 ? (
              doctors.map((doctor: any) => (
                <TableRow key={doctor.doctorRegId}>
                  <TableCell>{doctor.doctorName}</TableCell>
                  <TableCell>{doctor.doctorRegId}</TableCell>
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
                <TableCell colSpan={4} align="center">
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
