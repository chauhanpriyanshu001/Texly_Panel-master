import React, { useState } from "react";
import "./LoginPage.css";
import texly from "../../Assets/img/texly.png";
import BASE_URL from "../../variable";
import axios from "axios";
// import  LoginContext from "../../Context";
import { LoginContext } from '../../Context';
import { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  TextField,
  Button,
  IconButton,
  Grid,
  FormControl,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import OtpForm from "./OtpForm";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,

  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 2,
};

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,

  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 2,
};
const ForgetPasswordForm = ({ loginForm }) => {
  const [mobileNumber, setMobileNumber] = useState(null);
  const [otp, setOtp] = useState();
  const [optSendSuccessState, setOptSendSuccessState] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpVerifyError, setOtpVerifyError] = useState("");
  const [open, setOpen] = React.useState(false);
  const [resetPassword, setResetPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { set } = useContext(LoginContext);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/admin/verifyOtp`, {
        mobileNumber,
        otp: otp,
      });
      sessionStorage.setItem("resetToken", res.data.result.token);
      handleOpen();
    } catch (error) {
      console.log(error);
      setOtpVerifyError(error.response?.data?.responseMessage);
    }
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setResetPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    console.log(resetPassword);
    const token = sessionStorage.getItem("resetToken");

    if (token) {
      try {
        const res = await axios.put(
          `${BASE_URL}/admin/resetPassword`,
          {
            ...resetPassword,
          },
          {
            headers: {
              token,
            },
          }
        );
        sessionStorage.removeItem("resetToken");
        // setLoginStatus(true);
        loginForm();
        console.log({
          message: "from reset password api",
          data: res.data,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleOtpSend = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/admin/resendOtp`, {
        mobileNumber,
      });
      console.log(res.data);
      setOptSendSuccessState(true);
    } catch (error) {
      console.log(error);
      setOtpError(error.response?.data?.responseMessage);
    }
  };
  return (
    <div

      className="ForgetPasswordForm_overflowHidder">
      <div
        className="ForgetPasswordForm_container"
        style={{
          position: "relative",
          transition: "all .3s ease-in-out",
          right: !optSendSuccessState ? "0vw" : "110%",
        }}
      >
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form
              action=""
              className="reset_password_form"
              onSubmit={resetPasswordHandler}
            >
              <TextField
                type="text"
                label="Password"
                name="password"
                variant="outlined"
                // error={otpError}
                value={resetPassword.password}
                onChange={handleChange}
                fullWidth
                required
              />
              <br />
              <TextField
                type="text"
                label="ConfirmPassword"
                name="confirmPassword"
                onChange={handleChange}
                value={resetPassword.confirmPassword}
                variant="outlined"
                // error={otpError}
                helperText="Make sure passwords are same"
                fullWidth
                required
              />
              <br />
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: "var(--dark)",
                  color: "white",
                }}
                req
              >
                Reset Password
              </Button>
            </form>
          </Box>
        </Modal>
        <form
          action=""
          onSubmit={handleOtpSend}
          style={{
            width: "100%",
          }}
          className="sendOtp_form_container"
        >
          <TextField
            type="number"
            variant="outlined"
            value={mobileNumber}
            onChange={(event) => {
              setMobileNumber(event.target.value);
              if (otpError) setOtpError("");
            }}
            error={otpError}
            helperText={otpError ? otpError : "Fill Your Mobile Number"}
            // error={otpError}
            label="Mobile Number"
            required
          />
          <br />
          <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "var(--dark)",
              color: "white",
            }}
          >
            Send Otp
          </Button>
        </form>
        <form
          style={{}}
          className="verifyOtp_container"
          onSubmit={handleOtpVerify}
          action=""
        >
          <OtpForm otp={otp} setOtp={setOtp} />
          {otpVerifyError && (
            <span style={{ color: "red" }}> {otpVerifyError}</span>
          )}
          <div>
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "var(--dark)",
                color: "white",
              }}
            >
              Submit
            </Button>
            <Button
              onClick={() => {
                setOptSendSuccessState(false);
              }}
              variant="contained"
              style={{
                backgroundColor: "var(--dark)",
                color: "white",
                marginLeft: "1%",
              }}
            >
              Go Back
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// const LoginPageForm = () => {
//   const [values, setValues] = useState({
//     mobileNumber: "",
//     password: "",
//     showPassword: false,
//     passwordError: false,
//   });
//   const [error, seterror] = useState("");
//   const { loginStatus, setLoginStatus } = useContext(LoginContext);
//   const navigate = useNavigate();
//   const autoLogin = async () => {
//     const token = sessionStorage.getItem("adminToken");
//     try {
//       if (token) {
//         await axios.get(`${BASE_URL}/admin/verifyTokenAndAdmin`, {
//           headers: {
//             token,
//           },
//         });
//         setLoginStatus(true);
//         console.log("auto Login Success");
//         console.log(loginStatus);
//         navigate("/");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     autoLogin();
//   }, []);
//   const handleChange = (prop) => (event) => {
//     setValues({ ...values, [prop]: event.target.value });
//   };

//   const handleClickShowPassword = () => {
//     setValues({ ...values, showPassword: !values.showPassword });
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   // const handleSubmit = async (event) => {
//   //   event.preventDefault();
//   //   try {
//   //     const res = await axios.post(`${BASE_URL}/admin/loginAdmin`, {
//   //       ...values,
//   //     });
//   //     sessionStorage.setItem("adminToken", res.data.result.token);
//   //     setLoginStatus(true);
//   //     navigate("/");
//   //   } catch (error) {
//   //     console.log(error);
//   //     setValues({
//   //       ...values,
//   //       ["passwordError"]: error?.response?.data?.responseMessage,
//   //     });
//   //   }
//   // };
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const res = await axios.post(`${BASE_URL}/admin/loginAdmin`, {
//         ...values,
//       });

//       // Store the token and user type in session storage
//       sessionStorage.setItem("adminToken", res.data.result.token);
//       sessionStorage.setItem("userType", res.data.result.userType);

//       setLoginStatus(true);

//       // Redirect based on user type
//       if (res.data.result.userType === "ADMIN") {
//         navigate("/");
//       } else if (res.data.result.userType === "SUPPORT") {
//         navigate("/contactus");
//       }
//     } catch (error) {
//       console.log(error);
//       setValues({
//         ...values,
//         ["passwordError"]: error?.response?.data?.responseMessage,
//       });
//     }
//   };
//   return (
//     <Grid
//       container
//       justify="center"
//       alignItems="center"
//       wrap="wrap"
//       direction="column"
//       style={{ height: "80vh" }}
//     >
//       <Grid item xs={4}>
//         <form onSubmit={handleSubmit}>
//           <Typography variant="h5" gutterBottom>
//             <b>Super Admin Login</b>
//           </Typography>
//           <FormControl fullWidth margin="normal">
//             <TextField
//               label="MobileNumber"
//               variant="outlined"
//               value={values.mobileNumber}
//               onChange={handleChange("mobileNumber")}
//               required
//               error={error}
//             />
//           </FormControl>
//           <FormControl fullWidth margin="normal">
//             <TextField
//               type={values.showPassword ? "text" : "password"}
//               label="Password"
//               variant="outlined"
//               value={values.password}
//               onChange={handleChange("password")}
//               error={values.passwordError}
//               helperText={values.passwordError ? values.passwordError : ""}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={handleClickShowPassword}
//                       onMouseDown={handleMouseDownPassword}
//                     >
//                       {values.showPassword ? (
//                         <VisibilityIcon />
//                       ) : (
//                         <VisibilityOffIcon />
//                       )}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//               required
//             />
//           </FormControl>
//           <FormControl fullWidth margin="normal">
//             <Button
//               type="submit"
//               variant="contained"
//               style={{
//                 backgroundColor: "var(--dark)",
//                 color: "white",
//               }}
//             >
//               Login
//             </Button>
//           </FormControl>
//         </form>
//       </Grid>
//     </Grid>
//   );
// };
const LoginPageForm = () => {
  const [values, setValues] = useState({
    mobileNumber: "",
    password: "",
    showPassword: false,
    passwordError: false,
  });
  const [error, seterror] = useState("");
  const { loginStatus, setLoginStatus } = useContext(LoginContext);
  const navigate = useNavigate();
  const autoLogin = async () => {
    const token = sessionStorage.getItem("adminToken");
    try {
      if (token) {
        await axios.get(`${BASE_URL}/admin/verifyTokenAndAdmin`, {
          headers: {
            token,
          },
        });
        setLoginStatus(true);
        console.log("auto Login Success");
        console.log(loginStatus);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    autoLogin();
  }, []);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/admin/loginAdmin`, {
        ...values,
      });
      console.log(res.data, "this is the data of admin");
      sessionStorage.setItem("adminToken", res.data.result.token);
      sessionStorage.setItem("userType", res.data.result.userType);
      setLoginStatus(true);
      navigate("/");
    } catch (error) {
      console.log(error);
      setValues({
        ...values,
        ["passwordError"]: error?.response?.data?.responseMessage,
      });
    }
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      wrap="wrap"
      direction="column"
      style={{ height: "80vh" }}
    >
      <Grid item xs={4}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom style={{ color: "black" }}>
            <b>Super Admin Login</b>
          </Typography>
          <FormControl fullWidth margin="normal">
            <TextField

              label="MobileNumber"
              variant="outlined"
              value={values.mobileNumber}
              onChange={handleChange("mobileNumber")}
              required
              error={error}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              type={values.showPassword ? "text" : "password"}
              label="Password"
              variant="outlined"
              value={values.password}
              onChange={handleChange("password")}
              error={values.passwordError}
              helperText={values.passwordError ? values.passwordError : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "var(--dark)",
                color: "white",
              }}
            >
              Login
            </Button>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
const LoginPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="loginPage_container"
      style={{
        backgroundColor: "white"
      }}
    >
      <span>
        <img
          src={texly}
          style={{
            width: "15vw",
            position: "absolute",
            left: "0vw",
            top: "0vw",
          }}
          alt=""
        />
      </span>
      <LoginPageForm />
      <Typography
        variant="h5"
        style={{
          position: "relative",
          left: "43.5vw",
          bottom: "8vw",
        }}
        onClick={handleOpen}
      >
        <Button>Forgot Password?</Button>
      </Typography>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ForgetPasswordForm loginForm={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};

export default LoginPage;

