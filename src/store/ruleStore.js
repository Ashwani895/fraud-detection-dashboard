import { create } from "zustand";

export const useRuleStore = create((set) => ({
  rules: [],

  addRule: (rule) =>
    set((state) => ({
      rules: [...state.rules, rule],
    })),

  deleteRule: (id) =>
    set((state) => ({
      rules: state.rules.filter((r) => r.id !== id),
    })),
}));
