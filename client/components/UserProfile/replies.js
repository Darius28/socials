import React from "react";
import { useRouter } from "next/router";

export default function Replies() {
  const router = useRouter();
  const param = router.query;
  // console.log("param", param, window.location.pathname);
  return (
    <div>
      <h1>Replies</h1>
      <canvas
        width="150"
        height="150"
        style={{ border: "1px solid black" }}
      ></canvas>
    </div>
  );
}
