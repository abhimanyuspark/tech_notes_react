import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";
import { refreshAuth } from "../redux/fetures/authSlice";
import { Loader } from "../components";

const Persist = () => {
  const dispatch = useDispatch();
  const [persist] = useLocalStorage("persist");
  const { token, error, loading } = useSelector((state) => state.auth);

  const [trueSuccess, setTrueSuccess] = useState(false);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      console.log("verifying refresh token");
      try {
        //const response =
        await dispatch(refreshAuth());
        //const { accessToken } = response.data
        setTrueSuccess(true);
      } catch (err) {
        console.error(err);
      }
    };

    if (!token && persist) {
      verifyRefreshToken();
    }
  }, [dispatch, token, persist]);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (loading) {
    content = <Loader />;
  } else if (error) {
    content = (
      <Navigate
        to="/login"
        state={{ message: "Your session has expired. Please login again." }}
      />
    );
  } else if (token && trueSuccess) {
    content = <Outlet />;
  } else if (token && persist) {
    content = <Outlet />;
  }

  return content;
};

export default Persist;
