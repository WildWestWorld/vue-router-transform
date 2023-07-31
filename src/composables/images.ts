import TheImageNew from '../components/TheImageNew.vue';
import { createFloating } from './floating';


const {
    container:TheImageContainer,
    proxy:TheImageProxy

} = createFloating(TheImageNew);

export {
    TheImageContainer,
    TheImageProxy
}