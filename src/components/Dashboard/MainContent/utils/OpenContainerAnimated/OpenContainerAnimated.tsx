import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

import { motion, AnimatePresence } from "framer-motion";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";

const OpenContainerAnimated: React.FC = ({ children }) => {
  const [showForm, setShowForm] = useState<Boolean>(false);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

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
        width: showForm ? (!isSmall ? "50%" : "90%") : 0,
        x: showForm ? (!isSmall ? "50%" : "5%") : 0,
        backgroundColor: showForm
          ? [theme.palette.background.default, theme.palette.background.paper]
          : [theme.palette.background.paper, theme.palette.background.default],
        marginBottom: showForm ? "50px" : "0",
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
    children: {
      initial: { opacity: 0, height: 0 },
      in: {
        height: 425,
        opacity: [0, 1],
        transition: {
          ease: "anticipate",
          delay: 0.1,
        },
      },
      out: {
        opacity: 0,
        height: 0,
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
                variants={variants.children}
                initial="initial"
                animate="in"
                exit="out"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
};

export default OpenContainerAnimated;
