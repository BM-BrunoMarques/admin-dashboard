import React from "react";
import { Route } from "react-router-dom";
import { motion } from "framer-motion";

type props = {
  exact: Boolean;
  path: string;
};

const pageVariants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  in: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.2,
    },
  },
  out: {
    x: -200,
    opacity: 0,
  },
};

const AnimatedRoutes: React.FC<props> = ({ children, path }) => {
  return (
    <Route exact path={path}>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </Route>
  );
};

export default AnimatedRoutes;
