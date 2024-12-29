/** @format */

import React, { useEffect } from "react";
import fetchData from "../../../apis/getapis";
import { Button } from "@mui/material";
import FormDialog from "../../components/Form";
import postData from "../../../apis/postapi";
import STable from "../../components/Table";

export default function Events() {
  const [list, setList] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const [rows, setRows] = React.useState([]);

  const form = {
    photo: "",
    manager: "",
    email: "",
    contact: "",
    venue: "",
    time: "",
    description: "",
  };

  const [columns, setColumns] = React.useState([
    ...Object.keys(data[0] || {}).map((key) => ({
      id: key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      minWidth: 170,
      align: "left",
    })),
    {
      id: "photo",
      label: "Photo",
      minWidth: 100,
      align: "center",
    },
  ]);
  useEffect(() => {
    const data = fetchData("events");
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = (formData) => {
    postData("blogs", formData);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ margin: 2 }}>
        {" "}
        Add New{" "}
      </Button>
      <STable
        rows={rows}
        columns={columns}></STable>
      <FormDialog
        form={form}
        open={open}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </div>
  );
}
