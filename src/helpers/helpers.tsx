import * as SI from "./consts";
export const generateOrder = (
  name: string,
  address: string,
  country: { name: string; code: string },
  total: string,
  status: string
) => {
  const id = generateId();
  const dateObj = new Date();

  const date = `${
    dateObj.getMonth() + 1
  }/${dateObj.getDate()}/${dateObj.getFullYear()}`;

  return { id, name, date, address, country, total, status };
};

export const generateUser = (
  {
    authentication,
  }: { authentication: { type: SI.UserType; email: string; password: string } },
  { info }: { info: { name: { firstName: string; lastName: string } } }
) => {
  const id = generateId();

  return {
    authentication: { id, ...authentication },
    info: { ...info },
  };
};

export const generateId = () => {
  const max = 999999999;
  return (
    new Date().getTime() + Math.ceil(Math.random() * max + Math.random() * max)
  );
};

export const groupObjsBy = (data: object[], key: string) => {
  return data.reduce((container: any, item: any) => {
    const group = item[key].code;
    container[group] = container[group] || [];
    container[group].push(item);

    return container;
  }, {});
};
