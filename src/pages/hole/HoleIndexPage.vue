<template>
  <div
    @click="() => {
      router.push({ path: `/hole/${holeNumber}/login` });
      rotateLogo = true;
    }"
    class="full-height flex flex-center column justify-around"
  >
    <div
      class="logo flex flex-center"
      :class="{'animated rotateOut slow': rotateLogo}"
    >
      <q-img
        src="~assets/pn-logo.svg"
        spinner-color="white"
        style="width: 85%"
        fit="contain"
      />
    </div>
    <div class="text-uppercase text-h1 text-weight-bolder animated pulse infinite slower">
      Tap to login
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useHoleStore } from 'stores/hole-store';

const router = useRouter();
const rotateLogo = ref(false);

const holeStore = useHoleStore();
holeStore.$reset();

const route = useRoute();
const holeNumber = computed(() => route.params.hole);
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

@keyframes rotateOut
 from
  opacity: 1
 to
  transform: rotate3d(0, 0, 1, -200deg)

.rotateOut
  animation-name: rotateOut
  transform-origin: center
</style>
