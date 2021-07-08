import React from "react";
import { Avatar, Tooltip } from "antd";
import {
  UserOutlined,
  GifOutlined,
  BarChartOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Collection, EmojiSmile } from "react-bootstrap-icons";

export default function ThoughtInput() {
  return (
    <div>
      <div className="row">
        <div className="col d-flex">
          <div>
            <Avatar size={64} icon={<UserOutlined />} />
          </div>
          <textarea
            rows="3"
            cols="30"
            className="thought-input"
            placeholder="What's on your mind?"
          />
        </div>
      </div>
      <div className="row">
        <div className="col d-flex" style={{ marginLeft: "4rem" }}>
          <div className="thought-icon">
            <Tooltip title="Media" placement="bottom">
              <label htmlFor="userFile">
                <Collection size={24} />
              </label>
              <input
                type="file"
                style={{ display: "none", visibility: "none" }}
                id="userFile"
              />
            </Tooltip>
          </div>
          <div className="thought-icon">
            <Tooltip title="GIF" placement="bottom">
              <GifOutlined style={{ fontSize: "24px" }} />
            </Tooltip>
          </div>
          <div className="thought-icon">
            <Tooltip title="Poll" placement="bottom">
              <BarChartOutlined style={{ fontSize: "24px" }} />
            </Tooltip>
          </div>
          <div className="thought-icon">
            <Tooltip title="Emoji" placement="bottom">
              <EmojiSmile size={24} />
            </Tooltip>
          </div>
          <div className="thought-icon">
            <Tooltip title="Schedule" placement="bottom">
              <CalendarOutlined style={{ fontSize: "24px" }} />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
