import { evaluateRule } from "./ruleEngine";

export function calculateRisk(tx, rules = []) {
  let score = 0;
  let triggeredRules = [];

  // Base rules (hardcoded)
  if (tx.amount > 10000) {
    score += 20;
    triggeredRules.push("Base: amount > 10000");
  }

  if (tx.isNewDevice) {
    score += 30;
    triggeredRules.push("Base: new device");
  }

  if (tx.failedAttempts > 3) {
    score += 25;
    triggeredRules.push("Base: failedAttempts > 3");
  }

  if (tx.geoMismatch) {
    score += 25;
    triggeredRules.push("Base: geo mismatch");
  }

  // Dynamic rules
  rules.forEach((rule) => {
    if (evaluateRule(rule, tx)) {
      score += Number(rule.weight);

      triggeredRules.push(
        `${rule.field} ${rule.operator} ${rule.value} (+${rule.weight})`
      );
    }
  });

  return {
    score: Math.min(score, 100),
    triggeredRules,
  };
}
