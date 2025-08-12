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
        return true
    } catch (error) {
        console.error("error", error);
        return false
    }
};


export const getBlogPosts = async (page = 1, pageSize = 12) => {
    try {
        const response = await apiClient.get(`blog/?page=${page}&page_size=${pageSize}`)
        return response.data
    } catch (error) {
        console.error("error", error);
        return false
    }
}

export const getCinemaPosts = async () => {
    try {
        const response = await apiClient.get('cinema/')
        return response.data
    } catch (error) {
        console.error("error", error);
        return false
    }
}

export const getEpisodeDetails = async (episodeUrl) => {
    try {
        const response = await apiClient.get(`episodes/${episodeUrl}/`)
        return response.data
    } catch (error) {
        console.error("error", error);
        return false
    }
}