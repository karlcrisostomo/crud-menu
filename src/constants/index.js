"use client";

import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useFormDataContext } from "@/context/FormDataContext";

const Constants = () => {
  const { handleEdit, handleDelete } = useFormDataContext();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
      filterable: false,
      hideable: false,
      resizable: false,
      flex: 1,
    },
    {
      field: "menu",
      headerName: "Menu",
      width: 250,
      filterable: false,
      hideable: false,
      resizable: false,
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      filterable: false,
      hideable: false,
      resizable: false,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 100,
      filterable: false,
      hideable: false,
      resizable: false,
      flex: 1,
    },
    {
      field: "options",
      headerName: "Options",
      width: 150,
      filterable: false,
      hideable: false,
      resizable: false,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price (₱)",
      width: 160,
      resizable: false,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      hideable: false,
      resizable: false,
      flex: 1,
      width: 168,
      renderCell: (params) => (
        <>
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => handleEdit(params.row)}
          />
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDelete(params.row.category, params.row.id)}
          />
        </>
      ),
    },
  ];

  return { columns };
};

export default Constants;
