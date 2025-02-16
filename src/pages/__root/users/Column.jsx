import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { Menu } from "../../../components";

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
          <p className="text-sm">{roles.map((r) => r)}</p>
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
        <div className="w-52 text-sm">{value ? "Active" : "In Active"}</div>
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
      const location = useLocation();
      const { _id, username } = info.row.original;

      return (
        <div className="flex items-center justify-end">
          <Menu>
            <li
              onClick={() => {
                navigate(`/dash/users/edit/${_id}`);
              }}
            >
              Edit
            </li>
          </Menu>
        </div>
      );
    },
  },
];
