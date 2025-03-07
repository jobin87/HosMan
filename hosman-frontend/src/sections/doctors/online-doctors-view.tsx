import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useEffect } from "react";
import { useUser } from "src/hooks/use-user";
import { io } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "src/store";
import { requestgetSessions } from "src/store/app/appThunk";

export default function OnlineDoctorsList() {
  const socket = io("https://hosman-backend-sdne.onrender.com/");
  const dispatch = useAppDispatch();
  const { role } = useUser();
  const { data} =
    useAppSelector((state) => state.app.sessiondetails) || {};
  console.log("fsrtehdataatsgs:", data);

  useEffect(() => {
      const params = {} as any;
      dispatch(requestgetSessions(params));
      socket.on("updateSessions", () => {
        console.log("Received session update from backend...");
        dispatch(requestgetSessions(params)); // 🔄 Refresh session list
      });
  
      return () => {
        socket.off("updateSessions"); // ✅ Cleanup on unmount
      };
  }, [dispatch, data?.length]); 

  const formatToIST = (utcTime: string) => {
    return new Date(utcTime).toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const sessions = Array.isArray(data) ? data : [];
  const { id: loggedInUserId } = useUser(); // ✅ Get logged-in user ID
  const doctors = (sessions || []).filter((doctor: any) => doctor.userId !== loggedInUserId);
    const onlineDoctors = doctors?.filter((doctor: any) => doctor.isActive) || [];
  const offlineDoctors = doctors?.filter((doctor: any) => !doctor.isActive) || [];
  

  return (
    <Box sx={{ p: 2, width: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Doctors Online
      </Typography>
    { (
        <>
          <TableContainer component={Paper} sx={{ width: "100%" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f4f6f8" }}>
                  <TableCell sx={{ fontSize: "0.9rem", py: 2 }}>Name</TableCell>
                  <TableCell sx={{ fontSize: "0.9rem", py: 2 }}>
                    department
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.9rem", py: 2 }}>
                    Specialized
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.9rem", py: 2 }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.9rem", py: 2 }}>
                    Connect
                  </TableCell>
                  {role === "Manager" && (
                    <TableCell
                      sx={{ fontSize: "0.9rem", py: 2, whiteSpace: "nowrap" }}
                    >
                      Login Time
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {doctors.length > 0 ? (
                  [...onlineDoctors, ...offlineDoctors].map((doctor) => (
                    <TableRow
                      key={doctor.userId}
                      sx={{ opacity: doctor.isActive ? 1 : 0.6 }}
                    >
                      <TableCell
                        sx={{
                          fontSize: "0.9rem",
                          py: 2,
                          color: doctor.isActive ? "inherit" : "#A0A0A0",
                        }}
                      >
                        {doctor.userName}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.9rem",
                          py: 2,
                          color: doctor.isActive ? "inherit" : "#A0A0A0",
                        }}
                      >
                        {doctor.department}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.9rem",
                          py: 2,
                          color: doctor.isActive ? "inherit" : "#A0A0A0",
                        }}
                      >
                        {doctor.specialization}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.9rem",
                          py: 2,
                          color: doctor.isActive ? "blue" : "#A0A0A0",
                        }}
                      >
                        {doctor.isActive ? "Online" : "Offline"}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.9rem",
                          py: 2,
                          color: doctor.isActive ? "inherit" : "#A0A0A0",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                            bgcolor: doctor.isActive ? "primary.main" : "gray",
                            color: "white",
                            "&:hover": {
                              bgcolor: doctor.isActive
                                ? "primary.dark"
                                : "gray",
                            },
                          }}
                          disabled={!doctor.isActive} // Disable button if doctor is inactive
                        >
                          Connect
                        </Button>
                      </TableCell>

                      {role === "Manager" && (
                        <TableCell
                          sx={{
                            fontSize: "0.9rem",
                            py: 2,
                            whiteSpace: "nowrap",
                            color: doctor.isActive ? "inherit" : "#A0A0A0",
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
                      sx={{ fontSize: "0.9rem", py: 2 }}
                    >
                      No doctors found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
}
