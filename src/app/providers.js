"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/redux/store";

export default function Providers({ children }) {
  // Lazy initializer: the store is created exactly once per client
  // (and once per request during SSR), never shared between requests.
  const [store] = useState(makeStore);

  return <Provider store={store}>{children}</Provider>;
}
