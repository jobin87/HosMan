import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';

import { Iconify } from 'src/components/iconify';

export interface ColumnDef<T> {
  id: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
  render: (row: T, index: number) => React.ReactNode;
}

export interface TabOption {
  value: string;
  label: string;
  count?: number | string;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface CustomDataTableProps<T> {
  // Tabs Configuration
  tabs?: TabOption[];
  activeTab?: string;
  onTabChange?: (tabValue: string) => void;

  // Search Input Configuration
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;

  // Dropdown Filter (Right side of toolbar)
  filterLabel?: string;
  filterValue?: string;
  filterOptions?: FilterOption[];
  onFilterChange?: (val: string) => void;

  // Columns & Data
  columns: ColumnDef<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  emptySubMessage?: string;

  // Pagination
  page?: number;
  rowsPerPage?: number;
  onPageChange?: (newPage: number) => void;
  onRowsPerPageChange?: (newRowsPerPage: number) => void;
  totalCount?: number;

  // Additional Header Actions
  headerActions?: React.ReactNode;
}

export function CustomDataTable<T>({
  tabs,
  activeTab,
  onTabChange,
  searchQuery = '',
  onSearchChange,
  searchPlaceholder = 'Search by service name, code, description...',
  filterLabel,
  filterValue,
  filterOptions,
  onFilterChange,
  columns,
  data,
  loading = false,
  emptyMessage = 'No records found',
  emptySubMessage = 'No entries match your search or filter criteria.',
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  totalCount,
  headerActions,
}: CustomDataTableProps<T>) {
  const count = totalCount !== undefined ? totalCount : data.length;
  const totalPages = Math.max(1, Math.ceil(count / rowsPerPage));
  const startIndex = count > 0 ? page * rowsPerPage + 1 : 0;
  const endIndex = Math.min((page + 1) * rowsPerPage, count);

  return (
    <Card
      sx={{
        flex: { xs: 'none', md: 1 },
        display: 'flex',
        flexDirection: 'column',
        minHeight: { xs: 'auto', md: 0 },
        width: '100%',
        py: { xs: 1.5, sm: 2 },
        px: 0,
        mb: 2,
        borderRadius: 3,
        bgcolor: '#ffffff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
        overflow: { xs: 'visible', md: 'hidden' },
      }}
    >
      {/* 1. TOP TABS HEADER (CLASSIC UNDERLINE INDICATOR TABS) */}
      {tabs && tabs.length > 0 && (
        <Box
          sx={{
            px: { xs: 2, sm: 3 },
            mb: { xs: 1.25, sm: 2 },
            borderBottom: '1px solid #e2e8f0',
            flexShrink: 0,
          }}
        >
          <Tabs
            value={activeTab ?? tabs[0]?.value}
            onChange={(_, val) => onTabChange?.(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              minHeight: { xs: 36, sm: 40 },
              '& .MuiTabs-indicator': {
                bgcolor: '#0f172a',
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
              '& .MuiTabs-flexContainer': {
                gap: { xs: 0.5, sm: 2 },
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: { xs: 12, sm: 13.5 },
                minHeight: { xs: 36, sm: 40 },
                minWidth: 'auto',
                color: '#64748b',
                py: { xs: 0.5, sm: 0.75 },
                px: { xs: 1.25, sm: 2 },
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
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
              />
            ))}
          </Tabs>
        </Box>
      )}

      {/* 2. SEARCH & FILTER TOOLBAR (RESPONSIVE STACK FOR MOBILE) */}
      <Box
        sx={{
          flexShrink: 0,
          px: { xs: 2, sm: 3 },
          mb: { xs: 1.5, sm: 2 },
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          spacing={{ xs: 1.25, sm: 2 }}
        >
          {/* Search Input */}
          <TextField
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            size="small"
            sx={{
              flex: 1,
              width: '100%',
              minWidth: 0,
              order: { xs: 2, sm: 1 },
              '& .MuiOutlinedInput-root': {
                height: { xs: 38, sm: 44 },
                borderRadius: 1.5,
                bgcolor: '#ffffff',
                fontSize: { xs: 12.5, sm: 13.5 },
                '& fieldset': { borderColor: '#cbd5e1' },
                '&:hover fieldset': { borderColor: '#94a3b8' },
                '&.Mui-focused fieldset': { borderColor: '#2563eb' },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="solar:magnifer-linear" width={18} sx={{ color: '#94a3b8' }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Filter Dropdown */}
          {filterOptions && filterOptions.length > 0 && (
            <FormControl
              size="small"
              sx={{
                width: { xs: '100%', sm: 'auto' },
                minWidth: { xs: '100%', sm: 170 },
                flexShrink: 0,
                order: { xs: 1, sm: 2 },
              }}
            >
              <Select
                value={filterValue ?? filterOptions[0]?.value}
                onChange={(e) => onFilterChange?.(e.target.value)}
                displayEmpty
                renderValue={(selectedVal) => {
                  const selectedOpt = filterOptions.find((o) => o.value === selectedVal);
                  const labelText = selectedOpt?.label || selectedVal;
                  return (
                    <Box
                      component="span"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.75,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: '100%',
                      }}
                    >
                      {filterLabel && (
                        <Typography
                          component="span"
                          sx={{ fontSize: { xs: 12, sm: 12.5 }, color: '#64748b', fontWeight: 600, flexShrink: 0 }}
                        >
                          {filterLabel}:
                        </Typography>
                      )}
                      <Typography
                        component="span"
                        sx={{
                          fontSize: { xs: 12, sm: 12.5 },
                          color: '#0f172a',
                          fontWeight: 700,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {labelText}
                      </Typography>
                    </Box>
                  );
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 320,
                      borderRadius: 1.5,
                      mt: 0.75,
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                      border: '1px solid #e2e8f0',
                      '& .MuiMenuItem-root': {
                        fontSize: 12.5,
                        fontWeight: 600,
                        py: 0.85,
                        px: 1.5,
                        borderRadius: 1,
                        mx: 0.5,
                        my: 0.25,
                        '&.Mui-selected': {
                          bgcolor: '#eff6ff',
                          color: '#2563eb',
                          fontWeight: 700,
                        },
                      },
                    },
                  },
                }}
                sx={{
                  borderRadius: 1.5,
                  bgcolor: '#ffffff',
                  fontSize: { xs: 12, sm: 12.5 },
                  fontWeight: 600,
                  height: { xs: 38, sm: 44 },
                  '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    py: 0,
                    px: 1.5,
                  },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#cbd5e1' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#94a3b8' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2563eb' },
                }}
              >
                {filterOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {headerActions}
        </Stack>
      </Box>

      {/* 3. TABLE BODY & SCROLLABLE CONTAINER (STANDARD CLEAN TABLE) */}
      <Box sx={{ flex: { xs: 'none', md: 1 }, display: 'flex', flexDirection: 'column', minHeight: { xs: 'auto', md: 0 }, overflow: 'hidden' }}>
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            flex: { xs: 'none', md: 1 },
            minHeight: { xs: 480, md: 0 },
            maxHeight: { xs: 520, md: 'none' },
            borderTop: '1px solid #f1f5f9',
            borderBottom: '1px solid #f1f5f9',
            borderLeft: 0,
            borderRight: 0,
            borderRadius: 0,
            overflowY: 'auto',
            overflowX: 'auto',
          }}
        >
          <Table
            stickyHeader
            sx={{
              minWidth: 650,
              width: '100%',
              height: data.length === 0 || loading ? '100%' : 'auto',
            }}
          >
            <TableHead>
              <TableRow
                sx={{
                  '& .MuiTableCell-head': {
                    fontWeight: 700,
                    color: '#334155',
                    fontSize: 13,
                    py: 1.5,
                    bgcolor: '#f1f5f9 !important',
                    borderBottom: '1px solid #e2e8f0',
                  },
                }}
              >
                {columns.map((col, idx) => (
                  <TableCell
                    key={col.id}
                    align={col.align || 'left'}
                    width={col.width}
                    sx={{
                      pl: idx === 0 ? 3 : 2,
                      pr: idx === columns.length - 1 ? 3 : 2,
                    }}
                  >
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow sx={{ height: 400 }}>
                  <TableCell colSpan={columns.length} align="center">
                    <CircularProgress size={32} />
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow sx={{ height: 400 }}>
                  <TableCell colSpan={columns.length} align="center" sx={{ borderBottom: 'none', py: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <Iconify icon="solar:document-text-linear" width={48} sx={{ color: '#cbd5e1', mb: 1.5 }} />
                      <Typography variant="body1" fontWeight={700} color="#64748b" sx={{ mb: 0.5 }}>
                        {emptyMessage}
                      </Typography>
                      <Typography variant="body2" color="#94a3b8">
                        {emptySubMessage}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row, rowIdx) => (
                  <TableRow
                    key={rowIdx}
                    hover
                    sx={{
                      '&:hover': {
                        bgcolor: '#f8fafc',
                      },
                    }}
                  >
                    {columns.map((col, colIdx) => (
                      <TableCell
                        key={col.id}
                        align={col.align || 'left'}
                        sx={{
                          py: 1.75,
                          pl: colIdx === 0 ? 3 : 2,
                          pr: colIdx === columns.length - 1 ? 3 : 2,
                          fontSize: 13,
                          borderBottom: '1px solid #f1f5f9',
                        }}
                      >
                        {col.render(row, rowIdx)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 4. FOOTER & PAGINATION */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{
            flexShrink: 0,
            pt: 2,
            pb: 1.5,
            px: { xs: 1.5, sm: 3 },
            width: '100%',
            flexWrap: 'nowrap',
            justifyContent: { xs: 'space-between', sm: 'flex-end' },
          }}
        >
          {/* Left Side: Rows Per Page */}
          {onRowsPerPageChange ? (
            <Stack direction="row" alignItems="center" spacing={1} sx={{ flexWrap: 'nowrap' }}>
              <Typography variant="caption" fontWeight={500} color="#475569" sx={{ whiteSpace: 'nowrap', fontSize: { xs: 11, sm: 13 } }}>
                Rows Per Page :
              </Typography>
              <Select
                value={rowsPerPage}
                onChange={(e) => {
                  onRowsPerPageChange(Number(e.target.value));
                  onPageChange?.(0);
                }}
                size="small"
                sx={{
                  height: 32,
                  fontSize: 12.5,
                  fontWeight: 600,
                  borderRadius: 0,
                  bgcolor: '#ffffff',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#cbd5e1', borderRadius: 0 },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#94a3b8' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2563eb' },
                }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </Stack>
          ) : <Box />}

          {/* Right Side: Page X of Y & Nav buttons */}
          {onPageChange && (
            <Stack direction="row" alignItems="center" spacing={{ xs: 0.75, sm: 1.25 }} sx={{ flexWrap: 'nowrap' }}>
              <Typography variant="caption" fontWeight={500} color="#475569" sx={{ whiteSpace: 'nowrap', fontSize: { xs: 11, sm: 13 } }}>
                Page : {page + 1} of {totalPages}
              </Typography>

              <Stack direction="row" spacing={0.25} alignItems="center">
                <IconButton
                  size="small"
                  disabled={page === 0}
                  onClick={() => onPageChange(Math.max(0, page - 1))}
                  sx={{
                    p: 0.5,
                    color: page === 0 ? '#cbd5e1' : '#64748b',
                    '&:hover': { bgcolor: 'transparent', color: '#0f172a' },
                  }}
                >
                  <Iconify icon="solar:alt-arrow-left-linear" width={18} />
                </IconButton>
                <IconButton
                  size="small"
                  disabled={page + 1 >= totalPages}
                  onClick={() => onPageChange(page + 1)}
                  sx={{
                    p: 0.5,
                    color: page + 1 >= totalPages ? '#cbd5e1' : '#64748b',
                    '&:hover': { bgcolor: 'transparent', color: '#0f172a' },
                  }}
                >
                  <Iconify icon="solar:alt-arrow-right-linear" width={18} />
                </IconButton>
              </Stack>
            </Stack>
          )}
        </Stack>
      </Box>
    </Card>
  );
}
