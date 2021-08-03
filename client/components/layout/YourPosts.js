import React, { useState, useEffect, useContext } from "react";
import Card from "../section/Card";
import { useRouter } from "next/router";
import axios from "axios";
import { AuthContext } from "../../context/auth-context";

export default function YourPosts({ allPosts, name }) {
  const { state } = useContext(AuthContext);
  const router = useRouter();
  const [userProfilePic, setUserProfilePic] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (router.pathname === "/home") {
      setUserId(JSON.parse(localStorage.getItem("user"))._id);
    } else if ((router.pathname = "/profile/[userId]/[route]")) {
      setUserId(router.query.userId);
    }
  }, [router]);

  useEffect(() => {
    const getProfilePic = async (req, res) => {
      const { data } = await axios.get(
        `/api/profile/${userId}/get-profile-pic`
      );
      setUserProfilePic(data.profilePic);
    };
    if (userId) {
      getProfilePic();
    }
  }, [userId]);

  useEffect(() => {
    if (state.user.profile_pic.Location !== userProfilePic.Location) {
      setUserProfilePic(state.user.profile_pic);
    }
  }, [state]);

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
              <Card post={post} name={name} userProfilePic={userProfilePic} />
            </>
          ))
      )}
    </div>
  );
}
