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
import { useEffect } from "react";
import { requestAllStaffList } from "src/store/all-staff/allStaffThunk";

export default function DepartmentDetailsPage() {
  const { id } = useParams<{ id: string }>(); // Staff type from URL
  const dispatch = useAppDispatch();

  // ✅ Fetch staff data grouped by staffType (Doctor, Nurse, etc.)
  const staffGroups: Record<string, any[]> = useAppSelector(
    (state) => state.allstaff.getStaffDetails?.data?.groupedStaff || {}
  );

  console.log("Staff Groups:", staffGroups); // Debugging log

  useEffect(() => {
    if (Object.keys(staffGroups).length === 0) {
      dispatch(requestAllStaffList());
    }
  }, [dispatch, staffGroups]);

  // ✅ Ensure staffType exists in staffGroups
  const selectedStaff = id ? staffGroups[id] || [] : [];

  if (selectedStaff.length === 0) {
    return <Typography>No staff members found for {id}.</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
      {id} Staff ({selectedStaff.length})
    </Typography>

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>#</strong></TableCell> 
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Department</strong></TableCell>
            <TableCell><strong>Experience</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedStaff.map((staff: any, index: number) => (
            <TableRow key={staff._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{staff.Name}</TableCell>
              <TableCell>{staff.department}</TableCell>
              <TableCell>{staff.experience} years</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
  );
}
