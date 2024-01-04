import { withHooks } from '@ngrx/signals';

import { EffectFn } from './create-effect';

export type EffectsDictionary = { [key: string]: EffectFn };

export function withEffects(effects: EffectsDictionary) {
  return withHooks({
    onInit() {
      Object.values(effects).forEach((effect) => effect());
    },
  });
}
