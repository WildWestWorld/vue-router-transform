<script setup lang="ts">
import type { StyleValue } from 'vue'

// ~/  => @ 
import { metadataTest, proxyElTest } from '~/composables/floating'

let rect = $ref<DOMRect | undefined>()
const style = computed((): StyleValue => {
  return {
    transition: 'all .5s ease-in-out',
    position: 'fixed',
    left: `${rect?.left ?? 0}px`,
    top: `${rect?.top ?? 0}px`,
  }
})

function update() {
  rect = proxyElTest.value?.getBoundingClientRect()
}

useMutationObserver(proxyElTest, update, {
  childList: true,
  subtree: true,
  attributes: true,
  characterData: true,
})
useEventListener('resize', update)
watchEffect(update)
</script>

<template>
  <div :style="style">
    <slot v-bind="metadataTest.attrs" />
  </div>
</template>
