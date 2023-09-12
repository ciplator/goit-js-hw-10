// import axios from 'axios';

// axios.defaults.headers.common["x-api-key"] =
//   "live_YXYej8kwyaXTKjD6PYYf9QSKxeBkiJJAnN2oqgkxn908hW1gxxcKy0WWrvTcpwmi";
// const API_URL = "https://api.thecatapi.com/v1/breeds";
// const SEARCH_URL = `https://api.thecatapi.com/v1/images/search`;
// function fetchBreeds() {
//   return axios.get(API_URL);
// }
// function fetchCatByBreed(breedId) {
//   return axios.get(`${SEARCH_URL}?breed_ids=${breedId}`);
// }
// export { fetchBreeds, fetchCatByBreed };


import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_YXYej8kwyaXTKjD6PYYf9QSKxeBkiJJAnN2oqgkxn908hW1gxxcKy0WWrvTcpwmi';
const API_URL = 'https://api.thecatapi.com/v1/breeds';
const SEARCH_URL = `https://api.thecatapi.com/v1/images/search`;
function fetchBreeds() {
  return axios.get(API_URL);
}

function fetchCatByBreed(breedId) {
  return axios.get(`${SEARCH_URL}?breed_ids=${breedId}`);
}
export { fetchBreeds, fetchCatByBreed };