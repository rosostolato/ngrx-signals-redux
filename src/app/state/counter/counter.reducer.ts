import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';

export interface CounterState {
  value: number;
}

export const initialState: CounterState = {
  value: 0,
};

export const counterReducer = createReducer(
  initialState,
  on(increment, ({ value }) => ({ value: value + 1 })),
  on(decrement, (state) => ({ value: state.value - 1 })),
  on(reset, () => initialState)
);
