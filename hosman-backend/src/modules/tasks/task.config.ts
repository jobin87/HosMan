export const TASK_CONFIG = {
  serviceName: 'tasks',
  endpoints: {
    create: '',
    getAll: '',
    getOne: ':id',
    update: ':id',
    delete: ':id',
  },
  summary: {
    create: 'Create a new task for the authenticated user',
    getAll: 'Get task list (user sees own tasks; admin sees all tasks)',
    getOne: 'Get specific task details by ID',
    update: 'Update an existing task by ID',
    delete: 'Delete a task by ID',
  },
};
