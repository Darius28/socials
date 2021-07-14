import React from "react";
import Card from "../section/Card";

export default function YourPosts({ allPosts, name }) {
  return (
    <div>
      {allPosts.length === 0 ? (
        <>
          <div
            style={{
              backgroundColor: "rgb(240, 242, 245)",
              marginTop: "0.5rem",
              borderRadius: "1rem",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            <h3>There are no posts yet!</h3>
            <p>Start posting or follow your friends to start seeing posts</p>
          </div>
        </>
      ) : (
        allPosts
          .slice(0)
          .reverse()
          .map((post) => (
            <>
              <Card post={post} name={name} />
            </>
          ))
      )}
    </div>
  );
}
