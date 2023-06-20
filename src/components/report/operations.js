export class CFOperations {
  constructor(cashFlowArray) {
    this.cashFlowArray = cashFlowArray;
  }

  operatingActivities() {
    return this.cashFlowArray.filter(
      (item) => item.record.activity === "Operating Activity"
    );
  }

  operatingReceivables(operatingArray) {
    return operatingArray.filter((item) => item.record.is_income === true);
  }

  operatingPayables(operatingArray) {
    return operatingArray.filter((item) => item.record.is_income === false);
  }

  investingActivities() {
    return this.cashFlowArray.filter(
      (item) => item.record.activity === "Investing Activity"
    );
  }

  investingReceivables(investingArray) {
    return investingArray.filter((item) => item.record.is_income === true);
  }

  investingPayables(investingArray) {
    return investingArray.filter((item) => item.record.is_income === false);
  }

  financingActivities() {
    return this.cashFlowArray.filter(
      (item) => item.record.activity === "Financing Activity"
    );
  }

  financingReceivables(financingArray) {
    return financingArray.filter((item) => item.record.is_income === true);
  }

  financingPayables(financingArray) {
    return financingArray.filter((item) => item.record.is_income === false);
  }
}

export const sumUpAmounts = (itemArray) => {
  let sum = 0;

  itemArray.forEach((item) => {
    sum += item.record.amount;
  });

  return sum;
};
