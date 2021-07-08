import React from "react";
import Link from "next/link";
import { Layout, Menu } from "antd";

export default function HomeIndex() {
  return (
    <div>
      <h1 className="text-center mb-4">Welcome to SOCIALS</h1>
      <h2 className="text-center mb-4">Share thoughts, scribbls and more!</h2>
      <div className="text-center">
        <Link href="/signup">
          <button className="home-button">Click to get started!</button>
        </Link>
      </div>
    </div>
  );
}
