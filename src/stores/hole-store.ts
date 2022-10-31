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
      holes: Array<{
        id: string,
        scores: number | null,
      }>,
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
    async fetchTeam(pin: string, holeId: string) {
      try {
        const { data } = await api.get('/team', {
          params: {
            pin,
          },
        });
        console.log(data);
        const nonEmpty = data && Object.keys(data).length !== 0;
        const nonPlayed = data.players[0].holes.reduce((result: boolean, item: { id: string}) => result && item.id !== holeId, true);
        if (nonEmpty && nonPlayed) {
          this.team = data;
          this.team.players.forEach((player) => {
            player.holes.push({
              id: holeId,
              scores: null,
            });
          });
          return true;
        }
        return false;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
      return false;
    },
    async postResults() {
      try {
        const { data } = await api.post('/results', {
          ...this.team,
        });
        console.log(data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    },
  },
});
