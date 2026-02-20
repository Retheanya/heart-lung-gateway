import apiClient from '@/lib/axios';

export const login = async (credentials: any) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
};

export const sendOTP = async (email: string) => {
    const response = await apiClient.post('/auth/send-otp', { email });
    return response.data;
};

export const verifyOTP = async (email: string, otp: string) => {
    const response = await apiClient.post('/auth/verify-otp', { email, otp });
    return response.data;
};

export const register = async (data: any) => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
};

export const logout = async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
};
