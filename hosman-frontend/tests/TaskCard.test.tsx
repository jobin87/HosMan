import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskCard } from 'src/sections/tasks/task-card';
import { ITask } from 'src/types/task';

describe('TaskCard Component', () => {
  const mockTask: ITask = {
    id: 'task-test-1',
    title: 'Test Integration Feature',
    description: 'Verify task card renders correctly and triggers callbacks.',
    status: 'todo',
    userId: 'usr-1',
    userName: 'Test User',
    userEmail: 'test@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it('renders task title, description, and status chip', () => {
    render(
      <TaskCard
        task={mockTask}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onToggleStatus={vi.fn()}
      />
    );

    expect(screen.getByText('Test Integration Feature')).toBeInTheDocument();
    expect(screen.getByText('Verify task card renders correctly and triggers callbacks.')).toBeInTheDocument();
    expect(screen.getByTestId('task-status-chip')).toHaveTextContent('To Do');
  });

  it('triggers onToggleStatus when status toggle button is clicked', () => {
    const handleToggle = vi.fn();
    render(
      <TaskCard
        task={mockTask}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onToggleStatus={handleToggle}
      />
    );

    const toggleBtn = screen.getByRole('button', { name: /Mark as Completed/i });
    fireEvent.click(toggleBtn);
    expect(handleToggle).toHaveBeenCalledWith(mockTask);
  });
});
