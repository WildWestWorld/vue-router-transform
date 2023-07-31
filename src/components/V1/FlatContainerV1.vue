<template>
    <!-- // 导入Float全局变量用于传输 样式变量 进行路由动画
  // 将其传入子元素 Img 就会进行动画 -->
    <!-- {{ metadata.attrs }} -->
    <!-- 插槽传参 -->
    <!-- 传入attrs 样式参数 -->
  
    <!-- 拿到占位元素的信息之后我们利用compute进行 动画元素的移动 -->
    <!-- 进行移动的时候 不能有其他元素存在，动画元素移动后 无法覆盖占位元素 -->
    <div :style="AniElementStyle">
      <slot name="imgSlot" :attrs="metadata.attrs"></slot>
    </div>
  </template>
  
  <script setup lang="ts">
  // 导入Float全局变量用于传输 样式变量 进行路由动画
  // 将其传入子元素 Img 就会进行动画
  import { metadata, proxyEl } from '~/composables/floating';
  
  // 代理元素/站位元素的位置信息
  // 这些信息用于移动 我们的动画元素
  // const proxyElRect = ref<DOMRect>();
  
  // (废弃改为 useuseElementBounding )
  // 当ProxyEl 元素发生变化时，我们的 实际元素也需要发生变化
  // watch(
  //   proxyEl,
  //   (el) => {
  //     // 打印占位元素的信息
  //     // console.log(el?.getBoundingClientRect());
  //     // 获取占位元素的 信息
  //     proxyElRect = el?.getBoundingClientRect();
  //   },
  //   { immediate: true }
  // );
  
  // 拿到占位元素的信息之后我们利用compute进行 动画元素的移动
  const AniElementStyle = computed(() => {
    return {
      transition: 'all 0.5s ease-in-out',
      position: 'fixed',
      left: `${proxyElRect?.left ?? 0}px`,
      top: `${proxyElRect?.top ?? 0}px`,
    };
  });
  
  // (废弃改为useMutationObserver) 原因 检测不到 元素位置的变化
  // 用于修复 当页面的元素 发生变化，我们的对应 Rect没有得到更新导致，元素不在位置的BUG
  // useElementBounding 在元素发生变化时就会重新获取对应的 元素信息而且会取消掉上次获取的函数，获得更好的性能
  // const proxyElRect = reactive(useElementBounding(proxyEl));
  let proxyElRect = $ref<DOMRect | undefined>();
  
  // 更新Rect
  function updateRect() {
    proxyElRect = proxyEl.value?.getBoundingClientRect();
  }
  // 使用useMutationObserver 对proxyEl 进行位置变化监听
  // 如果发生变化就执行更新  占位元素的位置操作
  
  // -  childList: true  表示要监听子节点的添加或移除。
  // -  subtree: true  表示要监听整个子树中的节点变化。
  // -  attributes: true  表示要监听属性的变化。
  // -  characterData: true  表示要监听文本内容的变化。
  
  useMutationObserver(proxyEl, updateRect, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
  });
  
  // 当页面尺寸发生变化我们也更新对应的元素位置
  useEventListener('resize', updateRect);
  
  // watchEffect(updateRect)  是 Vue 3 中的一个 API，用于监测响应式数据的变化并执行相应的副作用函数。
  // 在这个例子中， updateRect  是一个副作用函数，它将在响应式数据发生变化时被调用。
  //  watchEffect  函数会自动追踪在副作用函数中使用的响应式数据，并在这些数据发生变化时重新运行副作用函数。
  // 换句话说 proxyEl.value 改变 执行 updateRect
  
  watchEffect(updateRect);
  </script>
  