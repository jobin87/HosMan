import { useEffect, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { Iconify } from 'src/components/iconify';
import { useUser } from 'src/hooks/use-user';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  requestGetTasks,
  requestGetAllUsers,
  requestApproveUser,
  requestUpdateTask,
  requestDeleteTask,
} from 'src/store/app/appThunk';
import { ITask, TaskStatus } from 'src/types/task';
import { IRealPrepUser } from 'src/types/realprepUser';
import { TaskDialog, TaskSchemaType } from 'src/sections/tasks/task-dialog';
import { TaskDeleteDialog } from 'src/sections/tasks/task-delete-dialog';
import { TaskDetailsDialog } from 'src/sections/tasks/task-details-dialog';
import { paths } from 'src/routes/paths';
import { CustomDataTable } from 'src/components/custom-table';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { DashboardStatCards } from '../dashboard-stat-cards';
import { UserManagementDialog } from '../user-management-dialog';
import { getTaskTableColumns } from '../dashboard-table-columns';

export function DashboardView() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentUser = useUser();
  const reduxTasks = useAppSelector((state) => state.app.tasks);
  const reduxUsersList = useAppSelector((state) => state.app.usersList);
  const reduxTasksTotalCount = useAppSelector((state: any) => state.app.tasksTotalCount || 0);

  const [loading, setLoading] = useState(true);

  // Status Tabs & Scope state: 'all' | 'todo' | 'in_progress' | 'completed'
  const [searchQuery, setSearchQuery] = useState('');
  const [taskTab, setTaskTab] = useState<'all' | 'todo' | 'in_progress' | 'completed'>('all');
  const [taskScope, setTaskScope] = useState<string>('all');

  // Dialog & Action Menu States
  const [userManagementOpen, setUserManagementOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [taskForDetails, setTaskForDetails] = useState<ITask | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<ITask | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Table Pagination & Action Menu States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [menuTask, setMenuTask] = useState<ITask | null>(null);

  useEffect(() => {
    setPage(0);
  }, [searchQuery, taskTab, taskScope]);

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
    return (reduxTasks || []).map((t: any) => {
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
  }, [reduxTasks, users]);

  const scopeOptions = useMemo(() => {
    const options = [
      { value: 'all', label: 'Entire Tasks' },
      { value: 'my', label: 'My Tasks' },
    ];
    const curId = currentUser?.id ? String(currentUser.id).toLowerCase().trim() : '';
    const curEmail = currentUser?.email ? String(currentUser.email).toLowerCase().trim() : '';

    users.forEach((u) => {
      const uId = u.id ? String(u.id).toLowerCase().trim() : '';
      const uEmail = u.email ? String(u.email).toLowerCase().trim() : '';
      const isCurrentUser = (curId && uId === curId) || (curEmail && uEmail === curEmail);

      if (!isCurrentUser) {
        options.push({
          value: u.id,
          label: `User: ${u.name || u.email}`,
        });
      }
    });
    return options;
  }, [users, currentUser]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (!currentUser?.id && !currentUser?.userLogged) {
        navigate(paths.auth.signIn);
        return;
      }
      await dispatch(requestGetTasks({}));
      await dispatch(requestGetAllUsers());
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter tasks by Scope ('all' | 'my' | userId)
  const scopedTasks = useMemo(() => {
    if (!currentUser) return [];

    // Non-admin users are strictly restricted to 'my' scope
    const effectiveScope = isAdmin ? taskScope : 'my';

    if (effectiveScope === 'all') return tasks;

    if (effectiveScope === 'my') {
      const curId = currentUser.id ? String(currentUser.id).toLowerCase().trim() : '';
      const curEmail = currentUser.email ? String(currentUser.email).toLowerCase().trim() : '';

      if (!curId && !curEmail) return [];

      return tasks.filter((t) => {
        const tUserId = t.userId ? String(t.userId).toLowerCase().trim() : '';
        const tUserEmail = t.userEmail ? String(t.userEmail).toLowerCase().trim() : '';
        const matchId = Boolean(curId && tUserId && curId === tUserId);
        const matchEmail = Boolean(curEmail && tUserEmail && curEmail === tUserEmail);
        return matchId || matchEmail;
      });
    }

    const targetUserId = String(effectiveScope).toLowerCase().trim();
    const targetUserObj = users.find((u) => String(u.id).toLowerCase().trim() === targetUserId);
    const targetUserEmail = targetUserObj?.email ? String(targetUserObj.email).toLowerCase().trim() : '';

    return tasks.filter((t) => {
      const tUserId = t.userId ? String(t.userId).toLowerCase().trim() : '';
      const tUserEmail = t.userEmail ? String(t.userEmail).toLowerCase().trim() : '';
      const matchId = Boolean(targetUserId && tUserId && targetUserId === tUserId);
      const matchEmail = Boolean(targetUserEmail && tUserEmail && targetUserEmail === tUserEmail);
      return matchId || matchEmail;
    });
  }, [tasks, currentUser, taskScope, users, isAdmin]);

  // Filter scoped tasks by active status tab (All, To Do, In Progress, Completed) & search query
  const filteredTasks = useMemo(() => {
    return scopedTasks.filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.userName && t.userName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (t.userEmail && t.userEmail.toLowerCase().includes(searchQuery.toLowerCase()));

      if (taskTab === 'todo') {
        return matchesSearch && t.status === 'todo';
      }
      if (taskTab === 'in_progress') {
        return matchesSearch && t.status === 'in_progress';
      }
      if (taskTab === 'completed') {
        return matchesSearch && t.status === 'completed';
      }
      return matchesSearch;
    });
  }, [scopedTasks, searchQuery, taskTab]);

  // Paginated task slice for Data Table
  const paginatedTasks = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredTasks.slice(start, start + rowsPerPage);
  }, [filteredTasks, page, rowsPerPage]);

  // Dynamic Statistics computed over all scoped tasks
  const stats = useMemo(() => {
    const total = scopedTasks.length;
    const completed = scopedTasks.filter((t) => t.status === 'completed').length;
    const todo = scopedTasks.filter((t) => t.status === 'todo').length;
    const inProgress = scopedTasks.filter((t) => t.status === 'in_progress').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, todo, inProgress, completionRate, usersCount: users.length };
  }, [scopedTasks, users]);

  const handleToggleStatus = async (task: ITask, forcedStatus?: TaskStatus) => {
    const newStatus: TaskStatus = forcedStatus || (task.status === 'completed' ? 'todo' : 'completed');
    try {
      await dispatch(requestUpdateTask({ id: task.id, status: newStatus })).unwrap();
      toast.success(`Task status changed to ${newStatus.replace('_', ' ')}`);
    } catch (error) {
      toast.error('Failed to update task status');
    }
  };

  const handleToggleApproval = async (user: IRealPrepUser) => {
    try {
      await dispatch(requestApproveUser({ userId: user.id, isApproved: !user.isApproved })).unwrap();
      toast.success(`User ${user.name} status updated`);
    } catch (error) {
      toast.error('Failed to update user status');
    }
  };

  // Column definitions for CustomDataTable
  const taskColumns = useMemo(
    () =>
      getTaskTableColumns({
        onViewDetails: (task) => {
          setTaskForDetails(task);
          setDetailsDialogOpen(true);
        },
        onOpenMenu: (event, task) => {
          setMenuAnchorEl(event.currentTarget);
          setMenuTask(task);
        },
      }),
    []
  );

  const handleCreateOrUpdateTask = async (data: TaskSchemaType) => {
    try {
      if (selectedTask) {
        await dispatch(
          requestUpdateTask({
            id: selectedTask.id,
            title: data.title,
            description: data.description,
            status: data.status,
            userId: data.userId,
          })
        ).unwrap();
        toast.success('Task updated & assigned successfully!');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Operation failed');
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
        px: { xs: 2.5, sm: 4.5, md: 6 },
        pt: { xs: 0.5, sm: 1 },
        pb: { xs: 5, md: 2 },
        height: { xs: 'auto', md: 'calc(100vh - 75px)' },
        display: 'flex',
        flexDirection: 'column',
        overflow: { xs: 'visible', md: 'hidden' },
        position: 'relative',
      }}
    >
      {/* TOP HEADER SECTION WITH BREADCRUMBS */}
      <CustomBreadcrumbs
        heading="Dashboard"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root, icon: <Iconify icon="solar:widget-4-bold" width={16} /> },
          { name: 'Overview' },
        ]}
        sx={{ px: { xs: 0.5, sm: 1.5, md: 2 }, pt: 0.5 }}
      />

      {/* 4 STAT CARDS SUMMARY */}
      <DashboardStatCards stats={stats} />

      {/* DASHBOARD SYSTEM TASKS DATA TABLE */}
      <CustomDataTable
        tabs={[
          { value: 'all', label: 'All' },
          { value: 'todo', label: 'To Do' },
          { value: 'in_progress', label: 'In Progress' },
          { value: 'completed', label: 'Completed' },
        ]}
        activeTab={taskTab}
        onTabChange={(tabVal) => {
          setTaskTab(tabVal as any);
          setPage(0);
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setPage(0);
        }}
        searchPlaceholder="Search tasks by title, description, assigned user..."
        filterLabel={isAdmin ? 'Task Scope' : undefined}
        filterValue={taskScope}
        filterOptions={isAdmin ? scopeOptions : undefined}
        onFilterChange={(s) => {
          setTaskScope(s);
          setPage(0);
        }}
        columns={taskColumns}
        data={paginatedTasks}
        totalCount={filteredTasks.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={(r) => {
          setRowsPerPage(r);
          setPage(0);
        }}
        emptyMessage={`No tasks found under "${taskTab}"`}
      />

      {/* 3-DOT ROW ACTION MENU */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={() => {
          setMenuAnchorEl(null);
          setMenuTask(null);
        }}
        PaperProps={{
          elevation: 3,
          sx: { borderRadius: 2.5, minWidth: 170, py: 0.5, border: '1px solid #e2e8f0' },
        }}
      >
        <MenuItem
          onClick={() => {
            if (menuTask) {
              setTaskForDetails(menuTask);
              setDetailsDialogOpen(true);
            }
            setMenuAnchorEl(null);
            setMenuTask(null);
          }}
          sx={{ fontSize: 13, fontWeight: 600 }}
        >
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Iconify icon="solar:document-text-bold" width={16} sx={{ color: '#2563eb' }} />
            <span>View Task Details</span>
          </Stack>
        </MenuItem>

        <MenuItem
          onClick={() => {
            if (menuTask) {
              setSelectedTask(menuTask);
              setDialogOpen(true);
            }
            setMenuAnchorEl(null);
            setMenuTask(null);
          }}
          sx={{ fontSize: 13, fontWeight: 600 }}
        >
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Iconify icon="solar:pen-bold" width={16} sx={{ color: '#3b82f6' }} />
            <span>Edit Task & Status</span>
          </Stack>
        </MenuItem>

        <MenuItem
          onClick={() => {
            if (menuTask) {
              setTaskToDelete(menuTask);
              setDeleteDialogOpen(true);
            }
            setMenuAnchorEl(null);
            setMenuTask(null);
          }}
          sx={{ fontSize: 13, fontWeight: 600, color: '#ef4444' }}
        >
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Iconify icon="solar:trash-bin-trash-bold" width={16} />
            <span>Delete Task</span>
          </Stack>
        </MenuItem>
      </Menu>

      {/* Task Details Dialog */}
      <TaskDetailsDialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        task={taskForDetails}
        onEdit={(taskToEdit) => {
          setSelectedTask(taskToEdit);
          setDialogOpen(true);
        }}
      />

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

      {/* ADMIN USER MANAGEMENT & APPROVAL REQUESTS DIALOG */}
      <UserManagementDialog
        open={userManagementOpen}
        onClose={() => setUserManagementOpen(false)}
        users={users}
        onToggleApproval={handleToggleApproval}
      />
    </Box>
  );
}
