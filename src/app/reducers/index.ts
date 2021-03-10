import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromCounter from './counter.reducer';
import * as fromSongs from './songs.reducer';

export interface AppState {
  counter: fromCounter.CounterState;
  songs: fromSongs.SongState;
}

export const reducers: ActionReducerMap<AppState> = {
  counter: fromCounter.reducer,
  songs: fromSongs.reducer
};

export const _selectCounterBranch = (state: AppState) => state.counter;


// For the components:
// - CounterComponent needs the count!

export const selectCurrentCount = createSelector(
  _selectCounterBranch,
  b => b.current
);
