import { defineStore } from 'pinia';

type IState = {
  teamName: string,
  players: Array<{
    name: string
  }>
};

export const useRegistryStore = defineStore('registryStore', {
  state: () => ({
    teamName: '',
    players: [],
  } as IState),
});
