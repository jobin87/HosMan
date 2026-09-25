import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type Props = {
  pendingCount: number;
  onReviewRequests: () => void;
};

export function AdminApprovalBanner({ pendingCount, onReviewRequests }: Props) {
  if (pendingCount <= 0) return null;

  return (
    <Alert
      severity="warning"
      sx={{ mb: 2.5, borderRadius: 1.5 }}
      action={
        <Button color="inherit" size="small" onClick={onReviewRequests} sx={{ fontWeight: 700 }}>
          Review
        </Button>
      }
    >
      <Typography variant="body2" fontWeight={600}>
        You have {pendingCount} user registration request(s) pending approval.
      </Typography>
    </Alert>
  );
}
