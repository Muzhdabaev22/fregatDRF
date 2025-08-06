import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/v1/';

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const sendContactForm = async (values) => {
    try {
        const response = await apiClient.post('contact/', values)
        console.info("response", response);
        return true
    } catch (error) {
        console.error("error", error);
        return false
    }
};