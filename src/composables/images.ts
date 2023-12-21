import TheImageNew from "../components/TheImageNew.vue";
import { createFloating } from "./floating";

// 这里传入的TheImageNew 用与 显示元素(container) 来渲染显示对应的元素
//这里暴露出来的两个变量就是  显示元素TheImageContainer 代理元素 TheImageProxy
const { container: TheImageContainer, proxy: TheImageProxy } =
  createFloating(TheImageNew);

export { TheImageContainer, TheImageProxy };
