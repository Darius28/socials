import React, { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";
import { Avatar, Menu, Spin } from "antd";
import Link from "next/link";
import YourPosts from "../../../components/layout/YourPosts";
import axios from "axios";
import Replies from "../../../components/UserProfile/replies";
import Likes from "../../../components/UserProfile/Likes";
import { toast } from "react-toastify";
import { LinkOutlined, UserOutlined, LoadingOutlined } from "@ant-design/icons";
import ProfileEditModal from "../../../components/section/ProfileEditModal";
import Resizer from "react-image-file-resizer";
import { AuthContext } from "../../../context/auth-context";
import _ from "lodash";
import LoadingSpinner from "../../../components/Spinner/LoadingSpinner";

const { Item } = Menu;

const isValidUrl = (website) => {
  const regexp =
    /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regexp.test(website)) {
    return true;
  } else {
    return false;
  }
};

const antIcon = <LoadingOutlined style={{ fontSize: 72 }} spin />;

export default function UserProfile() {
  const { state, dispatch } = useContext(AuthContext);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editWebsite, setEditWebsite] = useState("");
  const [editProfilePic, setEditProfilePic] = useState({});
  const [profile, setProfile] = useState({});
  const router = useRouter();
  const { userId } = router.query;
  const [allPosts, setAllPosts] = useState([]);
  const [current, setCurrent] = useState("posts");
  const currentPath = router.query.route;
  const [comp, setComp] = useState({});
  const [profilePicFileObj, setProfilePicFileObj] = useState({});
  const [profilePicAwsObj, setProfilePicAwsObj] = useState({});
  const [eName, setEName] = useState("");
  const [eBio, setEBio] = useState("");
  const [eWebsite, setEWebsite] = useState("");
  const [imgPreview, setImgPreview] = useState("");
  const [showEditButton, setShowEditButton] = useState(true);
  const [postsLoading, setPostsLoading] = useState(false);

  useEffect(() => {
    console.log("Router changed!");
    const getAllPosts = async () => {
      setPostsLoading(true);
      const { data } = await axios.get(
        `/api/post/${router.query.userId}/get-posts`
      );
      setAllPosts(data.posts);
      setPostsLoading(false);
    };

    if (router.query.userId === JSON.parse(localStorage.getItem("user"))._id) {
      setShowEditButton(true);
    } else {
      setShowEditButton(false);
    }

    const getUserProfileDetails = async () => {
      console.log(router.query.userId);
      const { data } = await axios.get(
        `/api/profile/${router.query.userId}/get-profile-details`
      );
      console.log("useEffect DATA: ", data);

      if (
        router.query.userId !== JSON.parse(localStorage.getItem("user"))._id
      ) {
        setEName(data.name);
        setEBio(data.bio);
        setEWebsite(data.website);
        setProfilePicAwsObj(data.profile_pic);
      } else {
        setEditName(data.name);
        setEditBio(data.bio);
        setEditWebsite(data.website);
        if (data.profile_pic) {
          console.log("data.profile_pic", data.profile_pic);
          setEditProfilePic(data.profile_pic);
        }
      }
      setProfile(data);
    };

    if (router.query.userId) {
      getAllPosts();
      getUserProfileDetails();
    }

    console.log("ROUTER CHANGED, state: ", state);
  }, [router]);

  useEffect(() => {
    if (
      state.user &&
      router.query.userId === JSON.parse(localStorage.getItem("user"))._id
    ) {
      setEName(JSON.parse(localStorage.getItem("user")).name);
      setEBio(JSON.parse(localStorage.getItem("user")).bio);
      setEWebsite(JSON.parse(localStorage.getItem("user")).website);
      console.log("Profile Pic state changed in [route]");
      if (state.profilePic) {
        console.log("state.profilePic: ", state.profilePic);
        setProfilePicAwsObj(JSON.parse(localStorage.getItem("profile_pic")));
      }
    }
    console.log(state);
  }, [state, router]);

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const setNewProfileValues = async () => {
    const { data } = await axios.get(
      `/api/profile/${router.query.userId}/get-profile-details`
    );
    setProfile(data);
    toast("Profile Updated.");
  };

  const navRoutes = [
    {
      slug: "posts",
      label: "Posts",
    },
    {
      slug: "with-replies",
      label: "Posts and Replies",
    },
    {
      slug: "likes",
      label: "Likes",
    },
  ];

  const findSlugMatchingCmp = () =>
    navRoutes.find((cmp) => {
      setComp(cmp.slug);
      return cmp.slug === router.query.route;
    });

  useEffect(() => {
    const foundComponent = findSlugMatchingCmp();
    console.log("current path: ", currentPath);
    console.log("found component: ", foundComponent);
    if (currentPath && !foundComponent) router.push("/404");
  }, [router]);

  const location = `/profile/${userId}`;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    const name = editName;
    const bio = editBio;
    const website = editWebsite;

    const urlValid = isValidUrl(website);

    if (!urlValid) {
      setConfirmLoading(false);
      toast.error("Invalid Website.");
      return;
    }
    if (imgPreview === "") {
      console.log("no img found");
      let data;
      data = await axios.post(`/api/profile/${userId}/complete-profile`, {
        name,
        bio,
        website,
        profile_pic: null,
      });

      let oldLSData = JSON.parse(localStorage.getItem("user"));
      let newLSData = { ...oldLSData, name, bio, website };
      console.log("oldLSData", oldLSData);
      console.log("new LS data", newLSData);
      localStorage.setItem("user", JSON.stringify(newLSData));
      dispatch({
        type: "LOGIN",
        payload: newLSData,
      });
    } else {
      Resizer.imageFileResizer(
        profilePicFileObj,
        720,
        500,
        "JPEG",
        100,
        0,
        async (uri) => {
          let data2;
          let data3;
          try {
            await axios
              .post("/api/profile/upload-profile-pic", {
                image: uri,
                prevImage: state.profilePic
                  ? JSON.parse(localStorage.getItem("profile_pic"))
                  : "",
              })
              .then(async ({ data }) => {
                console.log("data after then stmt: ", data);
                dispatch({
                  type: "SET_PROFILE_PIC",
                  payload: data,
                });
                let oldLSData = JSON.parse(localStorage.getItem("user"));
                let newLSData = { ...oldLSData, name, bio, website };
                console.log("oldLSData", oldLSData);
                console.log("new LS data", newLSData);
                localStorage.setItem("user", JSON.stringify(newLSData));
                localStorage.setItem("profile_pic", JSON.stringify(data));
                dispatch({
                  type: "LOGIN",
                  payload: newLSData,
                });
                data2 = await axios
                  .post(`/api/profile/${userId}/complete-profile`, {
                    name,
                    bio,
                    website,
                    profile_pic: data,
                  })
                  .then(async () => {
                    data3 = await axios.get(
                      `/api/profile/${userId}/get-profile-pic`
                    );
                    // console.log("data3: ", data3.data.profilePic);
                    // setProfilePicAwsObj(data3.data.profilePic);
                    console.log("setting data3: ", data3.data.profilePic);
                    setProfilePicAwsObj(data3.data.profilePic);
                  })
                  .catch((err) => console.log("data3 err", err));
                // console.log("completeProfile: ", data2);
              })
              .catch((err) => console.log("data2 err", err));
          } catch (err) {
            console.log(err);
          }
        }
      );
    }
    // console.log("after image upload: ", profilePicAwsObj);
    setNewProfileValues();
    setConfirmLoading(false);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setImgPreview("");
  };

  const handleImage = (e) => {
    setImgPreview(window.URL.createObjectURL(e.target.files[0]));
    setProfilePicFileObj(e.target.files[0]);
  };

  return (
    <div className="container">
      <ProfileEditModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        confirmLoading={confirmLoading}
        editName={editName}
        editBio={editBio}
        editWebsite={editWebsite}
        setEditName={setEditName}
        setEditBio={setEditBio}
        setEditWebsite={setEditWebsite}
        handleImage={handleImage}
        imgPreview={imgPreview}
        editProfilePic={editProfilePic}
      />
      <div className="d-flex" style={{ padding: "1.5rem" }}>
        <div className="profile-container" className="me-auto">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              {_.isEqual(profilePicAwsObj, {}) || !profilePicAwsObj ? (
                <Avatar icon={<UserOutlined />} size={96} />
              ) : (
                <Avatar src={profilePicAwsObj.Location} size={96} />
              )}
            </div>
            <div>
              <h4>{eName}</h4>
            </div>
            {eBio === undefined ? (
              <div>
                <p style={{ fontStyle: "italic" }}>
                  Add something about yourself!
                </p>
              </div>
            ) : (
              <div>
                <p>{eBio}</p>
              </div>
            )}

            <div>
              <p>
                <span>
                  <LinkOutlined />{" "}
                  {eWebsite === undefined ? (
                    <span style={{ fontStyle: "italic" }}>
                      Add your Website!
                    </span>
                  ) : (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://${eWebsite}`}
                    >
                      {eWebsite}
                    </a>
                  )}
                </span>
              </p>
            </div>
            <div
              style={{
                display: "flex",
                width: "11rem",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span style={{ fontWeight: "700" }}>20</span> Followers
              </div>
              <div>
                <span style={{ fontWeight: "700" }}>20</span> Following
              </div>
            </div>
          </div>
        </div>
        <div>
          {showEditButton ? (
            <>
              <button className="btn btn-primary" onClick={showModal}>
                Edit Profile
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <hr />
      <div className="tweets-container">
        <div>
          <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
          >
            {navRoutes.map((route) => {
              const path = `${location}/${route.slug}`;
              const label = route.label;
              return (
                <Item key={path}>
                  <Link href={path}>{label}</Link>
                </Item>
              );
            })}
          </Menu>
        </div>
        <div className="mt-3">
          {comp === "posts" ? (
            postsLoading ? (
              <LoadingSpinner spinning={postsLoading} />
            ) : (
              <YourPosts allPosts={allPosts} name={eName} />
            )
          ) : null}
          {comp === "with-replies" && <Replies />}
          {comp === "likes" && <Likes />}
        </div>
      </div>
    </div>
  );
}
