import React from "react";

const Error = ({ message, children }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      Error : {message}
      <div>{children}</div>
    </div>
  );
};

export default Error;
