import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-btn');
const loaderContainer = document.querySelector('.loader-container');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <li class="gallery-item">
        <a class="gallery__link" href="${largeImageURL}">
          <img class="gallery__image" src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="image-info">
          <p>Likes: <span>${likes}</span></p>
          <p>Views: <span>${views}</span></p>
          <p>Comments: <span>${comments}</span></p>
          <p>Downloads: <span>${downloads}</span></p>
        </div>
      </li>
    `
    )
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  loaderContainer.classList.remove('is-hidden');
}

export function hideLoader() {
  loaderContainer.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadBtn.classList.add('is-hidden');
}
