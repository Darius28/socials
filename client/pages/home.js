import React from "react";
import ThoughtInput from "../components/form/ThoughtInput";
import News from "../components/layout/News";

export default function Home() {
  return (
    <div className="d-flex" style={{ minHeight: "75vh" }}>
      <div
        className="col-md-9"
        style={{ borderRight: "1px solid rgb(204, 204, 204)", padding: "1rem" }}
      >
        <div className="row">
          <div className="col">
            <ThoughtInput />
          </div>
        </div>
      </div>
      <div className="col-md-3" style={{ padding: "1rem" }}>
        <News />
      </div>
    </div>
  );
}
