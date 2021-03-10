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


// addings songs.
let id = 1;
export const songAdded = createAction(
  '[app] songs song added',
  ({ title, artist, album }: { title: string, artist?: string, album?: string }) => ({

    payload: {
      title, artist, album,
      id: 'TEMP' + id++
    } as SongEntity

  })
);

export const songAddedSuccessfully = createAction(
  '[app] song added successfully',
  props<{ payload: SongEntity, oldId: string }>()
);

export const songAddedFailure = createAction(
  '[app] song added failure',
  props<{ payload: SongEntity, reason: string }>()
);
