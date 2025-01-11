import { Alert, Button, Slide } from '@mui/material';
export function DefaultPasswordChangeAlert({ action }: { action: () => void }) {
  return (
    <Slide direction="left" in mountOnEnter>
      <Alert
        severity="warning"
        sx={{ position: 'fixed', bottom: 10, right: 10, zIndex: 50 }}
        action={
          <Button color="inherit" size="small" onClick={action}>
            Change
          </Button>
        }
      >
        Change your default password
      </Alert>
    </Slide>
  );
}
