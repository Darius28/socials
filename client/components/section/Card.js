import React, { useContext } from "react";
import moment from "moment";
import { AutoComplete, Avatar, Image, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { AuthContext } from "../../context/auth-context";
import { HeartOutlined } from "@ant-design/icons";
import { HeartFill } from "react-bootstrap-icons";
import axios from "axios";

export default function Card({ post, name, userProfilePic }) {
  const { state } = useContext(AuthContext);
  const time = moment(post.createdAt).format("DD/MM/YY, HH:mm");

  const likePostHandler = async (postId, userId) => {
    try {
      const { data } = await axios.post(
        `/api/post/${userId}/${postId}/like-post`
      );
    } catch (err) {
      // console.log(err);
    }
  };

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
      {post.picture && (
        <div
          style={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          <img
            src={post.picture.Location}
            style={{
              objectFit: "cover",
              maxHeight: "200px",
              maxWidth: "500px",
              objectPosition: "50% 50%",
            }}
          />
        </div>
      )}
      {post.sketchUri && (
        <div
          style={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          <img
            src={post.sketchUri}
            style={{
              border: "1px solid black",
              objectFit: "cover",
              maxHeight: "200px",
              maxWidth: "500px",
              objectPosition: "50% 50%",
            }}
          />
        </div>
      )}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <Tooltip
          title="Like"
          placement="bottom"
          onClick={likePostHandler.bind(null, post._id, post.userId)}
        >
          <HeartFill style={{ fontSize: "1.5rem", cursor: "pointer" }} />
        </Tooltip>
      </div>
      <hr />
    </div>
  );
}
