"use client";

import { useMemo, useSyncExternalStore } from "react";
import { businessDaysFrom, deliveryOptions, formatDate } from "@/data/checkout";

const subscribeToNothing = () => () => {};
const onClient = () => true;
const onServer = () => false;

/**
 * Estimated delivery windows keyed by option id, or null until hydration.
 * The dates depend on the visitor's clock, so they are resolved client-side
 * only — the same pattern the product page uses for client-only values.
 */
export default function useDeliveryEstimates() {
  const ready = useSyncExternalStore(subscribeToNothing, onClient, onServer);

  return useMemo(() => {
    if (!ready) return null;

    return Object.fromEntries(
      deliveryOptions.map((option) => [
        option.id,
        `${formatDate(businessDaysFrom(option.businessDays[0]))} – ${formatDate(
          businessDaysFrom(option.businessDays[1])
        )}`,
      ])
    );
  }, [ready]);
}
