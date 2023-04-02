<template>

  <v-app id="app">
    <the-header />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>


<script lang="ts" setup>
import TheHeader from './components/TheHeader.vue';
</script>
<style>
  #app {

    margin-top: 6rem;
  }
</style>
