import * as React from "react";
import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme } from "@mui/material/styles";

import { Link, useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import * as yup from "yup";

import TextField from "@mui/material/TextField";
import jwt_decode from "jwt-decode";
import Checkbox from "@mui/material/Checkbox";
import { useFormik } from "formik";
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { LoginCheck, loginFirebase } from "../../../context/redux/action/action";
import { useDispatch } from "react-redux";
import firebase, { auth } from "../../../config/Firebase/firebase.js";
import GoogleButton from "components/Control/GoogleButton";
import { CustomizedToast } from "components/toast/ToastCustom";
import API from "config/axios/API/API";
import { URL_API } from "config/axios/Url/URL";
import logo from "assets/images/full 3 logo.png";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";

const ggProvider = new firebase.auth.GoogleAuthProvider();
const schema = yup.object().shape({});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit">Voting system</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SigninPoppop(props) {
  const { OpenPopUp, SetOpenPopUp } = props;

  const handleClose = () => {
    SetOpenPopUp(false);
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const hanldeLoginWithgg = async () => {
    const hihi = await auth.signInWithPopup(ggProvider);
    auth.onAuthStateChanged(async (user) => {
      const res = await API(
        "POST",
        URL_API + `/api/v1/authen/firebase?idtoken=${user._delegate.accessToken}`
      );
      localStorage.setItem("token", res.data.data.token);
      const token = localStorage.getItem("token");
      const detoken = jwt_decode(token);
      if (detoken.RoleName === "user") {
        CustomizedToast({
          message: "Đăng nhập thành công",
          type: "SUCCESS",
        });
        handleClose();
      }
    });
  };

  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      userName: "",
      password: "",
    },

    onSubmit: (values) => {
      const adminData = {
        userName: formik.values.userName,
        password: formik.values.password,
      };
      dispatch(LoginCheck(adminData, SetOpenPopUp));
    },
  });

  const handleLogin = async () => {
    const adminData = {
      userName: formik.values.userName,
      password: formik.values.password,
    };
    await API("POST", URL_API + `/api/v1/authen/login`, adminData)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        const token = localStorage.getItem("token");
        const detoken = jwt_decode(token);
        if (detoken.RoleName === "user") {
          CustomizedToast({
            message: "Đăng nhập thành công",
            type: "SUCCESS",
          });
          handleClose();
        }
      })
      .catch((error) => {
        CustomizedToast({
          message: "Tên tài khoản hoặc mật khẩu sai",
          type: "ERROR",
        });
      });
  };

  return (
    <Dialog sx={{ borderRadius: "10%" }} maxWidth="ms" open={OpenPopUp} onClose={handleClose}>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container component="main">
            <Grid item xs={12} square>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", bottom: "-2rem" }}>
                  <img src={logo} alt="Logo" style={{ width: "90%", height: "100%" }} />
                </Box>
                <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="userName"
                    label="Tài khoản"
                    name="userName"
                    autoComplete="email"
                    autoFocus
                    value={formik.values.userName}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mật khẩu"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formik.values.password}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                  />
                  <Grid container>
                    <Grid item xs>
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Ghi nhớ tài khoản"
                      />
                    </Grid>
                    <Grid item mt={1}>
                      {/* <Link href="#" variant="body1">
                        Bạn quên mật khẩu?
                      </Link> */}
                    </Grid>
                  </Grid>

                  <ButtonLangding
                    variant="contained"
                    fullWidth
                    onClick={handleLogin}
                    borderRadius="20px"
                    sx={{ mt: 3, mb: 2 }}
                    nameButton="Đăng nhập"
                  />
                  <Grid item xs={12} display={"flex"} justifyContent={"flex-end"} mt={"2%"}>
                    <ButtonLangding
                      type="button"
                      variant="contained"
                      fullWidth
                      borderRadius="20px"
                      sx={{ mt: 3, mb: 2 }}
                      nameButton="Đăng nhập với tài khoản Google"
                      onClick={hanldeLoginWithgg}
                    />
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}
