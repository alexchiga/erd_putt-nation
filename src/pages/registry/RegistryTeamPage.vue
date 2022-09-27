<template>
  <div
    class="fullscreen flex flex-center column justify-between q-pa-xl"
  >
    <div class="text-uppercase text-h1 text-weight-bolder text-orange">
      Enter the team name
    </div>
    <div class="flex flex-center column">
      <q-card
        :class="{'bg-red-4': teamNameUsed}"
        class="input no-border-radius flex flex-center text-blue text-h4 text-weight-bold q-mb-lg"
      >
        <q-card-section>
          <div class="carriage">
            {{ teamName }}
          </div>
        </q-card-section>
      </q-card>
      <SimpleKeyboard
        style="color: black"
        @onChange="onChange"
        :input="teamName"
        :maxLength="15"
      />
    </div>
    <div class="full-width flex justify-end">
<!--      <q-btn-->
<!--        to="/registry"-->
<!--        class="text-weight-bolder"-->
<!--        push-->
<!--        color="orange"-->
<!--        icon="fas fa-chevron-left"-->
<!--        size="xl"-->
<!--        label="back"-->
<!--      />-->
      <q-btn
        to="/registry/players"
        class="text-weight-bolder"
        push
        color="orange"
        icon-right="fas fa-chevron-right"
        size="xl"
        label="next"
        :disable="teamName.length < 3 || teamNameUsed"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRegistryStore } from 'stores/registry-store';
import { computed } from 'vue';
import SimpleKeyboard from '../../components/SimpleKeyboard.vue';

const registryStore = useRegistryStore();

const { teamName } = storeToRefs(registryStore);
const onChange = (input: string) => {
  teamName.value = input;
};

registryStore.fetchTeamList();
const teamNameUsed = computed(() => registryStore.teams.includes(teamName.value)
  || registryStore.teams.includes(teamName.value.toLowerCase()));
// const onKeyPress = (button: string) => {
//   console.log("button", button);
// };
// const onInputChange = (input: any) => {
//   teamName.value = input.target.value;
// };
</script>

<style scoped lang="sass">
.input
  width: 400px
  height: 75px
  transition: background-color .3s
.carriage
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
