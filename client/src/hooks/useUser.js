import { useCallback } from 'react';
import { useUserStore } from '../stores/user/userStore';
import { userService } from '../services/api/userService';

export const useUser = () => {
  const {
    profile,
    followers,
    following,
    boards,
    pins,
    setProfile,
    setFollowers,
    setFollowing,
    setBoards,
    setPins,
    clearUserData
  } = useUserStore();

  const fetchProfile = useCallback(async (userId) => {
    try {
      const { data } = await userService.getProfile(userId);
      setProfile(data.user);
      return data.user;
    } catch (error) {
      throw error;
    }
  }, [setProfile]);

  const updateProfile = useCallback(async (profileData) => {
    try {
      const { data } = await userService.updateProfile(profileData);
      setProfile(data.user);
      return data.user;
    } catch (error) {
      throw error;
    }
  }, [setProfile]);

  const changePassword = useCallback(async (currentPassword, newPassword) => {
    try {
      const response = await userService.changePassword(currentPassword, newPassword);
      return response;
    } catch (error) {
      throw error;
    }
  }, []);

  const fetchBoards = useCallback(async (userId) => {
    try {
      const { data } = await userService.getBoards(userId);
      setBoards(data.boards);
      return data.boards;
    } catch (error) {
      throw error;
    }
  }, [setBoards]);

  const fetchPins = useCallback(async (userId) => {
    try {
      const { data } = await userService.getPins(userId);
      setPins(data.pins);
      return data.pins;
    } catch (error) {
      throw error;
    }
  }, [setPins]);

  const fetchFollowers = useCallback(async (userId) => {
    try {
      const { data } = await userService.getFollowers(userId);
      setFollowers(data.followers);
      return data.followers;
    } catch (error) {
      throw error;
    }
  }, [setFollowers]);

  const fetchFollowing = useCallback(async (userId) => {
    try {
      const { data } = await userService.getFollowing(userId);
      setFollowing(data.following);
      return data.following;
    } catch (error) {
      throw error;
    }
  }, [setFollowing]);

  const clearUser = useCallback(() => {
    clearUserData();
  }, [clearUserData]);

  return {
    // State
    profile,
    followers,
    following,
    boards,
    pins,
    // Actions
    fetchProfile,
    updateProfile,
    changePassword,
    fetchBoards,
    fetchPins,
    fetchFollowers,
    fetchFollowing,
    clearUser
  };
};