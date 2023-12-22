<template>
  <div p4>
    <div p4>
      <button btn @click="() => toggle()">Toggle</button>
    </div>

    <!-- 根据路由的修改  FloatProxy 将自己对应的样式信息 传给 FloatContainer -->
    <!-- FloatContainer带动里面的元素进行样式上的变化 -->

    <!-- 整合前 -->
    <!-- 
    <FloatProxy
      :class="mode ? 'w-50 h-50' : 'w-60 h-30'"
      rounded-xl
    ></FloatProxy> -->

    <!-- 整合后 -->
    <TheImageProxy
      :class="mode ? 'w-50 h-50' : 'w-60 h-30'"
      rounded-xl
    ></TheImageProxy>
  </div>
</template>

<script lang="ts" setup>
import { TheImageProxy } from "~/composables/images";

const mode = ref(false);
const toggle = useToggle(mode);
</script>
