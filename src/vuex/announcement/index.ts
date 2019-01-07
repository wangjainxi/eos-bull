import { Module } from 'vuex';
import { AnnouncementState } from './types';
import { RootState } from '../types';
import { getAnnouncementList } from '@/utils/apis';
import { Announcement } from '@/define';

const namespaced = true;

export const state: AnnouncementState = {
  announcements: [],
};

export const announcement: Module<AnnouncementState, RootState> = {
  namespaced,
  state,
  actions: {
    async fetchAnnouncements({ commit }) {
      const res = await getAnnouncementList({ page: 1, pageSize: 10 });
      commit('setAnnouncements', res.announcements);
    },
  },
  mutations: {
    setAnnouncements(state, announcements: Announcement[]) {
      state.announcements = announcements;
    },
  },
};
