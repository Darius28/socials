import React from "react";
import Link from "next/link";

export default function ProfileOverview({ name, id }) {
  return (
    <div>
      <Link href={`/profile/${id}/posts`}>
        <h5 style={{ cursor: "pointer" }}>{name}</h5>
      </Link>
    </div>
  );
}
