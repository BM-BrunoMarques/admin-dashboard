import React from "react";
import Default from "./Default/Default";
import { Route, Switch, useLocation } from "react-router-dom";
import OrdersManagement from "./OrdersManagement/OrdersManagement";
import UsersManagement from "./UsersManagement/UsersManagement";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedRoutes from "./utils/AnimatedRoutes/AnimatedRoutes";

interface MainContentProps {
  classes: any;
  path: string;
  sessionSKey: string;
  currentUrl: string;
  setCurrentUrl: React.Dispatch<React.SetStateAction<string>>;
}

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    transition: {
      ease: "anticipate",
    },
  },
  out: {
    transition: {
      ease: "anticipate",
    },
    opacity: 0,
  },
};

const MainContent: React.FC<MainContentProps> = (props) => {
  const { classes, path, setCurrentUrl } = props;

  const location = useLocation();

  const handleUrlOnRouting = (path: string) => {
    setCurrentUrl(path);
  };

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />

      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch location={location} key={location.pathname}>
          <Route exact path={`${path}/default`}>
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
            >
              <Default />
            </motion.div>
          </Route>

          <Route exact path={`${path}/orders`}>
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
            >
              <OrdersManagement />
            </motion.div>
          </Route>

          <Route exact path={`${path}/users`}>
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
            >
              <UsersManagement />
            </motion.div>
          </Route>
        </Switch>
      </AnimatePresence>
    </main>
  );
};

export default MainContent;
