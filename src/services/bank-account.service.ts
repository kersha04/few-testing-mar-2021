import { BonusCalculatorService } from './bonus-calculator.service';


export class BankAccountService {

  constructor(private bonusCalculator: BonusCalculatorService) { }
  private _balance = 5000;

  getBalance(): number {
    return this._balance;
  }

  deposit(amount: number): void {
    const bonus = this.bonusCalculator.calculateBonusFor(
      this._balance,
      amount
    );

    this._balance += amount + bonus;
  }

  withdraw(amountToWithdraw: number): void {
    this._balance -= amountToWithdraw;
  }

}
