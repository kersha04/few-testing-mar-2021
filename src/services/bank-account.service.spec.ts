import { BankAccountService } from './bank-account.service';

describe('BankAccountService', () => {

  describe('A New Account', () => {

    it('It should have the correct starting balance', () => {
      const account = new BankAccountService();
      const openingBalance = account.getBalance();

      expect(openingBalance).toBe(5000);
    });
  });

  describe('Making Deposits', () => {

    it('should increase the balance');

  });
  describe('Making Withdrawals', () => {

    it('should reduce the balance');
  });
});
