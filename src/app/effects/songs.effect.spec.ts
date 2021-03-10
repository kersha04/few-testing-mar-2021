import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SongsDataService } from 'src/services/songs-data.service';
import { SongEffects } from './songs.effects';
import { TestScheduler } from 'rxjs/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { loadSongData, loadSongsFailed, loadSongsSucceeded } from '../actions/songs.actions';
describe('Song Effects', () => {

  let serviceSpy: jasmine.SpyObj<SongsDataService>;
  let effects: SongEffects;
  let actions$: Observable<Action>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    actions$ = new Observable<Action>();
    serviceSpy = jasmine.createSpyObj('service', ['getSongs$']);
    TestBed.configureTestingModule({
      providers: [
        SongEffects,
        provideMockActions(() => actions$),
        { provide: SongsDataService, useValue: serviceSpy }
      ]
    });

    effects = TestBed.inject(SongEffects);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

  });

  it('creates the effect', () => {
    expect(effects).toBeTruthy();
  });
  it('loading songs', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      actions$ = hot('-a', { a: loadSongData() });

      serviceSpy.getSongs$.and.returnValue(
        cold('--a', { a: [{ id: '1', title: 'Tacos' }] })
      );

      expectObservable(effects.loadData$).toBe('---c', {
        c: loadSongsSucceeded({ payload: [{ id: '1', title: 'Tacos' }] })
      });

    });
  });
  it('Dispatches a failure when there is an http error', () => {

    testScheduler.run(({ hot, cold, expectObservable }) => {
      actions$ = hot('-a', { a: loadSongData() });
      serviceSpy.getSongs$.and.returnValue(
        cold('--#', undefined, { status: 500 })
      );
      expectObservable(effects.loadData$).toBe('---c', {
        c: loadSongsFailed({ reason: 'Bad things happened' })
      });
    });
  });
});
