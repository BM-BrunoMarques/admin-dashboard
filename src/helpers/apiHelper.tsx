const positionStackKey = "82fc74a7ef4e96497487137b90f0990c";

export const forwardLocation = async (query: string) => {
  setInterval(() => {}, 1000);
  console.log("query", query);

  const fetched = await fetch(
    `http://api.positionstack.com/v1/forward?access_key=${positionStackKey}&query=${query}`
  );
  console.log(fetched);

  const data = await fetched.json();
  console.log("data", data);

  return data.data[0];
};
