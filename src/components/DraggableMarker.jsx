import React from "react";

function DraggableMarker({ icon, position, onClick, onDrag }) {
  const handleMouseDown = (e) => {
    e.stopPropagation();
    const onMouseMove = (moveEvent) => onDrag(moveEvent);
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <img
      src={icon}
      alt="marker"
      style={{
        width: "50px",
        height: "50px",
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 20,
        cursor: "pointer",
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseDown={handleMouseDown}
    />
  );
}

export default DraggableMarker;
