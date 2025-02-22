import React, { useState } from "react";
import { toast } from "react-toastify";
import { validation } from "../../utils/validation";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Loader } from "../../components";
import { loginAuth } from "../../redux/server/server";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    username: "",
    password: "",
  });

  const [show, setShow] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === "active" ? value === "true" : value,
    });
    setFormError({
      ...formError,
      [name]: "",
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const validate = validation(formData);
    const isValid = Object.values(validate).length === 0;
    const obj = {
      pending: "Promise is pending",
      success: "Promise resolved 👌",
      error: "Promise rejected 🤯",
    };

    if (isValid) {
      try {
        await toast.promise(dispatch(loginAuth(formData)), obj);
        navigate("/dash", { replace: true });
        setFormData({ ...formData, username: "", password: "" });
      } catch (error) {
        if (!error.status) {
          setFormError({ ...formError, username: "No server response" });
        } else if (error.status === 401) {
          setFormError({ ...formError, username: "unauthorized" });
        } else {
          setFormError({ ...formError, username: error?.data?.message });
        }
      }
    } else {
      setFormError(validate);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {loading ? <Loader /> : ""}

      <h2 className="text-2xl">Login User</h2>

      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <Input
          label="Username"
          name="username"
          value={formData.username}
          error={formError.username}
          onChange={onChange}
        />

        <Input
          label="Password"
          name="password"
          type={show ? "text" : "password"}
          show={show}
          setShow={() => {
            setShow(!show);
          }}
          value={formData.password}
          error={formError.password}
          onChange={onChange}
        />

        <Button text="Submit" type="submit" />
      </form>
    </div>
  );
};

export default Login;
