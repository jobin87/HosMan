import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import { MenuItem } from '@mui/material';
import toast from 'react-hot-toast';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { Field, Form, schemaHelper } from 'src/components/hook-form';
import { useAppDispatch, useAppSelector } from 'src/store';
import { requestCreateAllStaff } from 'src/store/all-staff/allStaffThunk';
import { requestStaffRolesList } from 'src/store/roles/rolesThunk';

// ----------------------------------------------------------------------

export type NewStaffSchemaType = zod.infer<typeof NewStaffSchema>;

export const NewStaffSchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  phone: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  countryCode: zod.string().optional(),
  permissionId: zod.string().min(1, { message: 'Select a role!' }),
});

// ----------------------------------------------------------------------

export function AllStaffCreateForm() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const { data, loading } = useAppSelector((state) => state.allstaff.create);
  const rolesList = useAppSelector((state) => state.roles.list);

  const defaultValues = useMemo(
    () => ({
      name: '',
      email: '',
      countryCode: '',
      phone: '',
      permissionId: '',
    }),
    []
  );

  const methods = useForm<NewStaffSchemaType>({
    resolver: zodResolver(NewStaffSchema),
    defaultValues,
  });

  const { handleSubmit, setValue, watch } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      dispatch(
        requestCreateAllStaff({
          name: data.name,
          email: data.email,
          phone: data.phone,
          countryCode: data.countryCode,
          permissionId: data.permissionId,
        })
      );
    } catch (error) {
      console.error(error);
    }
  });

  let countryCode = (data: string) => {
    setValue('countryCode', `+${data}`);
  };

  useEffect(() => {
    if (data?.staffCreated) {
      toast.success('Staff has been created!');
      router.push(paths.dashboard.settings.staff.list);
    }
  }, [data]);

  useEffect(() => {
    if (rolesList?.data === null) {
      dispatch(requestStaffRolesList({ page: 1, limit: 10, permissionName: '' }));
    }
  }, []);

  const renderDetails = (
    <Card>
      <CardHeader
        title="Staff Details"
        subheader="Enter details and select a role to create a new staff"
        sx={{ mb: 2 }}
      />

      <Stack spacing={3} sx={{ p: 3, pt: 0 }}>
        <Field.Text name="name" label="Name" />
        <Field.Text name="email" label="Email" />
        <Field.Phone
          country="OM"
          name="phone"
          label="Phone number"
          countryPhoneNumber={countryCode}
        />
        <Field.Select
          name="permissionId"
          label="Role"
          children={rolesList?.data?.permissions?.map((role: any) => (
            <MenuItem key={role?.id} value={role?.id}>
              {role.permissionName}
            </MenuItem>
          ))}
          loading={rolesList?.loading}
        />
        {/* <Field.CountrySelect name="countryCode" label="Country" onChange={(e, countryName) => {
          setValue('countryCode', countries?.find((country) => country.label === countryName)?.code)
        }}/> */}
      </Stack>
    </Card>
  );

  const renderActions = (
    <Stack spacing={3} direction="row" alignItems="center" justifyContent="flex-end">
      <LoadingButton type="submit" variant="contained" size="large" loading={loading}>
        {'Create Staff'}
      </LoadingButton>
    </Stack>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack
        spacing={{ xs: 3, md: 5 }}
        sx={{
          mx: { lg: 'unset', md: 'auto' }, // use "auto" to get centered layout
          maxWidth: { xs: 720, xl: 880 },
        }}
      >
        {renderDetails}

        {renderActions}
      </Stack>
    </Form>
  );
}
