import axios from "axios";
import { API_SERVER_HOST } from "./boardApi.js";

const host = `${API_SERVER_HOST}/api/replies`;

export const getList = async (boardId, page = 1, size = 10) => {
    try {
        const res = await axios.get(`${host}/${boardId}`, {
            params: { page, size }
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching replies:", error);
        throw error;
    }
};

export const addReply = async (ReplyDTO) => {
    try {
        const res = await axios.post(`${host}/add`, ReplyDTO);
        return res.data;
    } catch (error) {
        console.error("Error adding reply:", error);
        throw error;
    }
}

export const deleteReply = async (id) => {
    try {
        const res = await axios.delete(`${host}/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error deleting reply:", error);
    }
}