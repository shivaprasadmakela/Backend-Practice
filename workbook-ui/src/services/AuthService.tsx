import axios from 'axios';

const API_URL = 'http://localhost:8080/auth';

export const register = async (name: string, email: string, password: string) => {
    return axios.post(`${API_URL}/register`, { name, email, password });
};

export const login = async (email: string, password: string) => {
    return axios.post(`${API_URL}/login`, { email, password });
};
