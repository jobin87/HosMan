export type TaskStatus = 'todo' | 'in_progress' | 'completed';

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  userId: string;
  userEmail?: string;
  userName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateTaskInput {
  title: string;
  description: string;
  status?: TaskStatus;
  userId?: string;
}

export interface IUpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  userId?: string;
}

