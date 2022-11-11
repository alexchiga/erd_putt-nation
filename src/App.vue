<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';

onBeforeMount(() => {
  document
    .querySelector('meta[name=viewport]')
    ?.setAttribute(
      'content',
      `user-scalable=no,initial-scale=${1 / window.devicePixelRatio}, maximum-scale=${1 / window.devicePixelRatio}, minimum-scale=${1 / window.devicePixelRatio}, width=device-width`,
    );
});
</script>
