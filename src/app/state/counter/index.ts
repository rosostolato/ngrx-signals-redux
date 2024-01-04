import { provideStore } from 'ngrx-signals-redux';
import { CounterStore } from './counter.store';
export { CounterStore } from './counter.store';

export const counterProvider = provideStore(CounterStore);
