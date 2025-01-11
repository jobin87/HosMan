import { useEffect } from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { useParams } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import store, { useAppSelector } from 'src/store';
import { requestStaffRolesDetails } from 'src/store/roles/rolesThunk';
import { RolesEditForm } from '../roles-edit-form';

export function RolesEditView() {
  const params = useParams();

  const { data, loading } = useAppSelector((state) => state.roles.details);

  useEffect(() => {
    if (data === null && params?.id !== undefined) {
      store.dispatch(
        requestStaffRolesDetails({
          id: params.id,
        })
      );
    }
  }, [data]);

  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CustomBreadcrumbs
        heading="Staff Role Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Settings', href: paths.dashboard.settings.roles.list },
          { name: 'Staff Role Edit' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <RolesEditForm currentRole={data} />
    </DashboardContent>
  );
}
