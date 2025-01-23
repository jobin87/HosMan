import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Box,
  Button,
} from "@mui/material";

// Sample data for doctors
const doctors = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialization: "Cardiologist",
    experience: 10,
    contact: "123-456-7890",
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. Emily Smith",
    specialization: "Neurologist",
    experience: 8,
    contact: "234-567-8901",
    status: "Active",
  },
  {
    id: 3,
    name: "Dr. Sarah Johnson",
    specialization: "Dermatologist",
    experience: 5,
    contact: "345-678-9012",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Dr. Michael Brown",
    specialization: "Orthopedic",
    experience: 12,
    contact: "456-789-0123",
    status: "Active",
  },
  {
    id: 5,
    name: "Dr. David Wilson",
    specialization: "Pediatrician",
    experience: 7,
    contact: "567-890-1234",
    status: "Active",
  },
  {
    id: 6,
    name: "Dr. Lisa Martinez",
    specialization: "Gynecologist",
    experience: 9,
    contact: "678-901-2345",
    status: "Inactive",
  },
  {
    id: 7,
    name: "Dr. James Anderson",
    specialization: "Psychiatrist",
    experience: 6,
    contact: "789-012-3456",
    status: "Active",
  },
  {
    id: 8,
    name: "Dr. Karen Thomas",
    specialization: "Radiologist",
    experience: 11,
    contact: "890-123-4567",
    status: "Active",
  },
  {
    id: 9,
    name: "Dr. Robert Jackson",
    specialization: "ENT Specialist",
    experience: 4,
    contact: "901-234-5678",
    status: "Inactive",
  },
  {
    id: 10,
    name: "Dr. Susan Lee",
    specialization: "Oncologist",
    experience: 15,
    contact: "012-345-6789",
    status: "Active",
  },
];

export default function DoctorList() {
  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          gap: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Doctor List
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none" }}
        >
          Add Doctor
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Specialization</TableCell>
              <TableCell>Experience (Years)</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>{doctor.id}</TableCell>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                <TableCell>{doctor.experience}</TableCell>
                <TableCell>{doctor.contact}</TableCell>
                <TableCell>
                  <Chip
                    label={doctor.status}
                    color={doctor.status === "Active" ? "success" : "error"}
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
