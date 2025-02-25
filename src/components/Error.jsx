import React from "react";

const Error = ({ error, children }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      Error : {error}
      <div>{children}</div>
    </div>
  );
};

export default Error;
