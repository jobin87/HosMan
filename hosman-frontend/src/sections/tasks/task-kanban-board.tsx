import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { Iconify } from 'src/components/iconify';
import { ITask, TaskStatus } from 'src/types/task';
import { IRealPrepUser } from 'src/types/realprepUser';

interface TaskKanbanBoardProps {
  tasks: ITask[];
  users: IRealPrepUser[];
  currentUserId?: string;
  onUpdateStatus: (task: ITask, newStatus: TaskStatus) => Promise<void>;
  onAssignUser: (task: ITask, userId: string) => Promise<void>;
  onQuickCreateTask: (title: string, status: TaskStatus, userId: string) => Promise<void>;
  onAddNewTask?: () => void;
  onEditTask: (task: ITask) => void;
  onDeleteTask: (task: ITask) => void;
}

function DropLineIndicator({ color = '#2563eb' }: { color?: string }) {
  return (
    <Box
      sx={{
        height: 3,
        width: '100%',
        bgcolor: color,
        borderRadius: 1.5,
        my: 0.75,
        position: 'relative',
        boxShadow: `0 0 10px ${color}bb, 0 0 4px ${color}`,
        transition: 'all 0.15s ease-in-out',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: -4,
          top: -3.5,
          width: 10,
          height: 10,
          borderRadius: '50%',
          bgcolor: color,
          boxShadow: `0 0 8px ${color}`,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          right: -4,
          top: -3.5,
          width: 10,
          height: 10,
          borderRadius: '50%',
          bgcolor: color,
          boxShadow: `0 0 8px ${color}`,
        },
      }}
    />
  );
}

export function TaskKanbanBoard({
  tasks,
  users,
  currentUserId,
  onUpdateStatus,
  onAssignUser,
  onQuickCreateTask,
  onAddNewTask,
  onEditTask,
  onDeleteTask,
}: TaskKanbanBoardProps) {
  const [activeTab, setActiveTab] = useState<TaskStatus>('todo');
  const [quickTitle, setQuickTitle] = useState('');
  const [quickAssignee, setQuickAssignee] = useState(currentUserId || '');
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [activeTask, setActiveTask] = useState<ITask | null>(null);

  // Drag and drop state
  const [draggedTask, setDraggedTask] = useState<ITask | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<TaskStatus | null>(null);
  const [dragTargetTaskId, setDragTargetTaskId] = useState<string | null>(null);
  const [dropPosition, setDropPosition] = useState<'above' | 'below' | null>(null);

  const columns: { id: TaskStatus; title: string; color: string; icon: string; bg: string; border: string }[] = [
    {
      id: 'todo',
      title: 'To Do',
      color: '#d97706',
      icon: 'solar:clock-circle-bold',
      bg: '#fffbeb',
      border: '#fde68a',
    },
    {
      id: 'in_progress',
      title: 'In Progress',
      color: '#7c3aed',
      icon: 'solar:restart-bold',
      bg: '#f5f3ff',
      border: '#ddd6fe',
    },
    {
      id: 'completed',
      title: 'Completed',
      color: '#16a34a',
      icon: 'solar:check-circle-bold',
      bg: '#f0fdf4',
      border: '#bbf7d0',
    },
  ];

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    await onQuickCreateTask(quickTitle.trim(), 'todo', quickAssignee || currentUserId || '');
    setQuickTitle('');
    setIsQuickAddOpen(false);
  };

  // Drag Handlers
  const handleDragStart = (e: React.DragEvent, task: ITask) => {
    setDraggedTask(task);
    e.dataTransfer.setData('text/plain', task.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleColumnDragOver = (e: React.DragEvent, columnId: TaskStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverColumn !== columnId) {
      setDragOverColumn(columnId);
    }
  };

  const handleCardDragOver = (e: React.DragEvent, targetTask: ITask) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';

    if (!draggedTask || draggedTask.id === targetTask.id) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const position = offsetY < rect.height / 2 ? 'above' : 'below';

    setDragOverColumn(targetTask.status);
    setDragTargetTaskId(targetTask.id);
    setDropPosition(position);
  };

  const handleDragLeave = (e: React.DragEvent, columnId: TaskStatus) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      if (dragOverColumn === columnId) {
        setDragOverColumn(null);
        setDragTargetTaskId(null);
        setDropPosition(null);
      }
    }
  };

  const handleDrop = async (e: React.DragEvent, columnId: TaskStatus) => {
    e.preventDefault();
    e.stopPropagation();
    const taskId = e.dataTransfer.getData('text/plain') || draggedTask?.id;
    const targetTask = tasks.find((t) => String(t.id) === String(taskId)) || draggedTask;

    if (targetTask && targetTask.status !== columnId) {
      await onUpdateStatus(targetTask, columnId);
    }
    setDraggedTask(null);
    setDragOverColumn(null);
    setDragTargetTaskId(null);
    setDropPosition(null);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverColumn(null);
    setDragTargetTaskId(null);
    setDropPosition(null);
  };

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden' }}>
      {/* MOBILE ONLY TAB SWITCHER (CLASSIC UNDERLINE INDICATOR DESIGN) */}
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          mb: 2,
          borderBottom: '1px solid #e2e8f0',
          flexShrink: 0,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, newVal) => setActiveTab(newVal)}
          variant="fullWidth"
          sx={{
            minHeight: { xs: 36, sm: 42 },
            '& .MuiTabs-indicator': {
              bgcolor: '#0f172a',
              height: 3,
              borderRadius: '3px 3px 0 0',
            },
            '& .MuiTab-root': {
              minHeight: { xs: 36, sm: 42 },
              textTransform: 'none',
              fontWeight: 600,
              fontSize: { xs: 12, sm: 13 },
              color: '#64748b',
              py: { xs: 0.5, sm: 1 },
              px: 1,
              transition: 'color 0.15s ease-in-out',
              '&.Mui-selected': {
                color: '#0f172a',
                fontWeight: 700,
              },
              '&:hover:not(.Mui-selected)': {
                color: '#1e293b',
              },
            },
          }}
        >
          {columns.map((col) => (
            <Tab
              key={col.id}
              value={col.id}
              label={col.title}
            />
          ))}
        </Tabs>
      </Box>

      {/* KANBAN COLUMNS GRID */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 2.5,
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          const isDragOver = dragOverColumn === col.id;
          const isDraggingOtherColumn = draggedTask && draggedTask.status !== col.id;

              return (
            <Box
              key={col.id}
              onDragOver={(e) => handleColumnDragOver(e, col.id)}
              onDragLeave={(e) => handleDragLeave(e, col.id)}
              onDrop={(e) => handleDrop(e, col.id)}
              sx={{
                bgcolor: isDragOver
                  ? col.bg
                  : isDraggingOtherColumn
                  ? '#f1f5f9'
                  : '#f8fafc',
                borderRadius: 3,
                p: 2,
                border: isDragOver
                  ? `2px solid ${col.color}`
                  : isDraggingOtherColumn
                  ? `2px dashed ${col.border}`
                  : '1px solid #e2e8f0',
                boxShadow: isDragOver ? `0 0 16px ${col.color}25` : 'none',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                display: {
                  xs: activeTab === col.id ? 'flex' : 'none',
                  md: 'flex',
                },
                flexDirection: 'column',
                height: '100%',
                maxHeight: '100%',
                minHeight: 0,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* COLUMN HEADER */}
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2, flexShrink: 0 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: 1.5,
                      bgcolor: col.bg,
                      color: col.color,
                      border: `1px solid ${col.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify icon={col.icon} width={16} />
                  </Box>
                  <Typography variant="subtitle1" fontWeight={800} color="#0f172a">
                    {col.title}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Chip
                    label={colTasks.length}
                    size="small"
                    sx={{
                      bgcolor: col.bg,
                      color: col.color,
                      fontWeight: 800,
                      fontSize: 12,
                      height: 22,
                      border: `1px solid ${col.border}`,
                    }}
                  />
                  {col.id === 'todo' && (
                    <IconButton
                      size="small"
                      onClick={() => setIsQuickAddOpen((prev) => !prev)}
                      sx={{
                        width: 24,
                        height: 24,
                        p: 0,
                        bgcolor: isQuickAddOpen ? '#2563eb' : '#eff6ff',
                        color: isQuickAddOpen ? '#ffffff' : '#2563eb',
                        border: '1px solid #bfdbfe',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: '#2563eb',
                          color: '#ffffff',
                        },
                      }}
                      title={isQuickAddOpen ? 'Close quick add' : 'Add quick task'}
                    >
                      <Iconify icon={isQuickAddOpen ? 'solar:close-circle-bold' : 'solar:add-circle-bold'} width={16} />
                    </IconButton>
                  )}
                </Stack>
              </Stack>

              {/* QUICK TASK CREATION (ONLY ON TODO COLUMN) */}
              {col.id === 'todo' && (
                !isQuickAddOpen ? (
                  /* INITIALLY: PLACEHOLDER TRIGGER ROW */
                  <Box
                    onClick={() => setIsQuickAddOpen(true)}
                    sx={{
                      p: 1.5,
                      mb: 2,
                      borderRadius: 2.5,
                      bgcolor: '#ffffff',
                      border: '1.5px dashed #cbd5e1',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexShrink: 0,
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        borderColor: '#2563eb',
                        bgcolor: '#f8fafc',
                      },
                    }}
                  >
                    <Typography variant="body2" color="#94a3b8" fontWeight={600} sx={{ userSelect: 'none' }}>
                      + Quick Add Task...
                    </Typography>
                    <IconButton size="small" sx={{ p: 0.25, color: '#2563eb' }}>
                      <Iconify icon="solar:add-circle-bold" width={18} />
                    </IconButton>
                  </Box>
                ) : (
                  /* WHEN CLICKED: EXPANDED QUICK ADD BOX */
                  <Box component="form" onSubmit={handleQuickSubmit} sx={{ mb: 2, flexShrink: 0 }}>
                    <Stack spacing={1.5}>
                      <TextField
                        placeholder="+ Quick Add Task..."
                        multiline
                        minRows={3}
                        maxRows={8}
                        autoFocus
                        value={quickTitle}
                        onChange={(e) => setQuickTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            if (quickTitle.trim()) {
                              handleQuickSubmit(e);
                            }
                          }
                        }}
                        sx={{
                          bgcolor: '#ffffff',
                          borderRadius: 2,
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            p: 1.75,
                            fontSize: 13.5,
                            lineHeight: 1.6,
                            minHeight: 100,
                            alignItems: 'flex-start',
                            transition: 'all 0.2s ease-in-out',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                            '&.Mui-focused': {
                              bgcolor: '#ffffff',
                              borderColor: '#2563eb',
                              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.15)',
                            },
                          },
                          '& .MuiInputBase-input': {
                            p: 0,
                          },
                        }}
                      />
                      <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                        <FormControl size="small" sx={{ minWidth: 140 }}>
                          <Select
                            value={quickAssignee || currentUserId || ''}
                            onChange={(e) => setQuickAssignee(e.target.value)}
                            sx={{ fontSize: 12, height: 34, bgcolor: '#fff', borderRadius: 1.5 }}
                          >
                            {users.map((u) => (
                              <MenuItem key={u.id} value={u.id} sx={{ fontSize: 12 }}>
                                {u.name || u.email}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <Stack direction="row" spacing={1} alignItems="center">
                          <Button
                            type="button"
                            size="small"
                            variant="outlined"
                            onClick={() => {
                              setIsQuickAddOpen(false);
                              setQuickTitle('');
                            }}
                            sx={{
                              height: 34,
                              fontSize: 12,
                              borderRadius: 1.5,
                              textTransform: 'none',
                              fontWeight: 700,
                              borderColor: '#e2e8f0',
                              color: '#64748b',
                              '&:hover': { bgcolor: '#f1f5f9' },
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            size="small"
                            variant="contained"
                            disabled={!quickTitle.trim()}
                            sx={{ bgcolor: '#2563eb', fontWeight: 800, height: 34, fontSize: 12.5, px: 2.5, borderRadius: 1.5 }}
                          >
                            Add Task
                          </Button>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Box>
                )
              )}

              {/* DROP TARGET INDICATOR BANNER WHEN DRAGGING OVER */}
              {isDragOver && isDraggingOtherColumn && (
                <Box
                  sx={{
                    p: 1.25,
                    mb: 1.5,
                    borderRadius: 2,
                    bgcolor: col.bg,
                    border: `1.5px dashed ${col.color}`,
                    color: col.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    fontWeight: 800,
                    fontSize: 12.5,
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                  }}
                >
                  <Iconify icon="solar:import-bold-duotone" width={18} />
                  Drop here to move to {col.title}
                </Box>
              )}

              {/* TASK CARDS CONTAINER */}
              <Stack
                spacing={1.5}
                sx={{
                  overflowY: 'auto',
                  flex: 1,
                  minHeight: 0,
                  pr: 0.5,
                  '&::-webkit-scrollbar': { width: 6 },
                  '&::-webkit-scrollbar-thumb': { bgcolor: '#cbd5e1', borderRadius: 3 },
                  '&::-webkit-scrollbar-thumb:hover': { bgcolor: '#94a3b8' },
                }}
              >
                {colTasks.length === 0 ? (
                  <Box
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      border: isDragOver ? `2px dashed ${col.color}` : '1.5px dashed #cbd5e1',
                      borderRadius: 2.5,
                      bgcolor: isDragOver ? `${col.bg}80` : '#ffffff',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    {isDragOver && <DropLineIndicator color={col.color} />}
                    <Typography variant="caption" color={isDragOver ? col.color : '#94a3b8'} fontWeight={700}>
                      {isDragOver ? `Release to drop into ${col.title}` : `No tasks in ${col.title}`}
                    </Typography>
                  </Box>
                ) : (
                  <>
                    {colTasks.map((t) => {
                      const isTaskBeingDragged = draggedTask?.id === t.id;
                      const showDropLineAbove =
                        draggedTask && dragOverColumn === col.id && dragTargetTaskId === t.id && dropPosition === 'above';
                      const showDropLineBelow =
                        draggedTask && dragOverColumn === col.id && dragTargetTaskId === t.id && dropPosition === 'below';

                      return (
                        <Box key={t.id} sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                          {showDropLineAbove && <DropLineIndicator color={col.color} />}
                          <Card
                            draggable
                            onDragStart={(e) => handleDragStart(e, t)}
                            onDragOver={(e) => handleCardDragOver(e, t)}
                            onDragEnd={handleDragEnd}
                            elevation={0}
                            sx={{
                              p: 2,
                              borderRadius: 2.5,
                              bgcolor: '#ffffff',
                              border: isTaskBeingDragged ? '2px dashed #2563eb' : '1px solid #e2e8f0',
                              opacity: isTaskBeingDragged ? 0.35 : 1,
                              transform: isTaskBeingDragged ? 'scale(0.97)' : 'none',
                              boxShadow: isTaskBeingDragged ? 'none' : '0 1px 3px rgba(0,0,0,0.02)',
                              cursor: 'grab',
                              overflow: 'hidden',
                              width: '100%',
                              boxSizing: 'border-box',
                              transition: 'transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease',
                              '&:active': {
                                cursor: 'grabbing',
                              },
                              '&:hover': {
                                transform: isTaskBeingDragged ? 'none' : 'translateY(-2px)',
                                boxShadow: isTaskBeingDragged ? 'none' : '0 6px 16px rgba(0,0,0,0.06)',
                              },
                            }}
                          >
                            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1} sx={{ minWidth: 0, width: '100%' }}>
                              <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
                                <Box
                                  sx={{
                                    color: '#94a3b8',
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'grab',
                                    flexShrink: 0,
                                    '&:hover': { color: '#334155' },
                                  }}
                                  title="Drag to move task"
                                >
                                  <Iconify icon="solar:reorder-bold-duotone" width={18} />
                                </Box>
                                <Typography
                                  variant="subtitle2"
                                  fontWeight={800}
                                  color="#0f172a"
                                  sx={{ wordBreak: 'break-word' }}
                                >
                                  {t.title}
                                </Typography>
                              </Stack>
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMenuAnchorEl(e.currentTarget);
                                  setActiveTask(t);
                                }}
                                sx={{ flexShrink: 0 }}
                              >
                                <Iconify icon="solar:dots-menu-vertical-bold" width={16} color="#64748b" />
                              </IconButton>
                            </Stack>

                            {t.description && (
                              <Typography
                                variant="caption"
                                color="#64748b"
                                sx={{
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                  mt: 0.5,
                                  mb: 1.5,
                                  pl: 3.25,
                                }}
                              >
                                {t.description}
                              </Typography>
                            )}

                            {/* ASSIGNEE & ACTIONS FOOTER */}
                            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ mt: 1.5, minWidth: 0, width: '100%', flexWrap: 'nowrap' }}>
                              <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
                                <Avatar
                                  sx={{
                                    width: 24,
                                    height: 24,
                                    fontSize: 11,
                                    fontWeight: 800,
                                    bgcolor: '#3b82f6',
                                    flexShrink: 0,
                                  }}
                                >
                                  {t.userName?.charAt(0).toUpperCase() || 'U'}
                                </Avatar>
                                <Typography
                                  variant="caption"
                                  fontWeight={700}
                                  color="#475569"
                                  noWrap
                                  sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    minWidth: 0,
                                  }}
                                >
                                  {t.userName || 'Unassigned'}
                                </Typography>
                              </Stack>

                              {/* QUICK MOVE STATUS CHIP */}
                              <FormControl size="small" sx={{ flexShrink: 0, minWidth: 95 }}>
                                <Select
                                  value={t.status}
                                  onChange={(e) => onUpdateStatus(t, e.target.value as TaskStatus)}
                                  onClick={(e) => e.stopPropagation()}
                                  sx={{
                                    height: 26,
                                    fontSize: 11,
                                    fontWeight: 800,
                                    borderRadius: 1.5,
                                    bgcolor: '#f8fafc',
                                    maxWidth: 120,
                                    '& .MuiSelect-select': {
                                      py: 0.25,
                                      pl: 1,
                                      pr: '22px !important',
                                      display: 'flex',
                                      alignItems: 'center',
                                    },
                                    '& .MuiSelect-icon': {
                                      right: 4,
                                    },
                                  }}
                                >
                                  <MenuItem value="todo" sx={{ fontSize: 12 }}>To Do</MenuItem>
                                  <MenuItem value="in_progress" sx={{ fontSize: 12 }}>In Progress</MenuItem>
                                  <MenuItem value="completed" sx={{ fontSize: 12 }}>Completed</MenuItem>
                                </Select>
                              </FormControl>
                            </Stack>
                          </Card>
                          {showDropLineBelow && <DropLineIndicator color={col.color} />}
                        </Box>
                      );
                    })}
                    {draggedTask && dragOverColumn === col.id && !dragTargetTaskId && colTasks.length > 0 && (
                      <DropLineIndicator color={col.color} />
                    )}
                  </>
                )}
              </Stack>
            </Box>
          );
        })}
      </Box>

      {/* 3-DOT MENU FOR KANBAN CARDS */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={() => {
          setMenuAnchorEl(null);
          setActiveTask(null);
        }}
        PaperProps={{
          elevation: 3,
          sx: { borderRadius: 2, minWidth: 150, border: '1px solid #e2e8f0' },
        }}
      >
        <MenuItem
          onClick={() => {
            if (activeTask) onEditTask(activeTask);
            setMenuAnchorEl(null);
            setActiveTask(null);
          }}
          sx={{ fontSize: 13, fontWeight: 600 }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon="solar:pen-bold" width={16} sx={{ color: '#3b82f6' }} />
            <span>Edit Task</span>
          </Stack>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (activeTask) onDeleteTask(activeTask);
            setMenuAnchorEl(null);
            setActiveTask(null);
          }}
          sx={{ fontSize: 13, fontWeight: 600, color: '#ef4444' }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon="solar:trash-bin-trash-bold" width={16} />
            <span>Delete Task</span>
          </Stack>
        </MenuItem>
      </Menu>
    </Box>
  );
}

