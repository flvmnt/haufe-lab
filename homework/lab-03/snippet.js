// Source: classic debounce pattern, popularized by David Walsh's blog
// (https://davidwalsh.name/javascript-debounce-function) and reused in
// hundreds of Stack Overflow answers. Not written by me.

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}
