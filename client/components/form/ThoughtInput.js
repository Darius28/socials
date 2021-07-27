import React, { useState, useEffect, useContext } from "react";
import { Avatar, Tooltip, Image } from "antd";
import {
  UserOutlined,
  GifOutlined,
  BarChartOutlined,
  CalendarOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import { Collection, EmojiSmile } from "react-bootstrap-icons";
import { AuthContext } from "../../context/auth-context";

export default function ThoughtInput({
  handleSubmit,
  thoughtRef,
  postImgPreview,
  setPostImgPreview,
  postFileObj,
  setPostFileObj,
  cancelPhotoHandler,
}) {
  const { state } = useContext(AuthContext);

  const profilePic = state.profilePic ? state.profilePic.Location : "";

  

  const handlePostImgChange = (e) => {
    setPostImgPreview(window.URL.createObjectURL(e.target.files[0]));
    setPostFileObj(e.target.files[0]);
  };

  

  return (
    <div style={{ borderBottom: "1px solid rgb(204, 204, 204)" }}>
      <div className="row">
        <div className="col d-flex">
          <div>
            {profilePic ? (
              <Avatar size={64} src={profilePic} />
            ) : (
              <Avatar size={64} icon={<UserOutlined />} />
            )}
          </div>
          <textarea
            rows="3"
            cols="45"
            className="thought-input"
            placeholder="What's on your mind?"
            ref={thoughtRef}
            style={{ resize: "none" }}
          />
        </div>
      </div>
      {postImgPreview && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              border: "1px solid black",
            }}
          >
            <Image width={200} height="100%" src={postImgPreview} />
          </div>
          <div onClick={cancelPhotoHandler}>
            <Tooltip title="Remove Photo" placement="top">
              <CloseOutlined style={{ color: "red", cursor: "pointer" }} />
            </Tooltip>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col d-flex" style={{ marginLeft: "4rem" }}>
          <div className="thought-icon">
            <Tooltip title="Media" placement="bottom">
              <label htmlFor="postImage">
                <Collection size={24} />
              </label>
              <input
                type="file"
                hidden
                id="userFile"
                name="image"
                accept="image/*"
                id="postImage"
                onChange={handlePostImgChange}
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
          <div className="ms-auto mb-3">
            <button
              className="btn btn-primary"
              onClick={handleSubmit.bind(null, postFileObj)}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
