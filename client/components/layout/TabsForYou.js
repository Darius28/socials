import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth-context";
import ProfileSearchResults from "../section/ProfileSearchResults";

export default function TabsForYou() {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const onCloseHandler = () => {
    setShowSearchResults(false);
  };

  const { state } = useContext(AuthContext);

  useEffect(() => {
    if (state.searchProfileTerm.length === 0) {
      setShowSearchResults(false);
    } else {
      setShowSearchResults(true);
    }
  }, [state.searchProfileTerm]);

  return (
    <>
      {showSearchResults && (
        <ProfileSearchResults onCloseHandler={onCloseHandler} />
      )}
      <div
        style={{
          marginTop: "1.3rem",
          backgroundColor: "rgb(240, 242, 245)",
          minHeight: "60vh",
          borderRadius: "0.8rem",
        }}
      >
        <div
          style={{
            borderBottom: "1px solid rgb(204, 204, 204)",
            padding: "0.6rem",
          }}
        >
          <h4 style={{ marginBottom: "0" }}>What's Happening</h4>
        </div>
      </div>
    </>
  );
}
