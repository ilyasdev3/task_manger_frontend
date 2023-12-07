import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { ITaskTypes } from "./task.types";

export const selectTask = (state: any) => state.task;

export const selectTaskTitle = createDraftSafeSelector(
  selectTask,
  (task: ITaskTypes) => task.title
);

export const selectTaskId = createDraftSafeSelector(
  selectTask,
  (task: ITaskTypes) => task._id
);
export const selectTaskCompleted = createDraftSafeSelector(
  selectTask,
  (task: ITaskTypes) => task.completed
);
export const selectTaskIsErrored = createDraftSafeSelector(
  selectTask,
  (task: ITaskTypes) => task.isErrored
);
export const selectTaskError = createDraftSafeSelector(
  selectTask,
  (task: ITaskTypes) => task.error
);
export const selectTaskIsInProgress = createDraftSafeSelector(
  selectTask,
  (task: ITaskTypes) => task.isInProgress
);
export const selectTaskMessage = createDraftSafeSelector(
  selectTask,
  (task: ITaskTypes) => task.message
);

export const selectTasks = createDraftSafeSelector(
  selectTask,
  (task: ITaskTypes) => task.tasks
);
