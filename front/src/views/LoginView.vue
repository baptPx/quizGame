<template>
  <h1> Login / Register</h1>
  <br>
  <v-row dense>
    <v-col 
      cols="6"
      >
      <v-text-field
        v-model="username"
        label="username"
        required
      ></v-text-field>
    </v-col>

    <v-col 
      cols="6"
      >
      <v-text-field
        v-model="password"
        label="password"
        type="password"
        required
      ></v-text-field>
    </v-col>

    <v-col 
      cols="6"
      >
      <v-btn
        class="button"
        variant="tonal"
        @click="register()"
      >
        Register
      </v-btn>
    </v-col>

    <v-col 
      cols="6"
      >
      <v-btn
        class="button"
        variant="tonal"
        @click="login()"
      >
        Login
      </v-btn>
    </v-col>
  </v-row>
  <v-alert
    v-if="error"
    style="margin-top: 1rem"
    density="compact"
    type="error"
    title="Erreur"
    :text="error"
  ></v-alert>
  </template>

<script lang="ts" setup>
import APIService from '@/services/APIService';
import UserService from '@/services/UserService';
import { useStore } from '@/store/app';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

let username = ref('')
let password = ref('')
let error = ref('')
const router = useRouter()

const register = async () => {
  await UserService.register(username.value, password.value)
    .then(() => router.push('/'))
    .catch(err => error.value = err)
}

const login = async () => {
  await UserService.login(username.value, password.value)
    .then(() => router.push('/'))
    .catch(err => error.value = err)
}
</script>
<style>
.button {
  width: 100%;
}

</style>
