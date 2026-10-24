const photoButtons = [...document.querySelectorAll('.exhibition-photo')];
const photoDialog = document.querySelector('#exhibition-lightbox');
const largePhoto = document.querySelector('#exhibition-large');
let photoIndex = 0;
let photoOpener;
let previousOverflow = '';
function displayPhoto(index) {
  photoIndex = (index + photoButtons.length) % photoButtons.length;
  const photo = photoButtons[photoIndex];
  largePhoto.src = photo.dataset.photo;
  largePhoto.alt = photo.dataset.description;
  document.querySelector('#exhibition-photo-title').textContent = photo.dataset.description;
  document.querySelector('#exhibition-photo-count').textContent = `${photoIndex + 1} / ${photoButtons.length}`;
}
photoButtons.forEach((button, index) => button.addEventListener('click', () => {
  photoOpener = button;
  displayPhoto(index);
  previousOverflow = document.body.style.overflow;
  photoDialog.showModal();
  document.body.style.overflow = 'hidden';
  document.querySelector('#exhibition-close').focus();
}));
document.querySelector('#exhibition-close').addEventListener('click', () => photoDialog.close());
document.querySelector('#exhibition-prev').addEventListener('click', () => displayPhoto(photoIndex - 1));
document.querySelector('#exhibition-next').addEventListener('click', () => displayPhoto(photoIndex + 1));
photoDialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    displayPhoto(photoIndex + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
photoDialog.addEventListener('close', () => {
  document.body.style.overflow = previousOverflow;
  photoOpener?.focus();
});
