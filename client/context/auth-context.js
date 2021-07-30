import axios from "axios";
import { useRouter } from "next/router";
import { useReducer, createContext, useEffect } from "react";

const initialState = {
  user: null,
  profilePic: "",
  allUsers: [],
  searchProfileTerm: "",
  matchedProfiles: [],
};

const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null, profilePic: "" };
    case "SET_PROFILE_PIC":
      return { ...state, profilePic: action.payload };
    case "SET_ALL_USERS":
      return { ...state, allUsers: action.payload };
    case "SEARCH_PROFILE":
      return { ...state, searchProfileTerm: action.payload };
    case "MATCHED_PROFILES":
      return { ...state, matchedProfiles: action.payload };
    default:
      return state;
  }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(rootReducer, initialState);
  useEffect(() => {
    console.log(
      "AuthProvider useEffect dispatched, payload :",
      JSON.parse(localStorage.getItem("user"))
    );
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(localStorage.getItem("user")),
    });
    if (state.profilePic || JSON.stringify(localStorage.getItem("profile_pic"))) {
      dispatch({
        type: "SET_PROFILE_PIC",
        payload: JSON.parse(localStorage.getItem("profile_pic")),
      });
    }
  }, []);

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get("/api/logout")
            .then((data) => {
              console.log("/401 error > logout");
              dispatch({ type: "LOGOUT" });
              window.localStorage.removeItem("user");
              router.replace("/login");
            })
            .catch((err) => {
              console.log("AXIOS INTERCEPTORS ERR", err);
              reject(error);
            });
        });
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get("/api/get-csrf-token");
      axios.defaults.headers["X-CSRF-Token"] = data.csrfToken;
    };
    getCsrfToken();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
