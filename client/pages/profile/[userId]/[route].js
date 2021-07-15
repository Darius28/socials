import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Avatar, Menu, Modal } from "antd";
import Link from "next/link";
import YourPosts from "../../../components/layout/YourPosts";
import axios from "axios";
import Replies from "../../../components/UserProfile/replies";
import Likes from "../../../components/UserProfile/Likes";
import { toast } from "react-toastify";
import { LinkOutlined, UserOutlined, CameraOutlined } from "@ant-design/icons";
import ProfileEditModal from "../../../components/section/ProfileEditModal";

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

export default function UserProfile() {
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editWebsite, setEditWebsite] = useState("");
  const [profile, setProfile] = useState({});
  const router = useRouter();
  const { userId } = router.query;
  const [allPosts, setAllPosts] = useState([]);
  const [current, setCurrent] = useState("posts");
  const currentPath = router.query.route;
  const [comp, setComp] = useState({});

  const [imgPreview, setImgPreview] = useState();

  useEffect(() => {
    const getAllPosts = async () => {
      const { data } = await axios.get("/api/get-posts");
      setAllPosts(data.posts);
    };

    const getUserProfileDetails = async () => {
      const { data } = await axios.get("/api/profile/get-profile-details");
      // console.log(data);
      setEditName(data.name);
      setEditBio(data.bio);
      setEditWebsite(data.website);
      setProfile(data);
    };
    getAllPosts();
    getUserProfileDetails();
  }, []);

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const setNewProfileValues = async () => {
    const { data } = await axios.get("/api/profile/get-profile-details");
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
    console.log(urlValid);

    if (!urlValid) {
      setConfirmLoading(false);
      toast.error("Invalid Website.");
      return;
    }

    const { data } = await axios.post(
      `/api/profile/${userId}/complete-profile`,
      {
        name,
        bio,
        website,
      }
    );

    setNewProfileValues();

    setConfirmLoading(false);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setImgPreview("")
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImgPreview(window.URL.createObjectURL(file));

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
      />
      <div className="d-flex" style={{ padding: "1.5rem" }}>
        <div className="profile-container" className="me-auto">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <Avatar
                src="https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg"
                size={96}
              />
            </div>
            <div>
              <h4>{profile.name}</h4>
            </div>
            <div>
              <p>{profile.bio}</p>
            </div>
            <div>
              <p>
                <span>
                  <LinkOutlined />{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://${profile.website}`}
                  >
                    {profile.website}
                  </a>
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
          <button className="btn btn-primary" onClick={showModal}>
            Edit Profile
          </button>
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
          {comp === "posts" && <YourPosts allPosts={allPosts} name={""} />}
          {comp === "with-replies" && <Replies />}
          {comp === "likes" && <Likes />}
        </div>
      </div>
    </div>
  );
}
