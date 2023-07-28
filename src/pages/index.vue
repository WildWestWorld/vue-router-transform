<template>
  <div>
    <div>Index</div>
    <div>
      <!-- 跳转到foo链接 -->
      <RouterLink class="m-3 text-sm btn" to="/foo"> Go </RouterLink>
    </div>

    <!-- 根据路由的修改  FloatProxy 将自己对应的样式信息 传给 FloatContainer -->
    <!-- FloatContainer带动里面的元素进行样式上的变化 -->

    <FloatProxy class="w-50 h-50 rounded-xl"></FloatProxy>
  </div>
</template>

<script lang="ts" setup></script>
