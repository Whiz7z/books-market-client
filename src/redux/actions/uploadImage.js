import axios from "axios";
import { useGetAllProductsQuery } from "../store";

export const uploadImage = async (image) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/uploadimage`,
      image,
      config
    );

    if (response.status > 400) {
      console.log(response);
      return response.status;
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
    return "error";
  }
};
