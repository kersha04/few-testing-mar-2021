import { ActionReducerMap, createSelector } from '@ngrx/store';
import { SongListItem } from '../models/songs';
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
export const _selectSongBranch = (state: AppState) => state.songs;


export const _selectSongsSortBy = createSelector(
  _selectSongBranch,
  b => b.sortBy
);

export const { selectAll: _selectSongEntityArray } =
  fromSongs.adapter.getSelectors(_selectSongBranch);

export const _selectSongListItems = createSelector(
  _selectSongEntityArray,
  a => a as SongListItem[]
);

// For the components:
// - CounterComponent needs the count!

export const selectCurrentCount = createSelector(
  _selectCounterBranch,
  b => b.current
);

export const selectSortedSongListItems = createSelector(
  _selectSongsSortBy,
  _selectSongListItems,
  (by, items) => {
    return [...items.sort((lhs, rhs) => {
      if (lhs[by].toLowerCase() < rhs[by].toLowerCase()) {
        return -1;
      }
      if (lhs[by].toUpperCase() > rhs[by].toLowerCase()) {
        return 1;
      }
      return 0;
    })];
  }
);
