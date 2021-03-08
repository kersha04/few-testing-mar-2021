

export class BankAccountService {

  private _balance = 5000;

  getBalance(): number {
    return this._balance;
  }

  deposit(amount: number): void {
    this._balance += amount;
  }

  withdraw(amountToWithdraw: number): void {
    this._balance -= amountToWithdraw;
  }

}
