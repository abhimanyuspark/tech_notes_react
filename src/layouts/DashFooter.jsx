import React from "react";
import { useLocation, useNavigate } from "react-router";
import { TiHome } from "../assets/icons";

const DashFooter = () => {
  return (
    <footer className="p-2 border-t border-white flex gap-4 items-center">
      <HomeButton />
      <p>Current User: </p>
      <p>Status : </p>
    </footer>
  );
};

const HomeButton = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onClick = () => navigate("/dash");

  if (pathname !== "/dash") {
    return (
      <button className="p-1 hover:bg-gray-600 rounded-md" onClick={onClick}>
        <TiHome className="text-xl cursor-pointer" />
      </button>
    );
  }
};

export default DashFooter;
