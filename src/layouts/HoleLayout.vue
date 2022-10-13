<template>
  <q-layout class="fullscreen bg-blue text-white">
    <q-header elevated class="bg-orange text-blue">
      <q-toolbar>
        <q-toolbar-title
          class="text-uppercase text-h2 text-weight-bolder q-ma-sm"
        >
          Hole #{{ holeNumber }}
        </q-toolbar-title>
        <div
          v-if="teamName"
          class="text-uppercase text-h2 text-weight-bolder q-ma-sm"
        >
          Team: {{ teamName }}
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container class="full-height">
      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="animated slideInRight slow"
          leave-active-class="animated slideOutLeft slow"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useHoleStore } from 'stores/hole-store';

const route = useRoute();
const holeNumber = computed(() => route.params.hole);

const holeStore = useHoleStore();
const teamName = computed(() => holeStore.team.name);
</script>

<style scoped>

</style>
