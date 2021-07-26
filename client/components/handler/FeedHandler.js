import React, { useState, useEffect, useRef } from "react";
import ThoughtInput from "../form/ThoughtInput";
import YourPosts from "../layout/YourPosts";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function FeedHandler() {

  const [allPosts, setAllPosts] = useState([]);
  const [name, setName] = useState("");
  const thoughtRef = useRef();
  

  const reloadData = async () => {
    const route = JSON.parse(window.localStorage.getItem("user"))._id;
    const { data } = await axios.get(`/api/post/${route}/get-posts`);
    // console.log(data);
    setAllPosts(data.posts);
    toast("Post Successful.");
  };

  const handleSubmit = async () => {
    try {
      const thought = thoughtRef.current.value;
      //   console.log(thought);
      const { data } = await axios.post("/api/post-new-post", { thought });
      thoughtRef.current.value = "";
      reloadData();
    } catch (err) {
      toast(err.response.data);
    }
  };

  useEffect(() => {
    const getAllPosts = async () => {
      const route = JSON.parse(window.localStorage.getItem("user"))._id;
      const { data } = await axios.get(`/api/post/${route}/get-posts`);
      // console.log("getpostsdata: ", data)
      setAllPosts(data.posts);
      setName(data.name);
    };
    getAllPosts();
  }, []);
  return (
    <>
      <ThoughtInput handleSubmit={handleSubmit} thoughtRef={thoughtRef} />
      <YourPosts allPosts={allPosts} name={name} />
    </>
  );
}
