/* eslint-disable import/no-anonymous-default-export */
const map = new WeakMap();

const ob = new ResizeObserver((entries) => {
  for (const entry of entries) {
    console.log("entry", entry);
    const handler = map.get(entry.target);
    if (handler) {
      handler(entry);
    }
  }
});

export default {
  mounted(el, binding) {
    map.set(el, binding.value);
    ob.observe(el);
  },

  unmounted(el) {
    ob.unobserve(el);
  },
};
