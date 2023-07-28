<template>
  <!-- ref 不能放到slot上面 -->
  <!-- 用于测试元素的移动位置 -->
  <!-- <div bg-gray-400:10 ref="el"> -->
  <div ref="el">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { metadata, proxyEl } from '~/composables/floating';
// 在 Vue 3 中，我们使用  defineProps  函数来定义 props，而不是在组件选项中声明 props。
// 在上述代码中， <{}>  表示 props 对象没有任何属性，即 props 是一个空对象。
// 如果你需要定义具有特定属性的 props 对象，你可以在  <{}>  中添加属性名和类型

// props 是一个空对象
const props = defineProps<{}>();
// useAttrs  函数允许您访问传递给组件的属性。它返回一个表示属性的对象。
// useAttrs  函数在  setup  函数内部被调用，以获取属性对象。
// 可以将  attrs  对象展开（使用  v-bind ）到  <input>  元素上，从而允许您将任何属性传递给组件

// 重要 useAttrs 用于获取组件中的属性
const attrs = useAttrs();

//将FloatProxy得到的prop 和arrts 传入的全局变量中
metadata.props = props;
metadata.attrs = attrs;

// 获取 顶替元素的位置
const el = ref<HTMLElement>();

onMounted(() => {
  // 将顶替元素赋值给全局变量ProxyEl
  proxyEl.value = el.value;
});
</script>

<!-- inheritAttrs: false, div就不会根据最外层 设置的样式而改变了 -->
<script lang="ts">
export default {
  inheritAttrs: true,
};
</script>
