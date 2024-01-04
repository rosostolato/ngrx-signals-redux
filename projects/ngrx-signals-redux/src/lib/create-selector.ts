import { Signal, isSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, isObservable } from 'rxjs';

type SelectorsArray = Array<
  ((state: object) => unknown) | Signal<unknown> | Observable<unknown>
>;

type ExtractSelectors<Selectors extends SelectorsArray> = {
  [K in keyof Selectors]: Selectors[K] extends Observable<infer T>
    ? T
    : Selectors[K] extends Signal<infer T>
    ? T
    : Selectors[K] extends (state: object) => infer T
    ? T
    : never;
};

type Projector<Selectors extends SelectorsArray, TResult> = (
  ...args: ExtractSelectors<Selectors>
) => TResult;

export function createSelector<State extends object, TResult>(
  projector: (state: State) => TResult
): (state: State) => TResult;

export function createSelector<
  State extends object,
  Selectors extends SelectorsArray,
  TResult
>(
  ...selectorsWithProjector: [
    ...selectors: Selectors,
    projector: Projector<Selectors, TResult>
  ]
): (state: State) => TResult;

export function createSelector<
  State extends object,
  Selectors extends SelectorsArray,
  Result
>(
  ...selectorsWithProjector: [
    ...selectors: Selectors,
    projector: Projector<Selectors, Result>
  ]
): (state: State) => Result {
  const selectors = selectorsWithProjector.slice(0, -1) as Selectors;
  const projector = selectorsWithProjector.at(-1) as Projector<
    Selectors,
    Result
  >;

  const signals = selectors.map((selector) => {
    if (isObservable(selector)) {
      return toSignal(selector);
    }
    if (isSignal(selector)) {
      return selector;
    }
    return selector;
  });

  return (state) => {
    const values = signals.map((signal) =>
      isSignal(signal) ? signal() : signal(state)
    );
    return projector.apply(
      null,
      (values.length ? values : [state]) as ExtractSelectors<Selectors>
    );
  };
}
