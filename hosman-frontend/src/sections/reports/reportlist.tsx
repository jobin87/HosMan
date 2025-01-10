import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Chip, IconButton, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

// Sample data for reports (e.g., Room light not working, etc.)
const reports = [
  { id: 1, description: 'Room 101 light not working', category: 'Maintenance', status: 'Pending', priority: 'High', dateReported: '2025-01-10' },
  { id: 2, description: 'Tap in bathroom is leaking', category: 'Maintenance', status: 'In Progress', priority: 'Medium', dateReported: '2025-01-08' },
  { id: 3, description: 'Elevator 2 is not working', category: 'Equipment', status: 'Completed', priority: 'Low', dateReported: '2025-01-05' },
  { id: 4, description: 'Air conditioning in room 303 not cooling', category: 'Maintenance', status: 'Pending', priority: 'High', dateReported: '2025-01-09' },
  { id: 5, description: 'Water supply in room 205 stopped', category: 'Plumbing', status: 'In Progress', priority: 'Medium', dateReported: '2025-01-07' },
  { id: 6, description: 'Internet connection not working', category: 'Technology', status: 'Completed', priority: 'Low', dateReported: '2025-01-04' },
];

export default function ReportListPage() {
  const handleEdit = (id: number) => {
    console.log(`Editing report with ID: ${id}`);
    // Add edit functionality here
  };

  const handleDelete = (id: number) => {
    console.log(`Deleting report with ID: ${id}`);
    // Add delete functionality here
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Report List - Maintenance and Issues
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Date Reported</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.id}</TableCell>
                    <TableCell>{report.description}</TableCell>
                    <TableCell>{report.category}</TableCell>
                    <TableCell>
                      <Chip
                        label={report.status}
                        color={report.status === 'Pending' ? 'warning' : report.status === 'In Progress' ? 'primary' : 'success'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{report.priority}</TableCell>
                    <TableCell>{report.dateReported}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(report.id)} color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(report.id)} color="error">
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
