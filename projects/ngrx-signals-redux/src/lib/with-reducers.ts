import { inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  getState,
  patchState,
  signalStoreFeature,
  withHooks,
  withState,
} from '@ngrx/signals';
import { Action, ActionReducer } from '@ngrx/store';
import { tap } from 'rxjs';

import { Actions } from './actions';

export function withReducers<State extends object>(
  reducer: ActionReducer<State, Action>
) {
  return signalStoreFeature(
    withState(() => reducer(undefined, { type: '@ngrx/signals/init' })),
    withHooks({
      onInit(store) {
        inject(Actions)
          .pipe(
            tap((action) => {
              const state = getState(store);
              const nextState = reducer(state, action);
              const patch = Object.entries(nextState).reduce(
                (acc, [key, value]) => {
                  const k = key as keyof State;
                  if (state[k] !== value) {
                    acc[k] = value;
                  }
                  return acc;
                },
                {} as Partial<State>
              );
              patchState(store, patch);
            }),
            takeUntilDestroyed()
          )
          .subscribe();
      },
    })
  );
}
