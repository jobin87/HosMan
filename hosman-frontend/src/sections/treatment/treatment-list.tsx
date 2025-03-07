import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "src/store";
import { useNavigate } from "react-router-dom";
import { paths } from "src/routes/paths";
import {
  deleteAllTreatments,
  deleteTreatmentById,
  requestGetTreatment,
} from "src/store/all-staff/allStaffThunk";
import { useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("https://hosman-backend-sdne.onrender.com/");

export default function TreatmentList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.allstaff.treatmentDetails) || [];
  const role = useAppSelector((state) => state.app.auth.role);
  const hasFetched = useRef(false);
  const params = {} as any;

  // ✅ Fetch Treatments Once (Prevents Infinite Requests)
  useEffect(() => {
    if (!hasFetched.current) {
      console.log("hasfetched",hasFetched)
      dispatch(requestGetTreatment(params))
        .finally(() => {
          hasFetched.current = true; // ✅ Mark as fetched AFTER fetching
        });
    }
  }, [dispatch]);

  // ✅ Listen for WebSocket updates
  useEffect(() => {
    const handleUpdate = () => {
      console.log("🔄 Treatment list updated via WebSocket!");
      if (data.length > 0) {
        dispatch(requestGetTreatment(params)); // ✅ Refresh only if treatments exist
      }
    };

    socket.on("updateTreatments", handleUpdate);
    return () => {
      socket.off("updateTreatments", handleUpdate); // ✅ Cleanup on unmount
    };
  }, [dispatch, data.length]);

  // ✅ Edit Treatment
  const handleEdit = (_id: string) => {
    const treatmentToEdit = data.find((item: any) => item._id === _id);
    if (treatmentToEdit) {
      navigate(paths.dashboard.Treatment.edit, { state: treatmentToEdit });
    }
  };

  // ✅ Add New Treatment
  const handleAdd = () => {
    navigate(paths.dashboard.Treatment.newTreatMents);
  };

  // ✅ Delete a Single Treatment
  const handleDelete = async (_id: string) => {
    if (!window.confirm("Are you sure you want to delete this treatment?")) return;
    try {
      await dispatch(deleteTreatmentById({ treatmentID: _id }));
      dispatch(requestGetTreatment(params)); // ✅ Fetch once after delete
    } catch (error) {
      console.error("Error deleting treatment:", error);
    }
  };

  // ✅ Delete All Treatments
  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete all treatments?")) return;
    try {
      await dispatch(deleteAllTreatments());
      dispatch(requestGetTreatment(params)); // ✅ Fetch after delete
    } catch (error) {
      console.error("Error deleting treatments:", error);
    }
  };

  // ✅ Show loading indicator ONLY while fetching
  if (loading && !hasFetched) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <Typography>Fetching treatments... ⏳</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", sm: "row" },
          justifyContent: "space-between",
          width: { xs: "85vw", lg: "auto" },
        }}
      >
        <Typography variant="h4" gutterBottom>
          Treatment List
        </Typography>
        {role === "Manager" && (
          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mb: 0.2 }}>
            <Button variant="contained" color="info" size="small" onClick={handleAdd}>
              Add
            </Button>
            <Button variant="contained" color="error" size="small" onClick={handleDeleteAll}>
              Delete All
            </Button>
          </Box>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{ maxHeight: 900, maxWidth: "auto" }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ height: "50px" }}>
                  <TableCell>ID</TableCell>
                  <TableCell>Treatment</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Specialization</TableCell>
                  <TableCell>Price</TableCell>
                  {role === "Manager" && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>

              <TableBody>
                {data && data.length > 0 ? (
                  data.map((treatment: any, index: number) => (
                    <TableRow key={index} sx={{ height: "10px" }}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{treatment.treatment}</TableCell>
                      <TableCell>{treatment.department}</TableCell>
                      <TableCell>{treatment.specialization}</TableCell>
                      <TableCell>{treatment.price}</TableCell>
                      {role === "Manager" && (
                        <TableCell>
                          <Box>
                            <IconButton onClick={() => handleEdit(treatment._id)} color="primary">
                              <Edit fontSize="small" />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(treatment._id)} color="error">
                              <Delete fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography>No treatments found.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
