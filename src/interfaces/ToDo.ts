export interface TodoItem {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  isCompleted: boolean;
}
