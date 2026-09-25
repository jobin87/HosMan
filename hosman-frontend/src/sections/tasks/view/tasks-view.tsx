import { useEffect, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { Iconify } from 'src/components/iconify';
import { useUser } from 'src/hooks/use-user';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  requestGetTasks,
  requestGetAllUsers,
  requestApproveUser,
  requestCreateTask,
  requestUpdateTask,
  requestDeleteTask,
} from 'src/store/app/appThunk';
import { ITask, TaskStatus } from 'src/types/task';
import { IRealPrepUser } from 'src/types/realprepUser';
import { TaskDialog, TaskSchemaType } from 'src/sections/tasks/task-dialog';
import { TaskDeleteDialog } from 'src/sections/tasks/task-delete-dialog';
import { TaskKanbanBoard } from 'src/sections/tasks/task-kanban-board';
import { paths } from 'src/routes/paths';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

export function TasksView() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentUser = useUser();
  const reduxTasks = useAppSelector((state) => state.app.tasks);
  const reduxUsersList = useAppSelector((state) => state.app.usersList);
  const reduxTasksTotalCount = useAppSelector((state: any) => state.app.tasksTotalCount || 0);

  const [loading, setLoading] = useState(true);

  // Scope Filter: 'my' (My Tasks) | 'all' (Entire Tasks) | userId (Individual Team Member)
  const [taskScope, setTaskScope] = useState<string>('all');

  // Task Status Filter: 'all' | 'todo' | 'in_progress' | 'completed'
  const [statusFilter, setStatusFilter] = useState<'all' | 'todo' | 'in_progress' | 'completed'>('all');

  // Dialog States
  const [userManagementOpen, setUserManagementOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<ITask | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const isAdmin = currentUser?.role === 'admin';

  const users: IRealPrepUser[] = useMemo(() => {
    if (!reduxUsersList || reduxUsersList.length === 0) {
      if (currentUser?.id) {
        return [
          {
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
            role: currentUser.role as any,
            isApproved: currentUser.isApproved,
            approvedBy: currentUser.approvedBy,
          },
        ];
      }
      return [];
    }
    return reduxUsersList.map((u: any) => ({
      id: u.id,
      name: u.userName || u.name || (u.userEmail ? u.userEmail.split('@')[0] : 'User'),
      email: u.userEmail || u.email || '',
      role: u.role || 'user',
      userRegNum: u.userRegNum || '',
      isApproved: u.isApproved !== undefined ? u.isApproved : true,
      approvedBy: u.approvedBy || (u.role === 'admin' ? 'Super Admin' : 'System Admin'),
    }));
  }, [reduxUsersList, currentUser]);

  const tasks: ITask[] = useMemo(() => {
    const allTasks = (reduxTasks || []).map((t: any) => {
      const matchingUser = users.find((u) => String(u.id) === String(t.userId));
      const validStatus: TaskStatus =
        t.status === 'in_progress' || t.status === 'completed' ? t.status : 'todo';
      return {
        id: t.id,
        title: t.title,
        description: t.description || '',
        status: validStatus,
        userId: t.userId,
        userName: t.user?.userName || t.userName || matchingUser?.name || 'User',
        userEmail: t.user?.userEmail || t.userEmail || matchingUser?.email || '',
        createdAt: t.created_at || t.createdAt || new Date().toISOString(),
        updatedAt: t.updated_at || t.updatedAt || new Date().toISOString(),
      };
    });

    if (isAdmin) {
      return allTasks;
    }

    // For non-admin users, strictly filter tasks assigned to the current logged-in user
    const curId = currentUser?.id ? String(currentUser.id).toLowerCase().trim() : '';
    const curEmail = currentUser?.email ? String(currentUser.email).toLowerCase().trim() : '';

    if (!curId && !curEmail) return [];

    return allTasks.filter((t) => {
      const tUserId = t.userId ? String(t.userId).toLowerCase().trim() : '';
      const tUserEmail = t.userEmail ? String(t.userEmail).toLowerCase().trim() : '';
      const matchId = Boolean(curId && tUserId && curId === tUserId);
      const matchEmail = Boolean(curEmail && tUserEmail && curEmail === tUserEmail);
      return matchId || matchEmail;
    });
  }, [reduxTasks, users, isAdmin, currentUser]);

  const pendingUsers = useMemo(() => {
    return users.filter((u) => u.isApproved === false);
  }, [users]);

  // Load User Data & Tasks from API based on filters
  const loadData = async () => {
    setLoading(true);
    try {
      if (!currentUser?.id && !currentUser?.userLogged) {
        navigate(paths.auth.signIn);
        return;
      }
      await dispatch(
        requestGetTasks({
          status: statusFilter,
          scope: isAdmin ? taskScope : 'my',
        })
      );
      if (!reduxUsersList || reduxUsersList.length === 0) {
        await dispatch(requestGetAllUsers());
      }
    } catch (error) {
      toast.error('Failed to load tasks data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, taskScope]);

  // Handlers
  const handleToggleApproval = async (targetUser: IRealPrepUser) => {
    const newStatus = !targetUser.isApproved;
    try {
      await dispatch(requestApproveUser({ id: targetUser.id, isApproved: newStatus })).unwrap();
      toast.success(`User "${targetUser.name}" ${newStatus ? 'approved' : 'unapproved'} successfully!`);
    } catch (error: any) {
      toast.error(error?.message || 'Error updating user status');
    }
  };

  const handleCreateOrUpdateTask = async (data: TaskSchemaType) => {
    try {
      if (selectedTask) {
        await dispatch(
          requestUpdateTask({
            id: selectedTask.id,
            title: data.title,
            description: data.description || 'task',
            status: data.status,
            userId: data.userId,
          })
        ).unwrap();
        toast.success('Task updated & assigned successfully!');
      } else {
        await dispatch(
          requestCreateTask({
            title: data.title,
            description: data.description || 'task',
            status: data.status,
            userId: data.userId || currentUser?.id,
          })
        ).unwrap();
        toast.success('Task created & assigned successfully!');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Operation failed');
    }
  };

  const handleQuickCreateTask = async (title: string, status: TaskStatus, userId: string) => {
    try {
      await dispatch(
        requestCreateTask({
          title,
          description: 'quicktask',
          status,
          userId: userId || currentUser?.id,
        })
      ).unwrap();
      toast.success(`Quick task "${title}" created & assigned!`);
    } catch (error: any) {
      toast.error(error?.message || 'Quick task creation failed');
    }
  };

  const handleAssignUser = async (task: ITask, userId: string) => {
    try {
      const assignedUser = users.find((u) => u.id === userId);
      await dispatch(requestUpdateTask({ id: task.id, userId })).unwrap();
      toast.success(`Assigned task to ${assignedUser?.name || 'user'}`);
    } catch (error) {
      toast.error('Failed to assign user');
    }
  };

  const handleKanbanUpdateStatus = async (task: ITask, newStatus: TaskStatus) => {
    try {
      await dispatch(requestUpdateTask({ id: task.id, status: newStatus })).unwrap();
      toast.success(`Task moved to ${newStatus.replace('_', ' ')}`);
    } catch (error) {
      toast.error('Failed to update task status');
    }
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;
    setDeleteLoading(true);
    try {
      await dispatch(requestDeleteTask(taskToDelete.id)).unwrap();
      toast.success('Task deleted successfully');
      setDeleteDialogOpen(false);
      setTaskToDelete(null);
    } catch (error) {
      toast.error('Failed to delete task');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={48} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1600,
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4 },
        pt: { xs: 0.5, sm: 1 },
        pb: { xs: 1, sm: 2 },
        height: { xs: 'calc(100dvh - 70px)', md: 'calc(100vh - 75px)' },
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ADMIN APPROVAL NOTIFICATION BANNER */}
      {isAdmin && pendingUsers.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            flexShrink: 0,
            p: 1.5,
            px: 2.5,
            mb: 1.5,
            borderRadius: 3,
            bgcolor: '#fff7ed',
            border: '1px solid #ffedd5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1.5,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                bgcolor: '#ea580c',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Iconify icon="solar:shield-warning-bold" width={20} />
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={800} color="#0f172a">
                Admin Registration Alert
              </Typography>
              <Typography variant="caption" color="#c2410c" fontWeight={600}>
                ⚠️ {pendingUsers.length} user request(s) awaiting review.
              </Typography>
            </Box>
          </Stack>

          <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={() => setUserManagementOpen(true)}
            startIcon={<Iconify icon="solar:users-group-two-rounded-bold" width={18} />}
            sx={{ fontWeight: 800, borderRadius: 2, px: 2, py: 0.75 }}
          >
            Review ({pendingUsers.length})
          </Button>
        </Paper>
      )}

      {/* TOP HEADER SECTION WITH BREADCRUMBS & ACTIONS */}
      <CustomBreadcrumbs
        heading="Task Manager"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root, icon: <Iconify icon="solar:widget-4-bold" width={16} /> },
          { name: 'Task List', icon: <Iconify icon="solar:checklist-minimalistic-bold" width={16} /> },
        ]}
        action={
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="solar:add-circle-bold" width={18} />}
            onClick={() => {
              setSelectedTask(null);
              setDialogOpen(true);
            }}
            sx={{
              height: { xs: 36, sm: 40 },
              borderRadius: '8px',
              px: { xs: 2.25, sm: 3.5 },
              fontWeight: 800,
              fontSize: { xs: 12, sm: 13 },
              textTransform: 'none',
              bgcolor: '#2563eb',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              '&:hover': { bgcolor: '#1d4ed8' },
            }}
          >
            Add Task
          </Button>
        }
        sx={{ px: { xs: 0.5, sm: 1 } }}
      />

      {/* KANBAN BOARD CONTAINER (FIXED HEIGHT FOR WEB & MOBILE WITH INTERNAL SCROLLING) */}
      <Card
        sx={{
          flex: 1,
          minHeight: 0,
          width: '100%',
          p: { xs: 1.5, sm: 2.5 },
          borderRadius: '12px',
          bgcolor: '#ffffff',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* KANBAN BOARD WRAPPER */}
        <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <TaskKanbanBoard
            tasks={tasks}
            users={users}
            currentUserId={currentUser?.id}
            onUpdateStatus={handleKanbanUpdateStatus}
            onAssignUser={handleAssignUser}
            onQuickCreateTask={handleQuickCreateTask}
            onAddNewTask={() => {
              setSelectedTask(null);
              setDialogOpen(true);
            }}
            onEditTask={(task) => {
              setSelectedTask(task);
              setDialogOpen(true);
            }}
            onDeleteTask={(task) => {
              setTaskToDelete(task);
              setDeleteDialogOpen(true);
            }}
          />
        </Box>
      </Card>

      {/* Task & Assignee Dialog */}
      <TaskDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleCreateOrUpdateTask}
        task={selectedTask}
        users={users}
        isAdmin={isAdmin}
        currentUserId={currentUser?.id}
      />

      {/* Task Delete Confirmation Dialog */}
      <TaskDeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteTask}
        task={taskToDelete}
        loading={deleteLoading}
      />

      {/* ADMIN USER MANAGEMENT DIALOG */}
      <Dialog
        open={userManagementOpen}
        onClose={() => setUserManagementOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3.5, p: 1 },
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Iconify icon="solar:shield-user-bold-duotone" width={26} sx={{ color: '#7c3aed' }} />
            <Box>
              <Typography variant="h6" fontWeight={800} color="#0f172a">
                User Management & Registration Approvals
              </Typography>
              <Typography variant="caption" color="#64748b" fontWeight={600}>
                Approve or reject new user account access requests
              </Typography>
            </Box>
          </Stack>
          <IconButton size="small" onClick={() => setUserManagementOpen(false)}>
            <Iconify icon="solar:close-circle-bold" width={22} />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', p: 2 }}>
          <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2.5 }}>
            <Table size="medium">
              <TableHead>
                <TableRow sx={{ bgcolor: '#f1f5f9', '& .MuiTableCell-head': { bgcolor: '#f1f5f9 !important', fontWeight: 700, color: '#334155' } }}>
                  <TableCell sx={{ fontWeight: 700, color: '#334155' }}>User Details</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#334155' }}>License No / Reg No</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#334155' }}>Requested Role</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#334155' }}>Approval Status</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, color: '#334155' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="#94a3b8">No registered users found.</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((u) => (
                    <TableRow key={u.id} hover>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                          <Avatar sx={{ width: 36, height: 36, bgcolor: u.role === 'admin' ? '#8b5cf6' : '#3b82f6', fontWeight: 800 }}>
                            {u.name?.charAt(0).toUpperCase() || 'U'}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" fontWeight={800} color="#0f172a">
                              {u.name}
                            </Typography>
                            <Typography variant="caption" color="#64748b">
                              {u.email}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={700} color="#334155">
                          {u.userRegNum || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={u.role.toUpperCase()}
                          size="small"
                          sx={{
                            fontWeight: 800,
                            bgcolor: u.role === 'admin' ? '#f3e8ff' : '#dbeafe',
                            color: u.role === 'admin' ? '#7c3aed' : '#2563eb',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {u.isApproved ? (
                          <Chip
                            icon={<Iconify icon="solar:check-circle-bold" width={16} />}
                            label="Approved"
                            size="small"
                            sx={{ bgcolor: '#dcfce7', color: '#15803d', fontWeight: 800 }}
                          />
                        ) : (
                          <Chip
                            icon={<Iconify icon="solar:clock-circle-bold" width={16} />}
                            label="Pending Admin Approval"
                            size="small"
                            sx={{ bgcolor: '#ffedd5', color: '#c2410c', fontWeight: 800 }}
                          />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          size="small"
                          variant={u.isApproved ? 'outlined' : 'contained'}
                          color={u.isApproved ? 'inherit' : 'success'}
                          onClick={() => handleToggleApproval(u)}
                          sx={{ fontWeight: 800, borderRadius: 1.5 }}
                        >
                          {u.isApproved ? 'Revoke Access' : 'Approve User'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setUserManagementOpen(false)} variant="contained" color="primary" sx={{ borderRadius: 2, fontWeight: 700 }}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

