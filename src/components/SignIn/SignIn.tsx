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

const SignIn: React.FC = (props) => {
  const allUsers = useAppSelector((state) => state.users);
  const [emailLogin, setEmailLogin] = useState<string>("");
  const [passLogin, setPassLogin] = useState<string>("");
  const classes = useStyles();

  useEffect(() => {
    emailAuthenticated = null;
  }, [emailLogin]);

  // const formik = useFormik({
  //   initialValues: {
  //     email: "aa",
  //     password: "aa",
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: (values: React.FormEvent<HTMLFormElement>) => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });

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
      console.log("values ", values);

      const validFields = validate(values);
      // if (validFields) {
      //   formik.setErrors({ email: "errotyp" });
      // }

      const authenticatedUser = authenticate(values);
    },
  });

  const FormRefs = {
    email: useRef<HTMLDivElement | null>(null),
    password: useRef<HTMLDivElement | null>(null),
  };
  const validate = ({ email }: any): boolean => {
    return validator.isEmail(email);
    //message: "Please provide a valid Email",
  };

  let emailAuthenticated: typeof allUsers[0] | undefined | null;

  const authenticate = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    if (!emailAuthenticated) {
      emailAuthenticated = allUsers.find(
        (el) => el.authentication.email === email
      );
      if (!emailAuthenticated) {
        return formik.setErrors({ email: "Your email is not in our system." });
      }
    }
    if (emailAuthenticated.authentication.password === passLogin) {
      return { result: true };
    } else {
      return {
        field: SI.FormField.PASSWORD,
        result: false,
        message: "Wrong Password",
      };
    }
  };

  const handleFormError = (error: SI.AuthErrorObject) => {
    console.log(FormRefs[error.field].current);
  };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //
  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target.name === SI.FormField.EMAIL) {
      setEmailLogin(e.target.value);
    } else {
      setPassLogin(e.target.value);
    }
  };

  console.log("PROPZ", props);

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

{
  /* <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
          <TextField
            ref={FormRefs[SI.FormField.EMAIL]}
            value={emailLogin}
            onChange={(e) => handleChange(e)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name={SI.FormField.EMAIL}
            autoComplete="email"
            autoFocus
          />
          <TextField
            ref={FormRefs[SI.FormField.PASSWORD]}
            value={passLogin}
            onChange={(e) => handleChange(e)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name={SI.FormField.PASSWORD}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
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
    </Container> */
}
