import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useFormik } from "formik";
import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import waiting from "../../hooks/waiting";

const validationSchema = yup.object({
  sku: yup.string("Enter product sku").required("sku is required"),
  name: yup.string("Enter product name").required("Name is required"),
  description: yup.string("Enter product description"),
  price: yup.number("Enter product price").required("Name is required"),
  image: yup.string("Enter product image").required("Image is required"),
});

export default function CreateProductDialog({ openDialog, ...props }) {
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    props.setOpenDialog(false);
  };

  const formik = useFormik({
    initialValues: {
      image: "",
      name: "",
      price: 0,
      description: "",
      sku: "",
    },
    validationSchema: validationSchema,
  });

  function parseData(values) {
    const data = JSON.parse(JSON.stringify(values));
    data.createdDate = new Date().toString();
    return data;
  }
  async function handleCreateProduct() {
    const values = parseData(formik.values);

    setLoading(true);
    const url = "http://localhost:3004/products";

    try {
      await waiting(1500);
      const res = await axios.post(url, values);
      if (res && res.data) {
        toast.success("Create product successful");
        handleClose();
        formik.resetForm();
      }
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle>Create Product</DialogTitle>
          <DialogContent>
            <Box sx={{ paddingTop: "20px" }}>
              <Box sx={{ display: "flex", gap: "20px", paddingBottom: "20px" }}>
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
                  id="sku"
                  name="sku"
                  label="SKU"
                  value={formik.values.sku}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.sku && Boolean(formik.errors.sku)}
                  helperText={formik.touched.sku && formik.errors.sku}
                />
              </Box>

              <Box sx={{ display: "flex", gap: "20px", paddingBottom: "20px" }}>
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
                  label="Image"
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.image && Boolean(formik.errors.image)}
                  helperText={formik.touched.image && formik.errors.image}
                />
              </Box>

              <Box sx={{ display: "flex", gap: "20px", paddingBottom: "20px" }}>
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
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              variant="contained"
              type="submit"
              onClick={handleCreateProduct}
              disabled={loading}
            >
              {loading && (
                <CircularProgress size={20} style={{ marginRight: "10px" }} />
              )}{" "}
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </form>
  );
}
