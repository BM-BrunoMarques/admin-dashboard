import { store } from "../app/store";
import { createCookie } from "./cookie.tsx";

const fields = {
  email: "email",
  password: "password",
};

const errors = {
  emailMissing: {
    field: fields.email,
    errorMessage: "Your email is not in our system.",
  },
  wrongPassword: {
    field: fields.password,
    errorMessage: "Wrong Password!",
  },
};

const timeForFetch = (url, method) => {
  switch (true) {
    case url.endsWith("user/authenticate") && method === "POST":
      return true;
      break;
    default:
      return false;
      break;
  }
};

export const configureFakeBackend = () => {
  let realFetch = window.fetch;
  window.fetch = function (url, opts) {
    let body;
    const { method, headers } = opts || { method: "", headers: "" };
    if (opts) {
      body = opts.body && JSON.parse(opts.body);
    }

    const fakeFetch = timeForFetch(url, method);

    return new Promise((resolve, reject) => {
      if (fakeFetch) {
        setTimeout(handleRoute, 500);
      } else {
        handleRoute();
      }

      function handleRoute() {
        switch (true) {
          case url.endsWith("user/authenticate") && method === "POST":
            return authenticate();
            break;

          default:
            return realFetch(url, opts)
              .then((response) => resolve(response))
              .catch((error) => reject(error));
        }
      }

      const authenticate = () => {
        const state = store.getState();
        const allUsers = state.users;
        const { email, password } = body;

        const userFound = allUsers.find((el) => {
          return el.authentication.email === email;
        });
        if (!userFound || !allUsers.length) {
          return reject({ ...errors.emailMissing });
        }
        if (userFound.authentication.password !== password) {
          return reject({ ...errors.wrongPassword });
        }

        createCookie("isLoggedIn", email, 30);
        return resolve(userFound);
      };
    });
  };
};
