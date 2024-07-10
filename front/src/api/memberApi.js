import axios from "axios";
import { API_SERVER_HOST } from "./boardApi";

// const host = `${API_SERVER_HOST}/api`;
const host = `http://localhost:80/api`;

// 이메일 불일치
export const matchEmail = async (loginParam) => {

    console.log("Matching email for Email:", loginParam.email);

    const header = {headers: {"Content-Type": "application/json"}};
    const data = {
        email: loginParam.email,
    };

    try {
        const res = await axios.post(`${host}/auth/login`, data, header);
        return res.data;
    } catch (error) {
        
    }
}

// 비밀번호 불일치
export const matchPassword = async (email) => {

    console.log("Matching password for Email:", email);

    try {
        const response = await axios.get(`${host}/email/{email}`);
        return response.data;
    } catch (error) {
        console.error('Error matching password:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const loginPost = async (loginParam) => {
    const header = {headers: {"Content-Type": "application/json"}};
    const data = {
        email: loginParam.email,
        password: loginParam.password
    };
    try {
        const res = await axios.post(`${host}/auth/login`, data, header);
        return res.data;
    } catch (error) {
        throw error;
    }
}

// 이메일 중복 체크
export const emailCheck = async (email) => {
    console.log("Checking email for Email:", email);
    try {
        const response = await axios.get(`${host}/email/{email}`);
        return response.data;
    } catch (error) {
        console.error('Error checking email:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 닉네임 중복 체크
export const nicknameCheck = async (nickname) => {
    console.log("Checking nickname for Nickname:", nickname);
    try {
        const response = await axios.post(`${host}/nickname/{nickname}`);
        return response.data;
    } catch (error) {
        console.error('Error checking nickname:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 회원가입
export const signUp = async (id) => {
    console.log("Fetching data for ID:", id);
    try {
        const response = await axios.get(`${host}/signUp`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 임시비밀번호 메일 전송 및 임시비밀번호 변경
export const sendEmail = async (email) => {
    console.log("Fetching data for Email:", email);
    try {
        const response = await axios.get(`${host}/sendEmail`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 멤버 정보 요청
export const getMemberWithMemberId = async (memberId) => {

    try {
        const res = await axios.get(`${host}/info`, {
            params: {
                memberId: memberId
            }
        });
        console.log(res.data);
    } catch (error) {
        console.error('Error fetching data:', error.res ? error.res.data : error.message);
        throw error;
    }
}
