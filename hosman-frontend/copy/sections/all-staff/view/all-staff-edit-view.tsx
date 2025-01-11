import { useEffect } from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { useParams } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import store, { useAppSelector } from 'src/store';
import { requestAllStaffDetails } from 'src/store/all-staff/allStaffThunk';
import { AllStaffEditForm } from '../all-staff-edit-form';

export function AllStaffEditView() {
  const params = useParams();

  const { data, loading } = useAppSelector((state) => state.allstaff.details);

  useEffect(() => {
    if (data === null && params?.id !== undefined) {
      store.dispatch(
        requestAllStaffDetails({
          staffId: params.id,
        })
      );
    }
  }, [data]);

  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CustomBreadcrumbs
        heading="Edit Staff"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Settings', href: paths.dashboard.settings.staff.list },
          { name: 'Edit Staff' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <AllStaffEditForm currentData={data} />
    </DashboardContent>
  );
}
