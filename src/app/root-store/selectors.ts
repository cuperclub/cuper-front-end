import { createSelector, MemoizedSelector } from '@ngrx/store';
import { UserStoreSelectors } from './user-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
  UserStoreSelectors.selectLoginError,
  (loginError: string) => {
    return loginError;
  }
);

export const selectIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  UserStoreSelectors.selectLoginIsLoading,
  (loginIsLoading: boolean) => {
    return loginIsLoading;
  }
);
