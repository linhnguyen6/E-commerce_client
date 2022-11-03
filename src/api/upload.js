import axios from "axios";

const uploadImage = async (file) => {
  const API_URL = process.env.REACT_APP_CLOUDINARY_URL;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "linhnv");

  try {
    const { data, status } = await axios.post(API_URL, formData);
    return { status, data };
  } catch ({ response: { status } }) {
    return { status, data: null };
  }
};

export default uploadImage;
