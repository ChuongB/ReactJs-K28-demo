import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import axios from "axios";
import waiting from "../hooks/waiting";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  async function handleLogin(values) {
    setLoading(true);
    const url = "http://localhost:3004/users";

    try {
      await waiting(1500);
      const res = await axios.get(url);
      const find = res.data.find((user) => user.email === values.email);

      if (find && find.password === values.password) {
        toast.success("Login successful");
        navigate("/home");
        return;
      } else {
        toast.error("Failed to login");
        return;
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

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
            />

            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              style={{ marginBottom: "20px" }}
            />
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={loading}
            >
              {loading && <CircularProgress />}
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
