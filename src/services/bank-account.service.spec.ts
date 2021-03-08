import { BankAccountService } from './bank-account.service';

describe('BankAccountService', () => {
  let account: BankAccountService;
  let openingBalance: number;

  beforeEach(() => {
    account = new BankAccountService();
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
