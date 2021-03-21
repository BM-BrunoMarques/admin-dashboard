import React, { useState, useRef, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import * as SI from "./SignIn.module";
import validator from "validator";
import { useStyles } from "./stylesSignIn";
import { useFormik } from "formik";
import * as yup from "yup";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const SignIn: React.FC = () => {
  const allUsers = useAppSelector((state) => {
    return state.users;
  });

  const classes = useStyles();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      authenticate(values);
    },
  });

  const emailExistsInDb = (email: string) => {
    return new Promise((resolve, reject) => {
      allUsers.find((el) => {
        const emailExists = el.authentication.email === email;
        if (emailExists) {
          return resolve(el.authentication.password);
        } else {
          return reject("Your email is not in our system.");
        }
      });
    });
  };

  const authenticate = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const emailExists = emailExistsInDb(email);

    emailExists
      .then((response: any) => {
        if (response !== password) {
          return formik.setErrors({
            password: "Wrong Password!",
          });
        }
      })
      .catch((response) => {
        return formik.setErrors({
          email: response,
        });
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Typography component="h1" variant="subtitle2">
          <span>Email: user@example.com</span>
          <br />
          <span>Password: helloworld</span>
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
