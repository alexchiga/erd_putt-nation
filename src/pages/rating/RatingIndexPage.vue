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
        Leaderboard
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

    <q-card>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="day">
          <div
            v-for="(team, i) of day"
            :key="i"
            class="text-h4 text-uppercase text-weight-medium"
          >
            <div style="display: inline-block; width: 600px">
              <div class="text-right" style="display: inline-block; width: 50px">{{ i + 1 }}.&nbsp;</div>
              <span class="text-weight-bold">{{ team.name }}</span>
            </div>
            <span>
              {{ team.scores }}
            </span>
          </div>
        </q-tab-panel>

        <q-tab-panel name="month">
          <div
            v-for="(team, i) of month"
            :key="i"
            class="text-h4 text-uppercase text-weight-medium"
          >
            <div style="display: inline-block; width: 600px">
              <div class="text-right" style="display: inline-block; width: 50px">{{ i + 1 }}.&nbsp;</div>
              <span class="text-weight-bold">{{ team.name }}</span>
            </div>
            <span>
              {{ team.scores }}
            </span>
          </div>
        </q-tab-panel>

        <q-tab-panel name="year">
          <div
            v-for="(team, i) of year"
            :key="i"
            class="text-h4 text-uppercase text-weight-medium"
          >
            <div style="display: inline-block; width: 600px">
              <div class="text-right" style="display: inline-block; width: 50px">{{ i + 1 }}.&nbsp;</div>
              <span class="text-weight-bold">{{ team.name }}</span>
            </div>
            <span>
              {{ team.scores }}
            </span>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import {
  ref, onMounted, onUnmounted, computed,
} from 'vue';
import { useRatingStore } from 'stores/rating-store';

const tabs = ['day', 'month', 'year'];
const tab = ref('day');

onMounted(() => {
  const intervalId = setInterval(() => {
    if (tab.value === 'day') {
      tab.value = 'month';
    } else if (tab.value === 'month') {
      tab.value = 'year';
    } else if (tab.value === 'year') {
      tab.value = 'day';
    }
  }, 10000);

  onUnmounted(() => {
    clearInterval(intervalId);
  });
});

const ratingStore = useRatingStore();
const day = computed(() => ratingStore.day);
const month = computed(() => ratingStore.month);
const year = computed(() => ratingStore.month);

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
</style>
