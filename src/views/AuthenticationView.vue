<script setup lang="ts">
import TheLogin from "../components/auth/TheLogin.vue";
import TheRegister from "../components/auth/TheRegister.vue";
</script>

<template lang="pug">
div(class="flex items-center justify-center h-screen bg-gray-100")
  div(class="lg:w-1/3 w-full p-5 flex gap-3 bg-white shadow-2 border-round")
    TheRegister(class="flex-1")
    ElDivider(direction="vertical")
    TheLogin(class="flex-1")
</template>
