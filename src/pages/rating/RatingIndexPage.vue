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

    <q-card class="card">
      <div style="height: 75vh; width: 60vw" class="scroll-y overflow-hidden-x" ref="container">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="day">
            <q-list
              separator
              class="text-h4 full-width text-primary"
            >
              <q-item
                v-for="(team, i) of day"
                :key="i"
                class="q-py-lg"
              >
                <q-item-section avatar>
                  <q-avatar size="50px" color="primary" text-color="white" class="q-mr-md text-weight-bold">
                    {{ i + 1 }}
                  </q-avatar>
                </q-item-section>

                <q-item-section class="text-weight-bolder">
                  {{ team.name }}
                </q-item-section>

                <q-item-section side class="text-primary text-weight-bold">
                  {{ team.scores }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>

          <q-tab-panel name="month" class="flex flex-center column">
            <q-list
              separator
              class="text-h4 full-width text-primary"
            >
              <q-item
                v-for="(team, i) of month"
                :key="i"
                class="q-py-lg"
              >
                <q-item-section avatar>
                  <q-avatar size="50px" color="primary" text-color="white" class="q-mr-md text-weight-bold">
                    {{ i + 1 }}
                  </q-avatar>
                </q-item-section>

                <q-item-section class="text-weight-bolder">
                  {{ team.name }}
                </q-item-section>

                <q-item-section side class="text-primary text-weight-bold">
                  {{ team.scores }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>

          <q-tab-panel name="year">
            <q-list
              separator
              class="text-h4 full-width text-primary"
            >
              <q-item
                v-for="(team, i) of year"
                :key="i"
                class="q-py-lg"
              >
                <q-item-section avatar>
                  <q-avatar size="50px" color="primary" text-color="white" class="q-mr-md text-weight-bold">
                    {{ i + 1 }}
                  </q-avatar>
                </q-item-section>

                <q-item-section class="text-weight-bolder">
                  {{ team.name }}
                </q-item-section>

                <q-item-section side class="text-primary text-weight-bold">
                  {{ team.scores }}
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

const tabs = ['day', 'month', 'year'];
const tab = ref('month');
const container = ref(null);

onMounted(() => {
  if (container.value) {
    const scrollTarget = getScrollTarget(container.value);
    const scrollHeight = getScrollHeight(container.value);
    const scrollDuration = 10000;

    setTimeout(() => {
      if (container.value) {
        setVerticalScrollPosition(scrollTarget, scrollHeight, scrollDuration);
      }
    }, 2000);

    const intervalId = setInterval(() => {
      if (tab.value === 'day') {
        tab.value = 'month';
      } else if (tab.value === 'month') {
        tab.value = 'year';
      } else if (tab.value === 'year') {
        tab.value = 'day';
      }
      if (container.value) {
        setVerticalScrollPosition(getScrollTarget(container.value), 0, 0);
        setTimeout(() => {
          if (container.value) {
            setVerticalScrollPosition(scrollTarget, scrollHeight, scrollDuration);
          }
        }, 2000);
      }
    }, 14000);

    onUnmounted(() => {
      clearInterval(intervalId);
    });
  }
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
