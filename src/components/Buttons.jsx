import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 min-w-full rounded-md text-black bg-white"
    >
      {text}
    </button>
  );
};

export { Button };
