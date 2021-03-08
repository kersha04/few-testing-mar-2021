export class BonusCalculatorService {


  calculateBonusFor(balance: number, amount: number): number {
    return balance >= 10_000 ? amount * .1 : 0;
  }

}
