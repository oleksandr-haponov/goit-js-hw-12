import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.error({ message: 'Enter a search query!' });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query);

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
    }, 600);
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  }
});