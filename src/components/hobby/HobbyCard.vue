<script lang="ts" setup>
import type { Hobby, StatusType } from "@/types";
import { defineProps, unref } from "vue";
import { useHobby } from "@/stores/hobby";
import { computed } from "vue";
import { statusIconMap, StatusList } from "@/utils/consts";
import { useI18n } from "vue-i18n";
import { Edit, Delete, ArrowDown } from "@element-plus/icons-vue";

const props = defineProps<{ data: Hobby; horizontal?: boolean }>();
const emit = defineEmits<{ (e: "edit", value: Hobby): void }>();

const { remove, save, loadings } = useHobby();
const { t } = useI18n({ inheritLocale: true });

const removeHobby = async () => {
  await remove(unref(props.data));
};

const edit = () => emit("edit", props.data);
const changeStatus = async (status: StatusType) => {
  await save({ ...props.data, status });
};
const statusIcon = computed(() => statusIconMap[props.data.status]);

const statusOptions = computed(() =>
  StatusList.filter((e) => e !== props.data.status).map((e) => ({
    label: t(`status.${e}`),
    icon: statusIconMap[e],
    command: () => changeStatus(e),
  }))
);
</script>

<template lang="pug">
ElCard
  template( #header )
    h2( class="px-3 pt-3 text-gray-600")  {{ data.name }}
  div( :class="{ 'flex gap-3': horizontal }" )
    div( class="flex items-center" )
      ElIcon( :size="30" )
        Component( :is="statusIcon" class="mr-2")
      span {{ data.status }}
    div {{ data.category }}
    div {{ data.startDate.toDateString() }}
  div( class="flex justify-content-end mt-3" )
    ElDropdown
      ElButton(
        :loading="loadings.save") {{ $t('ChangeStatus') }}
          ElIcon( class="el-icon--right" )
            ArrowDown
      template( #dropdown )
        ElDropdownMenu
          ElDropdownItem( v-for="item in statusOptions" :key="item.label" @click="item.command()" )
            ElIcon
              Component( :is="item.icon" )
            span {{item.label}}
    ElButton(
      :icon="Edit"
      class="ml-3"
      @click="edit" ) {{ $t('Edit') }}
    ElButton(
      :icon="Delete"
      :loading="loadings.remove"
      @click="removeHobby" ) {{ $t('Remove') }}
</template>
