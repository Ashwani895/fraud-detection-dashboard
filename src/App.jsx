import { useEffect } from "react";
import { generateMockTransaction } from "./utils/generateMockTransaction";
import { calculateRisk } from "./features/riskEngine";
import { useTransactionStore } from "./store/transactionStore";
import { useRuleStore } from "./store/ruleStore";
import TransactionTable from "./components/TransactionTable";
import FilterBar from "./components/FilterBar";
import RuleBuilder from "./components/RuleBuilder";
import MetricsBar from "./components/MetricsBar";


function App() {
  const addTransaction = useTransactionStore((s) => s.addTransaction);
  const rules = useRuleStore((s) => s.rules);

  useEffect(() => {
    const interval = setInterval(() => {
      const tx = generateMockTransaction();

      // 🔥 Pass dynamic rules into risk engine
      const result = calculateRisk(tx, rules);
tx.riskScore = result.score;
tx.triggeredRules = result.triggeredRules;


      addTransaction(tx);
    }, 2000);

    return () => clearInterval(interval);
  }, [addTransaction, rules]);

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        backgroundColor: "#121212",
        color: "#ffffff"
      }}
    >
      <h1 style={{ marginBottom: "10px" }}>
        🚨 Fraud Detection Dashboard
      </h1>

      <p style={{ color: "#aaa", marginBottom: "20px" }}>
        Real-time transaction monitoring system
      </p>

      {/* Filters */}
      <FilterBar />

      {/* Rule Builder */}
      <RuleBuilder />
      
      <MetricsBar />

      {/* Transactions Table */}
      <TransactionTable />
    </div>
  );
}

export default App;
