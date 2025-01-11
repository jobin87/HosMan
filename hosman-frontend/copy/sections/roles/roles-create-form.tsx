import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import { STAFF_ROLE_PERMISSIONS } from 'src/guard/permission-group';

import toast from 'react-hot-toast';
import { Field, Form } from 'src/components/hook-form';
import { useAppDispatch, useAppSelector } from 'src/store';
import { requestCreateStaffRoles } from 'src/store/roles/rolesThunk';

// ----------------------------------------------------------------------

export type NewRolesSchemaType = zod.infer<typeof NewRolesSchema>;

export const NewRolesSchema = zod.object({
  permissionName: zod.string().min(1, { message: 'Name is required!' }),
  permissions: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
});

// ----------------------------------------------------------------------

export function RolesCreateForm() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const { data, loading } = useAppSelector((state) => state.roles.create);

  const defaultValues = useMemo(
    () => ({
      permissionName: '',
      permissions: [],
    }),
    []
  );

  const methods = useForm<NewRolesSchemaType>({
    resolver: zodResolver(NewRolesSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      dispatch(
        requestCreateStaffRoles({
          permissionName: data.permissionName,
          permissions: data.permissions,
        })
      );
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (data?.permissionAdded) {
      toast.success('Role has been created!');
      router.push(paths.dashboard.settings.roles.list);
    }
  }, [data]);

  const renderDetails = (
    <Card>
      <CardHeader title="Role Information" sx={{ mb: 2 }} />

      <Stack spacing={3} sx={{ p: 3, pt: 0 }}>
        <Field.Text name="permissionName" label="Role name" />
      </Stack>
    </Card>
  );

  const RenderProperties = ({ params }: any) => {
    return (
      <Card>
        <CardHeader
          title={params?.title}
          // subheader={params?.description}
          sx={{ mb: 2 }}
        />

        <Divider />

        <Stack spacing={3} sx={{ p: 3 }}>
          <Stack spacing={1}>
            {/* <Typography variant="subtitle2">{params?.title}</Typography> */}
            <Field.MultiCheckbox
              row
              name="permissions"
              options={params?.permissions}
              sx={{ gap: 2 }}
            />
          </Stack>

          {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}
        </Stack>
      </Card>
    );
  };

  const renderActions = (
    <Stack spacing={3} direction="row" alignItems="center" justifyContent="flex-end">
      <LoadingButton type="submit" variant="contained" size="large" loading={loading}>
        {'Create Role'}
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

        {STAFF_ROLE_PERMISSIONS?.map((params) => <RenderProperties params={params} />)}

        {renderActions}
      </Stack>
    </Form>
  );
}
