import React, { useEffect } from "react";
import { Button, Table } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/fetures/userSlice";
import { Columns } from "./Column";
import { useNavigate } from "react-router";

const UsersList = () => {
  const { users, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-4 items-start">
      <Button
        onClick={() => {
          navigate("/dash/users/new");
        }}
        text="Add User"
      />
      <Table Columns={Columns} data={users} loading={loading} />
    </div>
  );
};

export default UsersList;
