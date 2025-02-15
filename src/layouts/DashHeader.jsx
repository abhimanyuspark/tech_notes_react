import React from "react";
import { NavLink } from "react-router";

const DashHeader = () => {
  return (
    <header className="p-2 w-full flex items-center border-b border-white">
      <div>
        <NavLink
          to="/dash"
          className={({ isActive }) =>
            `${isActive ? `` : ``} text-3xl text-blue-600`
          }
        >
          TechNotes
        </NavLink>

        <nav>{/* link here */}</nav>
      </div>
    </header>
  );
};

export default DashHeader;
