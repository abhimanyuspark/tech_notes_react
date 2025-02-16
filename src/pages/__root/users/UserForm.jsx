import React, { useEffect, useState } from "react";
import { Input, Button, Loader } from "../../../components";
import { validation } from "../../../utils/validation";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedUser } from "../../../redux/server/server";

const UserForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.users);

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
      [name]: value,
    });
    setFormError({
      ...formError,
      [name]: "",
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const validate = validation(formData);
    const isValid = Object.values(validate).length === 0;

    if (isValid) {
      alert(JSON.stringify(formData));
    } else {
      setFormError(validate);
    }
  };

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const res = await dispatch(getSelectedUser(id));
        const data = res?.payload;
        setFormData(data);
      };
      fetchData();
    }
  }, [id, dispatch]);

  return (
    <div className="flex flex-col gap-4">
      {loading && <Loader />}

      <h2 className="text-2xl">{id ? "Update User" : "New user"}</h2>

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

        <Button text="Submit" />
      </form>
    </div>
  );
};

export default UserForm;
