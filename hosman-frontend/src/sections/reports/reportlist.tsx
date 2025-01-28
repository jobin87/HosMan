import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { paths } from 'src/routes/paths';

export default function ReportListView() {
  // Static data for the categories
  const reportCategories = [
    { id: 1, name: 'Room Maintenance', reportCount: 5 },
    { id: 2, name: 'Lab Equipment Issues', reportCount: 3 },
    { id: 3, name: 'Inventory Needs', reportCount: 8 },
    { id: 4, name: 'Patient Needs', reportCount: 2 },
    { id: 5, name: 'Staff Shortages', reportCount: 4 },
  ];

  const navigate = useNavigate();
  const [searchCategory, setSearchCategory] = useState('');
  const [loading, setLoading] = useState(false);

  // Filter categories based on search input
  const filteredCategories = reportCategories.filter((category) =>
    category.name.toLowerCase().includes(searchCategory.toLowerCase())
  );

  // Navigate to the detailed category view
  // const handleCategoryClick = (id: number) => {
  //   navigate(`${paths.dashboard.Reports.category.replace(':id', String(id))}`);
  // };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Total Reports: {filteredCategories.length}
      </Typography>

      {/* Search Input */}
      <TextField
        label="Search Category"
        variant="outlined"
        value={searchCategory}
        onChange={(e) => setSearchCategory(e.target.value)}
        sx={{ mb: 3, width: '100%' }}
        placeholder="Search by category name"
      />

      {/* Loading Spinner */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Category Grid */}
      <Grid container spacing={3}>
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <Card
                sx={{
                  textAlign: 'center',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)', boxShadow: 3 },
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'gray' }}>
                    {category.reportCount} Reports
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      '&:hover': { backgroundColor: 'primary.dark' },
                    }}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography sx={{ mt: 2 }}>No categories found matching your search.</Typography>
        )}
      </Grid>
    </Box>
  );
}
