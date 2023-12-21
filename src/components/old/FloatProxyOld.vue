<template>
  <div ref="el">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { metadataTest, proxyElTest } from "~/composables/floating";

const attrs = useAttrs();
const el = ref<HTMLElement>();

metadataTest.attrs = attrs;

onMounted(() => {
  proxyElTest.value = el.value;
});
</script>
