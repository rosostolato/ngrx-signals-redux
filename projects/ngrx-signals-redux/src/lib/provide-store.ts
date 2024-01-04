import { Provider, Type } from '@angular/core';
import { StateSignal } from '@ngrx/signals/src/state-signal';

import { Actions } from './actions';
import { EFFECTS_PROVIDERS } from './effects.directive';

export function provideStore(
  store: Type<StateSignal<any>>,
  ...effects: Type<any>[]
): Provider[] {
  return [
    Actions,
    store,
    ...effects,
    {
      provide: EFFECTS_PROVIDERS,
      useValue: effects,
    },
  ];
}
