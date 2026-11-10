const gallery = document.querySelector('#gallery');
const lightbox = document.querySelector('#lightbox');
const isEnglish = document.documentElement.lang === 'en';
const siteRoot = new URL('../../', document.currentScript.src);
const galleryWorks = isEnglish ? artworks.map((work, index) => {
  const isFloral = work.category === 'Floral';
  return {
    ...work,
    title: work.title.replace('Composition florale', 'Floral composition'),
    alt: englishArtworkDescriptions[index],
    detail: isFloral ? 'Descriptive caption. Title to be confirmed.' :
      work.detail && 'Title transcribed from the photograph. Spelling to be confirmed.'
  };
}) : artworks;
let selected = 0;
let opener;
galleryWorks.forEach((work, index) => {
  const figure = document.createElement('figure');
  figure.className = 'artwork';
  const button = document.createElement('button');
  button.setAttribute('aria-label', isEnglish ? `Enlarge ${work.title}` : `Agrandir : ${work.title}`);
  const wrap = document.createElement('span');
  wrap.className = 'image-wrap';
  const image = document.createElement('img');
  image.src = new URL(work.src, siteRoot);
  image.alt = work.alt;
  image.loading = index < 3 ? 'eager' : 'lazy';
  image.decoding = 'async';
  const number = document.createElement('span');
  number.className = 'art-number';
  number.textContent = String(index + 1).padStart(2, '0');
  number.setAttribute('aria-hidden', 'true');
  wrap.append(image, number);
  button.append(wrap);
  const caption = document.createElement('figcaption');
  const title = document.createElement('span');
  title.textContent = work.title;
  const category = document.createElement('small');
  category.textContent = isEnglish && work.category === 'Abstraction' ? 'Abstract' : work.category;
  caption.append(title, category);
  figure.append(button, caption);
  gallery.append(figure);
  button.addEventListener('click', () => {
    opener = button;
    showArtwork(index);
    lightbox.showModal();
    document.body.style.overflow = 'hidden';
    document.querySelector('#close').focus();
  });
});
function showArtwork(index) {
  selected = (index + galleryWorks.length) % galleryWorks.length;
  const work = galleryWorks[selected];
  const image = document.querySelector('#art-image');
  image.src = new URL(work.src, siteRoot);
  image.alt = work.alt;
  document.querySelector('#art-title').textContent = work.title;
  document.querySelector('#art-detail').textContent = work.detail;
  document.querySelector('#art-count').textContent = `${selected + 1} / ${galleryWorks.length}`;
}
document.querySelector('#close').addEventListener('click', () => lightbox.close());
document.querySelector('#previous').addEventListener('click', () => showArtwork(selected - 1));
document.querySelector('#next').addEventListener('click', () => showArtwork(selected + 1));
lightbox.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {event.preventDefault(); showArtwork(selected - 1);}
  if (event.key === 'ArrowRight') {event.preventDefault(); showArtwork(selected + 1);}
});
lightbox.addEventListener('close', () => {
  document.body.style.overflow = '';
  opener?.focus();
});
document.querySelector('#year').textContent = new Date().getFullYear();

const filters = [...document.querySelectorAll('[data-filter]')];
filters.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  let visible = 0;
  [...gallery.children].forEach((figure, index) => {
    const show = category === 'all' || artworks[index].category === category;
    figure.hidden = !show;
    if (show) visible++;
  });
  filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
  const noun = isEnglish ? 'painting' : 'œuvre';
  document.querySelector('#visible-count').textContent = `${visible} ${noun}${visible > 1 ? 's' : ''}`;
}));
