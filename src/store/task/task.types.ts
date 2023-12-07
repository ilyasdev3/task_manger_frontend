export interface ITaskTypes {
  title?: string;
  description?: string;
  _id?: string;
  completed: boolean;
  tasks?: any;
  isErrored?: boolean;
  error?: string;
  isInProgress?: boolean;
  message?: string;
  // taskDeleteMessage?: string;
}
