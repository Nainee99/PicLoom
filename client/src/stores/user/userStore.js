import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      profile: null,
      followers: [],
      following: [],
      boards: [],
      pins: [],
      setProfile: (profileData) => set({ profile: profileData }),
      setFollowers: (followersData) => set({ followers: followersData }),
      setFollowing: (followingData) => set({ following: followingData }),
      setBoards: (boardsData) => set({ boards: boardsData }),
      setPins: (pinsData) => set({ pins: pinsData }),
      clearUserData: () =>
        set({
          profile: null,
          followers: [],
          following: [],
          boards: [],
          pins: [],
        }),
    }),
    {
      name: "user-storage",
    }
  )
);
