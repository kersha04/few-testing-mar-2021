import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SongsDataService } from 'src/services/songs-data.service';
import { SongEffects } from './songs.effects';
import { TestScheduler } from 'rxjs/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { loadSongData, loadSongsFailed, loadSongsSucceeded, songAdded, songAddedFailure, songAddedSuccessfully } from '../actions/songs.actions';
describe('Song Effects', () => {

  let serviceSpy: jasmine.SpyObj<SongsDataService>;
  let effects: SongEffects;
  let actions$: Observable<Action>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    actions$ = new Observable<Action>();
    serviceSpy = jasmine.createSpyObj('service', ['getSongs$', 'addSong$']);
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

  it('can successfully add a song', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action = songAdded({
        title: 'Jaws Theme',
        artist: 'Williams',
        album: 'Jaws Soundtrack'
      });

      actions$ = hot('-a', { a: action });

      serviceSpy.addSong$.and.returnValue(
        cold('--a', { a: { id: '99', title: 'Jaws' } })
      );

      expectObservable(effects.addSong$).toBe('---c', {
        c: songAddedSuccessfully({ oldId: 'TEMP1', payload: { id: '99', title: 'Jaws' } })
      });
    });
  });

  it('dispatches a failure when the server barfs', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action = songAdded({
        title: 'Jaws Theme',
        artist: 'Williams',
        album: 'Jaws Soundtrack'
      });
      actions$ = hot('-a', { a: action });

      serviceSpy.addSong$.and.returnValue(
        cold('#', undefined, { status: 404 })
      );
      expectObservable(effects.addSong$).toBe('-c', {
        c: songAddedFailure({ payload: action.payload, reason: 'Blammo!' })
      });
    });
  });
});
