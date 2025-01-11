import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { AllStaffCreateForm } from '../all-staff-create-form';

export function AllStaffCreateView() {
  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CustomBreadcrumbs
        heading="Create Staff"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Settings', href: paths.dashboard.settings.staff.list },
          { name: 'Create Staff' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <AllStaffCreateForm />
    </DashboardContent>
  );
}
