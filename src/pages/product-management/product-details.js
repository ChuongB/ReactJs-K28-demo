import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import useProductDetails from "../../hooks/useProductDetails";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  sku: yup.string("Enter product sku").required("sku is required"),
  name: yup.string("Enter product name").required("Name is required"),
  description: yup.string("Enter product description"),
  price: yup.number("Enter product price").required("Name is required"),
  image: yup.string("Enter product image").required("Image is required"),
});

const ProductDetailsManagementPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, loading } = useProductDetails(id);
  const [updateLoading, setUpdateLoading] = useState(false);
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

  async function handleUpdateProduct() {
    const url = `http://localhost:3004/products/${id}`;
    setUpdateLoading(true);
    const values = JSON.parse(JSON.stringify(formik.values));
    console.log(values);
    try {
      const res = await axios.patch(url, values);
      if (res && res.data) {
        toast.success("update product successful");
      }
    } finally {
      setUpdateLoading(false);
    }
  }

  useEffect(() => {
    function updateFormData(data) {
      if (product) {
        const { image, name, price, description, sku } = product;
        formik.setFieldValue("image", image || "");
        formik.setFieldValue("name", name || "");
        formik.setFieldValue("price", price || "");
        formik.setFieldValue("description", description || "");
        formik.setFieldValue("sku", sku || "");
      }
    }
    updateFormData(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const { name } = product || {};
  return loading ? (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "100px" }}>
      <CircularProgress />
    </Box>
  ) : (
    <Card style={{ maxWidth: "1000px", margin: " 20px auto" }}>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <h3>{name}</h3>
        <Box
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <Button
            onClick={() => {
              navigate("/admin/products");
            }}
          >
            Back
          </Button>
          <Button variant="contained" onClick={() => handleUpdateProduct()}>
            {updateLoading && (
              <CircularProgress size={20} style={{ marginRight: "10px" }} />
            )}
            Update
          </Button>
        </Box>
      </Box>
      <CardContent>
        <form>
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
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductDetailsManagementPage;
