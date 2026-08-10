(function () {
  'use strict';

  const button = document.getElementById('update-site-button');

  if (!button || !('serviceWorker' in navigator)) {
    return;
  }

  const icon = button.querySelector('i');
  const label = button.querySelector('span');
  const originalLabel = label.textContent;

  function setUpdating() {
    button.disabled = true;
    button.classList.add('is-updating');

    if (icon) {
      icon.classList.add('fa-spin');
    }

    label.textContent = 'Checking...';
  }

  function setReady() {
    button.disabled = false;
    button.classList.remove('is-updating');

    if (icon) {
      icon.classList.remove('fa-spin');
    }

    label.textContent = originalLabel;
  }

  button.addEventListener('click', async function () {
    setUpdating();

    try {
      const registration = await navigator.serviceWorker.ready;

      /*
       * A new Service Worker is already waiting.
       * Activate it immediately.
       */
      if (registration.waiting) {
        registration.waiting.postMessage('SKIP_WAITING');
        return;
      }

      /*
       * Ask the browser to check for a new Service Worker.
       */
      await registration.update();

      /*
       * Check whether the update created a waiting worker.
       */
      if (registration.waiting) {
        registration.waiting.postMessage('SKIP_WAITING');
        return;
      }

      /*
       * No new Service Worker was found.
       */
      setReady();
      label.textContent = 'Already up to date';

      setTimeout(function () {
        label.textContent = originalLabel;
      }, 1800);

    } catch (error) {
      console.error('Site update failed:', error);

      setReady();
      label.textContent = 'Update failed';

      setTimeout(function () {
        label.textContent = originalLabel;
      }, 1800);
    }
  });

  /*
   * The new Service Worker has taken control.
   * Reload the page to use the new cached content.
   */
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    window.location.reload();
  });
})();