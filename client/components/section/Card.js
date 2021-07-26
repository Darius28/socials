import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { AuthContext } from "../../context/auth-context";
import { useRouter } from "next/router";
import axios from "axios";

export default function Card({ post, name }) {
  const router = useRouter();
  console.log(router.query.userId);
  console.log(router);
  const { state } = useContext(AuthContext);
  console.log(state);
  // console.log(post, name)
  const time = moment(post.createdAt).format("DD/MM/YY, HH:mm");
  const [userProfilePic, setUserProfilePic] = useState("");

  useEffect(() => {
    if (router.pathname === "/home") {
      if (state.profilePic) {
        setUserProfilePic(JSON.parse(localStorage.getItem("profile_pic")));
      }
    } else {
      console.log("else stmt card")
      const getProfilePic = async (req, res) => {
        const { data } = await axios.get(
          `/api/profile/${router.query.userId}/get-profile-pic`
        );
        console.log(data.profilePic)
        setUserProfilePic(data.profilePic);
      };
      getProfilePic();
    }
  }, [state, router]);

  return (
    <div>
      <div className="post-card">
        {userProfilePic ? (
          <Avatar size={48} src={userProfilePic.Location} />
        ) : (
          <Avatar size={48} icon={<UserOutlined />} />
        )}

        <div>
          <span
            style={{ fontWeight: "500", fontSize: "1.5rem", margin: "0.5rem" }}
          >
            {name}
          </span>
        </div>
        <div>
          <span className="text-secondary">{time}</span>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "3rem" }}></div>
        <span style={{ margin: "0.5rem", fontSize: "1.0rem" }}>
          {post.content}
        </span>
      </div>
      <hr />
    </div>
  );
}
