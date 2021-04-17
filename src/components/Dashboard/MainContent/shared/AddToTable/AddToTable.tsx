import React, { useState } from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";

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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const duration = 0.35;

const AddToTable: React.FC = () => {
  const [showForm, setShowForm] = useState<Boolean>(false);
  const theme = useTheme();

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );

  const classes = useStyles();

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const validationSchema = yup
    .object()
    .shape({ name: yup.string().required("Name is required") });

  const formik = useFormik({
    initialValues: {
      name: "",
      date: "",
      address: "",
      country: "",
      total: "",
      status: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("submitted", values);
    },
  });

  const variants = {
    outerContainer: {
      in: {
        backgroundColor: showForm
          ? [theme.palette.background.default, theme.palette.background.paper]
          : [theme.palette.background.paper, theme.palette.background.default],
      },
    },
    container: {
      initial: {
        backgroundColor: green[700],
        marginBottom: 0,
      },
      in: {
        width: showForm ? "70%" : 0,
        x: showForm ? "20%" : 0,
        backgroundColor: showForm
          ? [theme.palette.background.default, theme.palette.background.paper]
          : [theme.palette.background.paper, theme.palette.background.default],
        marginBottom: showForm ? [0, 30] : 0,
        transition: {
          ease: "easeIn",
        },
      },
    },
    button: {
      initial: { rotate: 0, scale: 1.3 },
      in: {
        rotate: !showForm ? [135, 0] : [0, 135],
        color: showForm ? red[900] : green[900],
        scale: showForm ? 1.2 : 1.4,
        transition: {
          duration: 0.3,
          ease: "easeIn",
        },
      },
    },
    form: {
      initial: { opacity: 0},
      in: {
        opacity: [0, 1],
        transition: {
          ease: "anticipate",
          delay: 0.1,
        },
      },
      out: {
        opacity: 0,

        transition: {
          ease: "anticipate",
        },
      },
    },
  };

  return (
    <>
      <motion.div variants={variants.outerContainer} animate="in">
        <motion.div variants={variants.container} animate="in">
          <label style={{ display: "flex" }} htmlFor="icon-button-file">
            <IconButton
              component={motion.span}
              variants={variants.button}
              initial="initial"
              animate="in"
              onClick={() => setShowForm((prev) => !prev)}
              color="primary"
              aria-label="Add to Table"
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </label>
          <AnimatePresence initial={false}>
            {showForm && (
              <motion.div
                variants={variants.form}
                initial="initial"
                animate="in"
                exit="out"
              >
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    onChange={formik.handleChange}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    zz
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
};

export default AddToTable;

{
  /* <>

<AnimatePresence>
  {showForm && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // variants={variants}
      // initial={variants.initial}
      // animate={showForm ? variants.show : variants.hide}
      // exit={{ opacity: 0 }}
    >
      <form>
        <TextField />
      </form>
    </motion.div>
  )}
</AnimatePresence>
</> */
}
