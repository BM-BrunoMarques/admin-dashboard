import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Close from "@material-ui/icons/Close";
import * as yup from "yup";

interface RegistrationProps {
  classes: any;
  handleShowForm: () => void;
}

const RegistrationForm: React.FC<RegistrationProps> = ({
  classes,
  handleShowForm,
}) => {
  return (
    <>
      <Button
        variant="outlined"
        className={classes.button}
        startIcon={<Close />}
        onClick={() => handleShowForm()}
      />
      <Typography variant="h6" className={classes.title}>
        User Registration Form
      </Typography>
    </>
  );
};

export default RegistrationForm;
