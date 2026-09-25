import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Grid';

import { Iconify } from 'src/components/iconify';
import { ITask, TaskStatus } from 'src/types/task';
import { IRealPrepUser } from 'src/types/realprepUser';

export interface TaskSchemaType {
  title: string;
  description: string;
  status: TaskStatus;
  userId: string;
  hourlyRate?: string;
  startDate?: string;
  deadline?: string;
  priority?: string;
  tags?: string[];
  relatedTo?: string;
  repeatEvery?: string;
  assignedUserIds?: string[];
  followerUserIds?: string[];
}

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: TaskSchemaType) => Promise<void>;
  task?: ITask | null;
  users: IRealPrepUser[];
  isAdmin?: boolean;
  currentUserId?: string;
}

const AVAILABLE_TAGS = ['bug', 'follow up', 'design', 'frontend', 'backend', 'urgent', 'review'];
const RELATED_OPTIONS = ['Project', 'Patient', 'Department', 'Internal', 'Client'];
const REPEAT_OPTIONS = ['None', '1 Week', '2 Week', '1 Month'];

export function TaskDialog({
  open,
  onClose,
  onSubmit,
  task,
  users,
  isAdmin,
  currentUserId,
}: TaskDialogProps) {
  const [title, setTitle] = useState('');
  const [hourlyRate, setHourlyRate] = useState('$ 50.00');
  const [startDate, setStartDate] = useState('2026-03-10');
  const [deadline, setDeadline] = useState('2026-03-16');
  const [priority, setPriority] = useState('High');
  const [tags, setTags] = useState<string[]>(['bug', 'follow up']);
  const [relatedTo, setRelatedTo] = useState('Project');
  const [repeatEvery, setRepeatEvery] = useState('2 Week');
  const [assignedUserIds, setAssignedUserIds] = useState<string[]>([]);
  const [followerUserIds, setFollowerUserIds] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');

  const [submitting, setSubmitting] = useState(false);

  // Formatting state for description toolbar
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setStatus((task.status as TaskStatus) || 'todo');

      const matchingUserId = task.userId || currentUserId || (users[0]?.id ?? '');
      setAssignedUserIds(matchingUserId ? [matchingUserId] : []);
      setFollowerUserIds(matchingUserId ? [matchingUserId] : []);
    } else {
      setTitle('');
      setDescription('');
      setStatus('todo');
      setHourlyRate('$ 50.00');
      setStartDate('2026-03-10');
      setDeadline('2026-03-16');
      setPriority('High');
      setTags(['bug', 'follow up']);
      setRelatedTo('Project');
      setRepeatEvery('2 Week');

      const defaultUser = currentUserId || users[0]?.id || '';
      setAssignedUserIds(defaultUser ? [defaultUser] : []);
      setFollowerUserIds(defaultUser ? [defaultUser] : []);
    }
  }, [task, currentUserId, users, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      const primaryUserId = assignedUserIds[0] || currentUserId || users[0]?.id || '';
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        status,
        userId: primaryUserId,
        hourlyRate,
        startDate,
        deadline,
        priority,
        tags,
        relatedTo,
        repeatEvery,
        assignedUserIds,
        followerUserIds,
      });
      onClose();
    } catch (err) {
      // Handled by parent
    } finally {
      setSubmitting(false);
    }
  };

  // Reusable input styling with subtle 8px border radius
  const fieldInputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      fontSize: 14,
      bgcolor: '#ffffff',
      '& fieldset': {
        borderColor: '#e2e8f0',
      },
      '&:hover fieldset': {
        borderColor: '#cbd5e1',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#3b82f6',
        borderWidth: 1.5,
      },
    },
    '& .MuiInputBase-input': {
      py: 1.1,
      px: 1.5,
      fontSize: 14,
      color: '#1e293b',
      '&::placeholder': {
        color: '#94a3b8',
        opacity: 1,
      },
    },
  };

  const fieldLabelSx = {
    fontSize: 13,
    fontWeight: 600,
    color: '#475569',
    mb: 0.75,
    display: 'block',
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          p: { xs: 2, sm: 3 },
          bgcolor: '#ffffff',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12)',
          border: '1px solid #e2e8f0',
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        {/* HEADER SECTION */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pb: 2,
            mb: 2.5,
            borderBottom: '1px solid #f1f5f9',
          }}
        >
          <Typography variant="h6" fontWeight={700} color="#0f172a" sx={{ fontSize: 18 }}>
            {task ? 'Edit Task' : 'Add New Task'}
          </Typography>
          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              color: '#94a3b8',
              p: 0.5,
              '&:hover': { color: '#334155', bgcolor: '#f1f5f9' },
            }}
          >
            <Iconify icon="solar:close-circle-bold" width={20} />
          </IconButton>
        </Box>

        {/* DIALOG CONTENT GRID */}
        <DialogContent sx={{ p: 0, overflowY: 'auto', maxHeight: '72vh' }}>
          <Grid container spacing={2.5}>
            {/* ROW 1: Task Name & Hourly Rate */}
            <Grid item xs={12} sm={6}>
              <Typography sx={fieldLabelSx}>Task Name</Typography>
              <TextField
                fullWidth
                placeholder="App Design"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                sx={fieldInputSx}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography sx={fieldLabelSx}>Hourly rate</Typography>
              <TextField
                fullWidth
                placeholder="$ 50.00"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                sx={fieldInputSx}
              />
            </Grid>

            {/* ROW 2: Start Date & Deadline */}
            <Grid item xs={12} sm={6}>
              <Typography sx={fieldLabelSx}>Start Date</Typography>
              <TextField
                type="date"
                fullWidth
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Iconify icon="solar:calendar-date-bold" width={18} sx={{ color: '#64748b' }} />
                    </InputAdornment>
                  ),
                }}
                sx={fieldInputSx}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography sx={fieldLabelSx}>Deadline</Typography>
              <TextField
                type="date"
                fullWidth
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Iconify icon="solar:calendar-date-bold" width={18} sx={{ color: '#64748b' }} />
                    </InputAdornment>
                  ),
                }}
                sx={fieldInputSx}
              />
            </Grid>

            {/* ROW 3: Priority & Tags */}
            <Grid item xs={12} sm={6}>
              <Typography sx={fieldLabelSx}>Priority</Typography>
              <FormControl fullWidth sx={fieldInputSx}>
                <Select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as string)}
                  input={<OutlinedInput />}
                >
                  <MenuItem value="High">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ef4444' }} />
                      <Typography variant="body2" fontWeight={600} color="#ef4444">
                        High
                      </Typography>
                    </Stack>
                  </MenuItem>
                  <MenuItem value="Medium">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#f59e0b' }} />
                      <Typography variant="body2" fontWeight={600} color="#f59e0b">
                        Medium
                      </Typography>
                    </Stack>
                  </MenuItem>
                  <MenuItem value="Low">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#3b82f6' }} />
                      <Typography variant="body2" fontWeight={600} color="#3b82f6">
                        Low
                      </Typography>
                    </Stack>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography sx={fieldLabelSx}>Tags</Typography>
              <FormControl fullWidth sx={fieldInputSx}>
                <Select
                  multiple
                  value={tags}
                  onChange={(e) => {
                    const val = e.target.value;
                    setTags(typeof val === 'string' ? val.split(',') : val);
                  }}
                  input={<OutlinedInput />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                      {(selected as string[]).map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          size="small"
                          onMouseDown={(event) => event.stopPropagation()}
                          onDelete={() => setTags(tags.filter((t) => t !== value))}
                          sx={{
                            height: 24,
                            borderRadius: '6px',
                            bgcolor: '#f1f5f9',
                            color: '#475569',
                            fontSize: 12,
                            fontWeight: 500,
                            '& .MuiChip-deleteIcon': {
                              fontSize: 14,
                              color: '#94a3b8',
                              '&:hover': { color: '#64748b' },
                            },
                          }}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {AVAILABLE_TAGS.map((tagItem) => (
                    <MenuItem key={tagItem} value={tagItem} sx={{ fontSize: 13, fontWeight: 500 }}>
                      {tagItem}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* ROW 4: Related to & Repeat every */}
            <Grid item xs={12} sm={6}>
              <Typography sx={fieldLabelSx}>Related to</Typography>
              <FormControl fullWidth sx={fieldInputSx}>
                <Select
                  value={relatedTo}
                  onChange={(e) => setRelatedTo(e.target.value as string)}
                  input={<OutlinedInput />}
                >
                  {RELATED_OPTIONS.map((opt) => (
                    <MenuItem key={opt} value={opt} sx={{ fontSize: 13 }}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography sx={fieldLabelSx}>Repeat every</Typography>
              <FormControl fullWidth sx={fieldInputSx}>
                <Select
                  value={repeatEvery}
                  onChange={(e) => setRepeatEvery(e.target.value as string)}
                  input={<OutlinedInput />}
                >
                  {REPEAT_OPTIONS.map((opt) => (
                    <MenuItem key={opt} value={opt} sx={{ fontSize: 13 }}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* ROW 5: Assigned & Followers */}
            <Grid item xs={12} sm={6}>
              <Typography sx={fieldLabelSx}>Assigned</Typography>
              <FormControl fullWidth sx={fieldInputSx}>
                <Select
                  multiple
                  value={assignedUserIds}
                  onChange={(e) => {
                    const val = e.target.value;
                    setAssignedUserIds(typeof val === 'string' ? val.split(',') : val);
                  }}
                  input={<OutlinedInput />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                      {(selected as string[]).map((uid) => {
                        const userObj = users.find((u) => u.id === uid);
                        const name = userObj?.name || 'User';
                        return (
                          <Chip
                            key={uid}
                            avatar={
                              <Avatar sx={{ width: 18, height: 18, fontSize: 10, bgcolor: '#3b82f6' }}>
                                {name.charAt(0).toUpperCase()}
                              </Avatar>
                            }
                            label={name}
                            size="small"
                            onMouseDown={(event) => event.stopPropagation()}
                            onDelete={() => setAssignedUserIds(assignedUserIds.filter((id) => id !== uid))}
                            sx={{
                              height: 24,
                              borderRadius: '6px',
                              bgcolor: '#f1f5f9',
                              color: '#334155',
                              fontSize: 12,
                              fontWeight: 500,
                              '& .MuiChip-deleteIcon': {
                                fontSize: 14,
                                color: '#94a3b8',
                                '&:hover': { color: '#64748b' },
                              },
                            }}
                          />
                        );
                      })}
                    </Box>
                  )}
                >
                  {users.map((u) => (
                    <MenuItem key={u.id} value={u.id} sx={{ fontSize: 13 }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar sx={{ width: 22, height: 22, fontSize: 11, bgcolor: '#3b82f6' }}>
                          {u.name?.charAt(0).toUpperCase() || 'U'}
                        </Avatar>
                        <Typography variant="body2">{u.name || u.email}</Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography sx={fieldLabelSx}>Followers</Typography>
              <FormControl fullWidth sx={fieldInputSx}>
                <Select
                  multiple
                  value={followerUserIds}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFollowerUserIds(typeof val === 'string' ? val.split(',') : val);
                  }}
                  input={<OutlinedInput />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                      {(selected as string[]).map((uid) => {
                        const userObj = users.find((u) => u.id === uid);
                        const name = userObj?.name || 'User';
                        return (
                          <Chip
                            key={uid}
                            avatar={
                              <Avatar sx={{ width: 18, height: 18, fontSize: 10, bgcolor: '#8b5cf6' }}>
                                {name.charAt(0).toUpperCase()}
                              </Avatar>
                            }
                            label={name}
                            size="small"
                            onMouseDown={(event) => event.stopPropagation()}
                            onDelete={() => setFollowerUserIds(followerUserIds.filter((id) => id !== uid))}
                            sx={{
                              height: 24,
                              borderRadius: '6px',
                              bgcolor: '#f1f5f9',
                              color: '#334155',
                              fontSize: 12,
                              fontWeight: 500,
                              '& .MuiChip-deleteIcon': {
                                fontSize: 14,
                                color: '#94a3b8',
                                '&:hover': { color: '#64748b' },
                              },
                            }}
                          />
                        );
                      })}
                    </Box>
                  )}
                >
                  {users.map((u) => (
                    <MenuItem key={u.id} value={u.id} sx={{ fontSize: 13 }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar sx={{ width: 22, height: 22, fontSize: 11, bgcolor: '#8b5cf6' }}>
                          {u.name?.charAt(0).toUpperCase() || 'U'}
                        </Avatar>
                        <Typography variant="body2">{u.name || u.email}</Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* ROW 6: Description Textarea with Rich Formatting Toolbar */}
            <Grid item xs={12}>
              <Typography sx={fieldLabelSx}>Description</Typography>
              <Box
                sx={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  bgcolor: '#ffffff',
                  overflow: 'hidden',
                  '&:focus-within': {
                    borderColor: '#3b82f6',
                    boxShadow: '0 0 0 1px #3b82f6',
                  },
                }}
              >
                <TextField
                  multiline
                  minRows={4}
                  fullWidth
                  placeholder="Street address, suite, flowwr..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      p: 1.5,
                      fontSize: 14,
                      color: '#1e293b',
                      fontWeight: isBold ? 700 : 400,
                      fontStyle: isItalic ? 'italic' : 'normal',
                      textDecoration: isUnderline ? 'underline' : 'none',
                    },
                  }}
                />

                {/* BOTTOM FORMATTING TOOLBAR */}
                <Box
                  sx={{
                    borderTop: '1px solid #f1f5f9',
                    px: 1.5,
                    py: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 0.5,
                    bgcolor: '#fafafa',
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => setIsBold(!isBold)}
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: '4px',
                      bgcolor: isBold ? '#e2e8f0' : 'transparent',
                      color: isBold ? '#0f172a' : '#64748b',
                      fontSize: 13,
                      fontWeight: 800,
                      fontFamily: 'serif',
                    }}
                  >
                    B
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => setIsItalic(!isItalic)}
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: '4px',
                      bgcolor: isItalic ? '#e2e8f0' : 'transparent',
                      color: isItalic ? '#0f172a' : '#64748b',
                      fontSize: 13,
                      fontWeight: 700,
                      fontStyle: 'italic',
                      fontFamily: 'serif',
                    }}
                  >
                    I
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => setIsUnderline(!isUnderline)}
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: '4px',
                      bgcolor: isUnderline ? '#e2e8f0' : 'transparent',
                      color: isUnderline ? '#0f172a' : '#64748b',
                      fontSize: 13,
                      fontWeight: 700,
                      textDecoration: 'underline',
                    }}
                  >
                    U
                  </IconButton>
                  <IconButton size="small" sx={{ width: 28, height: 28, color: '#64748b' }}>
                    <Iconify icon="solar:list-bold" width={16} />
                  </IconButton>
                  <IconButton size="small" sx={{ width: 28, height: 28, color: '#64748b' }}>
                    <Iconify icon="solar:microphone-bold" width={16} />
                  </IconButton>
                  <IconButton size="small" sx={{ width: 28, height: 28, color: '#64748b' }}>
                    <Iconify icon="solar:smile-circle-bold" width={16} />
                  </IconButton>
                  <IconButton size="small" sx={{ width: 28, height: 28, color: '#64748b' }}>
                    <Iconify icon="solar:mention-circle-bold" width={16} />
                  </IconButton>
                  <IconButton size="small" sx={{ width: 28, height: 28, color: '#64748b' }}>
                    <Iconify icon="solar:link-bold" width={16} />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        {/* DIALOG ACTIONS */}
        <DialogActions sx={{ pt: 3, pb: 0, px: 0, justifyContent: 'flex-end', gap: 1.5 }}>
          <Button
            onClick={onClose}
            disabled={submitting}
            sx={{
              height: 38,
              borderRadius: '8px',
              px: 2.5,
              fontWeight: 600,
              fontSize: 13,
              color: '#334155',
              border: '1px solid #e2e8f0',
              textTransform: 'none',
              '&:hover': { bgcolor: '#f8fafc', borderColor: '#cbd5e1' },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={submitting || !title.trim()}
            startIcon={submitting ? <CircularProgress size={16} color="inherit" /> : null}
            sx={{
              height: 38,
              borderRadius: '8px',
              px: 3,
              fontWeight: 700,
              fontSize: 13,
              bgcolor: '#1e293b',
              color: '#ffffff',
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': { bgcolor: '#0f172a', boxShadow: 'none' },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

