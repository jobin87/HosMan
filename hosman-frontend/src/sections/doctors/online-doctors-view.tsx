import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useUser } from "src/hooks/use-user";
import { useAppDispatch, useAppSelector } from "src/store";
import { requestgetSessions } from "src/store/app/appThunk";

export default function OnlineDoctorsList() {
  const dispatch = useAppDispatch();
  const { role } = useUser();
  const data = useAppSelector((state) => state.app.sessiondetails) || {};

  useEffect(() => {
    const params ={} as any;
    dispatch(requestgetSessions(params)); // Fetch sessions
  }, [dispatch]);

  const formatToIST = (utcTime: string) => {
    return new Date(utcTime).toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const sessions = Array.isArray(data) ? data : [];
  const doctors = sessions.filter((session: any) => session.role === "Doctor");
  const onlineDoctors = doctors.filter((doctor: any) => doctor.isActive);
  const offlineDoctors = doctors.filter((doctor: any) => !doctor.isActive);

  return (
    <Box sx={{ p: 2, width: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Doctors Online
      </Typography>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f4f6f8" }}>
              <TableCell sx={{ fontSize: "0.9rem", py: 2 }}>Name</TableCell>
              <TableCell sx={{ fontSize: "0.9rem", py: 2 }}>Specialized</TableCell>
              <TableCell sx={{ fontSize: "0.9rem", py: 2 }}>Status</TableCell>
              <TableCell sx={{ fontSize: "0.9rem", py: 2 }}>Connect</TableCell>
              {role === "Manager" && (
                <TableCell sx={{ fontSize: "0.9rem", py: 2, whiteSpace: "nowrap" }}>Login Time</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.length > 0 ? (
              [...onlineDoctors, ...offlineDoctors].map((doctor) => (
                <TableRow key={doctor.userId} sx={{ opacity: doctor.isActive ? 1 : 0.6 }}>
                  <TableCell sx={{ fontSize: "0.9rem", py: 2, color: doctor.isActive ? "inherit" : "#A0A0A0" }}>
                    {doctor.userName}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.9rem", py: 2, color: doctor.isActive ? "inherit" : "#A0A0A0" }}>
                    {doctor.specialization}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.9rem", py: 2, color: doctor.isActive ? "green" : "#A0A0A0" }}>
                    {doctor.isActive ? "Online" : "Offline"}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.9rem", py: 2, color: doctor.isActive ? "inherit" : "#A0A0A0" }}>
                    {"connect"}
                  </TableCell>
                  {role === "Manager" && (
                    <TableCell sx={{ fontSize: "0.9rem", py: 2, whiteSpace: "nowrap", color: doctor.isActive ? "inherit" : "#A0A0A0" }}>
                      {formatToIST(doctor.loginTime)}
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ fontSize: "0.9rem", py: 2 }}>
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
