import { createAction, props } from '@ngrx/store';
import { SongEntity } from '../reducers/songs.reducer';


// Initiator -> Success -> Failure

export const loadSongData = createAction(
  '[app] songs load song data'
);

export const loadSongsSucceeded = createAction(
  '[app] songs load songs succeeded',
  props<{ payload: SongEntity[] }>()
);

export const loadSongsFailed = createAction(
  '[app] songs loading songs failed',
  props<{ reason: string }>()
);
