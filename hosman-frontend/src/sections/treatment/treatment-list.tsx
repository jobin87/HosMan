import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Box, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from 'src/store';
import { useNavigate } from 'react-router-dom';
import { paths } from 'src/routes/paths';
import { deleteAllTreatments, deleteTreatmentById, requestGetTreatment } from 'src/store/all-staff/allStaffThunk';
import { useEffect } from 'react';

// Sample data for hospital treatments

export default function TreatmentList() {
  const navigate= useNavigate()
  const dispatch = useAppDispatch()
  const treatmentData =useAppSelector((state) => state.allstaff.treatmentDetails.data) || [];
    const role = useAppSelector((state) => state.app.auth.role);
  
    const handleEdit = (_id: string) => {
      console.log("Editing treatment with ID:", _id);
    
      // Ensure treatmentData is an array and _id exists
      if (!Array.isArray(treatmentData)) {
        console.log("treatmentData is not an array:", treatmentData);
        return;
      }
    
      const treatmentToEdit = treatmentData.find((item: any) => item._id === _id);
    
      if (treatmentToEdit) {
        console.log("Found treatment to edit:", treatmentToEdit);
        
        navigate(paths.dashboard.Treatment.edit, {
          state: {
            treatmentId: treatmentToEdit._id,
            treatment: treatmentToEdit.treatment,
            department: treatmentToEdit.department,
            specialization: treatmentToEdit.specialization,
            price: treatmentToEdit.price,
          },
        });
      } else {
        console.log("Treatment not found for ID:", _id);
      }
    };
    
  const handleAdd = ()=>{
    navigate(paths.dashboard.Treatment.newTreatMents)
    // Add edit functionality here
  };

   useEffect(() => {
      const treatmentData = {
        treatment: "",
        department: "",
        specialization: "",
        price: 0,
        treatmentId:"",
      };
      dispatch(requestGetTreatment(treatmentData));
    }, [dispatch]);

    const handleDelete = async (_id: string) => {
      const isConfirmed = window.confirm("Are you sure you want to delete this treatment?");
      if (!isConfirmed) return; // Exit if the deletion is not confirmed
    
      try {
        await dispatch(deleteTreatmentById({ treatmentID: _id }));
        const treatmentData = { treatment: "", department: "", specialization: "", price: 0, treatmentId: "" };
        await dispatch(requestGetTreatment(treatmentData)); // Re-fetch after deletion
      } catch (error) {
        console.error("Error deleting treatment:", error);
      }
    };
    const handleDeleteAll = async () => {
      const isConfirmed = window.confirm("Are you sure you want to delete this treatment?");
      if (!isConfirmed) return; // Exit if the deletion is not confirmed
    
      try {
        await dispatch(deleteAllTreatments());
        await dispatch(requestGetTreatment(treatmentData)); // Re-fetch after deletion
      } catch (error) {
        console.error("Error deleting treatment:", error);
      }
    };
    
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
            }}
          >
            {role === "Manager" && (
              <>
                <Button variant="contained" color="info" size="small" onClick={handleAdd}>
                  Add
                </Button>
                <Button variant="contained" color="error" size="small" onClick={handleDeleteAll} >
                  Delete all
                </Button>
              </>
            )}
          </Box>
        )}
      </Box>
     

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Treatment</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Specialization</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {treatmentData.map((treatment:any,index:number) => (
                  <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{treatment.treatment}</TableCell>
                    <TableCell>{treatment.department}</TableCell>
                    <TableCell>{treatment.specialization}</TableCell>

                    <TableCell>{treatment.price}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(treatment._id)} color="primary">
                        
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(treatment._id)} color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
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
