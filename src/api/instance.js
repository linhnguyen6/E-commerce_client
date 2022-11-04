import axios from "axios";

const instance = axios.create({
  baseURL: "https://flower-citrine-khaan.glitch.me",
});

export default instance;
