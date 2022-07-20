<template>
  <div
    @click="router.push({ path: '/registry/team' })"
    class="fullscreen flex flex-center column justify-around"
  >
    <div class="logo flex flex-center">
      <q-img
        src="~assets/pn-logo.svg"
        spinner-color="white"
        style="width: 85%"
        fit="contain"
      />
    </div>
    <div class="text-uppercase text-h1 text-weight-bolder animated pulse infinite slower">
      Tap on screen
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped lang="sass">
.logo
  background: white
  border-radius: 50%
  width: 55vh
  height: 55vh
  box-shadow: inset rgba(2, 50, 74, 0.6) -1vh -2.5vh 6vh
  opacity: 1
  background-image: radial-gradient(rgba(2, 50, 74, 0.05) 2.5vh, transparent 2.5vh), radial-gradient(rgba(2, 50, 74, 0.05) 2.5vh, transparent 2.5vh)
  background-size: 10vh 10vh
  background-position: 0 0, 5vh 5vh
</style>
