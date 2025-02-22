import React, { useEffect } from "react";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { logOutAuth } from "../redux/server/server";
import { LuLogOut } from "../assets/icons";

const DashHeader = () => {
  return (
    <header className="py-4 px-8 w-full flex items-center justify-between border-b border-white">
      <NavLink
        to="/dash"
        className={({ isActive }) =>
          `${isActive ? `` : ``} text-3xl text-blue-600`
        }
      >
        TechNotes
      </NavLink>

      <nav>
        {/* link here */}
        <LogOut />
      </nav>
    </header>
  );
};

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const onLogOut = async () => {
    await toast.promise(dispatch(logOutAuth()), {
      pending: "Pending Logout",
      success: "Success logout",
      error: "error logout",
    });
    navigate("/", { replace: true });
  };

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // useEffect(() => {
  //   if (token === null) {
  //     navigate("/", { replace: true });
  //   }
  // }, [token, navigate]);

  return (
    <button onClick={onLogOut} className="text-xl cursor-pointer">
      <LuLogOut />
    </button>
  );
};

export default DashHeader;
