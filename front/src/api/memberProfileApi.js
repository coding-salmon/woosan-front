import axios from "axios";
import { API_SERVER_HOST } from "./boardApi.js";

const host = `${API_SERVER_HOST}/api/member-profile`;

export const getMember = async (id) => {
  try {
    const res = await axios.get(`${host}/${id}`);
    return res.data;
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const modifyProfile = async (formDataObj) => {
    try {
      const res = await axios.patch(`${host}/modify`, formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      return res.data;
    } catch (error) {
      console.error(
        "Error modifying member Profile:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };