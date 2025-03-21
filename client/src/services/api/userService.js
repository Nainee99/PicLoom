import { apiClient } from '../config/apiConfig';

export const userService = {
  getProfile: async (userId) => {
    const response = await apiClient.get(`/users/profile/${userId || ''}`);
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await apiClient.put('/users/profile', profileData);
    return response.data;
  },

  changePassword: async (currentPassword, newPassword) => {
    const response = await apiClient.put('/users/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  getBoards: async (userId) => {
    const response = await apiClient.get(`/users/boards/${userId || ''}`);
    return response.data;
  },

  getPins: async (userId) => {
    const response = await apiClient.get(`/users/pins/${userId || ''}`);
    return response.data;
  },

  getFollowers: async (userId) => {
    const response = await apiClient.get(`/users/followers/${userId || ''}`);
    return response.data;
  },

  getFollowing: async (userId) => {
    const response = await apiClient.get(`/users/following/${userId || ''}`);
    return response.data;
  },

  // Admin only functions
  getAllUsers: async () => {
    const response = await apiClient.get('/users/all');
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await apiClient.delete(`/users/delete/${userId || ''}`);
    return response.data;
  },

  toggleUserStatus: async (userId) => {
    const response = await apiClient.patch(`/users/toggle-status/${userId}`);
    return response.data;
  },

  updateUserRole: async (userId, role) => {
    const response = await apiClient.patch(`/users/update-role/${userId}`, { role });
    return response.data;
  }
};