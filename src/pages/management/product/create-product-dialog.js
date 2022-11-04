import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import waiting from "../../../hooks/waiting";

const validationSchema = yup.object({
  name: yup.string("Enter product name").required("Email is required"),
  SKU: yup.string("Enter product sku").required("Sku is required"),
  description: yup.string("Enter product description"),
  price: yup.number("Enter product price").required("Price is required"),
  image: yup.string("Enter product image").required("Image is required"),
});

export default function CreateProductDialog({
  openDialog,
  setOpenDialog,
  reloadProduct,
  ...props
}) {
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setOpenDialog(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      SKU: "",
      description: "",
      price: 10,
      image: "",
    },
    validationSchema: validationSchema,
  });

  async function handleCreate(values) {
    setLoading(true);
    const url = `http://localhost:3004/products`;
    const data = JSON.parse(JSON.stringify(formik.values));
    data.createdDate = new Date().toString();

    try {
      await waiting(1500);
      const res = await axios.post(url, data);
      if (res && res.data) {
        reloadProduct();
        toast.success("Create product success");
        handleClose();
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Create Product</DialogTitle>
        <DialogContent>
          <div
            style={{
              padding: "20px 0",
              display: "flex",
              gap: "20px",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", gap: "20px" }}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              <TextField
                fullWidth
                id="SKU"
                name="SKU"
                label="SKU"
                value={formik.values.SKU}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.SKU && Boolean(formik.errors.SKU)}
                helperText={formik.touched.SKU && formik.errors.SKU}
              />
            </div>

            <div style={{ display: "flex", gap: "20px" }}>
              <TextField
                fullWidth
                id="price"
                name="price"
                label="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />

              <TextField
                fullWidth
                id="image"
                name="image"
                label="image"
                value={formik.values.image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.image && Boolean(formik.errors.image)}
                helperText={formik.touched.image && formik.errors.image}
              />
            </div>

            <div style={{ display: "flex", gap: "20px" }}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleCreate()}>
            {loading && (
              <CircularProgress size={20} style={{ marginRight: "10px" }} />
            )}
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
