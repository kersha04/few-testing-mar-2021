import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SongsDataService } from 'src/services/songs-data.service';
import { SongEffects } from './songs.effects';
import { TestScheduler } from 'rxjs/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
describe('Song Effects', () => {

  let serviceSpy: jasmine.SpyObj<SongsDataService>;
  let effects: SongEffects;
  let action$: Observable<Action>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    action$ = new Observable<Action>();
    serviceSpy = jasmine.createSpyObj('service', ['getSongs$']);
    TestBed.configureTestingModule({
      providers: [
        SongEffects,
        provideMockActions(() => action$),
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
});
