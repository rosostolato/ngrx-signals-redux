import { Component, inject } from '@angular/core';
import { CounterStore, counterProvider } from './state/counter';

@Component({
  selector: 'app-counter',
  standalone: true,
  providers: [counterProvider],
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
export class CounterComponent {
  readonly counter = inject(CounterStore);
}
