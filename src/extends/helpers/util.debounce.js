/**
 * Menunda eksekusi fungsi hingga durasi tertentu terlewati sejak panggilan terakhir.
 * Sangat berguna untuk kolom pencarian ketik keyboard (search input) agar tidak membebani query API.
 * @param {Function} fn - Fungsi yang akan dieksekusi
 * @param {number} delay - Jeda waktu penundaan dalam milidetik (default: 300ms)
 * @returns {Function} Fungsi ter-debounce
 */
export const debounce = (fn, delay = 300) => {
  let timeoutId = null;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

/**
 * Membatasi pemanggilan fungsi agar hanya dieksekusi sekali saja dalam rentang batas waktu tertentu.
 * Sangat berguna untuk menangani double-click submit button atau throttling scroll/resize event.
 * @param {Function} fn - Fungsi yang akan dieksekusi
 * @param {number} limit - Batas waktu jeda eksekusi dalam milidetik (default: 500ms)
 * @returns {Function} Fungsi ter-throttle
 */
export const throttle = (fn, limit = 500) => {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};
