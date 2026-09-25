import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { Iconify } from 'src/components/iconify';

type StatsProps = {
  stats: {
    total: number;
    completed: number;
    todo: number;
    inProgress: number;
    completionRate: number;
    usersCount: number;
  };
};

export function DashboardStatCards({ stats }: StatsProps) {
  const cards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      subtitle: `${stats.usersCount} active users`,
      icon: 'solar:clipboard-list-bold-duotone',
      color: '#3b82f6',
      bgColor: '#eff6ff',
    },
    {
      title: 'To Do',
      value: stats.todo,
      subtitle: 'Pending action',
      icon: 'solar:clock-circle-bold-duotone',
      color: '#f59e0b',
      bgColor: '#fffbeb',
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      subtitle: 'Currently active',
      icon: 'solar:square-academic-cap-bold-duotone',
      color: '#06b6d4',
      bgColor: '#ecfeff',
    },
    {
      title: 'Completed',
      value: stats.completed,
      subtitle: `${stats.completionRate}% completion`,
      icon: 'solar:check-circle-bold-duotone',
      color: '#10b981',
      bgColor: '#ecfdf5',
    },
  ];

  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(2, 1fr)',
        md: 'repeat(4, 1fr)',
      }}
      gap={{ xs: 1.25, sm: 1.5 }}
      sx={{ mb: 2 }}
    >
      {cards.map((card) => (
        <Card
          key={card.title}
          elevation={0}
          sx={{
            p: { xs: 1.25, sm: 1.75 },
            borderRadius: 2.5,
            border: '1px solid #e2e8f0',
            bgcolor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: { xs: 85, sm: 'auto' },
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1}>
            <Typography
              variant="caption"
              fontWeight={700}
              color="#64748b"
              sx={{ textTransform: 'uppercase', fontSize: { xs: 10, sm: 11 }, whiteSpace: 'nowrap' }}
            >
              {card.title}
            </Typography>
            <Box
              sx={{
                width: { xs: 30, sm: 36 },
                height: { xs: 30, sm: 36 },
                borderRadius: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: card.bgColor,
                color: card.color,
                flexShrink: 0,
              }}
            >
              <Iconify icon={card.icon} width={18} />
            </Box>
          </Stack>

          <Box sx={{ mt: { xs: 0.5, sm: 1 } }}>
            <Typography variant="h5" fontWeight={800} color="#0f172a" sx={{ fontSize: { xs: 18, sm: 22 }, lineHeight: 1.1 }}>
              {card.value}
            </Typography>
            <Typography
              variant="caption"
              color="#94a3b8"
              fontWeight={600}
              sx={{ mt: 0.25, display: 'block', fontSize: { xs: 10, sm: 11 }, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {card.subtitle}
            </Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
