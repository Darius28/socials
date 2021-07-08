import React from "react";
import { SearchOutlined } from "@ant-design/icons";

export default function Search() {
  

  return (
    <div className="text-center">
      <input
      className="menu-search"
        type="text"
        placeholder="Search Socials"
        style={{ width: "100%", borderRadius: "0.9rem", padding: "0.5rem", border: "none", backgroundColor: "rgb(240, 242, 245)" }}
      />
    </div>
  );
}
