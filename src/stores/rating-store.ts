import { defineStore } from 'pinia';
import { api } from 'boot/axios';

type IState = {
  day: Array<{
    name: string,
    scores: number,
  }>,
  month: Array<{
    name: string,
    scores: number,
  }>,
  year: Array<{
    name: string,
    scores: number,
  }>,
};

export const useRatingStore = defineStore('ratingStore', {
  state: () => ({
    day: [],
    month: [],
    year: [],
  } as IState),
  actions: {
    async fetchLeaderboard() {
      try {
        const { data } = await api.get('/leaderboard');
        this.day = data.day;
        this.month = data.month;
        this.year = data.year;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    },
  },
});
