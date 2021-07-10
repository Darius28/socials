import React, { useState, useEffect, useRef } from "react";
import ThoughtInput from "../form/ThoughtInput";
import YourPosts from "../layout/YourPosts";
import axios from "axios";
import { toast } from "react-toastify";

export default function FeedHandler() {
  const [allPosts, setAllPosts] = useState([]);
  const [name, setName] = useState("");
  const thoughtRef = useRef();

  const reloadData = async () => {
    const { data } = await axios.get("/api/get-posts");
    // console.log(data);
    setAllPosts(data.posts);
    toast("Post Successful.")
  };

  const handleSubmit = async () => {
    try {
      const thought = thoughtRef.current.value;
    //   console.log(thought);
      const { data } = await axios.post("/api/post-new-post", { thought });
      thoughtRef.current.value = ""
      reloadData();
    } catch (err) {
      toast(err.response.data);
    }
  };

  useEffect(() => {
    const getAllPosts = async () => {
      const { data } = await axios.get("/api/get-posts");
      setAllPosts(data.posts);
      setName(data.name);
    };
    getAllPosts();
  }, []);
  return (
    <>
      <ThoughtInput handleSubmit={handleSubmit} thoughtRef={thoughtRef} />
      <YourPosts
        allPosts={allPosts}
        setAllPosts={setAllPosts}
        name={name}
        setName={setName}
      />
    </>
  );
}
