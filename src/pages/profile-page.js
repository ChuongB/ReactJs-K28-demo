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
import ProfileSkeleton from "../components/user/profile-skeleton";
import useProfile from "../hooks/useProfile";
import waiting from "../hooks/waiting";
import { actionTypes } from "../store/reducer";
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  fullname: yup.string("Enter your email").required("Email is required"),
  address: yup.string("Enter your address"),
});

const ProfilePage = () => {
  const {
    state: {
      user: { id },
    },
    dispatch,
  } = useAppContext();
  const { data, loading: fetchLoading } = useProfile(id) || {};

  const formik = useFormik({
    initialValues: {
      email: "",
      fullname: "",
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSignup(values);
    },
  });

  useEffect(() => {
    function updateFormData(data) {
      if (data) {
        const { email, fullname, address } = data;
        formik.setFieldValue("email", email || "");
        formik.setFieldValue("fullname", fullname || "");
        if (address) {
          formik.setFieldValue("address", address || "");
        }
      }
    }
    updateFormData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const [loading, setLoading] = useState(false);

  async function handleSignup(values) {
    setLoading(true);
    const url = `http://localhost:3004/users/${id}`;

    try {
      await waiting(1500);
      const res = await axios.patch(url, values);

      if (!res || !res.data) {
        toast.error("Failed to update your profile");
        return;
      } else {
        toast.success("Update you profile successful");
        dispatch({ type: actionTypes.SET_USER, payload: res.data });
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ width: "400px", margin: "50px auto" }}>
      {fetchLoading ? (
        <ProfileSkeleton />
      ) : (
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
                label="Fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.fullname && Boolean(formik.errors.fullname)
                }
                helperText={formik.touched.fullname && formik.errors.fullname}
                style={{ marginBottom: "20px" }}
              />

              <TextField
                fullWidth
                id="address"
                name="address"
                label="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                style={{ marginBottom: "20px" }}
              />

              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                disabled={loading}
                style={{ height: "50px" }}
              >
                {loading && (
                  <CircularProgress style={{ marginRight: "10px" }} />
                )}
                Update
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ProfilePage;
