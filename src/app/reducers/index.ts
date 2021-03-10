import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromCounter from './counter.reducer';

export interface AppState {
  counter: fromCounter.CounterState;
}

export const reducers: ActionReducerMap<AppState> = {
  counter: fromCounter.reducer
};

export const _selectCounterBranch = (state: AppState) => state.counter;


// For the components:
// - CounterComponent needs the count!

export const selectCurrentCount = createSelector(
  _selectCounterBranch,
  b => b.current
);
