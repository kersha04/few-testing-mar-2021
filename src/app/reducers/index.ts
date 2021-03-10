import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromCounter from './counter.reducer';

export interface AppState {
  counter: fromCounter.CounterState;
}

export const reducers: ActionReducerMap<AppState> = {
  counter: fromCounter.reducer
};

const selectCounterBranch = (state: AppState) => state.counter;


// For the components:
// - CounterComponent needs the count!

export const selectCurrentCount = createSelector(
  selectCounterBranch,
  b => b.current
);
