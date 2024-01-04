import { Signal, computed } from '@angular/core';
import { getState } from '@ngrx/signals';
import {
  EmptyFeatureResult,
  InnerSignalStore,
  SignalStoreFeature,
  SignalStoreFeatureResult,
  SignalStoreSlices,
  SignalsDictionary,
} from '@ngrx/signals/src/signal-store-models';
import { Prettify } from '@ngrx/store/src/models';

type SelectorsDictionary = Record<string, (state: any) => unknown>;

type SelectorSignals<Selectors extends SelectorsDictionary> = {
  [K in keyof Selectors]: Signal<ReturnType<Selectors[K]>>;
};

// export function withSelectors<
//   State extends object,
//   Signals extends SignalsDictionary,
//   Selectors extends SelectorsDictionary,
// >(selectorsFactory: (store: Prettify<SignalStoreSlices<State> & Signals>) => Selectors) {
//   return signalStoreFeature(
//     { state: type<State>(), signals: type<Signals>() },
//     withComputed(store => {
//       const selectors = selectorsFactory(store);
//       return Object.entries(selectors).reduce(
//         (acc, [key, selector]) => ({
//           ...acc,
//           [key]: computed(() => selector(getState(store))),
//         }),
//         {} as SelectorSignals<Selectors>,
//       );
//     }),
//   );
// }

export function withSelectors<
  Input extends SignalStoreFeatureResult,
  Selectors extends SelectorsDictionary,
  Signals extends SignalsDictionary = SelectorSignals<Selectors>
>(
  selectorsFactory: (
    store: Prettify<SignalStoreSlices<Input['state']> & Input['signals']>
  ) => Selectors
): SignalStoreFeature<Input, EmptyFeatureResult & { signals: Signals }> {
  return (store) => {
    const selectors = selectorsFactory({ ...store.slices, ...store.signals });
    const signals = Object.entries(selectors).reduce(
      (acc, [key, selector]) => ({
        ...acc,
        [key]: computed(() => selector(getState(store))),
      }),
      {} as Signals
    );
    const signalsKeys = Object.keys(signals);
    const slices = excludeKeys(store.slices, signalsKeys);
    const methods = excludeKeys(store.methods, signalsKeys);

    return {
      ...store,
      slices,
      signals: { ...store.signals, ...signals },
      methods,
    } as InnerSignalStore<Record<string, unknown>, Signals>;
  };
}

function excludeKeys<
  Obj extends Record<string, unknown>,
  Keys extends string[]
>(obj: Obj, keys: Keys): Omit<Obj, Keys[number]> {
  return Object.keys(obj).reduce(
    (acc, key) => (keys.includes(key) ? acc : { ...acc, [key]: obj[key] }),
    {}
  ) as Omit<Obj, Keys[number]>;
}
