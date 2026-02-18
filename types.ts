
export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export enum Category {
  WORK = 'Work',
  PERSONAL = 'Personal',
  SHOPPING = 'Shopping',
  HEALTH = 'Health',
  FINANCE = 'Finance',
  OTHER = 'Other'
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate: string;
  createdAt: string;
  subTasks: SubTask[];
}

export interface TaskStats {
  completed: number;
  total: number;
  priorityDistribution: Record<Priority, number>;
}
