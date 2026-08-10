(function () {
  'use strict';

  const link = document.getElementById('update-site-button');

  if (!link || !('serviceWorker' in navigator)) {
    return;
  }

  const icon = link.querySelector('i');
  const label = link.querySelector('span');
  const originalLabel = label.textContent;

  function setUpdating() {
    link.classList.add('is-updating');
    link.setAttribute('aria-disabled', 'true');

    if (icon) {
      icon.classList.add('fa-spin');
    }

    label.textContent = 'CHECKING...';
  }

  function setReady() {
    link.classList.remove('is-updating');
    link.removeAttribute('aria-disabled');

    if (icon) {
      icon.classList.remove('fa-spin');
    }

    label.textContent = originalLabel;
  }

  link.addEventListener('click', async function (event) {
    event.preventDefault();

    if (link.classList.contains('is-updating')) {
      return;
    }

    setUpdating();

    try {
      const registration = await navigator.serviceWorker.ready;

      /*
       * A new Service Worker is already waiting.
       */
      if (registration.waiting) {
        registration.waiting.postMessage('SKIP_WAITING');
        return;
      }

      /*
       * Explicitly check for a new Service Worker.
       */
      await registration.update();

      /*
       * A new worker may now be waiting.
       */
      if (registration.waiting) {
        registration.waiting.postMessage('SKIP_WAITING');
        return;
      }

      /*
       * Nothing to update.
       */
      setReady();

      label.textContent = 'UP TO DATE';

      setTimeout(function () {
        label.textContent = originalLabel;
      }, 1800);

    } catch (error) {
      console.error('Site update failed:', error);

      setReady();

      label.textContent = 'UPDATE FAILED';

      setTimeout(function () {
        label.textContent = originalLabel;
      }, 1800);
    }
  });

  /*
   * Reload when the new Service Worker takes control.
   */
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    window.location.reload();
  });
})();