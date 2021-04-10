const positionStackKey = "82fc74a7ef4e96497487137b90f0990c";

export const forwardLocation = async (query: string) => {
  const fetched = await fetch(
    `http://api.positionstack.com/v1/forward?access_key=${positionStackKey}&query=${query}`
  );

  const data = await fetched.json();
  console.log("data", data);
  if (data.data[0].length === 0) {
    throw new Error("PositionStack Api has failed");
  } else {
    return data.data[0];
  }
};

export const generateOrder = (
  name: string,
  date: string,
  address: string,
  country: string,
  total: number,
  status: string
) => {
  const id = generateId();
  return { id, name, date, address, country, total, status };
};

export const generateId = () => {
  const max = 9999999;
  return (
    new Date().getTime() + Math.ceil(Math.random() * max + Math.random() * max)
  );
  // return performance.now()
};
