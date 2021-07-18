import { Menu, Avatar } from "antd";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import {
  LoginOutlined,
  UserOutlined,
  HomeOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { AuthContext } from "../../context/auth-context";
const { SubMenu, Item } = Menu;
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function AuthNav() {
  const router = useRouter();
  const [current, setCurrent] = useState("");
  const { state, dispatch } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState("");
  const [userName, setUserName] = useState("");

  const handleClick = (e) => {
    setCurrent((current) => {
      return (current = e.key);
    });
  };

  // useEffect(() => {
  //   setUserName(state.user.name);
  // }, []);

  useEffect(() => {
    // console.log(JSON.parse(localStorage.getItem("profile_pic")).Location);
    if (localStorage.getItem("profile_pic")) {
      setProfilePic(JSON.parse(localStorage.getItem("profile_pic")).Location);
    }

    // console.log("localStorage changed");
    // console.log(profilePic);
  }, [state]);

  // useEffect(() => {
  //   console.log("auth nav fresh render")
  //   setProfilePic(JSON.parse(localStorage.getItem("profile_pic")).Location);
  // }, []);

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  // const nameTitle = state.user && state.user ? (
  //   <>
  //     <Avatar size={40} src={profilePic} /> {state.user.name}
  //   </>
  // ) : (
  //   <>
  //     <Avatar size={40} icon={<UserOutlined />} /> {state.user.name}
  //   </>
  // );

  // console.log(state.user, state.profilePic);

  const nameTitle =
    state.profilePic || profilePic ? (
      <>
        <Avatar size={40} src={profilePic} /> {userName}
      </>
    ) : (
      <>
        <Avatar size={40} icon={<UserOutlined />} /> {userName}
      </>
    );

  const logoutHandler = async () => {
    try {
      const { data } = await axios.post("/api/logout");
      dispatch({
        type: "LOGOUT",
      });
      localStorage.removeItem("user");
      localStorage.removeItem("profile_pic");
      router.replace("/");
      toast("Logout was successful.");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const profilePush = () => {
    router.push(`/profile/${state.user._id}/posts`);
  };

  return (
    <Menu
      onClick={handleClick}
      className="d-flex"
      selectedKeys={[current]}
      mode="horizontal"
    >
      <Item
        key={state.user ? "/home" : "/"}
        icon={<HomeOutlined />}
        className="me-auto"
      >
        <Link href={state.user ? "/home" : "/"}>Home</Link>
      </Item>
      {!state.user && (
        <>
          <Item key="/signup" icon={<UserOutlined />}>
            <Link href="/signup">Sign Up</Link>
          </Item>
          <Item key="/login" icon={<LoginOutlined />}>
            <Link href="/login">Login</Link>
          </Item>
        </>
      )}
      {state.user && (
        <>
          <SubMenu title={nameTitle}>
            {/* {state.user.profile_pic ? (
              <Avatar icon={<LoginOutlined />} onClick={profilePush}>
                Profile
              </Avatar>
            ) : (
              <Avatar icon={<ProfileOutlined />} onClick={profilePush}>
                Profile
              </Avatar>
            )} */}

            <Item icon={<ProfileOutlined />} onClick={profilePush}>
              Profile
            </Item>
            <Item
              icon={<LogoutOutlined />}
              onClick={logoutHandler}
              className="text-danger"
            >
              Logout
            </Item>
          </SubMenu>
        </>
      )}
    </Menu>
  );
}
