import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Loader,
  InputSelect,
  CancelButton,
} from "../../../components";
import { validation } from "../../../utils/validation";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedUser,
  postUser,
  updateUser,
} from "../../../redux/fetures/userSlice";
import { rolesOptions } from "../../../config/rolesList";
import { toast } from "react-toastify";
import { randomPWD } from "../../../utils/randomPWD";

const status = [
  { name: "Active", value: true },
  { name: "In Active", value: false },
];

const UserForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    roles: ["Employee"],
    active: true,
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
    let validate = validation(formData);

    // Skip password validation if id is defined
    if (id) {
      const { password, ...rest } = validate;
      validate = rest;
    }

    const isValid = Object.values(validate).length === 0;
    const obj = {
      pending: "Promise is pending",
      success: "Promise resolved 👌",
      error: "Promise rejected 🤯",
    };

    if (isValid) {
      if (id) {
        await toast.promise(
          dispatch(updateUser({ ...formData, id: formData?._id })),
          obj
        );
      } else {
        await toast.promise(dispatch(postUser(formData)), obj);
      }
      navigate(-1, { replace: true });
    } else {
      setFormError(validate);
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      const fetchData = async () => {
        const res = await dispatch(getSelectedUser(id));
        const data = res?.payload || {}; // Ensure it's always an object
        setFormData((prev) => ({
          ...prev,
          ...data,
        }));
      };
      fetchData();
    }
  }, [id, dispatch]);

  return (
    <div className="flex flex-col gap-4">
      {loading && id ? <Loader /> : ""}

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
          random
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
          onRandom={() => {
            const password = randomPWD(10);
            setFormData((p) => ({ ...p, password: password }));
            setFormError((p) => ({ ...p, password: "" }));
          }}
        />

        <InputSelect
          value={formData.roles}
          name={"roles"}
          label={"Roles"}
          multiple
          size={3}
          onChange={(event) => {
            const { value } = event.target;
            setFormData({
              ...formData,
              roles: Array.from(
                event.target.selectedOptions,
                (option) => option.value
              ),
            });
          }}
        >
          {Object.values(rolesOptions).map((r, i) => (
            <option key={i} value={r}>
              {r}
            </option>
          ))}
        </InputSelect>

        {id ? (
          <InputSelect
            name={"active"}
            label={"Status"}
            value={formData.active}
            onChange={onChange}
          >
            {status.map((a, i) => (
              <option key={i} value={a.value}>
                {a.name}
              </option>
            ))}
          </InputSelect>
        ) : (
          ""
        )}

        <div className="flex gap-2 items-center">
          <Button text="Submit" type="submit" />
          <CancelButton
            text="Cancel"
            onClick={() => {
              navigate(-1, { replace: true });
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default UserForm;
