<template>
  <section v-for="(item, index) in data" :key="index">
    <span class="year">{{ item.year }}</span>

    <div v-for="(subItem, subIndex) in item.data" :key="subIndex" class="item">
      <RouterLink :to="subItem.path">
        <div class="item-flex">
          <div>
            <p class="title">
              {{ subItem.info.title }}
            </p>
            <p v-if="subItem.info.subtitle" class="subtitle">
              {{ subItem.info.subtitle }}
            </p>
          </div>
          <p v-if="subItem.info.date">
            {{ formateDateString(subItem.info.date) }}
          </p>
        </div>
      </RouterLink>
      <hr />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { GungnirThemePostData } from "../../shared";
import { formateDateString } from "../utils";

defineProps({
  data: {
    type: Array as PropType<
      Array<{ year: string; data: GungnirThemePostData[] }>
    >,
    default: () => []
  }
});
</script>
