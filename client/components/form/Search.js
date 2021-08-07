import React, { useContext } from "react";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import { AuthContext } from "../../context/auth-context";

export default function Search() {
  const { state, dispatch } = useContext(AuthContext);
  const profileSearchHandler = async (e) => {
    const searchTerm = e.target.value.toLowerCase();
    dispatch({
      type: "SEARCH_PROFILE",
      payload: searchTerm,
    });
    const matchedData = state.allUsers.filter((user) => {
      return user.name.toLowerCase().includes(searchTerm);
    });
    // console.log(matchedData);
    dispatch({
      type: "MATCHED_PROFILES",
      payload: matchedData,
    });
  };

  return (
    <div className="text-center">
      <div>
        <input
          className="menu-search"
          type="text"
          placeholder="Search Socials"
          style={{
            width: "100%",
            borderRadius: "0.9rem",
            padding: "0.5rem",
            border: "none",
            backgroundColor: "rgb(240, 242, 245)",
          }}
          onKeyUp={profileSearchHandler}
        />
      </div>
    </div>
  );
}
