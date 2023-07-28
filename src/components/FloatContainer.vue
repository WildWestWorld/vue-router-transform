<template>
  <!-- // 导入Float全局变量用于传输 样式变量 进行路由动画
// 将其传入子元素 Img 就会进行动画 -->
  {{ metadata.attrs }}

  <slot name="imgSlot"  :attrs="metadata.attrs"></slot>
</template>

<script setup lang="ts">
// 导入Float全局变量用于传输 样式变量 进行路由动画
// 将其传入子元素 Img 就会进行动画
import { metadata } from '~/composables/floating';

</script>
