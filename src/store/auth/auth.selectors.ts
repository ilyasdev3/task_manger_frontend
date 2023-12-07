import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { IUserTypes } from "./auth.types";

export const selectAuth = (state: { auth: IUserTypes }) => state.auth;

export const selectAuthInProgress = createDraftSafeSelector(
  selectAuth,
  (auth) => auth.isInProgress
);

export const selectAuthError = createDraftSafeSelector(
  selectAuth,
  (auth) => auth.error
);

export const selectAuthMessage = createDraftSafeSelector(
  selectAuth,
  (auth) => auth.message
);

export const selectAuthIsValidToken = createDraftSafeSelector(
  selectAuth,
  (auth) => auth.isValidToken
);
