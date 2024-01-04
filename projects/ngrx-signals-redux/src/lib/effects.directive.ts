import { Directive, InjectionToken, Type, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Actions } from './actions';
import { EffectFn } from './create-effect';

export const EFFECTS_PROVIDERS = new InjectionToken<Type<any>[]>(
  'EFFECTS_PROVIDERS'
);

/**
 * @description
 * A directive to automatically subscribe to effects.
 */
@Directive({
  standalone: true,
})
export class EffectsDirective {
  constructor() {
    const actions = inject(Actions);
    const effects = inject(EFFECTS_PROVIDERS);
    effects.forEach((effect) => {
      Object.values(inject(effect))
        .filter(
          (prop): prop is EffectFn =>
            typeof prop === 'function' &&
            'type' in prop &&
            prop.type === 'effect'
        )
        .forEach((effectFn) => {
          if (effectFn.type === 'effect') {
            effectFn(actions).pipe(takeUntilDestroyed()).subscribe();
          }
        });
    });
  }
}
