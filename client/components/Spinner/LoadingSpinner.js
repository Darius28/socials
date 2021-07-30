import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 72 }} spin />;

export default function LoadingSpinner({ spinning }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Spin indicator={antIcon} spinning={spinning} />
    </div>
  );
}
