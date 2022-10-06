<script setup lang="ts">
import { useAuth } from "@/stores/auth";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const { signIn, errors, loadings } = useAuth();
const router = useRouter();

const value = reactive({ email: "", password: "" });

const login = async () => {
  await signIn(value.email, value.password);
  if (!errors.signIn) {
    await router.push("/");
  }
};
</script>

<template lang="pug">
ElForm(@submit.prevent="login" label-position="top" )
  h2 Login
  ElFormItem(class="p-float-label mb-3" :label="$t('Email')")
    ElInput(id="email" type="text" class="w-full" v-model="value.email")
  ElFormItem(class="p-float-label mb-3" :label="$t('Password')")
    ElInput(
      id="password"
      v-model="value.password"
      type="password"
      class="w-full"
      show-password)
  ElButton(
    type="primary"
    @click="login"
    :loading="loadings.signIn") Login
  ElAlert(v-if="errors.signIn" type="error" class="mt-3" :title="errors.signIn")
</template>
