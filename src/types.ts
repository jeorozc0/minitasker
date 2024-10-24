// Define the status and priority as separate types for reusability
export type TaskStatus = 'uncompleted' | 'inProgress' | 'done'
export type PriorityLevel = 'low' | 'medium' | 'high'

// Main Task interface
export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: PriorityLevel;
  createdAt: number;
  updatedAt: number;
  dueDate?: number;
  project?: number;
  tags?: string[];
}

// Optional: Helper type for creating a new task (omits auto-generated fields)
export type NewTask = Omit<Task, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
  createdAt?: number;
  updatedAt?: number;
}

// Optional: Type for task updates
export type TaskUpdate = Partial<Task>
