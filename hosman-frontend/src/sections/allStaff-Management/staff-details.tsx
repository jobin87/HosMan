import { useParams } from "react-router-dom";
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
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "src/store";
import { useEffect, useState } from "react";
import { requestAllStaffList } from "src/store/all-staff/allStaffThunk";

export default function StaffDetailsPage() {
  const { id } = useParams<{ id: string }>(); // Extract staff type (Doctor/Nurse) from URL
  const dispatch = useAppDispatch();

  // Fetch all staff data
  useEffect(() => {
    dispatch(requestAllStaffList());
  }, [dispatch]);

  // Get staff data from Redux store
  const { data, loading } = useAppSelector((state) => state.allstaff.getStaffDetails) || {
    data: { Doctor: [], Nurse: [] },
  };

  // Determine which staff type to display
  const selectedStaff = id && data ? data[id] || [] : [];

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!selectedStaff || selectedStaff.length === 0) {
    return <Typography>No staff found for {id}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        {id} Details ({selectedStaff.length})
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Department</strong></TableCell>
              <TableCell><strong>Experience (Years)</strong></TableCell>
              <TableCell><strong>Contact Number</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedStaff.map((staff: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{staff.Name}</TableCell>
                <TableCell>{staff.department}</TableCell>
                <TableCell>{staff.experience}</TableCell>
                <TableCell>{staff.contactNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
