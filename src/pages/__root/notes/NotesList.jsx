import React, { useEffect } from "react";
import { Columns } from "./Column";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../../../redux/server/server";
import { Button, Table } from "../../../components";
import { useNavigate } from "react-router";

const NotesList = () => {
  const { notes, loading } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => navigate("/dash/notes/new")} text="Add Note" />
      <Table Columns={Columns} data={notes} loading={loading} />
    </div>
  );
};

export default NotesList;
