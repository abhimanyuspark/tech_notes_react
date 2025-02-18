import React from "react";

const Button = ({ text, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="p-2 min-w-full rounded-md text-black font-semibold bg-white cursor-pointer"
    >
      {text}
    </button>
  );
};

export { Button };
