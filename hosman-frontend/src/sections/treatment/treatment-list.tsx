import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Chip, IconButton, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

// Sample data for hospital treatments
const treatments = [
  { id: 1, treatment: 'Cardiac Surgery', department: 'Cardiology', specialization: 'Heart Surgery' , price: '$5000' },
  { id: 2, treatment: 'X-ray', department: 'Radiology', specialization: 'Diagnostic Imaging', price: '$150' },
  { id: 3, treatment: 'Dental Cleaning', department: 'Dentistry', specialization: 'Oral Care', price: '$120' },
  { id: 4, treatment: 'MRI Scan', department: 'Radiology', specialization: 'Diagnostic Imaging', price: '$700' },
  { id: 5, treatment: 'Eye Checkup', department: 'Ophthalmology', specialization: 'Vision Care', price: '$200' },
  { id: 6, treatment: 'CT Scan', department: 'Radiology', specialization: 'Diagnostic Imaging', price: '$600' },
  { id: 7, treatment: 'Physical Therapy', department: 'Rehabilitation', specialization: 'Musculoskeletal', price: '$250' },
  { id: 8, treatment: 'Vaccination', department: 'Immunology', specialization: 'Preventive Care',price: '$50' },
  { id: 9, treatment: 'Emergency Surgery', department: 'Surgery', specialization: 'Trauma Care', price: '$8000' },
  { id: 10, treatment: 'Blood Test', department: 'Pathology', specialization: 'Laboratory Testing', price: '$100' },
];

export default function TreatmentList() {
  const handleEdit = (id: number) => {
    console.log(`Editing treatment with ID: ${id}`);
    // Add edit functionality here
  };

  const handleDelete = (id: number) => {
    console.log(`Deleting treatment with ID: ${id}`);
    // Add delete functionality here
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Hospital Treatment List
      </Typography>

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
                {treatments.map((treatment) => (
                  <TableRow key={treatment.id}>
                    <TableCell>{treatment.id}</TableCell>
                    <TableCell>{treatment.treatment}</TableCell>
                    <TableCell>{treatment.department}</TableCell>
                    <TableCell>{treatment.specialization}</TableCell>

                    <TableCell>{treatment.price}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(treatment.id)} color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(treatment.id)} color="error">
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
