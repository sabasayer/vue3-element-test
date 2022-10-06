<script setup lang="ts">
import type { Hobby } from "@/types";
import { reactive, ref, watch } from "vue";
import CategorySelectInput from "./CategorySelectInput.vue";
import { useHobby } from "@/stores/hobby";
import { House, Plus } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";

const { statusList, save, loadings, errors } = useHobby();

const emit = defineEmits<{ (e: "submitted"): void }>();
const props = defineProps<{ editingHobby?: Hobby }>();

const submitted = ref(false);
const hobby = ref<Hobby>(
  props.editingHobby
    ? { ...props.editingHobby }
    : {
        name: "",
        category: "",
        startDate: new Date(),
        status: "planning",
      }
);

watch(
  () => props.editingHobby,
  () => {
    if (props.editingHobby) {
      hobby.value = props.editingHobby;
    }
  }
);

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  name: [
    { required: true, message: "Name field is required", trigger: "blur" },
  ],
  category: [
    {
      required: true,
      message: "Category field is required",
      trigger: "change",
    },
  ],
  status: [
    {
      required: true,
      message: "Status field is required",
      trigger: "blur",
    },
  ],
  startDate: [
    {
      required: true,
    },
  ],
});

const handleSubmit = async (formEl?: FormInstance) => {
  if (!formEl) return;

  submitted.value = true;

  await formEl.validate(async (valid) => {
    if (!valid) return;

    await save(hobby.value);
    console.log(errors.save);
    if (!errors.save) {
      console.log("saved");
      emit("submitted");
    }
  });
};
</script>

<template lang="pug">
ElForm(
  @submit.prevent="handleSubmit"
  :model="hobby"
  :rules="rules"
  label-position="top"
  ref="ruleFormRef"
  status-icon
  )
  ElFormItem( :label="$t('Category')" prop="category")
    CategorySelectInput(
      v-model="hobby.category")
  ElFormItem( :label="$t('Name')" prop="name")
    ElInput(
      v-model="hobby.name"
      class="w-full" )
  ElFormItem( :label="$t('Status')" prop="status")
    ElRadioGroup(
      v-model="hobby.status")
      ElRadioButton( v-for="item in statusList" :key="item.code" :label="item.code" ) {{ item.name }}
  ElFormItem( :label="$t('StartDate')" prop="startDate")
    ElDatePicker(
      v-model="hobby.startDate"
      type="datetime")
  div( class="flex justify-content-end pt-3" )
    ElButton(
      type="primary"
      @click="handleSubmit(ruleFormRef)"
      :icon="editingHobby ? House : Plus"
      :loading="loadings.save" ) {{ editingHobby ? $t('Update') : $t('Create') }}
</template>
