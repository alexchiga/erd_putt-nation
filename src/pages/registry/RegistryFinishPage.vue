<template>
  <div
    class="fullscreen flex flex-center column justify-center q-pa-xl"
  >
    <div class="text-h3 text-center">
      <p>
        Registration completed!
      </p>
      <p>
        Remember this passcode or take a picture with your phone, you will need it to access the game:
      </p>
    </div>
    <div class="text-h1 text-weight-bolder text-orange q-ma-xl">
      {{ pin }}
    </div>
    <div class="full-width flex justify-center">
      <q-btn
        to="/registry"
        class="text-weight-bolder q-px-xl"
        push outline
        size="xl"
        label="okay"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRegistryStore } from 'stores/registry-store';

const registryStore = useRegistryStore();
const { pin } = storeToRefs(registryStore);

</script>

<style scoped lang="sass">
</style>
