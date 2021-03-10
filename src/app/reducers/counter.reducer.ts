import { Action, createReducer } from '@ngrx/store';


export interface CounterState {
  current: number;
}

const initialState: CounterState = {
  current: 0
};

const myReducer = createReducer(
  initialState
);

export function reducer(
  state: CounterState,
  action: Action): CounterState {
  return myReducer(state, action);
}
