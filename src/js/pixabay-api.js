import axios from 'axios';

const keyApi = '52380284-963e8352b908bdb319614297a';
const webSite = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {
  const params = {
    key: keyApi,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  return axios.get(webSite, { params }).then(response => {
    return response.data;
  });
}
