import React from "react";
import moment from "moment";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function Card({ post, name }) {
  // console.log(post, name)
  const time = moment(post.createdAt).format("DD/MM/YY, HH:mm");
  return (
    <div>
      <div className="post-card">
        <Avatar size={48} icon={<UserOutlined />} />
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
