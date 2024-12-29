/** @format */

import React, { useEffect } from "react";
import fetchData from "../../../apis/getapis";
import { Button } from "@mui/material";
import FormDialog from "../../components/Form";
import postData from "../../../apis/postapi";
import STable from "../../components/Table";

export default function Careers() {
  const [list, setList] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const [rows, setRows] = React.useState([]);

  const form = {
    designation: "",
    description: "",
    location: "",
    experience: "",
    salary: "",
    skills: "",
    qualification: "",
  };

  const [columns, setColumns] = React.useState(
    Object.keys(form).map((key) => ({
      id: key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      minWidth: 170,
      align: "left",
    }))
  );

  useEffect(() => {
    const data = fetchData("careers");
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = (formData) => {
    postData('careers', formData);
  };

  return (
    <div>
      <STable rows={rows} columns={columns}></STable>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}>
        {" "}
        Add New{" "}
      </Button>
      <FormDialog
        form={form}
        open={open}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </div>
  );
}
