<template>
  <div
    class="full-height flex flex-center column q-pa-xl"
  >
    <div class="text-h1 text-uppercase text-weight-bolder text-white">
      Team leaderboard
    </div>
    <q-list class="text-weight-bold text-h3 q-pa-xl">
      <q-item
        v-for="(player, i) of players"
        :key="i"
      >
        <q-item-section avatar>
          <q-avatar color="white" text-color="blue" size="80px" font-size="42px">
            {{ i + 1 }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <div>
            <span class="text-orange" style="display: inline-block; width: 400px">
            {{ player.name }}
            </span>
            <span class="text-white">
            {{ player.scores }}
          </span>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
    <div class="full-width flex justify-center">
      <q-btn
        @click="close"
        class="text-weight-bolder q-px-xl"
        push outline
        size="xl"
        label="close"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useHoleStore } from 'stores/hole-store';
import { storeToRefs } from 'pinia';

const holeStore = useHoleStore();
const { team } = storeToRefs(holeStore);

const route = useRoute();
const holeNumber = computed(() => route.params.hole);

const router = useRouter();

const players = team.value.players.sort((a, b) => b.scores - a.scores);

const close = () => {
  router.push(`/hole/${holeNumber.value}`);
};
</script>

<style scoped lang="sass">

</style>
