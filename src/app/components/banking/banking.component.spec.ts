import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BankAccountService } from 'src/services/bank-account.service';
import { BankingComponent } from './banking.component';

describe('BankingComponent', () => {

  let component: BankingComponent;
  let fixture: ComponentFixture<BankingComponent>;
  let bankingServiceSpy: jasmine.SpyObj<BankAccountService>;

  beforeEach(() => {
    bankingServiceSpy = jasmine.createSpyObj<BankAccountService>(
      'tacos',
      ['getBalance', 'deposit', 'withdraw']
    );
    TestBed.configureTestingModule({
      declarations: [BankingComponent],
      providers: [{
        provide: BankAccountService, useValue: bankingServiceSpy
      }]
    });

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankingComponent);
    component = fixture.componentInstance;
    bankingServiceSpy.getBalance.and.returnValue(42);
    fixture.detectChanges();
  });

  describe('intitialization', () => {
    it('has the appropriate balance displayed', () => {

      const bankingDe = fixture.debugElement;
      const bonusDe = bankingDe.query(By.css('[data-t-banking-balance]'));
      const bonusEl = bonusDe.nativeElement as HTMLSpanElement;
      expect(bonusEl.textContent).toEqual('$42.00');
    });


  });
  describe('making deposits', () => {


  });
  describe('making withdrawals', () => {


  });
});
