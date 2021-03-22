import { store } from "../app/store";

const fields = {
  email: "email",
  password: "password",
};

export const configureFakeBackend = () => {
  let realFetch = window.fetch;
  window.fetch = function (url, opts) {
    const { method, headers } = opts;
    const body = opts.body && JSON.parse(opts.body);

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
        return new Promise((resolve, reject) => {
          allUsers.find((el) => {
            const emailExists = el.authentication.email === email;
            if (emailExists) {
              return resolve(el.authentication.password);
            } else {
              return reject({
                field: fields.email,
                errorMessage: "Your email is not in our system.",
              });
            }
          });
        })
          .then((response) => {
            if (response !== password) {
              return reject({
                field: fields.password,
                errorMessage: "Wrong Password!",
              });
            } else {
              return resolve(email);
            }
          })
          .then((response) => {
            return resolve(response);
          })
          .catch((response) => {
            return reject(response);
          });
      };
    });
  };
};
