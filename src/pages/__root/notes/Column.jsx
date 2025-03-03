import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { CheckBox, Menu } from "../../../components";
import { FaEdit, FaTrash } from "../../../assets/icons";
import { deleteNote } from "../../../redux/fetures/noteSlice";
import { toast } from "react-toastify";
import { noteToastDelete } from "../../../config/toastParams";

export const Columns = [
  {
    id: "select",
    enableSorting: false,
    header: ({ table }) => {
      return (
        <CheckBox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <CheckBox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      );
    },
  },
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
            // to={`/user/${_id}`}
            className="text-sm hover:underline font-semibold"
          >
            {value}
          </Link>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "text",
  //   header: () => "Text",
  //   cell: (info) => {
  //     const value = info.getValue();
  //     return <div className="text-sm">{value}</div>;
  //   },
  // },
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
      return (
        <div className="w-52 text-md flex items-center gap-4">
          <span
            className={`${
              value ? "bg-green-600" : "bg-red-600"
            } size-2 rounded-full`}
          ></span>
          <span>{value ? "Completed" : "In Progress"}</span>
        </div>
      );
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
      const { _id } = info.row.original;

      const onDelete = async () => {
        toast.promise(
          dispatch(deleteNote(_id)).then((res) => {
            const data = res?.payload;
            if (res.error?.message === "Rejected") {
              throw new Error(data);
            }
            return data;
          }),
          noteToastDelete
        );
      };

      return (
        <div className="flex items-center justify-end">
          <Menu>
            <li
              className="hover:bg-green-600"
              onClick={() => {
                navigate(`/dash/notes/edit/${_id}`);
              }}
            >
              <FaEdit />
              Edit
            </li>
            <li className="hover:bg-red-600" onClick={onDelete}>
              <FaTrash />
              Delete
            </li>
          </Menu>
        </div>
      );
    },
  },
];
