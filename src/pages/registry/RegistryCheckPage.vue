<template>
  <div
    class="fullscreen flex flex-center column justify-between q-pa-xl"
  >
    <div class="text-uppercase text-h1 text-weight-bolder text-orange">
      Check up
    </div>
    <div class="full-width q-px-xl flex justify-around text-uppercase text-h5">
      <div class="flex flex-center column">
        <div class="text-weight-medium">
          Team Name:
        </div>
        <div class="text-weight-bolder text-h4 text-orange">
          {{ teamName }}
        </div>
      </div>
      <div class="flex flex-center column">
        <div class="text-weight-medium">
          Players:
        </div>
        <q-list class="text-weight-bold text-h5">
          <q-item
            v-for="(player, i) of players"
            :key="i"
          >
            <q-item-section avatar>
              <q-avatar color="white" text-color="blue">
                {{ i + 1 }}
              </q-avatar>
            </q-item-section>

            <q-item-section class="text-orange">
              {{ player.name }}
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <div class="full-width flex justify-between">
      <q-btn
        to="/registry/players"
        class="text-weight-bolder"
        push
        color="orange"
        icon="fas fa-chevron-left"
        size="xl"
        label="back"
      />
      <q-btn
        to="/registry/finish"
        class="text-weight-bolder"
        push
        color="orange"
        icon-right="fas fa-check"
        size="xl"
        label="confirm"
        :disable="teamName.length < 3"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRegistryStore } from 'stores/registry-store';

const registryStore = useRegistryStore();
const { teamName } = storeToRefs(registryStore);
const { players } = storeToRefs(registryStore);

</script>

<style scoped lang="sass">
</style>
