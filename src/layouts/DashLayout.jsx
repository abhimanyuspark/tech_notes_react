import React from "react";
import { Outlet } from "react-router";
import DashFooter from "./DashFooter";
import DashHeader from "./DashHeader";

const DashLayout = () => {
  return (
    <div>
      <DashHeader />
      <div className="p-4 flex gap-4 flex-col h-125">
        <Outlet />
      </div>
      <DashFooter />
    </div>
  );
};

export default DashLayout;
