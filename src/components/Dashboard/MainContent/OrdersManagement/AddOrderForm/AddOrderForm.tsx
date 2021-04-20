import React, { useEffect, useState } from "react";
import { useFormik, Field, FormikProvider } from "formik";
import * as yup from "yup";

import { useTheme, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import NumberFormat from "react-number-format";
import { useAppDispatch } from "../../../../../app/hooks";
import { createOrder } from "../../../../../features/Orders/ordersSlice";
import csc from "country-state-city";
import { ICountry, IState, ICity } from "country-state-city";

function NumberFormatCustom(props: any) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.id.split(" ").pop(),
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix="$"
    />
  );
}

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
    margin: " 0 auto",
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

const AddOrderForm: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const [countries, setCountries] = useState<ICountry[]>([]);
  const [regions, setRegions] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);

  const classes = useStyles();

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    address: yup.string().required("Address is required"),
    country: yup.string().required("Country is required"),
    region: yup.string(),
    city: yup.string(),
    total: yup.string(),
    status: yup.string().required("Status is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      country: "",
      region: "",
      city: "",
      total: "",
      status: "",
    },
    validationSchema: validationSchema,
    onSubmit: ({ name, address, country, total, status }) => {
      const countryC = csc.getCountryByCode(country);
      const countryData = {
        name: countryC.name,
        code: country,
      };
      dispatch(
        createOrder({ name, address, country: countryData, total, status })
      );
    },
  });

  useEffect(() => {
    const allCountries = csc.getAllCountries();
    console.log(allCountries);
    setCountries(allCountries);
  }, []);

  useEffect(() => {
    setRegions([]);
    setCities([]);
    const states = csc.getStatesOfCountry(formik.values.country);
    setRegions(states);
  }, [formik.values.country]);

  useEffect(() => {
    setCities([]);
    const cities = csc.getCitiesOfState(
      formik.values.country,
      formik.values.region
    );
    setCities(cities);
  }, [formik.values.region]);

  return (
    <>
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
          id="address"
          name="address"
          label="Address"
          value={formik.values.address}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
          onChange={formik.handleChange}
        />
        <Select
          style={{ width: "33%" }}
          id="country"
          name="country"
          fullWidth
          variant="outlined"
          value={formik.values.country}
          onChange={formik.handleChange}
          error={formik.touched.country && Boolean(formik.errors.country)}
          displayEmpty
        >
          <MenuItem value="">
            <em>Country</em>
          </MenuItem>
          {countries.map((country) => (
            <MenuItem key={country.isoCode} value={country.isoCode}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          disabled={!Boolean(formik.values.country)}
          style={{ width: "33%" }}
          id="region"
          name="region"
          variant="outlined"
          value={formik.values.region}
          onChange={formik.handleChange}
          error={formik.touched.region && Boolean(formik.errors.region)}
          displayEmpty
          fullWidth
        >
          <MenuItem disabled value="">
            <em>Region/State</em>
          </MenuItem>
          {regions.map((region) => (
            <MenuItem key={region.isoCode} value={region.isoCode}>
              {region.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          disabled={!Boolean(formik.values.region)}
          style={{ width: "33%" }}
          id="city"
          name="city"
          variant="outlined"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          displayEmpty
          fullWidth
        >
          <MenuItem disabled value="">
            <em>City</em>
          </MenuItem>
          {cities.map((city) => (
            <MenuItem key={city.name} value={city.name}>
              {city.name}
            </MenuItem>
          ))}
        </Select>

        <FormikProvider value={formik}>
          <Field
            style={{ width: "45%" }}
            id="  total"
            name="total"
            label="Total"
            required
            component={TextField}
            value={formik.values.total}
            onChange={formik.handleChange}
            InputProps={{
              inputComponent: NumberFormatCustom as any,
            }}
          />
        </FormikProvider>
        <Select
          style={{ width: "45%" }}
          id="status"
          name="status"
          variant="outlined"
          value={formik.values.status}
          onChange={formik.handleChange}
          error={formik.touched.status && Boolean(formik.errors.status)}
          displayEmpty
          fullWidth
        >
          <MenuItem disabled value="">
            <em>Status</em>
          </MenuItem>
          <MenuItem value={"Placed"}>Placed</MenuItem>
          <MenuItem value={"Processed"}>Processed</MenuItem>
          <MenuItem value={"Shipped"}>Shipped</MenuItem>
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

export default AddOrderForm;
