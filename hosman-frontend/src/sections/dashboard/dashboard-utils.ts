export function formatDate(dateStr?: string) {
  if (!dateStr) return 'N/A';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 'N/A';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return 'N/A';
  }
}

export function getTaskPriorityTag(index: number) {
  const tags = [
    { label: 'SAME_DAY', bg: '#fff7ed', color: '#ea580c' },
    { label: 'EXPRESS', bg: '#fef3c7', color: '#d97706' },
    { label: 'NEXT_DAY', bg: '#e0f2fe', color: '#0284c7' },
    { label: 'STANDARD', bg: '#f0fdf4', color: '#16a34a' },
  ];
  return tags[index % tags.length];
}
