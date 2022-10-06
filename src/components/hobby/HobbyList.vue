<script lang="ts" setup>
import { useHobby } from "@/stores/hobby";
import { defineAsyncComponent } from "vue";
import HobbyCard from "./HobbyCard.vue";
import { storeToRefs } from "pinia";
import type { Hobby } from "@/types";

const HobbyTable = defineAsyncComponent(() => import("./HobbyTable.vue"));

const emit = defineEmits<{ (e: "edit", value: Hobby): void }>();

const store = useHobby();
const { loadings, errors, hobbies } = storeToRefs(store);
const { get } = store;
await get();

const edit = (data: Hobby) => emit("edit", data);
</script>

<template lang="pug">
div(class="py-3")
  ElProgress(v-if="loadings.get" indeterminate)
  h1(v-if="errors.get" class="p-error") {{ errors.get }}
  div( class="flex flex-wrap gap-3" )
    HobbyCard( v-for="data in hobbies"
      :key="data.id"
      :data="data"
      @edit="edit")

  HobbyTable(v-if="hobbies.length" :hobbies="hobbies" class="mt-6")
</template>
