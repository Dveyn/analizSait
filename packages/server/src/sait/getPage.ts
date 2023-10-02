import axios from "axios";

export const getPage = async (url:string) => {
  try {
    const response = await axios.get(`http://${url}`);
    return response.data;
  } catch (error) {
    throw new Error(`Unable to fetch page: ${error}`);
  }
};
