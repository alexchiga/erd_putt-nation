import { defineStore } from 'pinia';
import { api } from 'boot/axios';

type IState = {
  teamName: string,
  players: Array<{
    name: string,
    score: number
  }>,
  teams: Array<string>,
};

export const useRegistryStore = defineStore('registryStore', {
  state: () => ({
    teamName: '',
    players: [],
    teams: [],
  } as IState),
  actions: {
    async fetchTeamList() {
      try {
        const { data } = await api.get('/teamlist');
        this.teams = data.teams;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    },
    async postTeam() {
      try {
        const { data } = await api.post('/team', {
          name: this.teamName,
          players: this.players,
        });
        // eslint-disable-next-line no-console
        console.log(data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    },
  },
});
