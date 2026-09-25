import { describe, it, expect, beforeEach } from 'vitest';
import { taskService } from 'src/services/taskService';
import { authService } from 'src/services/authService';

describe('Task Management API & Authentication Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('authenticates user and saves JWT token securely', async () => {
    const authRes = await authService.register('Test Developer', 'dev@realprep.com', 'password123', 'admin');

    expect(authRes.token).toBeDefined();
    expect(authRes.user.email).toBe('dev@realprep.com');
    expect(authRes.user.role).toBe('admin');
    expect(authService.getToken()).toBe(authRes.token);
  });

  it('performs full Task CRUD workflow (Create, Read, Update, Delete)', async () => {
    // 1. Authenticate User
    await authService.login('admin@realprep.com', 'password123');

    // 2. Create Task
    const createdTask = await taskService.createTask({
      title: 'Integration Test Task',
      description: 'Testing task creation workflow.',
      status: 'todo',
    });

    expect(createdTask.id).toBeDefined();
    expect(createdTask.title).toBe('Integration Test Task');
    expect(createdTask.status).toBe('todo');

    // 3. Read Tasks List
    const allTasks = await taskService.getTasks();
    expect(allTasks.some((t) => t.id === createdTask.id)).toBe(true);

    // 4. Update Task Status
    const updatedTask = await taskService.updateTask(createdTask.id, {
      status: 'completed',
    });
    expect(updatedTask.status).toBe('completed');

    // 5. Delete Task
    const deleteResult = await taskService.deleteTask(createdTask.id);
    expect(deleteResult).toBe(true);

    const remainingTasks = await taskService.getTasks();
    expect(remainingTasks.some((t) => t.id === createdTask.id)).toBe(false);
  });
});
