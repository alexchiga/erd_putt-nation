<template>
  <q-layout class="fullscreen bg-blue text-white">
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="animated slideInRight slow"
          leave-active-class="animated slideOutLeft slow"
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
