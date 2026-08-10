---
title: Gallery
icon: fas fa-images
order: 5
---

{% include gallery.html %}

<link rel="stylesheet" href="{{ '/assets/css/gallery.css' | relative_url }}">

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe.css"
>

<script type="module">
  import PhotoSwipeLightbox from
    'https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe-lightbox.esm.js';

  const gallery = document.querySelector('#gallery');

  const items = [...gallery.querySelectorAll('.gallery-item')].map(item => ({
    src: item.dataset.pswpSrc,
    width: Number(item.dataset.pswpWidth),
    height: Number(item.dataset.pswpHeight),
    alt: item.querySelector('img')?.alt || ''
  }));

  const lightbox = new PhotoSwipeLightbox({
    pswpModule: () =>
      import(
        'https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe.esm.js'
      )
  });

  gallery.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.addEventListener('click', () => {
      lightbox.loadAndOpen(index, items);
    });
  });
</script>