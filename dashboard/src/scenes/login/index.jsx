import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { setCrediential } from "../../slices/authslice";
import { useLoginMutation } from "../../slices/userApiSlice";

import { toast } from "react-toastify";

const LoginScreen = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCrediential({ ...res }));
      navigate(redirect);
      toast.success("Login Successfull");
    } catch (error) {
      toast.error("Invalid email or password");
      console.log("error", error);
    }
  };

  return (
    <>
      <Typography
        variant="h4"
        mt={3}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" , paddingTop: "10%" }}
      >
        Login
      </Typography>

      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box
          sx={{
            "& .MuiTextField-root": { m: 1, width: "50ch" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormControl fullWidth component="form" onSubmit={handleSubmit}>
            <TextField
              id="email-input"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />
            <TextField
              id="password-input"
              label="Password"
              type="password" // Added for password masking
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
                marginRight: "50px",
                justifyContent: "space-between",
              }}
            >
              <Button
                type="submit"
                sx={{ width: "20ch",marginLeft: "10px",color: "white",backgroundColor: "gray" }}
                variant="contained"
                disabled={isLoading}
              >
                {isLoading && (
                  <CircularProgress
                    size={24}
                    style={{
                      position: "absolute",
                      left: "73%",
                      color: "darkgray",
                    }}
                  />
                )}
                Login
              </Button>

              <Typography variant="body1" sx={{ marginLeft: "10px" }}>
                New Here?{" "}
                <Link
                  to={
                    redirect ? `/form?redirect=${redirect}` : `/form}`
                  }
                >
                  Register
                </Link>
              </Typography>
            </div>
          </FormControl>
        </Box>
      </Container>
    </>
  );
};

export default LoginScreen;
