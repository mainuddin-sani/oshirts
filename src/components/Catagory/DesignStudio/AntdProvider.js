"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

const theme = {
  token: {
    colorPrimary: "#e4572e",
    borderRadius: 10,
    fontFamily: "inherit",
  },
};

/** Scopes Ant Design styles/theme to the design studio only. */
export default function AntdProvider({ children }) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </AntdRegistry>
  );
}
