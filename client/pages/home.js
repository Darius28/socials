import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import News from "../components/layout/News";
import FeedHandler from "../components/handler/FeedHandler";
import { AuthContext } from "../context/auth-context";

export default function Home() {
  const { state, dispatch } = useContext(AuthContext);
  useEffect(() => {
    // console.log("in request");
    const searchProfiles = async () => {
      const { data } = await axios.get("/api/profile/search-profiles");
      console.log(data);
      dispatch({
        type: "SET_ALL_USERS",
        payload: data.users,
      });
    };

    searchProfiles();
    if (state.profilePic) {
      const getProfilePic = () => {
        dispatch({
          type: "SET_PROFILE_PIC",
          payload: JSON.parse(localStorage.getItem("profile_pic")),
        });
      };
      getProfilePic();
    }
  }, []);

  console.log(state);

  return (
    <div className="d-flex" style={{ minHeight: "75vh" }}>
      
      <div
        className="col-md-9"
        style={{ borderRight: "1px solid rgb(204, 204, 204)", padding: "1rem" }}
      >
        <div className="row">
          <div className="col">
            <FeedHandler />
          </div>
        </div>
      </div>
      <div className="col-md-3" style={{ padding: "1rem" }}>
        <News />
      </div>
    </div>
  );
}
