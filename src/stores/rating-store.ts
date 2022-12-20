import { defineStore } from 'pinia';
import { api } from 'boot/axios';

type IState = {
  players: {
    day: Array<{
      team: string,
      player: string,
      scores: number,
    }>,
    week: Array<{
      team: string,
      player: string,
      scores: number,
    }>,
  },
  teams: {
    day: Array<{
      team: string,
      scores: number,
    }>,
    week: Array<{
      team: string,
      scores: number,
    }>,
  },
};

export const useRatingStore = defineStore('ratingStore', {
  state: () => ({
    players: {
      day: [],
      week: [],
    },
    teams: {
      day: [],
      week: [],
    },
  } as IState),
  actions: {
    async fetchLeaderboard() {
      try {
        const { data: dataTeams } = await api.get('/leaderboard?type=team');
        const { data: dataPlayers } = await api.get('/leaderboard?type=player');
        this.teams.day = dataTeams.day.slice(0, 25);
        this.teams.week = dataTeams.week.slice(0, 25);
        this.players.day = dataPlayers.day.slice(0, 25);
        this.players.week = dataPlayers.week.slice(0, 25);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    },
  },
});
