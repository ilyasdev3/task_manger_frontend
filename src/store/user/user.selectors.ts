import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { IUserTypes } from "./user.types";

export const selectUser = (state: { user: IUserTypes }) => state.user;

export const selectUserInProgress = createDraftSafeSelector(
  selectUser,
  (user) => user.isInProgress
);

export const selectUserError = createDraftSafeSelector(
  selectUser,
  (user) => user.error
);

export const selectUserMessage = createDraftSafeSelector(
  selectUser,
  (user) => user.message
);

export const selectUserData = createDraftSafeSelector(
  selectUser,
  (user) => user.user
);
