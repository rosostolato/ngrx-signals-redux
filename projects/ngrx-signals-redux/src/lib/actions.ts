import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Subject } from 'rxjs';

@Injectable()
export class Actions extends Subject<Action> {
  dispatch(...actions: Action[]): void {
    actions.forEach((action) => {
      this.next(action);
    });
  }
}
