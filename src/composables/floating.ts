// 用于Float样式信息的全局变量
// 因为ref 需要.value 来提取变量所以我们改用
export const metadata = reactive<any>({
    props: {},
    attrs: {}
})

// 元素实际应该处于的位置
// 因为我们的元素实际是fixed，不是 顶替元素 所在的位置
// 也就是 我们实际上有两个元素，
// 一个是在正常文档流 充当 站位的顶替元素
// 用于变化的 用户实际看到的变化元素

// 我们的目的就是把变化元素移动到顶替元素的位置
// proxyEl 顶替元素
export const proxyEl = ref<HTMLElement | null>()