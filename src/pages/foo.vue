<script setup lang="ts">
// let size = $(useStorage('size', 100));

// function enlarge() {
//   size += 20;
// }

// function reset() {
//   size = 100;
// }
</script>

<template>
  <div>Foo</div>
  <div>
    <RouterLink class="m-3 text-sm btn" to="/"> Back </RouterLink>
  </div>
  <!-- 根据路由的修改  FloatProxy 将自己对应的样式信息 传给 FloatContainer -->
  <!-- FloatContainer带动里面的元素进行样式上的变化 -->
  <FloatProxy class="w-100 h-100 rounded-full m10"></FloatProxy>
</template>
