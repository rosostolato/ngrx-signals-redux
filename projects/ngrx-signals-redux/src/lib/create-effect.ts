import { Action } from '@ngrx/store';
import { Observable, filter, tap } from 'rxjs';
import { Actions } from './actions';

export type EffectFn = {
  (actions: Actions): Observable<Action>;
  type: 'effect';
};

export interface EffectConfig {
  dispatch?: boolean;
}

type DispatchType<Config> = Config extends { dispatch: false }
  ? unknown
  : Action;

export function createEffect<
  Config extends EffectConfig,
  ReturnType extends DispatchType<Config>
>(
  source: (actions: Observable<Action>) => Observable<ReturnType>,
  config?: Config
): EffectFn {
  const effect: EffectFn = (actions) =>
    source(actions).pipe(
      filter(() => config?.dispatch !== false),
      tap((action) => actions.dispatch(action as Action))
    );
  effect.type = 'effect';
  return effect;
}
