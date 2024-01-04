import { Component, inject } from '@angular/core';
import { provideStore } from 'ngrx-signals-redux';
import { CounterStore } from './state/counter/counter.store';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [provideStore(CounterStore)],
  imports: [],
  template: `
    <h1>Counter</h1>
    <p>Current Count: {{ counter.value() }}</p>
    <p>Is Even: {{ counter.isEven() }}</p>

    <button (click)="counter.increment()">Increment</button>
    <button (click)="counter.decrement()">Decrement</button>
    <button (click)="counter.reset()">Reset Counter</button>
  `,
})
export class AppComponent {
  readonly counter = inject(CounterStore);
}
