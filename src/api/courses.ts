import apiClient from '@/lib/axios';

export const getCourses = async () => {
    try {
        const response = await apiClient.get('/course/all/courses');
        return response.data;
    } catch (error: any) {
        // Fallback for public access if API is protected or fails
        return { data: { rows: [] } };
    }
};

export const getEnrolledCourses = async () => {
    const response = await apiClient.get('/auth/learner/enrolled-courses');
    return response.data;
};

export const getEnrolledCourse = async (id: string) => {
    const response = await apiClient.get(`/auth/learner/enrolled-courses/${id}`);
    return response.data;
};

export const getCourse = async (id: string) => {
    const response = await apiClient.get(`/course/${id}`);
    return response.data;
};

export const createCourse = async (data: any) => {
    const response = await apiClient.post('/course', data);
    return response.data;
};

export const updateCourse = async (id: string, data: any) => {
    const response = await apiClient.put(`/course/${id}`, data);
    return response.data;
};

export const deleteCourse = async (id: string) => {
    const response = await apiClient.delete(`/course/${id}`);
    return response.data;
};
