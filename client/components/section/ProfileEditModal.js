import React from "react";
import { Modal, Avatar, Tooltip } from "antd";
import { CameraOutlined } from "@ant-design/icons";

export default function ProfileEditModal({
  isModalVisible,
  handleOk,
  handleCancel,
  confirmLoading,
  editNameRef,
  editName,
  editBio,
  editWebsite,
  setEditName,
  setEditBio,
  setEditWebsite,
  handleImage,
  imgPreview,
  editProfilePic
}) {
  return (
    <Modal
      title="Edit Profile"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      okText="Submit"
    >
      <form>
        <div className="mb-3">
          <label>Image: </label>
          <div
            style={{
              width: "6rem",
              height: "6rem",
              borderRadius: "3rem",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: "0",
                left: "0",
                zIndex: "10",
                borderRadius: "3rem",
                backgroundColor: "black",
                opacity: "0.35",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  cursor: "pointer",
                }}
              >
                <Tooltip placement="bottom" title="New Image">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    hidden
                    id="profilePic"
                    onChange={handleImage}
                  />
                  <label htmlFor="profilePic" style={{ cursor: "pointer" }}>
                    <CameraOutlined style={{ color: "white", }} />
                  </label>
                </Tooltip>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: "0",
                left: "0",
              }}
            >
              {imgPreview ? (
                <Avatar size={96} src={imgPreview} />
              ) : (
                <Avatar
                  src={editProfilePic.Location}
                  size={96}
                />
              )}
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label>Name: </label>
          <input
            type="text"
            onChange={(e) => setEditName(e.target.value)}
            className="form-control"
            value={editName}
            ref={editNameRef}
          />
        </div>
        <div className="mb-3">
          <label>Bio: </label>
          <textarea
            onChange={(e) => setEditBio(e.target.value)}
            className="form-control"
            style={{ resize: "none" }}
            value={editBio}
          />
        </div>
        <div className="mb-3">
          <label>Website: </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setEditWebsite(e.target.value)}
            value={editWebsite}
          />
        </div>
      </form>
    </Modal>
  );
}
