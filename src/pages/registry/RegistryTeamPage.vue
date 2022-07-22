<template>
  <div
    class="fullscreen flex flex-center column justify-around"
  >
    <div class="text-uppercase text-h1 text-weight-bolder text-orange">
      Enter the team name
    </div>
    <q-card
      class="input no-border-radius flex flex-center text-blue text-h4 text-weight-bold"
    >
      <q-card-section>
        <div class="team-name">
          {{ teamName }}
        </div>
      </q-card-section>
    </q-card>
<!--    <q-input autofocus standout="bg-white" bg-color="white" color="blue" v-model="teamName" label="Standout" />-->
    <SimpleKeyboard
      style="color: black"
      @onChange="onChange"
      @onKeyPress="onKeyPress"
      :input="teamName"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SimpleKeyboard from '../../components/SimpleKeyboard.vue';

const teamName = ref('');
const onChange = (input: string) => {
  teamName.value = input;
};
const onKeyPress = (button: string) => {
  console.log("button", button);
};
const onInputChange = (input: any) => {
  teamName.value = input.target.value;
};
</script>

<style scoped lang="sass">
.input
  width: 400px
  height: 75px
.team-name
  height: 40px
  animation: blink 1s infinite
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
