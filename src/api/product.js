import instance from "./instance";

const url = `/products`;

export const create = (product) => {
  return instance.post(url, product);
};

export const read = () => {
  return instance.get(url);
};

export const update = (product) => {
  return instance.put(`${url}/${product.id}`, product);
};

export const destroy = (id) => {
  return instance.delete(`${url}/${id}`);
};

export const show = (id) => {
  return instance.get(`${url}/${id}?_expand=category`);
};

export const search = (keyword) => {
  return instance.get(`${url}?name_like=${keyword}`);
};

export const getLimitProduct = (limit) => {
  return instance.get(`${url}?_limit=${limit}&_sort=id`);
};
