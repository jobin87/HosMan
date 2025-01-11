import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { RolesCreateForm } from '../roles-create-form';

export function RolesCreateView() {
  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CustomBreadcrumbs
        heading="Staff Role Create"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Settings', href: paths.dashboard.settings.roles.list },
          { name: 'Staff Role Create' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <RolesCreateForm />
    </DashboardContent>
  );
}
