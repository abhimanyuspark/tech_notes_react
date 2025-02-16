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
    accessorKey: "title",
    header: () => "Title",
    cell: (info) => {
      const value = info.getValue();
      const { _id } = info.row.original;
      return (
        <div className="cursor-pointer">
          <Link
            to={`/user/${_id}`}
            className="text-sm hover:underline font-semibold"
          >
            {value}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "text",
    header: () => "Text",
    cell: (info) => {
      const value = info.getValue();
      return <div className="text-sm">{value}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: () => "CreatedAt",
    cell: (info) => {
      const value = info.getValue();
      const date = new Date(value);
      return <span>{date.toLocaleDateString()}</span>;
    },
    sortDescFirst: false,
  },
  {
    accessorKey: "updatedAt",
    header: () => "UpdatedAt",
    cell: (info) => {
      const value = info.getValue();
      const date = new Date(value);
      return <span>{date.toLocaleDateString()}</span>;
    },
    sortDescFirst: false,
  },
  {
    accessorKey: "completed",
    header: () => "Completed",
    cell: (info) => {
      const value = info.getValue();
      return <span>{value ? "Completed" : "In Progress"}</span>;
    },
    sortDescFirst: false,
  },
  {
    accessorKey: "username",
    header: () => "Owner",
    cell: (info) => {
      const value = info.getValue();
      return <span>{value}</span>;
    },
    sortDescFirst: false,
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
                navigate(`/dash/notes/edit/${_id}`);
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
