<!-- 用于变形的图片 -->

<template>
  <div
    overflow-hidden
    w-full
    h-full
    transition-all
    duration-800
    relative
    select-none
    @click="counter += 1"
  >
    <img
      object-cover
      block
      w-full
      h-full
      src="https://source.unsplash.com/collection/94734566/512x512"
      bg-gray-400:20
    />
    <div
      absolute
      pt-5
      left-0
      right-0
      bottom-0
      bg-gradient-to-t
      from-black:40
      to-transprent
      text-white
      font-mono
      flex
      items-center
      justify-center
    >
      {{ counter }}
    </div>
  </div>
</template>

<script setup lang="ts">
// const showSeaImg = ref(false);
const counter = $ref(Math.round(Math.random() * 100));

// const changeImgState = () => {
//   showSeaImg.value = !showSeaImg.value;
// };

onMounted(() => {
  console.warn("ImageMounted");
});
// const props = defineProps({
//   attrs: Object,
// });
// $attrs 属性用于接收非 props 属性

// console.warn(props);
</script>
