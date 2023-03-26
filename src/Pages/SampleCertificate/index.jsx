import React, { useEffect, useRef } from "react";

const SampleCertificate = () => {
  const canvasRef = useRef(null);
  // let isDragging = false;
  // let isResizing = false;
  // let prevMousePosition = { x: 0, y: 0 };
  // let rectanglePosition = { x: 100, y: 100 };
  // let rectangleSize = { width: 200, height: 50 };
  // let text;
  let shapes = [];
  let current_shape_index = null;
  let is_dragging = false;
  let startX;
  let startY;
  shapes.push({
    x: 100,
    y: 100,
    width: 200,
    height: 50,
    text: "Pankaj Kumar Ram",
    fontSize:20,
    fontWeight:600,
    fontColor:"red",
    fontFamily:"Arial"
  });
  shapes.push({
    x: 140,
    y: 140,
    width: 200,
    height: 50,
    text: "Masai School",
    fontSize: 25,
    fontWeight: 500,
    fontColor: "blue",
    fontFamily: "Mulish",
  });
    shapes.push({
      x: 180,
      y: 180,
      width: 200,
      height: 50,
      text: "Masai Placement Portal",
      fontSize: 30,
      fontWeight: 400,
      fontColor: "green",
      fontFamily: "Roboto",
    });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const aspectRatio = 909 / 591;
    canvas.width = 1000;
    canvas.height = Math.floor(1000 / aspectRatio);
    canvas.style.background =
      "url('https://previews.123rf.com/images/andipanggeleng/andipanggeleng1706/andipanggeleng170600013/80860152-blank-certificate-template.jpg')";
    canvas.style.backgroundSize = "cover";
    let canvas_width = canvas.width;
    let canvas_height = canvas.height;
    let offset_x;
    let offset_y;

    let get_offset = function () {
      let canvas_offset = canvas.getBoundingClientRect();
      offset_x = canvas_offset.left;
      offset_y = canvas_offset.top;
    };
    get_offset();
    window.onscroll = function () {
      get_offset();
    };
    window.onresize = function () {
      get_offset();
    };
    canvas.onscroll = function () {
      get_offset();
    };

    let is_mouse_in_shape = function (x, y, shape) {
      let shape_left = shape.x;
      let shape_right = shape.x + shape.width;
      let shape_top = shape.y;
      let shape_bottom = shape.x + shape.height;
      if (
        x > shape_left &&
        x < shape_right &&
        y > shape_top &&
        y < shape_bottom
      ) {
        console.log("Yes");
        return true;
      }
      return false;
    };

    let mouse_down = function (event) {
      event.preventDefault();
      startX = parseInt(event.clientX);
      startY = parseInt(event.clientY);
      let index = 0;

      for (let shape of shapes) {
        console.log("before if",event, startX, startY);
        if (is_mouse_in_shape(startX, startY, shape)) {
          console.log("after if")
          current_shape_index = index;
          is_dragging = true;
          return;
        }
        index++;
      }
    };

    let mouse_up = function (event) {
      if (!is_dragging) {
        return;
      }
      event.preventDefault();
      is_dragging = false;
    };
    let mouse_out = function (event) {
      if (!is_dragging) {
        return;
      }
      event.preventDefault();
      is_dragging = false;
    };

    let mouse_move = function (event) {
      if (!is_dragging) {
        return;
      } else {
        event.preventDefault();
        let mouseX = parseInt(event.clientX - offset_x);
        let mouseY = parseInt(event.clientY - offset_y);
        let dx = mouseX - startX;
        let dy = mouseY - startY;
        let current_shape = shapes[current_shape_index];
        current_shape.x += dx;
        current_shape.y += dy;
        draw_shapes();
        startX = mouseX;
        startY = mouseY;
      }
    };
    canvas.onmousedown = mouse_down;
    canvas.onmouseup = mouse_up;
    canvas.onmouseout = mouse_out;
    canvas.onmousemove = mouse_move;

    let draw_shapes = function () {
      context.clearRect(0, 0, canvas_width, canvas_height);
      for (let shape of shapes) {
        context.fillStyle = shape.fontColor;
        context.font = `${shape.fontWeight} ${shape.fontSize}px ${shape.fontFamily}`;
        context.fillText(
          shape.text,
          shape.x,
          shape.y + 22
        );
        context.fillStyle = "transparent";
        context.fillRect(
          shape.x,
          shape.y,
          shape.width,
          shape.height
        );
      }
    };

    draw_shapes();
    return () => {
      canvas.onmousedown = mouse_down;
      canvas.onmouseup = mouse_up;
      canvas.onmouseout = mouse_out;
      canvas.onmousemove = mouse_move;
    };
  }, []);
  return <canvas ref={canvasRef} />;
};

export default SampleCertificate;
