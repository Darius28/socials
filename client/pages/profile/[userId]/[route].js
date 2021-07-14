import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Avatar, Menu, Modal } from "antd";
import Link from "next/link";
import YourPosts from "../../../components/layout/YourPosts";
import axios from "axios";
import Replies from "../../../components/UserProfile/replies";
import Likes from "../../../components/UserProfile/Likes";

const { Item } = Menu;

export default function UserProfile() {
  const [name, setName] = useState("");
  const router = useRouter();
  const { userId } = router.query;
  const [allPosts, setAllPosts] = useState([]);
  const [current, setCurrent] = useState("posts");
  const currentPath = router.query.route;
  const [comp, setComp] = useState({});

  useEffect(() => {
    const getAllPosts = async () => {
      const { data } = await axios.get("/api/get-posts");
      setAllPosts(data.posts);
      setName(data.name);
    };
    getAllPosts();
  }, []);

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const handleClick = (e) => {
    setCurrent(e.key);
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
    const name = editNameRef.current.value;
    const bio = editBioRef.current.value;
    const website = editWebsiteRef.current.value;

    console.log(name, bio, website);

    setConfirmLoading(false);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const editNameRef = useRef();
  const editBioRef = useRef();
  const editWebsiteRef = useRef();

  return (
    <div className="container">
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
            <label>Name: </label>
            <input type="text" ref={editNameRef} className="form-control" />
          </div>
          <div className="mb-3">
            <label>Bio: </label>
            <textarea
              ref={editBioRef}
              className="form-control"
              style={{ resize: "none" }}
            />
          </div>
          <div className="mb-3">
            <label>Website: </label>
            <input type="text" ref={editWebsiteRef} className="form-control" />
          </div>
        </form>
      </Modal>
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
              <h4>{name}</h4>
            </div>
            <div>
              <p>Hi, my name is Likith and I'm into web dev </p>
            </div>
            <div
              style={{
                display: "flex",
                maxWidth: "11rem",
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
          {comp === "posts" && <YourPosts allPosts={allPosts} name={name} />}
          {comp === "with-replies" && <Replies />}
          {comp === "likes" && <Likes />}
        </div>
      </div>
    </div>
  );
}
