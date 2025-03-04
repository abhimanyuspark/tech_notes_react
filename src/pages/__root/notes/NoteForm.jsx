import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  InputSelect,
  Loader,
  CancelButton,
  TextArea,
  Error,
} from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedNote,
  getSelectedNote,
  postNote,
  updateNote,
} from "../../../redux/fetures/noteSlice";
import { useNavigate, useParams } from "react-router";
import { validation } from "../../../utils/validation";
import { toast } from "react-toastify";
import { noteToastAdd, noteToastUpdate } from "../../../config/toastParams";

const status = [
  { name: "Completed", value: true },
  { name: "In Progress", value: false },
];

const NoteForm = () => {
  const { id } = useParams();
  const { loading, error } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    text: "",
    user: "67b064ce3e690585adc1f30c",
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

    if (isValid) {
      if (id) {
        await toast.promise(
          dispatch(updateNote({ ...formData, id: formData?._id })),
          noteToastUpdate
        );
      } else {
        await toast.promise(dispatch(postNote(formData)), noteToastAdd);
      }
      navigate(-1, { replace: true });
    } else {
      setFormError(validate);
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getSelectedNote(id)).then((res) => {
        const data = res?.payload || {}; // Ensure it's always an object
        setFormData((prev) => ({
          ...prev,
          ...data,
        }));
      });
    }
    return () => {
      dispatch(clearSelectedNote());
    };
  }, [id, dispatch]);

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="flex flex-col gap-4">
      {loading && id ? <Loader /> : ""}

      <h2 className="text-2xl">{id ? "Update Note" : "New Note"}</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <Input
          important
          label="Title"
          name="title"
          value={formData.title}
          error={formError.title}
          onChange={onChange}
        />
        <TextArea
          important
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

export default NoteForm;
