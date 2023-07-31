

// 用于Float样式信息的全局变量

import { StyleValue } from "vue"

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



// 封装 Float组件
// 传入元素我们封装成组件
export function createFloating(component: any) {
    const metadata = reactive<any>({
        props: {},
        attrs: {}
    })

    const proxyEl = ref<HTMLElement | null>()

    const container = defineComponent({
        setup() {

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

                const fixed = { transition: 'all 0.5s ease-in-out', position: 'fixed', }

                // 如果不存在 占位元素信息/占位元素 就变成透明
                if (!proxyElRect || !proxyEl.value) {
                    return {
                        ...fixed,
                        opacity: 0,
                        pointerEvents: 'none',
                        transform: 'translateY(-100px)'
                    }
                }

                return {
                    ...fixed,
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



            return () => h('div', { style: AniElementStyle.value }, [h(component, metadata.attrs)])
        }
    })

    const proxy = defineComponent({
        setup(props, ctx) {
            // 在 Vue 3 中，我们使用  defineProps  函数来定义 props，而不是在组件选项中声明 props。
            // 在上述代码中， <{}>  表示 props 对象没有任何属性，即 props 是一个空对象。
            // 如果你需要定义具有特定属性的 props 对象，你可以在  <{}>  中添加属性名和类型

            // props 是一个空对象
            // const props = defineProps<{}>();
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
            onBeforeUnmount(() => {
                console.log('执行')
                proxyEl.value = undefined;
            })

            return () =>
                h('div', { ref: el }, [
                    ctx.slots.default ? h(ctx.slots.default) : null,
                    ctx.slots.imgSlot ? h(ctx.slots.imgSlot) : null,
                ])
        }
    })

    return {
        container,
        proxy
    }

}