export const configureFakeBackend = () => {
  let realFetch = window.fetch;
  window.fetch = function (url, opts) {
    const { method, headers } = opts;
    const body = opts.body && JSON.parse(opts.body);

    return new Promise((resolve, reject) => {
      function handleRoute() {
        return realFetch(url, opts)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      }
    });
  };
};