import instance from "./instance";

const url = `/blogs`;

export const read = () => {
  return instance.get(url);
};
