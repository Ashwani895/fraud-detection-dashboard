import { useTransactionStore } from "../store/transactionStore";

function TransactionTable() {
  const transactions = useTransactionStore((state) => state.transactions);
  const filterRisk = useTransactionStore((state) => state.filterRisk);
  const searchUser = useTransactionStore((state) => state.searchUser);
  const minAmount = useTransactionStore((state) => state.minAmount);

  const getRiskColor = (score) => {
    if (score >= 70) return "#ff4d4f";
    if (score >= 40) return "#faad14";
    return "#52c41a";
  };

  const getStatus = (score) => {
    if (score >= 70) return "FLAGGED";
    if (score >= 40) return "REVIEW";
    return "APPROVED";
  };

  const cellStyle = {
    padding: "10px",
    borderRight: "1px solid #303030",
    textAlign: "center",
  };

  const headerStyle = {
    ...cellStyle,
    fontWeight: "bold",
    backgroundColor: "#141414",
  };

  // ✅ APPLY FILTERS HERE
  const filteredTransactions = [...transactions]
    .filter((tx) => {
      // Risk Filter
      if (filterRisk !== "ALL") {
        if (getStatus(tx.riskScore) !== filterRisk) return false;
      }

      // Search User Filter
      if (
        searchUser &&
        !tx.userId.toLowerCase().includes(searchUser.toLowerCase())
      ) {
        return false;
      }

      // Minimum Amount Filter
      if (minAmount && tx.amount < Number(minAmount)) {
        return false;
      }

      return true;
    })
    .sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div
      style={{
        marginTop: "20px",
        overflowX: "auto",
      }}
    >
      <table
        style={{
          width: "100%",
          tableLayout: "fixed",
          borderCollapse: "collapse",
          backgroundColor: "#1f1f1f",
          color: "#ffffff",
        }}
      >
        <thead>
          <tr>
            <th style={{ ...headerStyle, width: "8%" }}>ID</th>
            <th style={{ ...headerStyle, width: "10%" }}>User</th>
            <th style={{ ...headerStyle, width: "10%" }}>Amount</th>
            <th style={{ ...headerStyle, width: "8%" }}>New Device</th>
            <th style={{ ...headerStyle, width: "8%" }}>Failures</th>
            <th style={{ ...headerStyle, width: "8%" }}>Geo</th>
            <th style={{ ...headerStyle, width: "10%" }}>Risk</th>
            <th style={{ ...headerStyle, width: "10%" }}>Status</th>
            <th style={{ ...headerStyle, width: "28%", borderRight: "none" }}>
              Triggered Rules
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredTransactions.map((tx) => (
            <tr
              key={tx.id}
              style={{
                borderBottom: "1px solid #303030",
              }}
            >
              <td style={cellStyle}>{tx.id.slice(0, 6)}</td>
              <td style={cellStyle}>{tx.userId}</td>
              <td style={cellStyle}>₹ {tx.amount}</td>
              <td style={cellStyle}>{tx.isNewDevice ? "Yes" : "No"}</td>
              <td style={cellStyle}>{tx.failedAttempts}</td>
              <td style={cellStyle}>{tx.geoMismatch ? "Yes" : "No"}</td>

              <td style={cellStyle}>
                <div
                  style={{
                    backgroundColor: getRiskColor(tx.riskScore),
                    color: "#000",
                    fontWeight: "bold",
                    borderRadius: "6px",
                    width: "60px",
                    padding: "6px 0",
                    margin: "0 auto",
                  }}
                >
                  {tx.riskScore}
                </div>
              </td>

              <td style={cellStyle}>
                <strong style={{ color: getRiskColor(tx.riskScore) }}>
                  {getStatus(tx.riskScore)}
                </strong>
              </td>

              <td
                style={{
                  padding: "10px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  borderRight: "none",
                }}
                title={tx.triggeredRules?.join(", ")}
              >
                {tx.triggeredRules?.length > 0
                  ? tx.triggeredRules.join(", ")
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
