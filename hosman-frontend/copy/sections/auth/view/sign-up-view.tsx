import { Box, Link } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { FormHead } from '../form-head';
import { SignUpForm } from '../sign-up-form';
import { SignUpTerms } from '../sign-up-terms';

// ----------------------------------------------------------------------

export function SignUpView() {
  return (
    <>
      <FormHead
        title="Get started absolutely free"
        description={
          <>
            {`Already have an account? `}
            <Link component={RouterLink} href={paths.auth.signIn} variant="subtitle2">
              Get started
            </Link>
          </>
        }
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      <Box gap={3} display="flex" flexDirection="column" minWidth={{ md: 600 }} maxWidth={600}>
        <SignUpForm />
      </Box>

      <SignUpTerms />
    </>
  );
}
