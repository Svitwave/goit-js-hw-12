import axios from 'axios';

const keyApi = '52380284-963e8352b908bdb319614297a';
const webSite = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page) {
  const params = {
    key: keyApi,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 15,
  };
  try {
    const response = await axios.get(webSite, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}
