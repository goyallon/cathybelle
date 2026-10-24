const gallery = document.querySelector('#gallery');
const lightbox = document.querySelector('#lightbox');
let selected = 0;
let opener;
artworks.forEach((work, index) => {
  const figure = document.createElement('figure');
  figure.className = 'artwork';
  const button = document.createElement('button');
  button.setAttribute('aria-label', `Agrandir : ${work.title}`);
  const wrap = document.createElement('span');
  wrap.className = 'image-wrap';
  const image = document.createElement('img');
  image.src = work.src;
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
  category.textContent = work.category;
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
  selected = (index + artworks.length) % artworks.length;
  const work = artworks[selected];
  const image = document.querySelector('#art-image');
  image.src = work.src;
  image.alt = work.alt;
  document.querySelector('#art-title').textContent = work.title;
  document.querySelector('#art-detail').textContent = work.detail;
  document.querySelector('#art-count').textContent = `${selected + 1} / ${artworks.length}`;
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
  document.querySelector('#visible-count').textContent = `${visible} œuvre${visible > 1 ? 's' : ''}`;
}));
