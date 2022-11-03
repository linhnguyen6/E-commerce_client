import instance from "./instance";

const url = `/categories`;

export const create = (category) => {
  return instance.post(url, category);
};

export const read = () => {
  return instance.get(url + "?_embed=products");
};

export const update = (category) => {
  return instance.put(`${url}/${category.id}`, category);
};

export const destroy = (id) => {
  return instance.delete(`${url}/${id}`);
};

export const getOne = (id) => {
  return instance.get(`${url}/${id}?_embed=products`);
};
