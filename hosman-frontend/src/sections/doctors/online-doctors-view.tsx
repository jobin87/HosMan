import { Box } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useUser } from "src/hooks/use-user";
import { useAppDispatch, useAppSelector } from "src/store";
import { requestgetSessions } from "src/store/app/appThunk";

export default function OnlineDoctorsList() {
  const dispatch = useAppDispatch();
  const { role } = useUser();
  const data = useAppSelector((state) => state.app.sessiondetails) || {};

  useEffect(() => {
    const params = {} as any;
    dispatch(requestgetSessions(params)); // Fetch sessions
  }, [dispatch]);

  useEffect(() => {
    console.log("Session Data:", data);
  }, [data]); // Log when sessions update

  
  const formatToIST = (utcTime: string) => {
    return new Date(utcTime).toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Converts to 12-hour format with AM/PM
    });
  };

  const sessions = Array.isArray(data) ? data : [];
  const doctors = sessions.filter((session: any) => session.role === "Doctor");
  const onlineDoctors = doctors.filter((doctor: any) => doctor.isActive);
  const offlineDoctors = doctors.filter((doctor: any) => !doctor.isActive);

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h6" gutterBottom>
        Doctors Online
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "30vh", minHeight: "15vh", overflowY: "auto", mt: 2 }}    >
        <Table size="medium">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f4f6f8" }}>
              <TableCell sx={{ fontSize: "0.8rem", py: 0.5 }}>Name</TableCell>
              <TableCell sx={{ fontSize: "0.8rem", py: 0.5 }}>
                Specialized
              </TableCell>
              <TableCell sx={{ fontSize: "0.8rem", py: 0.5 }}>Status</TableCell>
              <TableCell sx={{ fontSize: "0.8rem", py: 0.5 }}>Connect</TableCell>

              {role == "Manager" && (
                <TableCell
                  sx={{ fontSize: "0.8rem", py: 0.5, whiteSpace: "nowrap" }}
                >
                  Login Time
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.length > 0 ? (
              [...onlineDoctors, ...offlineDoctors].map((doctor) => (
                <TableRow key={doctor.userId}>
                  <TableCell sx={{ fontSize: "0.75rem", py: 0.3 }}>
                    {doctor.userName}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", py: 0.3 }}>
                    {doctor.specialization}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", py: 0.3 }}>
                    {doctor.isActive ? "Online" : "Offline"}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", py: 0.3 }}>
                    {"connect"}
                  </TableCell>
                  {role == "Manager" && (
                    <TableCell
                      sx={{
                        fontSize: "0.75rem",
                        py: 0.3,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatToIST(doctor.loginTime)}
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{ fontSize: "0.75rem", py: 0.5 }}
                >
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
