import React, { useState, useEffect, useContext, useRef } from "react";
import { Avatar, Tooltip, Image } from "antd";
import {
  UserOutlined,
  GifOutlined,
  BarChartOutlined,
  CalendarOutlined,
  RedoOutlined,
  CloseOutlined,
  EnterOutlined,
  ExclamationCircleOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import { Collection, EmojiSmile, Book } from "react-bootstrap-icons";
import { AuthContext } from "../../context/auth-context";

export default function ThoughtInput({
  handleSubmit,
  thoughtRef,
  postImgPreview,
  setPostImgPreview,
  postFileObj,
  setPostFileObj,
  cancelPhotoHandler,
  showBoard,
  setShowBoard,
}) {
  const { state } = useContext(AuthContext);
  const [sketchUri, setSketchUri] = useState("");
  const [sketchEmpty, setSketchEmpty] = useState(true);
  const [showSketchTick, setShowSketchTick] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [confirmSketch, setConfirmSketch] = useState(false);

  useEffect(() => {
    console.log("post img preview and showboard changed");
    if (postImgPreview) {
      setShowBoard(false);
      setSketchUri("");
    }
  }, [postImgPreview, showBoard]);

  useEffect(() => {
    if (state.user && state.user.profile_pic) {
      setProfilePic(state.user.profile_pic.Location);
    }
  }, [state]);

  useEffect(() => {
    if (showBoard) {
      const canvas = canvasRef.current;
      canvas.width = 500;
      canvas.height = 300;
      canvas.style.width = `${500}px`;
      canvas.style.height = `${300}px`;
      const context = canvas.getContext("2d");

      context.lineCap = "round";
      context.strokeStyle = "black";
      context.lineWidth = 4;
      contextRef.current = context;
    }
  }, [showBoard]);

  const handlePostImgChange = (e) => {
    setPostImgPreview(window.URL.createObjectURL(e.target.files[0]));
    setPostFileObj(e.target.files[0]);
  };

  const canvasHandler = () => {
    if (showBoard === true) {
      resetCanvasHandler();
    }
    setShowBoard((prevState) => !prevState);
  };

  const startDrawing = ({ nativeEvent }) => {
    if (confirmSketch) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };
  const finishDrawing = () => {
    if (confirmSketch) return;
    contextRef.current.closePath();
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const pixelBuffer = new Uint32Array(
      context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );

    setSketchEmpty(!pixelBuffer.some((color) => color !== 0));
  };
  const draw = ({ nativeEvent }) => {
    if (confirmSketch) return;
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const resetCanvasHandler = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    setConfirmSketch(false);
    setSketchEmpty(true);
    setShowSketchTick(false);
    setSketchUri("");
  };

  const confirmCanvasHandler = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const pixelBuffer = new Uint32Array(
      context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );

    console.log(!pixelBuffer.some((color) => color !== 0));
    if (!pixelBuffer.some((color) => color !== 0)) {
      setSketchEmpty(false);
      return;
    }
    setConfirmSketch(true);
    setShowSketchTick(true);
    setSketchEmpty(true);
    setSketchUri(canvas.toDataURL());
  };

  const sketchWarningMessage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const pixelBuffer = new Uint32Array(
      context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );
    if (!pixelBuffer.some((color) => color !== 0)) {
      return "Submit Invalid. No Sketch Found.";
    }
    return "Sketch hasn't been added.";
  };

  useEffect(() => {
    if (showBoard === true) {
      resetCanvasHandler();
    }
  }, [showBoard]);

  return (
    <div style={{ borderBottom: "1px solid rgb(204, 204, 204)" }}>
      <div className="row">
        <div className="col d-flex">
          <div>
            {profilePic ? (
              <Avatar size={64} src={profilePic} />
            ) : (
              <Avatar size={64} icon={<UserOutlined />} />
            )}
          </div>
          <textarea
            rows="3"
            cols="45"
            className="thought-input"
            placeholder="What's on your mind?"
            ref={thoughtRef}
            style={{ resize: "none" }}
          />
        </div>
      </div>
      {postImgPreview && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              border: "1px solid black",
            }}
          >
            <Image width={200} height="100%" src={postImgPreview} />
          </div>
          <div onClick={cancelPhotoHandler}>
            <Tooltip title="Remove Photo" placement="top">
              <CloseOutlined style={{ color: "red", cursor: "pointer" }} />
            </Tooltip>
          </div>
        </div>
      )}

      {showBoard && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div>
              <canvas
                id="sketchCanvas"
                style={{ border: "1px solid black" }}
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                ref={canvasRef}
              />
            </div>
            <div style={{ marginLeft: "0.3rem" }}>
              <Tooltip title="Reset Sketch" placement="top">
                <RedoOutlined
                  style={{
                    color: "red",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                  }}
                  onClick={resetCanvasHandler}
                />
              </Tooltip>
            </div>
            <div style={{ marginLeft: "0.3rem" }}>
              <Tooltip title="Confirm Sketch" placement="top">
                <EnterOutlined
                  style={{
                    color: "green",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                  }}
                  onClick={confirmCanvasHandler}
                />
              </Tooltip>
            </div>
            {!sketchEmpty && (
              <div style={{ marginLeft: "0.3rem" }}>
                <Tooltip title={sketchWarningMessage} placement="top">
                  <ExclamationCircleOutlined
                    style={{
                      color: "gold",
                      cursor: "pointer",
                      fontSize: "1.5rem",
                    }}
                  />
                </Tooltip>
              </div>
            )}
            {showSketchTick && (
              <div style={{ marginLeft: "0.3rem" }}>
                <Tooltip title="Sketch Added!" placement="top">
                  <CheckSquareOutlined
                    style={{
                      color: "green",
                      fontSize: "1.5rem",
                    }}
                  />
                </Tooltip>
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <p style={{ fontStyle: "italic" }}>
              NOTE: Remember to click the "confirm sketch" button above before
              posting.
            </p>
            <div style={{ width: "3rem" }}></div>
          </div>
        </>
      )}

      <div className="row">
        <div className="col d-flex" style={{ marginLeft: "4rem" }}>
          <div className="thought-icon">
            <Tooltip title="Media" placement="bottom">
              <label htmlFor="postImage">
                <Collection size={24} />
              </label>
              <input
                type="file"
                hidden
                id="userFile"
                name="image"
                accept="image/*"
                id="postImage"
                onChange={handlePostImgChange}
              />
            </Tooltip>
          </div>
          {/* <div className="thought-icon">
            <Tooltip title="GIF" placement="bottom">
              <GifOutlined style={{ fontSize: "24px" }} />
            </Tooltip>
          </div>
          <div className="thought-icon">
            <Tooltip title="Poll" placement="bottom">
              <BarChartOutlined style={{ fontSize: "24px" }} />
            </Tooltip>
          </div>
          <div className="thought-icon">
            <Tooltip title="Emoji" placement="bottom">
              <EmojiSmile size={24} />
            </Tooltip>
          </div>
          <div className="thought-icon">
            <Tooltip title="Schedule" placement="bottom">
              <CalendarOutlined style={{ fontSize: "24px" }} />
            </Tooltip>
          </div> */}
          <div className="thought-icon" onClick={canvasHandler}>
            <Tooltip
              title={showBoard ? "Hide Board" : "Show Board"}
              placement="bottom"
            >
              <Book size={24} />
            </Tooltip>
          </div>
          <div className="ms-auto mb-3">
            <button
              className="btn btn-primary"
              onClick={handleSubmit.bind(null, postFileObj, sketchUri)}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
