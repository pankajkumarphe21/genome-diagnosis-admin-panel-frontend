/** @format */

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const FormDialog = ({ form, open, onClose, onSubmit }) => {
  const [formData, setFormData] = React.useState(form);
  const arr = Object.keys(form);

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ width: "90vw" }}>
      <DialogTitle>Kindly fill in the details...</DialogTitle>
      <DialogContent sx={{ width: "30vw" }}>
        {arr.map((key, index) => (
            <div
            key={index}
            style={{ marginBottom: "16px" }}>
                {key}
            <TextField
              value={formData[key]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [key]: e.target.value,
                })
              }
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              style={{ marginTop: "8px" }}
            />
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
