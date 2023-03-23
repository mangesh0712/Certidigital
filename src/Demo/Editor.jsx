import React, { useState } from "react";
import DraggableText from "./DraggableText ";

const Editor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (newPosition) => {
    setPosition(newPosition);
  };

  return (
    <div style={{width:"100%",height:"100vh",border:"1px solid red"}}>
      <DraggableText
        text="CertiDigital"
        position={position}
        onDrag={handleDrag}
      />
    </div>
  );
};

export default Editor;
