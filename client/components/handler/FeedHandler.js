import React, { useState, useEffect, useRef } from "react";
import ThoughtInput from "../form/ThoughtInput";
import YourPosts from "../layout/YourPosts";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import _ from "lodash";
import Resizer from "react-image-file-resizer";

export default function FeedHandler() {
  const [allPosts, setAllPosts] = useState([]);
  const [name, setName] = useState("");

  const [postImgPreview, setPostImgPreview] = useState("");
  const [postFileObj, setPostFileObj] = useState({});
  const [showBoard, setShowBoard] = useState(false);

  const thoughtRef = useRef();

  const reloadData = async () => {
    console.log("reload data");
    const route = JSON.parse(window.localStorage.getItem("user"))._id;
    const { data } = await axios.get(`/api/post/${route}/get-posts`);
    console.log(data.posts);
    setAllPosts(data.posts);
    toast("Post Successful.");
  };

  const cancelPhotoHandler = () => {
    setPostImgPreview("");
    setPostFileObj({});
  };

  const handleSubmit = async (file, sketchUri) => {
    const sketch = sketchUri.toString();
    // console.log(file, sketchUri.toString());
    try {
      const emptyObj = _.isEqual(file, {});
      const thought = thoughtRef.current.value;
      if (emptyObj) {
        console.log("img not posted");
        const { data } = await axios.post("/api/post-new-post", {
          thought,
          sketch,
        });
        thoughtRef.current.value = "";
        if (showBoard === true) {
          setShowBoard(false);
        }
        reloadData();
      } else {
        console.log("img posted");
        Resizer.imageFileResizer(
          file,
          720,
          500,
          "JPEG",
          100,
          0,
          async (uri) => {
            cancelPhotoHandler();
            await axios
              .post("/api/post-new-post", {
                thought,
                postPic: uri,
              })
              .then((data) => {
                console.log("in then func", data);
                thoughtRef.current.value = "";
                reloadData();
              });
          }
        );
        console.log("outside async function");
        // thoughtRef.current.value = "";
        // reloadData();
      }
      console.log("outside else stmt");
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
      <ThoughtInput
        handleSubmit={handleSubmit}
        thoughtRef={thoughtRef}
        postImgPreview={postImgPreview}
        setPostImgPreview={setPostImgPreview}
        postFileObj={postFileObj}
        setPostFileObj={setPostFileObj}
        cancelPhotoHandler={cancelPhotoHandler}
        showBoard={showBoard}
        setShowBoard={setShowBoard}
      />
      <YourPosts allPosts={allPosts} name={name} />
    </>
  );
}
