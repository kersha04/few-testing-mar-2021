import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/songs.actions';
export interface SongEntity {
  id: string;
  title: string;
  artist?: string;
  album?: string;
}

export interface SongState extends EntityState<SongEntity> {
  sortBy: string;
}

export const adapter = createEntityAdapter<SongEntity>();

const initialState = adapter.getInitialState({
  sortBy: 'title'
});


const reducerFunction = createReducer(
  initialState,
  on(actions.loadSongData, actions.loadSongsFailed, () => initialState),
  on(actions.loadSongsSucceeded, (state, action) => adapter.setAll(action.payload, state)),
  on(actions.songAdded, (state, action) => adapter.addOne(action.payload, state)),
  on(actions.songAddedFailure, (state, action) => adapter.removeOne(action.payload.id, state)),
  on(actions.songAddedSuccessfully, (state, action) => adapter.updateOne({
    id: action.oldId,
    changes: {
      id: action.payload.id
    }
  }, state))
);

export function reducer(state: SongState = initialState, action: Action): SongState {
  return reducerFunction(state, action);
}



