<script lang="ts" setup>
import type { Hobby } from "@/types";
import { Setting } from "@element-plus/icons-vue";

defineProps<{ hobbies: Hobby[] }>();
</script>

<template lang="pug">
div
  ElTable(
    :data="hobbies"
    border
    row-key="id" )
    ElTableColumn( prop="name" sortable resizable :label="$t('Name')")
    ElTableColumn( prop="category" sortable :label="$t('Category')" )
    ElTableColumn( prop="status" sortable :label="$t('Status')" )
    ElTableColumn( prop="startDate" sortable show-overflow-tooltip :label="$t('StartDate')" )
    ElTableColumn(
      body-class="text-center"
      header-class="text-center" )
        ElButton( :icon="Setting" ) {{ $t('Actions') }}
</template>
