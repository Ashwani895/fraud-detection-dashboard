export function evaluateRule(rule, transaction) {
  const { field, operator, value } = rule;

  const transactionValue = transaction[field];

  if (operator === ">") {
    return transactionValue > value;
  }

  if (operator === "<") {
    return transactionValue < value;
  }

  if (operator === "=") {
    return transactionValue === value;
  }

  return false;
}
