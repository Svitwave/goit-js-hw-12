import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

let page = 1;
let query = '';
const loadBtn = document.querySelector('.js-load-more');
const form = document.querySelector('.form');

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = event.target.elements['search-text'].value.trim();
  page = 1;
  hideLoadMoreButton();
  if (!query) {
    iziToast.error({ title: 'error', message: 'Please enter a search query!' });
    return;
  }

  clearGallery();
  showLoader();
  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(data.hits);
    if (data.totalHits > page * 15) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
  }
});

loadBtn.addEventListener('click', onLoadMore);
async function onLoadMore() {
  page += 1;
  hideLoadMoreButton();
  showLoader();
  try {
    const data = await getImagesByQuery(query, page);

    createGallery(data.hits);

    const { height: cardHeight } = document
      .querySelector('.gallery li')
      .getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (page * 15 < data.totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
  }
}
