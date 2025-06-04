import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '50679981-3c82f9b846616ba31889c4405';

export async function getImagesByQuery(query, page, perPage) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,

      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}