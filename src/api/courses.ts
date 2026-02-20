import apiClient from '@/lib/axios';

export const getCourses = async () => {
    const response = await apiClient.get('/courses');
    return response.data;
};

export const getCourse = async (id: string) => {
    const response = await apiClient.get(`/courses/${id}`);
    return response.data;
};

export const createCourse = async (data: any) => {
    const response = await apiClient.post('/courses', data);
    return response.data;
};

export const updateCourse = async (id: string, data: any) => {
    const response = await apiClient.put(`/courses/${id}`, data);
    return response.data;
};

export const deleteCourse = async (id: string) => {
    const response = await apiClient.delete(`/courses/${id}`);
    return response.data;
};
