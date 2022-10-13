import { defineStore } from 'pinia';
import { api } from 'boot/axios';

type IState = {
  team: {
    id: number,
    name: string,
    pin: string,
    players: Array<{
      name: string,
      scores: number,
    }>
  },
};

export const useHoleStore = defineStore('holeStore', {
  state: () => ({
    team: {
      id: 0,
      name: '',
      pin: '',
      players: [],
    },
  } as IState),
  actions: {
    async fetchTeam(pin: string) {
      try {
        const { data } = await api.get('/team', {
          params: {
            pin,
          },
        });
        const nonEmpty = data && Object.keys(data).length !== 0;
        if (nonEmpty) this.team = data;
        return nonEmpty;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
      return false;
    },
  },
});
