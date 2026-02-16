import { useState } from "react";
import { useRuleStore } from "../store/ruleStore";

function RuleBuilder() {
  const { rules, addRule, deleteRule } = useRuleStore();

  const [field, setField] = useState("amount");
  const [operator, setOperator] = useState(">");
  const [value, setValue] = useState("");
  const [weight, setWeight] = useState("");

  const handleAdd = () => {
    if (!value || !weight) return;

    addRule({
      id: Date.now(),
      field,
      operator,
      value: Number(value),
      weight: Number(weight),
    });

    setValue("");
    setWeight("");
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <h3>Add Rule</h3>

      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <select value={field} onChange={(e) => setField(e.target.value)}>
          <option value="amount">Amount</option>
          <option value="failedAttempts">Failed Attempts</option>
        </select>

        <select value={operator} onChange={(e) => setOperator(e.target.value)}>
          <option value=">">{">"}</option>
          <option value="<">{"<"}</option>
        </select>

        <input
          type="number"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <input
          type="number"
          placeholder="Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <button onClick={handleAdd}>Add Rule</button>
      </div>

      {/* Active Rules */}
      <h4>Active Rules</h4>

      {rules.length === 0 && (
        <p style={{ color: "#aaa" }}>No active rules</p>
      )}

      {rules.map((rule) => (
        <div
          key={rule.id}
          style={{
            background: "#1e1e1e",
            padding: "8px 12px",
            marginBottom: "6px",
            borderRadius: "6px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>
            {rule.field} {rule.operator} {rule.value} → +{rule.weight}
          </span>

          <button
            onClick={() => deleteRule(rule.id)}
            style={{
              background: "red",
              border: "none",
              color: "white",
              padding: "4px 8px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default RuleBuilder;
