import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FixtureElementUtils } from 'src/app/utils/testing';
import { CounterComponent } from './counter.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState, selectCurrentCount } from '../../reducers';
import { countDecremented, countIncremented } from 'src/app/actions/counter.actions';
describe('CounterComponent', () => {


  let componentFixture: ComponentFixture<CounterComponent>;
  let fixtureUtils: FixtureElementUtils;
  let store: MockStore;

  beforeEach(() => {
    const initialState: any = {

    };
    TestBed.configureTestingModule({
      declarations: [CounterComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    });

    store = TestBed.inject(MockStore);
    componentFixture = TestBed.createComponent(CounterComponent);
    fixtureUtils = new FixtureElementUtils(componentFixture.debugElement);
  });

  it('shows the current value', () => {
    const mockedSelector = store.overrideSelector(selectCurrentCount, 42);
    componentFixture.detectChanges();
    const countSpan = fixtureUtils
      .getNativeElement<HTMLSpanElement>('[data-t-counter-current]');

    expect(countSpan.textContent).toBe('42');
  });

  it('increments when we click the increment button', () => {
    const incrementButton = fixtureUtils.getNativeElement<HTMLButtonElement>(
      '[data-t-counter-increment-button]'
    );
    spyOn(store, 'dispatch');

    incrementButton.click();

    expect(store.dispatch).toHaveBeenCalledWith(countIncremented());
  });

  it('decrements when we click the decrement button', () => {
    const decrementButton = fixtureUtils.getNativeElement<HTMLButtonElement>(
      '[data-t-counter-decrement-button]'
    );
    spyOn(store, 'dispatch');

    decrementButton.click();

    expect(store.dispatch).toHaveBeenCalledWith(countDecremented());
  });
});
