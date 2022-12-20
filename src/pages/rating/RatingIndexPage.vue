<template>
  <div
    class="fullscreen flex flex-center justify-around column"
  >
    <div class="row">
      <div class="col window-width flex flex-center">
        <q-img
          src="~assets/pn-logo-white-orange.svg"
          spinner-color="white"
          style="width: 12vw"
          fit="contain"
        />
      </div>
      <div class="col text-uppercase text-h2 text-orange text-weight-bolder flex flex-center">
        <div>Week Leaderboard</div>
        <div>{{ roomName }}</div>
      </div>
      <div class="col q-pa-md q-gutter-sm flex flex-center">
        <q-btn
          v-for="item of tabs"
          @click="tab = item"
          :key="item"
          :size="item === tab ? 'lg' : 'md'"
          :color="item === tab ? 'white' : 'blue'"
          :text-color="item === tab ? 'blue' : 'white'"
          :label="item"
          :outline="item !== tab"
          style="width: 120px; transition: font-size 0.3s"
        />
      </div>
    </div>

    <q-card class="card">
      <div style="height: 75vh; width: 60vw" class="scroll-y overflow-hidden-x" ref="container">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="teams">
            <q-list
              v-for="k in 2" :key="k"
              separator
              class="text-h4 full-width text-primary"
            >
              <q-item
                v-for="(team, i) of teams.week"
                :key="i"
                class="q-py-lg"
              >
                <q-item-section avatar>
                  <q-avatar
                    v-if="i > 2"
                    size="50px"
                    color="primary"
                    text-color="white"
                    class="q-mr-md text-weight-bold"
                  >
                    {{ i + 1 }}
                  </q-avatar>
                  <q-icon
                    v-else
                    size="70px"
                    :color="i === 0 ? 'orange' : i === 1 ? 'blue-grey-13' : 'deep-orange-10'"
                    name="fa-solid fa-trophy">
                    <div style="position: absolute; color: white; font-size: 28px; transform: translate(0, -10px)">
                      {{ i + 1 }}
                    </div>
                  </q-icon>
                </q-item-section>

                <q-item-section class="text-uppercase text-weight-bolder">
                  <span v-if="i > 2">
                    {{ team.team }}
                  </span>
                  <span v-else class="text-h3 text-weight-bolder q-pl-md">
                    {{ team.team }}
                  </span>
                </q-item-section>

                <q-item-section side class="text-primary">
                  <span  v-if="i > 2" class="text-weight-bold">
                    {{ team.scores }}
                  </span>
                  <span v-else class="text-weight-bolder text-h3">
                    {{ team.scores }}
                  </span>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>

          <q-tab-panel name="players" class="flex flex-center column">
            <q-list
              v-for="k in 2" :key="k"
              separator
              class="text-h4 full-width text-primary"
            >
              <q-item
                v-for="(player, i) of players.week"
                :key="i"
                class="q-py-lg"
              >
                <q-item-section avatar>
                  <q-avatar
                    v-if="i > 2"
                    size="50px"
                    color="primary"
                    text-color="white"
                    class="q-mr-md text-weight-bold"
                  >
                    {{ i + 1 }}
                  </q-avatar>
                  <q-icon
                    v-else
                    size="70px"
                    :color="i === 0 ? 'orange' : i === 1 ? 'blue-grey-13' : 'deep-orange-10'"
                    name="fa-solid fa-trophy">
                    <div style="position: absolute; color: white; font-size: 28px; transform: translate(0, -10px)">
                      {{ i + 1 }}
                    </div>
                  </q-icon>
                </q-item-section>

                <q-item-section class="text-weight-bolder text-uppercase">
                  <span v-if="i > 2">
                    <span
                      style="position: absolute; transform: translateY(33px)"
                      class="text-weight-bold text-grey-5 text-h6">
                      {{ player.team }}
                    </span>
                    {{ player.player }}
                  </span>
                  <span v-else class="text-h3 text-weight-bolder q-pl-md">
                    <span
                      style="position: absolute; transform: translateY(40px)"
                      class="text-weight-bold text-grey-5 text-h6">
                      {{ player.team }}
                    </span>
                    {{ player.player }}
                  </span>
                </q-item-section>

                <q-item-section side class="text-primary">
                  <span  v-if="i > 2" class="text-weight-bold">
                    {{ player.scores }}
                  </span>
                  <span v-else class="text-weight-bolder text-h3">
                    {{ player.scores }}
                  </span>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import {
  ref, onMounted, onUnmounted, computed,
} from 'vue';
import { useRatingStore } from 'stores/rating-store';
import { scroll } from 'quasar';

const { getScrollTarget, getScrollHeight, setVerticalScrollPosition } = scroll;

const tabs = ['teams', 'players'];
const tab = ref(tabs[0]);
const container = ref(null);
const roomName = import.meta.env.VITE_ROOM_NAME as string;

onMounted(() => {
  if (container.value) {
    const scrollTarget = getScrollTarget(container.value);
    let scrollHeight = getScrollHeight(container.value);
    const scrollDuration = 20000;

    setTimeout(() => {
      if (container.value) {
        scrollHeight = getScrollHeight(container.value) / 2;
        setVerticalScrollPosition(scrollTarget, scrollHeight, scrollDuration);
      }
    }, 2000);

    const intervalId = setInterval(() => {
      if (tab.value === 'teams') {
        tab.value = 'players';
      } else if (tab.value === 'players') {
        tab.value = 'teams';
      }
      if (container.value) {
        setVerticalScrollPosition(getScrollTarget(container.value), 0, 0);
        setTimeout(() => {
          if (container.value) {
            scrollHeight = getScrollHeight(container.value) / 2;
            setVerticalScrollPosition(scrollTarget, scrollHeight, scrollDuration);
          }
        }, 2000);
      }
    }, 22500);

    onUnmounted(() => {
      clearInterval(intervalId);
    });
  }
});

const ratingStore = useRatingStore();
const players = computed(() => ratingStore.players);
const teams = computed(() => ratingStore.teams);

onMounted(async () => {
  await ratingStore.fetchLeaderboard();
  const intervalId = setInterval(() => {
    ratingStore.fetchLeaderboard();
  }, 60000);

  onUnmounted(() => {
    clearInterval(intervalId);
  });
});
</script>

<style scoped lang="sass">
.card
  &::before
    content: ''
    width: 60vw
    height: 75vh
    box-shadow: inset 0 0 50px white
    display: block
    position: absolute
    z-index: 100
    border-radius: inherit
.scroll-y
  &::-webkit-scrollbar
    display: none
</style>
