<template>
    <v-app-bar flat color="background" id="header" elevation="10">
      <v-app-bar-title @click="router.push('/')">
        Quiz Game
      </v-app-bar-title>
      <template v-slot:append style="gap: 1rem">
        <strong style="margin-right: 1rem;" v-if="store.getUserAccount.username !== ''">
          {{ store.getUserAccount.username }}
        </strong>
        <v-btn
          v-if="store.getUserAccount.username === ''"
          class="navButton"
          variant="text"
          @click="router.push('/login')"
          :style=" router.currentRoute.value.name === 'Home' ? cssProps : {}"
        >
          Login/Register
        </v-btn>
        <v-btn
          v-else
          class="navButton"
          variant="text"
          @click="logout()"
          :style=" router.currentRoute.value.name === 'Home' ? cssProps : {}"
        >
          Logout 
        </v-btn>
        <v-btn
          class="navButton"
          variant="text"
          @click="router.push('/')"
          :style=" router.currentRoute.value.name === 'Home' ? cssProps : {}"
        >
          Home
        </v-btn>
    </template>
    </v-app-bar>
  
  </template>
  
  <script lang="ts" setup>
  import { useTheme } from 'vuetify/lib/framework.mjs';
  import { useRouter } from 'vue-router';
  import { computed } from 'vue';
import { useStore } from '@/store/app';
import UserService from '@/services/UserService';
  
  const theme = useTheme()
  const router = useRouter()
  const store = useStore() 

  const cssProps = computed(() => {
    return {
      color: theme.global.current.value.colors.secondary,
      borderBottom: '2px solid ' + theme.global.current.value.colors.secondary,
    }
  })
  
  const logout = () => {
    UserService.logout()
  }
  
  </script>
  <style>

  #header {
    padding: 1em;
  }
  .selectedPage {
    color: var(--v-primary-base) !important;
  }
  .navButton {
    border-radius: 0 !important;
    font-weight: bold !important;
  }
  </style>