<script setup lang="ts">
import { useAuth } from "@/stores/auth";
import { useRouter } from "vue-router";
import { reactive } from "vue";

const { signUp, errors, loadings } = useAuth();
const router = useRouter();

const value = reactive({ email: "", password: "" });

const register = async () => {
  await signUp(value.email, value.password);
  if (!errors.signIn) {
    await router.push("/");
  }
};
</script>

<template lang="pug">
ElForm(@submit.prevent="register" label-position="top" )
  h2 Register
  ElFormItem(class="p-float-label mb-3" :label="$t('Email')")
    ElInput(
      id="email-register"
      type="text"
      class="w-full"
      v-model="value.email")
  ElFormItem(class="p-float-label mb-3" :label="$t('Password')")
    ElInput(
      id="password-register"
      v-model="value.password"
      class="w-full"
      type="password"
      show-password )
  ElButton(
    type="primary"
    label="Register"
    @click="register"
    :loading="loadings.signUp") Register
  ElAlert(v-if="errors.signUp" type="error" class="mt-3" :title="errors.signUp")
</template>
