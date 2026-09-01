"use client";

import { useState } from "react";
import { Provider } from "react-redux";


export default function Providers({ children }) {
  // Lazy initializer: the store is created exactly once per client
  // (and once per request during SSR), never shared between requests.
  const [store] = useState();

  return <Provider store={store}>{children}</Provider>;
}
