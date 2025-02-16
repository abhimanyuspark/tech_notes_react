import React from "react";
import { Outlet } from "react-router";
import DashFooter from "./DashFooter";
import DashHeader from "./DashHeader";

const DashLayout = () => {
  return (
    <div className="flex flex-col">
      <DashHeader />
      <div className="p-4 flex-1">
        <Outlet />
      </div>
      <DashFooter />
    </div>
  );
};

export default DashLayout;
