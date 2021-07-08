import React from "react";
import ThoughtInput from "../components/form/ThoughtInput";

export default function Home() {
  return (
    <div className="d-flex" style={{ minHeight: "50vh" }}>
      <div
        className="col-md-9"
        style={{ borderRight: "1px solid black", padding: "1rem" }}
      >
        <div className="row">
          <div className="col">
            <ThoughtInput />
          </div>
        </div>
      </div>
      <div className="col-md-3" style={{ padding: "1rem" }}>
        <h1>HI</h1>
      </div>
    </div>
  );
}
