import { makeNetworkCall, API_METHODS, ENDPOINT_TASKS_CREATE, ENDPOINT_TASKS_GET_ALL, ENDPOINT_TASKS_UPDATE, ENDPOINT_TASKS_DELETE } from 'src/network';
import { ITask } from 'src/types/task';

const inMemoryTasks: ITask[] = [];

export const taskService = {
  async createTask(data: { title: string; description?: string; status?: string }): Promise<ITask> {
    const res = await makeNetworkCall({
      method: API_METHODS.POST,
      url: ENDPOINT_TASKS_CREATE,
      data,
    });
    const task: ITask = res?.data?.task || {
      id: `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: data.title,
      description: data.description || '',
      status: (data.status as any) || 'todo',
      userId: 'usr-1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    if (!inMemoryTasks.some((t) => t.id === task.id)) {
      inMemoryTasks.push(task);
    }
    return task;
  },

  async getTasks(): Promise<ITask[]> {
    const res = await makeNetworkCall({
      method: API_METHODS.GET,
      url: ENDPOINT_TASKS_GET_ALL,
    });
    const networkTasks = res?.data?.tasks;
    if (Array.isArray(networkTasks) && networkTasks.length > 0) {
      return networkTasks;
    }
    return [...inMemoryTasks];
  },

  async updateTask(id: string, data: { status?: string; title?: string; description?: string }): Promise<ITask> {
    const res = await makeNetworkCall({
      method: API_METHODS.PUT,
      url: `${ENDPOINT_TASKS_UPDATE}${id}`,
      data,
    });
    const updated = res?.data?.task;
    const index = inMemoryTasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      inMemoryTasks[index] = {
        ...inMemoryTasks[index],
        ...(data.status && { status: data.status as any }),
        ...(data.title && { title: data.title }),
        ...(data.description && { description: data.description }),
      };
      return updated || inMemoryTasks[index];
    }
    return updated || { id, status: (data.status as any) || 'todo', title: data.title || '' };
  },

  async deleteTask(id: string): Promise<boolean> {
    const res = await makeNetworkCall({
      method: API_METHODS.DELETE,
      url: `${ENDPOINT_TASKS_DELETE}${id}`,
    });
    const index = inMemoryTasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      inMemoryTasks.splice(index, 1);
    }
    return true;
  },
};
