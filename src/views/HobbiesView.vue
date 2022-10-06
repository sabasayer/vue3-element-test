<script setup lang="ts">
import type { Hobby } from "@/types";
import { ref } from "vue";
import HobbyList from "../components/hobby/HobbyList.vue";
import NewHobbyForm from "../components/hobby/NewHobbyForm.vue";

const isModalVisible = ref(false);
const editingHobby = ref<Hobby | undefined>();

const open = () => (isModalVisible.value = true);
const close = () => (isModalVisible.value = false);

const edit = (data: Hobby) => {
  editingHobby.value = data;
  open();
};
</script>

<template lang="pug">
main(class="p-3")
  h1 {{ $t("Hobbies") }}
  ElButton(
    @click="open" type="primary") {{ $t('AddNewHobby') }}
  HobbyList(@edit="edit")
  ElDialog(
    v-model="isModalVisible"
    :title="$t('NewHobby')")
    NewHobbyForm(@submitted="close" :editing-hobby="editingHobby")
</template>
