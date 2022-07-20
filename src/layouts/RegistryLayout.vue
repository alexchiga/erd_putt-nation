<template>
  <q-layout class="fullscreen bg-blue text-white">
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="animated lightSpeedInLeft"
          leave-active-class="animated lightSpeedOutRight"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'RegistryLayout',
};
</script>

<style scoped>

</style>
