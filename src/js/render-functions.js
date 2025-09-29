import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.js-load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(arr) {
  const markup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
  <li>
   <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" width="300"/>
          </a>
 <div class="info">
            <p>👍 ${likes}</p>
            <p>👀 ${views}</p>
            <p>💬 ${comments}</p>
            <p>⬇️ ${downloads}</p>
          </div>
  </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('is-visible');
}

export function hideLoader() {
  loader.classList.remove('is-visible');
}

export function showLoadMoreButton() {
  loadBtn.classList.remove('load-more-hidden');
}
export function hideLoadMoreButton() {
  loadBtn.classList.add('load-more-hidden');
}
