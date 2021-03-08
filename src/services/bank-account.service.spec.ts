import { BankAccountService } from './bank-account.service';
import { BonusCalculatorService } from './bonus-calculator.service';

describe('BankAccountService', () => {
  let account: BankAccountService;
  let openingBalance: number;

  beforeEach(() => {
    // const dummyBonusCalculator: BonusCalculatorService = {
    //   calculateBonusFor(amount): number {
    //     return 0;
    //   }
    // };
    const dummyBonusCalculator
      = jasmine.createSpyObj<BonusCalculatorService>('tacoSalad', ['calculateBonusFor']);
    dummyBonusCalculator.calculateBonusFor.and.returnValue(0);
    account = new BankAccountService(dummyBonusCalculator);
    openingBalance = account.getBalance();
  });

  describe('A New Account', () => {

    it('It should have the correct starting balance', () => {
      expect(openingBalance).toBe(5000);
    });
  });

  describe('Making Deposits', () => {

    it('should increase the balance', () => {

      const amountToDeposit = 100;

      account.deposit(amountToDeposit);

      expect(account.getBalance()).toEqual(
        openingBalance + amountToDeposit
      );

    });

  });
  describe('Making Withdrawals', () => {

    it('should reduce the balance', () => {

      const amountToWithdraw = 100;

      account.withdraw(amountToWithdraw);

      expect(account.getBalance()).toEqual(
        openingBalance - amountToWithdraw
      );
    });
  });
});

describe('BankAccountService Collaborators', () => {

  it('should use the bonus calculator', () => {
    // I'm going to create a bonus calculator that returns a rediculous number
    // I will know it uses the calculator if that number is added to the balance.
    // Given - Arrange
    const stubbedCalculator = jasmine.createSpyObj<BonusCalculatorService>(
      'bonusCalculator', [
      'calculateBonusFor'
    ]
    );
    stubbedCalculator.calculateBonusFor.and.returnValue(42.37);
    const account = new BankAccountService(stubbedCalculator);
    const openingBalance = account.getBalance();
    const amountToDeposit = 100;
    // When - Act
    account.deposit(amountToDeposit);
    // Then - Assert
    expect(account.getBalance()).toEqual(
      openingBalance +
      amountToDeposit +
      42.37
    );

    expect(stubbedCalculator.calculateBonusFor)
      .toHaveBeenCalledOnceWith(openingBalance, amountToDeposit);
  });
});
