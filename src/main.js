import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');
const loadBtn = document.querySelector('.load-btn');

let query = '';
let page = 0;
const perPage = 15;
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();

  query = input.value.trim();

  if (!query) {
    iziToast.error({ message: 'Enter a search query!' });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page, perPage);
    totalHits = data.totalHits;
    // totalHits = 100;

    setTimeout(() => {
      hideLoader();

      if (data.hits.length === 0) {
        iziToast.error({
          id: 'error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          transitionIn: 'fadeInDown',
        });
        return;
      }

      createGallery(data.hits);
      if (page * perPage < totalHits) showLoadMoreButton();
    }, 600);
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  }
});

function smoothScroll() {
  const card = document.querySelector('.photo-card');
  if (card) {
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}

loadBtn.addEventListener('click', async () => {
  page += 1;

  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query, page, perPage);
    setTimeout(() => {
      hideLoader();
      createGallery(data.hits);
      smoothScroll();
      //   console.log(data.hits.map(img => img.id));

      if (page * perPage >= totalHits) {
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'bottomRight',
        });
        hideLoadMoreButton();
      } else {
        showLoadMoreButton();
      }
    }, 600);
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong.',
    });
  }
});