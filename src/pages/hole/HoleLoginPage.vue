<template>
  <div
    class="full-height flex flex-center column justify-between q-pa-xl"
  >
    <div class="text-uppercase text-h1 text-weight-bolder">
      Enter the pin
    </div>
    <div class="flex flex-center column">
      <q-card
        :class="{'bg-red-4': wrongPin}"
        class="input no-border-radius flex flex-center text-blue text-h3 text-weight-bold q-mb-lg"
      >
        <q-card-section>
          <div class="carriage">
            {{ pin }}
          </div>
        </q-card-section>
      </q-card>
      <SimpleNumpad
        style="color: black"
        @onChange="onChange"
        :input="pin"
        :maxLength="4"
        keyboard-class="numpad_login"
      />
    </div>
    <div class="full-width flex justify-end">
      <q-btn
        @click="login"
        :loading="loading"
        :disable="pin.length !== 4"
        class="text-weight-bolder"
        push
        color="orange"
        icon-right="fas fa-arrow-right-to-bracket"
        size="xl"
        label="login"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import SimpleNumpad from 'components/SimpleNumpad.vue';
// import {storeToRefs} from "pinia";
import { useHoleStore } from 'stores/hole-store';

const holeStore = useHoleStore();

const route = useRoute();
const holeNumber = computed(() => route.params.hole);

const wrongPin = ref(false);
const pin = ref('');
const onChange = (input: string) => {
  pin.value = input;
};

const router = useRouter();
const loading = ref(false);
const login = async () => {
  loading.value = true;
  const success = await holeStore.fetchTeam(pin.value, holeNumber.value);
  if (success) {
    router.push({ path: `/hole/${holeNumber.value}/score` });
  } else {
    wrongPin.value = true;
    setTimeout(() => {
      pin.value = '';
    }, 200);
    setTimeout(() => {
      wrongPin.value = false;
    }, 700);
  }
  loading.value = false;
};
</script>

<style scoped lang="sass">
.input
  width: 400px
  height: 80px
  transition: background-color .3s
.carriage
  height: 50px
  animation: blink 1s infinite
  border-right-width: 5px
  border-right-style: solid
  white-space: pre
@keyframes blink
  0%
    border-right-color: $blue
  40%
    border-right-color: transparent
  80%
    border-right-color: $blue
</style>
