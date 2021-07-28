import React, { useRef, useEffect, useState } from "react";
import { Tooltip } from "antd";
import { RedoOutlined } from "@ant-design/icons";
export default function Canvas({ setSketchUri }) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 500;
    canvas.height = 300;
    canvas.style.width = `${500}px`;
    canvas.style.height = `${300}px`;
    console.log(window.innerWidth, window.innerHeight);

    const context = canvas.getContext("2d");

    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 4;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };
  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };
  const draw = ({ nativeEvent }) => {
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
  };

  return (
    <>
      {/* <div>
        <canvas
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
            style={{ color: "red", cursor: "pointer", fontSize: "1.5rem" }}
            onClick={resetCanvasHandler}
          />
        </Tooltip>
      </div> */}
    </>
  );
}
