import React, { useEffect, useState } from "react";
import { Button, Input, InputSelect, Loader } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedNote,
  postNote,
  updateNote,
} from "../../../redux/server/server";
import { useNavigate, useParams } from "react-router";
import { validation } from "../../../utils/validation";
import { toast } from "react-toastify";

const status = [
  { name: "Completed", value: true },
  { name: "In Progress", value: false },
];

const NoteForm = () => {
  const { id } = useParams();
  const { loading } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      [name]: name === "completed" ? value === "true" : value,
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
      if (id) {
        await toast.promise(
          dispatch(updateNote({ ...formData, id: formData?._id })),
          obj
        );
      } else {
        await toast.promise(dispatch(postNote(formData)), obj);
      }
      navigate(-1, { replace: true });
    } else {
      setFormError(validate);
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      const fetchData = async () => {
        const res = await dispatch(getSelectedNote(id));
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
