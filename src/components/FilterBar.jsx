import { useTransactionStore } from "../store/transactionStore";

function FilterBar() {
  const {
    filterRisk,
    setFilterRisk,
    searchUser,
    setSearchUser,
    minAmount,
    setMinAmount,
  } = useTransactionStore();

  const riskOptions = [
    { value: "ALL", label: "All Transactions" },
    { value: "APPROVED", label: "Approved" },
    { value: "REVIEW", label: "Review" },
    { value: "FLAGGED", label: "Flagged" },
  ];

  const getRiskBadgeColor = (value) => {
    switch (value) {
      case "APPROVED":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "REVIEW":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "FLAGGED":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-slate-500/10 text-slate-300 border-slate-500/20";
    }
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 p-5 shadow-xl shadow-black/20">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
        {/* Risk Filter Pills */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-1.5 text-slate-400 mr-1">
            {/* Filter Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wider">Status</span>
          </div>
          <div className="flex gap-1.5 bg-slate-800/60 rounded-xl p-1 border border-slate-700/40">
            {riskOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilterRisk(option.value)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  filterRisk === option.value
                    ? `${getRiskBadgeColor(option.value)} border shadow-lg`
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 border border-transparent"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-8 bg-slate-700/60" />

        {/* Search User */}
        <div className="relative flex-1 min-w-[200px]">
          {/* Search Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by User ID..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/40 rounded-xl text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200"
          />
        </div>

        {/* Min Amount */}
        <div className="relative min-w-[180px]">
          {/* Dollar Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <input
            type="number"
            placeholder="Min Amount"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/40 rounded-xl text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
