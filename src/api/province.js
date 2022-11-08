import axios from "axios";

const API = process.env.REACT_APP_PROVINCE_API;

export const getProvince = async () => {
  const { data } = await axios.get(`${API}`);
  return data.results;
};

export const getDistrict = async (province_id) => {
  const { data } = await axios.get(`${API}/district/${province_id}`);
  return data.results;
};

export const getWards = async (district_id) => {
  const { data } = await axios.get(`${API}/ward/${district_id}`);
  return data.results;
};
