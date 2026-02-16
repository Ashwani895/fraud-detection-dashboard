import { create } from "zustand";

const MAX_TRANSACTIONS = 200; // change limit here anytime

export const useTransactionStore = create((set) => ({
  transactions: [],
  filterRisk: "ALL",
  searchUser: "",
  minAmount: "",

  addTransaction: (tx) =>
    set((state) => {
      const updated = [tx, ...state.transactions];

      // Prevent unbounded memory growth
      if (updated.length > MAX_TRANSACTIONS) {
        updated.length = MAX_TRANSACTIONS;
      }

      return { transactions: updated };
    }),

  setFilterRisk: (value) => set({ filterRisk: value }),
  setSearchUser: (value) => set({ searchUser: value }),
  setMinAmount: (value) => set({ minAmount: value }),
}));
