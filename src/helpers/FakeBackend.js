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

export const configureFakeBackend = () => {
  let realFetch = window.fetch;
  window.fetch = function (url, opts) {
    const { method, headers } = opts;
    const body = opts.body && JSON.parse(opts.body);

    console.log(url, opts, body);

    return new Promise((resolve, reject) => {
      setTimeout(handleRoute, 500);
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
