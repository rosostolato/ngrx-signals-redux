import { inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Action } from '@ngrx/store';
import { Observable, filter, tap } from 'rxjs';

import { Actions } from './actions';

export interface EffectConfig {
  dispatch?: boolean;
}

export type DispatchType<Config> = Config extends { dispatch: false }
  ? unknown
  : Action;

export type EffectFn = {
  readonly type: 'effect';
  (): void;
};

export function createEffect<
  Config extends EffectConfig,
  ReturnType extends DispatchType<Config>
>(
  source: (actions: Observable<Action>) => Observable<ReturnType>,
  config?: Config
): EffectFn {
  const effect = () => {
    const actions = inject(Actions);
    source(actions)
      .pipe(
        filter(() => config?.dispatch !== false),
        tap((action) => {
          actions.dispatch(action as Action);
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  };
  effect.type = 'effect' as const;
  return effect;
}
