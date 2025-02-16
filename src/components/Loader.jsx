import React from "react";

const Loader = () => {
  return (
    <div className="absolute top-0 w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
