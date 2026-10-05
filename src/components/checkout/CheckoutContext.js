"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { calculateTotals } from "@/data/checkout";

const STORAGE_KEY = "ooshirts:checkout";

const EMPTY = {
  // Flipped once the browser store has been read, so views can tell an empty
  // checkout apart from one that simply has not loaded yet.
  hydrated: false,
  reviewed: false,
  instructions: null,
  shipping: null,
  delivery: "standard",
  // Card details are deliberately never kept here — the payment step holds
  // them in its own form state and nothing sensitive reaches storage.
  placedOrder: null,
};

/* =========================================================
   Checkout progress lives in session storage so a refresh or
   a step-to-step navigation never loses what was entered. It
   is exposed as an external store, which keeps the snapshot
   stable across renders and avoids hydration mismatches.
   ========================================================= */

let state = EMPTY;
let loaded = false;
const listeners = new Set();

const emit = () => listeners.forEach((listener) => listener());

function loadOnce() {
  if (loaded) return;
  loaded = true;

  try {
    const saved = window.sessionStorage.getItem(STORAGE_KEY);
    state = saved ? { ...EMPTY, ...JSON.parse(saved) } : state;
  } catch {
    // Private mode or blocked storage — checkout still works in memory.
  }

  state = { ...state, hydrated: true };
  emit();
}

function subscribe(listener) {
  listeners.add(listener);
  // React calls subscribe after mount, which is the right moment to read the
  // browser store; it re-reads the snapshot immediately afterwards.
  loadOnce();
  return () => listeners.delete(listener);
}

function persist(next) {
  state = next;

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore quota or access errors; checkout must not break over storage.
  }

  emit();
}

const getSnapshot = () => state;
const getServerSnapshot = () => EMPTY;

const CheckoutContext = createContext(null);

export function CheckoutProvider({ children }) {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const update = useCallback((patch) => persist({ ...state, ...patch }), []);
  const reset = useCallback(() => persist(EMPTY), []);

  const totals = useMemo(() => calculateTotals(current.delivery), [current.delivery]);

  const completed = useMemo(
    () => ({
      summary: Boolean(current.reviewed || current.instructions || current.shipping),
      instructions: Boolean(current.instructions),
      shipping: Boolean(current.shipping),
      payment: Boolean(current.placedOrder),
    }),
    [current.reviewed, current.instructions, current.shipping, current.placedOrder]
  );

  const value = useMemo(
    () => ({ ...current, totals, completed, update, reset }),
    [current, totals, completed, update, reset]
  );

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) throw new Error("useCheckout must be used inside CheckoutProvider");
  return context;
}
