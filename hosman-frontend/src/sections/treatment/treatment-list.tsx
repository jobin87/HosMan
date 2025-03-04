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
import { useEffect } from "react";

// Sample data for hospital treatments

export default function TreatmentList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {data ,loading} =
    useAppSelector((state) => state.allstaff.treatmentDetails) || [];
  const role = useAppSelector((state) => state.app.auth.role);


  const handleEdit = (_id: string) => {
    console.log("Editing treatment with ID:", _id);
  
    if (!Array.isArray(data)) {
      console.log("data is not an array:", data);
      return;
    }
  
    const treatmentToEdit = data.find((item: any) => item._id === _id);
  
    if (treatmentToEdit) {
      console.log("Found treatment to edit:", treatmentToEdit);
      
      // Pass the treatment data to the edit page using navigate state
      navigate(paths.dashboard.Treatment.edit, { state: treatmentToEdit });
    } else {
      console.log("Treatment not found for ID:", _id);
    }
  };
  
  const handleAdd = () => {
    navigate(paths.dashboard.Treatment.newTreatMents);
    // Add edit functionality here
  };

  useEffect(() => {
    if (!data || data.length === 0) {
      const params = {} as any
      dispatch(requestGetTreatment(params)); // ✅ Fetch only if missing
    }
  }, [dispatch, data]);

  const handleDelete = async (_id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this treatment?"
    );
    if (!isConfirmed) return; // Exit if the deletion is not confirmed

    try {
      await dispatch(deleteTreatmentById({ treatmentID: _id }));
      const params = {} as any;
      await dispatch(requestGetTreatment(params)); // Re-fetch after deletion
    } catch (error) {
      console.error("Error deleting treatment:", error);
    }
  };
  const handleDeleteAll = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this treatment?"
    );
    if (!isConfirmed) return; // Exit if the deletion is not confirmed

    try {
      await dispatch(deleteAllTreatments());
      await dispatch(requestGetTreatment(data)); // Re-fetch after deletion
    } catch (error) {
      console.error("Error deleting treatment:", error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <Typography>
        Fetching treatments... ⏳
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
          Treatment List
        </Typography>
        {role && (
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              mr: { xs: 0, lg: 8 },
              flexWrap: "wrap", // Allow buttons to wrap on smaller screens
              mb: 0.2,
            }}
          >
            {role === "Manager" && (
              <>
                <Button
                  sx={{ mb: 2 }}
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={handleAdd}
                >
                  Add
                </Button>
                <Button
                  sx={{ mb: 2 }}
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={handleDeleteAll}
                >
                  Delete all
                </Button>
              </>
            )}
          </Box>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{ maxHeight: 900, maxWidth:"auto" }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ height: "50px", }}>
                  <TableCell sx={{ py: 0.5 }}>ID</TableCell>
                  <TableCell sx={{ py: 0.5 }}>Treatment</TableCell>
                  <TableCell sx={{ py: 0.5 }}>Department</TableCell>
                  <TableCell sx={{ py: 0.5 }}>Specialization</TableCell>
                  <TableCell sx={{ py: 0.5 }}>Price</TableCell>
                  {role== "Manager"&&(
                    
                  <TableCell sx={{ py: 0.5 }}>Actions</TableCell>
                  )}

                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((treatment: any, index: number) => (
                  <TableRow key={index} sx={{ height: "10px" }}>
                    <TableCell sx={{ py: {
                      xs:0.2,lg:1.3
                    } }}>{index + 1}</TableCell>
                    <TableCell sx={{ py: {
                      xs:0.2,lg:1.3
                    } }}>
                      {treatment.treatment}
                    </TableCell>
                    <TableCell sx={{ py: {
                      xs:0.2,lg:1.3
                    } }}>
                      {treatment.department}
                    </TableCell>
                    <TableCell sx={{ py: {
                      xs:0.2,lg:1.3
                    } }}>
                      {treatment.specialization}
                    </TableCell>
                    <TableCell sx={{ py: {
                      xs:0.2,lg:1.3
                    } }}>{treatment.price}</TableCell>
                    {role== "Manager" && (
                      <TableCell sx={{ py: {
                        xs:0.2,lg:1.3
                      } }}>
                      <Box>
                        <IconButton
                          onClick={() => handleEdit(treatment._id)}
                          color="primary"
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(treatment._id)}
                          color="error"
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>

                    )}
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
