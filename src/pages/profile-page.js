import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useAppContext } from "../App";
import waiting from "../hooks/waiting";
import { actionTypes } from "../store/reducer";
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  fullname: yup.string("Enter your email").required("Email is required"),
  address: yup.string("Enter your password"),
});

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);

  const {
    state: { user },
    dispatch,
  } = useAppContext();

  const formik = useFormik({
    initialValues: {
      email: "",
      fullname: "",
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleUpdate(values);
    },
  });

  async function fetchUser(id) {
    const url = `http://localhost:3004/users/${id}`;
    const res = await axios.get(url);

    if (res && res.data) {
      dispatch({ type: actionTypes.SET_USER, payload: res.data });
      updateForm(res.data);
    }
  }

  async function handleUpdate(values) {
    setLoading(true);
    const url = `http://localhost:3004/users/${user.id}`;
    const data = JSON.parse(JSON.stringify(values));
    data.updatedDate = new Date().toString();

    try {
      await waiting(1500);
      const res = await axios.patch(url, data);
      if (res && res.data) {
        toast.success("Update profile success");
        dispatch({ type: actionTypes.SET_USER, payload: res.data });
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  function updateForm(values) {
    const { email, fullname, address } = values;
    formik.setFieldValue("email", email || "");
    formik.setFieldValue("fullname", fullname || "");
    formik.setFieldValue("address", address || "");
  }

  useEffect(() => {
    fetchUser(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ width: "400px", margin: "50px auto" }}>
      <Card style={{ padding: "20px" }}>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              style={{ marginBottom: "20px" }}
              disabled
            />

            <TextField
              fullWidth
              id="fullname"
              name="fullname"
              label="Full name"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullname && Boolean(formik.errors.fullname)}
              helperText={formik.touched.fullname && formik.errors.fullname}
              style={{ marginBottom: "20px" }}
            />
            <TextField
              fullWidth
              id="address"
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              style={{ marginBottom: "40px" }}
            />

            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={loading}
            >
              {loading && (
                <CircularProgress size={20} style={{ marginRight: "10px" }} />
              )}
              Update
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
