import { inject } from '@angular/core';
import { signalStoreFeature, withMethods } from '@ngrx/signals';
import { Actions } from './actions';
import { Action } from '@ngrx/store';

export type DispatchersDictionary = Record<string, (...args: any[]) => unknown>;

export function withDispatchers<Dispatchers extends DispatchersDictionary>(
  dispatchersFactory: (dispatch: (action: Action) => void) => Dispatchers
) {
  return signalStoreFeature(
    withMethods((store, actions = inject(Actions)) =>
      dispatchersFactory(actions.dispatch.bind(actions))
    )
  );
}
