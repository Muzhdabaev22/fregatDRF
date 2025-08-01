import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/v1/';

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Blog API functions
export const blogAPI = {
    // Получить список всех постов блога с пагинацией
    getPosts: async (page = 1, pageSize = 12) => {
        try {
            const response = await apiClient.get(`blog/?page=${page}&page_size=${pageSize}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            throw error;
        }
    },

    // Получить конкретный пост по ID
    getPostById: async (id) => {
        try {
            const response = await apiClient.get(`blog/${id}/`);
            return response.data;
        } catch (error) {
            console.error('Error fetching blog post:', error);
            throw error;
        }
    },

    // Получить пост по URL slug
    getPostBySlug: async (slug) => {
        try {
            const response = await apiClient.get(`blog/?url=${slug}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching blog post by slug:', error);
            throw error;
        }
    },

    // Поиск постов по заголовку
    searchPosts: async (query, page = 1) => {
        try {
            const response = await apiClient.get(`blog/?search=${encodeURIComponent(query)}&page=${page}`);
            return response.data;
        } catch (error) {
            console.error('Error searching blog posts:', error);
            throw error;
        }
    }
};
