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

  const lightbox = new PhotoSwipeLightbox({
    gallery: '#gallery',
    children: 'a',
    pswpModule: () =>
      import(
        'https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe.esm.js'
      )
  });

  lightbox.init();
</script>