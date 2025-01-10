import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Chip, Box } from '@mui/material';

// Sample data for patients
const patients = [
  { id: 1, name: 'Alice Williams', age: 45, disease: 'Diabetes', contact: '123-456-7890', status: 'Active' },
  { id: 2, name: 'Bob Johnson', age: 67, disease: 'Hypertension', contact: '234-567-8901', status: 'Inactive' },
  { id: 3, name: 'Charlie Smith', age: 33, disease: 'Asthma', contact: '345-678-9012', status: 'Active' },
  { id: 4, name: 'Diana Brown', age: 50, disease: 'Arthritis', contact: '456-789-0123', status: 'Inactive' },
  { id: 5, name: 'Eva Davis', age: 27, disease: 'COVID-19', contact: '567-890-1234', status: 'Active' },
  { id: 6, name: 'Frank Miller', age: 60, disease: 'Cancer', contact: '678-901-2345', status: 'Inactive' },
  { id: 7, name: 'Grace Moore', age: 40, disease: 'Heart Disease', contact: '789-012-3456', status: 'Active' },
  { id: 8, name: 'Hank Taylor', age: 55, disease: 'Kidney Failure', contact: '890-123-4567', status: 'Inactive' },
  { id: 9, name: 'Ivy Anderson', age: 65, disease: 'Alzheimer\'s', contact: '901-234-5678', status: 'Active' },
  { id: 10, name: 'Jack Wilson', age: 72, disease: 'Stroke', contact: '012-345-6789', status: 'Inactive' },
];

export default function PatientList() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Patient List
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Disease</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.id}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.disease}</TableCell>
                <TableCell>{patient.contact}</TableCell>
                <TableCell>
                  <Chip
                    label={patient.status}
                    color={patient.status === 'Active' ? 'success' : 'error'}
                    variant="outlined"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
