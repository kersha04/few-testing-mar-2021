import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SongsDataService } from 'src/services/songs-data.service';

import * as actions from '../actions/songs.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable()
export class SongEffects {

  // loadSongData -> loadSongsSucceeded | loadSongsFailure
  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadSongData),
      switchMap(() => this.service.getSongs$()
        .pipe(
          map(payload => actions.loadSongsSucceeded({ payload })),
          catchError((err) => of(actions.loadSongsFailed({ reason: 'Bad things happened' })))
        )
      )
    )
  );

  constructor(private service: SongsDataService, private actions$: Actions) { }

}
