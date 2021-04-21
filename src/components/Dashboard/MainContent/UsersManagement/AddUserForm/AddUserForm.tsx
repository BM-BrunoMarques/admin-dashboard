import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import * as SI from "../../../../../helpers/consts";
import Divider from "@material-ui/core/Divider";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useAppDispatch } from "../../../../../app/hooks";
import { createUser } from "../../../../../features/UserManagement/usersSlice";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: "flex",
    flexWrap: "wrap",
    height: "410px",
    alignContent: "space-between",
    justifyContent: "space-between",
  },
  submit: {
    padding: "15px 25px",
    marginBottom: "5px",
  },
  currency: {
    textIndent: "10px",
    fontSize: "16px",
    letterSpacing: "0.07em",
    border: "1px solid",
  },
}));

const AddUserForm: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const classes = useStyles();

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("Last Name is required"),
    lastName: yup.string().required("First Name is required"),
    email: yup
      .string()
      .email("Use a valid Email please")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password should be 6 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    type: yup.string().required("User Privileges are required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      type: "",
    },
    validationSchema: validationSchema,
    onSubmit: (props) => {
      dispatch(createUser(props));
    },
  });

  return (
    <>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          style={{ width: "47%" }}
          margin="dense"
          id="firstName"
          name="firstName"
          label="First Name"
          value={formik.values.firstName}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          onChange={formik.handleChange}
        />
        <TextField
          variant="outlined"
          style={{ width: "47%" }}
          margin="dense"
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formik.values.lastName}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          onChange={formik.handleChange}
        />

        <Divider
          style={{
            width: "100%",
          }}
        />

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          onChange={formik.handleChange}
        />

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="password"
          name="password"
          label="password"
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          onChange={formik.handleChange}
        />
        <Divider
          style={{
            width: "100%",
          }}
        />
        <Select
          style={{ width: "33%" }}
          id="type"
          name="type"
          variant="outlined"
          value={formik.values.type}
          onChange={formik.handleChange}
          error={formik.touched.type && Boolean(formik.errors.type)}
          displayEmpty
          fullWidth
        >
          <MenuItem disabled value="">
            <em>User Type</em>
          </MenuItem>

          {Object.keys(SI.UserType)
            .filter((key: any) => !isNaN(Number(SI.UserType[key])))
            .map((key: any) => (
              <MenuItem value={SI.UserType[key]} key={SI.UserType[key]}>
                <em>{key}</em>
              </MenuItem>
            ))}
        </Select>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default AddUserForm;
