import React, { useEffect, useState } from "react";
import { Button, Input, InputSelect, Loader } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedNote, getUsers } from "../../../redux/server/server";
import { useParams } from "react-router";
import { validation } from "../../../utils/validation";

const status = [
  { name: "Complete", value: true },
  { name: "In Complete", value: false },
];

const NoteForm = () => {
  const { id } = useParams();
  const { loading } = useSelector((state) => state.notes);
  // const { users, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    text: "",
    user: "",
    completed: false,
  });

  const [formError, setFormError] = useState({
    title: "",
    text: "",
    user: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === "completed" ? Boolean(value) : value,
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

  // useEffect(() => {
  //   dispatch(getUsers());
  // }, [dispatch]);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const res = await dispatch(getSelectedNote(id));
        const data = res?.payload;
        setFormData(data);
      };
      fetchData();
    }
  }, [id, dispatch]);

  return (
    <div className="flex flex-col gap-4">
      {loading && id ? <Loader /> : ""}

      <h2 className="text-2xl">{id ? "Update Note" : "New Note"}</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          error={formError.title}
          onChange={onChange}
        />
        <Input
          label="Text"
          name="text"
          value={formData.text}
          error={formError.text}
          onChange={onChange}
        />
        {/* <InputSelect
          name="user"
          label="Users"
          value={formData.user}
          onChange={onChange}
        >
          {loading ? (
            <option disabled={true}>Loading...</option>
          ) : users?.length > 0 ? (
            users?.map((u) => <option value={u._id}>{u?.username}</option>)
          ) : (
            <option value="--">--</option>
          )}
        </InputSelect> */}

        {id ? (
          <InputSelect
            name={"completed"}
            label={"Status"}
            value={formData.completed}
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

        <Button text="Submit" type="submit" />
      </form>
    </div>
  );
};

export default NoteForm;
