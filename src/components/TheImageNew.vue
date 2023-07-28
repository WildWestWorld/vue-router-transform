<!-- 用于变形的图片 -->

<template>
  <div overflow-hidden transition-all @click="() => changeImgState()">
    <img
      v-if="!showSeaImg"
      src="https://images.unsplash.com/photo-1648737851351-b40fce70e77e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80"
    />

    <img
      v-if="showSeaImg"
      src="https://images.unsplash.com/photo-1648721946556-b9266caf9370?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
    />
  </div>
</template>

<script setup lang="ts">
const showSeaImg = ref(false);
const changeImgState = () => {
  showSeaImg.value = !showSeaImg.value;
};

const props = defineProps({
  attrs: Object,
});
// $attrs 属性用于接收非 props 属性

console.warn(props);
</script>
