import { signalStore } from '@ngrx/signals';
import {
  createSelector,
  withDispatchers,
  withReducers,
  withSelectors,
} from 'ngrx-signals-redux';
import { decrement, increment, reset } from './counter.actions';
import { counterReducer } from './counter.reducer';

export const CounterStore = signalStore(
  withReducers(counterReducer),
  withSelectors(({ value }) => ({
    isEven: createSelector(value, (value) => value % 2 === 0),
  })),
  withDispatchers((dispatch) => ({
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
    reset: () => dispatch(reset()),
  }))
);
