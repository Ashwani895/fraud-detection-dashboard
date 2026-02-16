import { useTransactionStore } from "../store/transactionStore";

function MetricsBar() {
  const transactions = useTransactionStore((s) => s.transactions);

  const total = transactions.length;

  const flagged = transactions.filter(
    (tx) => tx.riskScore >= 70
  ).length;

  const review = transactions.filter(
    (tx) => tx.riskScore >= 40 && tx.riskScore < 70
  ).length;

  const avgRisk =
    total === 0
      ? 0
      : Math.round(
          transactions.reduce((sum, tx) => sum + tx.riskScore, 0) / total
        );

  const cardStyle = {
    background: "#1e1e1e",
    padding: "20px",
    borderRadius: "10px",
    flex: 1,
    textAlign: "center",
  };

  const labelStyle = {
    fontSize: "14px",
    color: "#aaa",
    marginBottom: "8px",
  };

  const valueStyle = {
    fontSize: "28px",
    fontWeight: "bold",
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      <div style={cardStyle}>
        <div style={labelStyle}>Total Transactions</div>
        <div style={valueStyle}>{total}</div>
      </div>

      <div style={cardStyle}>
        <div style={labelStyle}>Flagged</div>
        <div style={{ ...valueStyle, color: "#ff4d4f" }}>
          {flagged}
        </div>
      </div>

      <div style={cardStyle}>
        <div style={labelStyle}>Review</div>
        <div style={{ ...valueStyle, color: "#faad14" }}>
          {review}
        </div>
      </div>

      <div style={cardStyle}>
        <div style={labelStyle}>Average Risk</div>
        <div style={{ ...valueStyle, color: "#52c41a" }}>
          {avgRisk}
        </div>
      </div>
    </div>
  );
}

export default MetricsBar;
