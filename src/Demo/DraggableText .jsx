import React, { useRef, useEffect } from "react";

function Rectangle() {
  const canvasRef = useRef(null);
  let isDragging = false;
  let isResizing = false;
  let prevMousePosition = { x: 0, y: 0 };
  let rectanglePosition = { x: 50, y: 50 };
  let rectangleSize = { width: 300, height: 100 };
  const text = "Hello World!";

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    function drawRectangle() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#FFFFFF";
      context.fillRect(
        rectanglePosition.x,
        rectanglePosition.y,
        rectangleSize.width,
        rectangleSize.height
      );
      const textWidth = context.measureText(text).width;
      const textHeight = 20; // Assuming font size is 20px
      context.fillStyle = "#000000";
      context.font = "20px Arial";
      context.fillText(
        text,
        rectanglePosition.x + rectangleSize.width / 2 - textWidth / 2,
        rectanglePosition.y + rectangleSize.height / 2 + textHeight / 2
      );
    }

    function handleMouseDown(event) {
      if (
        event.offsetX > rectanglePosition.x + rectangleSize.width - 10 &&
        event.offsetY > rectanglePosition.y + rectangleSize.height - 10
      ) {
        isResizing = true;
      } else {
        isDragging = true;
      }
      prevMousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
    }

    function handleMouseMove(event) {
      if (isDragging) {
        const deltaX = event.clientX - prevMousePosition.x;
        const deltaY = event.clientY - prevMousePosition.y;

        rectanglePosition.x += deltaX;
        rectanglePosition.y += deltaY;

        prevMousePosition = {
          x: event.clientX,
          y: event.clientY,
        };

        drawRectangle();
      } else if (isResizing) {
        const deltaX = event.clientX - prevMousePosition.x;
        const deltaY = event.clientY - prevMousePosition.y;

        rectangleSize.width += deltaX;
        rectangleSize.height += deltaY;

        prevMousePosition = {
          x: event.clientX,
          y: event.clientY,
        };

        drawRectangle();
      }
    }

    function handleMouseUp() {
      isDragging = false;
      isResizing = false;
    }

    drawRectangle();
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ background: "teal", margin: "30px" }}
      width={800}
      height={500}
    />
  );
}

export default Rectangle;

// import React, { useRef, useEffect } from "react";

// function Rectangle() {
//   const canvasRef = useRef(null);
//   let isDragging = false;
//   let isResizing = false;
//   let prevMousePosition = { x: 0, y: 0 };
//   let rectanglePosition = { x: 50, y: 50 };
//   let rectangleSize = { width: 300, height: 100 };
//   const text = "Hello World!";

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");

//     function drawRectangle() {
//       context.clearRect(0, 0, canvas.width, canvas.height);
//       context.fillStyle = "#FFFFFF";
//       context.fillRect(
//         rectanglePosition.x,
//         rectanglePosition.y,
//         rectangleSize.width,
//         rectangleSize.height
//       );
//       const textWidth = context.measureText(text).width;
//       const textHeight = 20; // Assuming font size is 20px
//       context.fillStyle = "#000000";
//       context.font = "20px Arial";
//       context.fillText(
//         text,
//         rectanglePosition.x + rectangleSize.width / 2 - textWidth / 2,
//         rectanglePosition.y + rectangleSize.height / 2 + textHeight / 2
//       );
//     }

//     function handleMouseDown(event) {
//       if (
//         event.offsetX > rectanglePosition.x + rectangleSize.width - 10 &&
//         event.offsetY > rectanglePosition.y + rectangleSize.height - 10
//       ) {
//         isResizing = true;
//       } else {
//         isDragging = true;
//       }
//       prevMousePosition = {
//         x: event.clientX,
//         y: event.clientY,
//       };
//     }

//     function handleMouseMove(event) {
//       if (isDragging) {
//         const deltaX = event.clientX - prevMousePosition.x;
//         const deltaY = event.clientY - prevMousePosition.y;

//         rectanglePosition.x += deltaX;
//         rectanglePosition.y += deltaY;

//         prevMousePosition = {
//           x: event.clientX,
//           y: event.clientY,
//         };

//         drawRectangle();
//       } else if (isResizing) {
//         const deltaX = event.clientX - prevMousePosition.x;
//         const deltaY = event.clientY - prevMousePosition.y;

//         rectangleSize.width += deltaX;
//         rectangleSize.height += deltaY;

//         prevMousePosition = {
//           x: event.clientX,
//           y: event.clientY,
//         };

//         drawRectangle();
//       }
//     }

//     function handleMouseUp() {
//       isDragging = false;
//       isResizing = false;
//     }

//     drawRectangle();
//     canvas.addEventListener("mousedown", handleMouseDown);
//     canvas.addEventListener("mousemove", handleMouseMove);
//     canvas.addEventListener("mouseup", handleMouseUp);

//     return () => {
//       canvas.removeEventListener("mousedown", handleMouseDown);
//       canvas.removeEventListener("mousemove", handleMouseMove);
//       canvas.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{ background: "teal", margin: "30px" }}
//       width={800}
//       height={500}
//     />
//   );
// }

// export default Rectangle;

// import React, { useState } from "react";

// const DraggableText = ({ text, position, onDrag }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

//   const handleMouseDown = (event) => {
//     setIsDragging(true);
//     setDragOffset({
//       x: event.clientX - position.x,
//       y: event.clientY - position.y,
//     });
//     console.log(position);
//   };

//   const handleMouseMove = (event) => {
//     if (isDragging) {
//       onDrag({
//         x: event.clientX - dragOffset.x,
//         y: event.clientY - dragOffset.y,
//       });
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   return (
//     <div
//       contentEditable
//       suppressContentEditableWarning
//       style={{ position: "absolute", left: position.x, top: position.y }}
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//     >
//       {text}
//     </div>
//   );
// };

// export default DraggableText;

// import React, { useRef, useEffect } from "react";

// function Rectangle() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");

//     let isDragging = false;
//     let previousPosition = { x: 0, y: 0 };
//     let currentPosition = { x: 0, y: 0 };

//     function handleMouseDown(event) {
//       isDragging = true;
//       previousPosition = {
//         x: event.clientX - canvas.getBoundingClientRect().left,
//         y: event.clientY - canvas.getBoundingClientRect().top,
//       };
//     }

//     function handleMouseUp(event) {
//       isDragging = false;
//     }

//     function handleMouseMove(event) {
//       if (isDragging) {
//         currentPosition = {
//           x: event.clientX - canvas.getBoundingClientRect().left,
//           y: event.clientY - canvas.getBoundingClientRect().top,
//         };

//         const offsetX = currentPosition.x - previousPosition.x;
//         const offsetY = currentPosition.y - previousPosition.y;

//         context.clearRect(0, 0, canvas.width, canvas.height);
//         context.fillRect(50 + offsetX, 50 + offsetY, 100, 100);

//         previousPosition = currentPosition;
//       }
//     }

//     canvas.addEventListener("mousedown", handleMouseDown);
//     canvas.addEventListener("mouseup", handleMouseUp);
//     canvas.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       canvas.removeEventListener("mousedown", handleMouseDown);
//       canvas.removeEventListener("mouseup", handleMouseUp);
//       canvas.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   return <canvas ref={canvasRef} width={300} height={200} />;
// }

// export default Rectangle;

// import React, { useRef, useEffect } from "react";

// function Rectangle() {
//   const canvasRef = useRef(null);
//   let isDragging = false;
//   let prevMousePosition = { x: 0, y: 0 };
//   let rectanglePosition = { x: 50, y: 50 };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");

//     function drawRectangle() {
//       context.clearRect(0, 0, canvas.width, canvas.height);
//       context.fillRect(rectanglePosition.x, rectanglePosition.y, 100, 100);
//     }

//     function handleMouseDown(event) {
//       isDragging = true;
//       prevMousePosition = {
//         x: event.clientX,
//         y: event.clientY,
//       };
//     }

//     function handleMouseMove(event) {
//       if (isDragging) {
//         const deltaX = event.clientX - prevMousePosition.x;
//         const deltaY = event.clientY - prevMousePosition.y;

//         rectanglePosition.x += deltaX;
//         rectanglePosition.y += deltaY;

//         prevMousePosition = {
//           x: event.clientX,
//           y: event.clientY,
//         };

//         drawRectangle();
//       }
//     }

//     function handleMouseUp() {
//       isDragging = false;
//     }

//     drawRectangle();
//     canvas.addEventListener("mousedown", handleMouseDown);
//     canvas.addEventListener("mousemove", handleMouseMove);
//     canvas.addEventListener("mouseup", handleMouseUp);

//     return () => {
//       canvas.removeEventListener("mousedown", handleMouseDown);
//       canvas.removeEventListener("mousemove", handleMouseMove);
//       canvas.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, []);

//   return <canvas ref={canvasRef} width={1400} height={700} />;
// }

// export default Rectangle;