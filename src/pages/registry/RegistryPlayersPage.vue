<template>
  <div
    class="fullscreen flex flex-center column justify-between q-pa-xl"
  >
    <div class="text-uppercase text-h1 text-weight-bolder text-orange">
      Add players
    </div>
    <div class="flex flex-center column">
      <q-list class="text-weight-bold text-h5" style="min-width: 350px">
        <q-item
          v-for="(player, i) of players"
          :key="i"
        >
          <q-item-section avatar>
            <q-avatar color="white" text-color="blue">
              {{ i + 1 }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            {{ player.name }}
          </q-item-section>
          <q-item-section side>
            <div class="q-gutter-md">
              <q-btn
                @click="editPlayer(i)"
                flat dense color="white" round icon="fas fa-edit"
              />
              <q-btn
                @click="deletePlayer(i)"
                flat dense color="red" round icon="fas fa-trash-can"
              />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
      <q-btn
        v-if="players.length < 5"
        @click="addDialog = true"
        class="text-weight-bold q-mt-lg"
        size="xl"
        color="white"
        text-color="blue"
        push stack
        icon="fas fa-plus"
        label="Add player"
      />
    </div>
    <div class="full-width flex justify-between">
      <q-btn
        to="/registry/team"
        class="text-weight-bolder"
        push
        color="orange"
        icon="fas fa-chevron-left"
        size="xl"
        label="back"
      />
      <q-btn
        to="/registry/check"
        class="text-weight-bolder"
        push
        color="orange"
        icon-right="fas fa-chevron-right"
        size="xl"
        label="next"
        :disable="players.length < 1"
      />
    </div>
    <q-dialog
      v-model="addDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-blue text-white">
        <q-card-section class="q-pt-none">
          <div
            class="fullscreen flex flex-center column justify-between q-pa-xl"
          >
            <div class="text-uppercase text-h2 text-weight-bolder text-orange q-ma-lg">
              Enter the player name
            </div>
            <div class="flex flex-center column">
              <q-card
                class="input no-border-radius flex flex-center text-blue text-h4 text-weight-bold q-mb-lg"
              >
                <q-card-section>
                  <div class="carriage">
                    {{ playerName }}
                  </div>
                </q-card-section>
              </q-card>
              <SimpleKeyboard
                style="color: black"
                @onChange="onChange"
                :input="playerName"
                :maxLength="15"
              />
            </div>
            <div class="full-width flex justify-between">
              <q-btn
                @click="closeAddDialog"
                class="text-weight-bolder"
                push
                outline
                color="orange"
                icon="fas fa-xmark"
                size="xl"
                label="cancel"
              />
              <q-btn
                @click="addPlayer"
                to="/registry/players"
                class="text-weight-bolder"
                push
                outline
                color="orange"
                icon-right="fas fa-plus"
                size="xl"
                label="add"
                :disable="playerName.length < 2"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="editDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-blue text-white">
        <q-card-section class="q-pt-none">
          <div
            class="fullscreen flex flex-center column justify-between q-pa-xl"
          >
            <div class="text-uppercase text-h2 text-weight-bolder text-orange q-ma-lg">
              Edit the player name
            </div>
            <div class="flex flex-center column">
              <q-card
                class="input no-border-radius flex flex-center text-blue text-h4 text-weight-bold q-mb-lg"
              >
                <q-card-section>
                  <div class="carriage">
                    {{ playerName }}
                  </div>
                </q-card-section>
              </q-card>
              <SimpleKeyboard
                style="color: black"
                @onChange="onChange"
                :input="playerName"
                :maxLength="15"
              />
            </div>
            <div class="full-width flex justify-between">
              <q-btn
                @click="closeEditDialog"
                class="text-weight-bolder"
                push
                outline
                color="orange"
                icon="fas fa-xmark"
                size="xl"
                label="cancel"
              />
              <q-btn
                @click="savePlayer"
                to="/registry/players"
                class="text-weight-bolder"
                push
                outline
                color="orange"
                icon-right="fas fa-floppy-disk"
                size="xl"
                label="save"
                :disable="playerName.length < 2"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRegistryStore } from 'stores/registry-store';
import SimpleKeyboard from '../../components/SimpleKeyboard.vue';

const registryStore = useRegistryStore();
const { players } = storeToRefs(registryStore);

const addDialog = ref(false);
const playerName = ref('');
const onChange = (input: string) => {
  playerName.value = input;
};
const closeAddDialog = () => {
  addDialog.value = false;
  playerName.value = '';
};
const addPlayer = () => {
  players.value.push({
    name: playerName.value,
  });
  closeAddDialog();
};

const deletePlayer = (i: number) => {
  players.value.splice(i, 1);
};

const editDialog = ref(false);
let playerIndex: number;
const editPlayer = (i: number) => {
  playerIndex = i;
  playerName.value = players.value[playerIndex].name;
  editDialog.value = true;
};
const closeEditDialog = () => {
  editDialog.value = false;
  playerName.value = '';
};
const savePlayer = () => {
  players.value[playerIndex].name = playerName.value;
  closeEditDialog();
};
</script>

<style scoped lang="sass">
.input
  width: 400px
  height: 75px
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
