import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { Menu } from "../../../components";
import { FaEdit, FaTrash } from "../../../assets/icons";
import { toast } from "react-toastify";
import { deleteUser } from "../../../redux/fetures/userSlice";

export const Columns = [
  {
    accessorKey: "index",
    header: "Id",
    cell: (info) => {
      const index = info.row.index;
      return <span>{index + 1}</span>;
    },
    enableSorting: true,
    sortingFn: (row1, row2) => {
      return row1.index > row2.index ? -1 : 1;
    },
    sortDescFirst: false,
    invertSorting: true,
  },
  {
    accessorKey: "username",
    header: () => "Username",
    cell: (info) => {
      const value = info.getValue();
      const { _id, roles } = info.row.original;
      return (
        <div className="w-44 cursor-pointer">
          <Link
            to={`/user/${_id}`}
            className="text-sm hover:underline font-semibold"
          >
            {value}
          </Link>
          <p className="text-sm">{roles.map((r) => r).join(", ")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "active",
    header: () => "Active",
    cell: (info) => {
      const value = info.getValue();
      return (
        <div className="w-52 text-md flex items-center gap-4">
          <span
            className={`${
              value ? "bg-green-600" : "bg-red-600"
            } size-2 rounded-full`}
          ></span>
          <span>{value ? "Active" : "In Active"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "_id",
    enableSorting: false,
    header: () => "Actions",
    cell: (info) => {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const { _id } = info.row.original;

      return (
        <div className="flex items-center justify-end">
          <Menu>
            <li
              className="hover:bg-green-600"
              onClick={() => {
                navigate(`/dash/users/edit/${_id}`);
              }}
            >
              <FaEdit />
              Edit
            </li>
            <li
              className="hover:bg-red-600"
              onClick={() => {
                toast.promise(dispatch(deleteUser(_id)), {
                  pending: "Promise is pending",
                  success: "Promise resolved 👌",
                  error: "Promise rejected 🤯",
                });
              }}
            >
              <FaTrash />
              Delete
            </li>
          </Menu>
        </div>
      );
    },
  },
];
