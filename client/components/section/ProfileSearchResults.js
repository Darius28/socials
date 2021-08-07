import React, { useContext } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { AuthContext } from "../../context/auth-context";
import ProfileOverview from "../UserProfile/ProfileOverview";

export default function ProfileSearchResults({ onCloseHandler }) {
  const { state } = useContext(AuthContext);
  // console.log(state.matchedProfiles);
  return (
    <>
      <div
        style={{
          marginTop: "0.3rem",
          backgroundColor: "rgb(240, 242, 245)",
          minHeight: "40vh",
          borderRadius: "0.8rem",
        }}
      >
        <div
          className="d-flex align-items-center justify-content-between"
          style={{
            borderBottom: "1px solid rgb(204, 204, 204)",
            padding: "0.6rem",
          }}
        >
          <div>
            <h4 style={{ marginBottom: "0" }}>Search Results: </h4>
          </div>
          <div style={{ cursor: "pointer" }} onClick={onCloseHandler}>
            <CloseOutlined style={{ color: "red" }} />
          </div>
        </div>
        <div>
          {state.matchedProfiles.map((profile) => (
            <ProfileOverview name={profile.name} id={profile._id} />
          ))}
        </div>
      </div>
    </>
  );
}
