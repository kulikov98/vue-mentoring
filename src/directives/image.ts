/* eslint-disable no-param-reassign */
import { DirectiveBinding } from 'vue';
import useIntersection from '../composables/intersection';

export default (el: HTMLImageElement, binding: DirectiveBinding) => {
  if (binding.arg === 'poster') {
    const { path, title } = binding.value;
    const src = path
      ? `https://image.tmdb.org/t/p/w500/${path}`
      : 'https://via.placeholder.com/500x750/000000/FFFFFF/?text=no%20image';

    el.alt = title ? `Poster of the movie ${title}` : 'No poster provided';

    if (binding.modifiers.lazy) {
      useIntersection(el, () => { el.src = src; });
    } else {
      el.src = src;
    }

    return;
  }

  throw new Error(`lazy directive - unexpected argument provided: "${binding.arg}"`);
};
