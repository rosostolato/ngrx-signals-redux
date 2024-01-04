import { Provider, Type } from '@angular/core';
import { StateSignal } from '@ngrx/signals/src/state-signal';

import { Actions } from './actions';

export function provideStore(store: Type<StateSignal<any>>): Provider[] {
  return [Actions, store];
}
