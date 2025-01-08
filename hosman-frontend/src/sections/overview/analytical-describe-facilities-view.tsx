import { Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Patient {
  id: number;
  date: string;
  Time: string;
  patientId: string;
  name: string;
  age: number;
  country: string;
  gender: string;
}

interface LatestPatientsProps {
  title: string;
}

export default function AnalyticLatestPatients({ title}: LatestPatientsProps) {
   const patientData: Patient[] = [
      { id: 1, date: '22/02/2021',Time: '23:01am', patientId: 'GH-22436', name: 'William Zabka', age: 24, country: 'Singapore', gender: 'Male' },
      { id: 2, date: '22/02/2021',Time: '2:51am', patientId: 'GH-22437', name: 'Thomas Shelby', age: 21, country: 'USA', gender: 'Male' },
      { id: 3, date: '22/02/2021',Time: '8:22am', patientId: 'GH-22438', name: 'Bobby Singer', age: 34, country: 'Indonesia', gender: 'Male' },
    ];
  return (
    <Card sx={{ boxShadow: 2, borderRadius: 2, padding: 2  }}>
      <CardHeader title={title} subheader="Recent patient activity" />
      <TableContainer sx={{ maxHeight: 400, overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Patient ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>age</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientData.map((patient) => (
              <TableRow >
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.patientId}</TableCell>
                <TableCell>{patient.date}</TableCell>
                <TableCell>{patient.Time}</TableCell>

                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.country}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
