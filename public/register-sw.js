/* Registers the offline cache. Kept as a plain file, outside the bundle, so
   that a build change can never break the thing that makes the site work with
   no signal. */
(function () {
  if (!('serviceWorker' in navigator)) return;
  var base = document.documentElement.getAttribute('data-base') || '/';
  window.addEventListener('load', function () {
    navigator.serviceWorker.register(base + 'sw.js', { scope: base }).catch(function () {
      /* No offline cache. The site still works online. */
    });
  });
})();
