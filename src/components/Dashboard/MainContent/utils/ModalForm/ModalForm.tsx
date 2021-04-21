import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import IconButton from "@material-ui/core/IconButton";

const ModalForm: React.FC = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  const handleModal = () => {
    setOpen((prev) => !prev);
  };

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const variants = {
    initial: {
      opacity: 0,
      height: 1,
    },
    in: {
      height: "auto",
      opacity: 1,
      transition: {
        ease: "easeIn",
      },
    },
  };

  return (
    <>
      <label style={{ display: "flex" }} htmlFor="icon-button-file">
        <IconButton
          component={motion.span}
          animate={{
            opacity: [0.8, 1],
            scale: [1.4, 1.3, 1.4],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
          transition={{
            duration: 0.5,
            ease: "easeIn",
            loop: 1,
          }}
          onClick={handleOpen}
          color="primary"
          aria-label="Add to Table"
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </label>
      <AnimatePresence>
        <Modal
          open={open}
          onClose={handleModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={variants}
            style={{ maxWidth: "800px", y: "25%", margin: "0 auto" }}
          >
            <Paper style={{ padding: "30px" }}>{children}</Paper>
          </motion.div>
        </Modal>
      </AnimatePresence>
    </>
  );
};

export default ModalForm;
