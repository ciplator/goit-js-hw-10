import axios from "axios";

import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Report } from "notiflix/build/notiflix-report-aio";
import SlimSelect from "slim-select";

axios.defaults.headers.common["x-api-key"] =
  "live_YXYej8kwyaXTKjD6PYYf9QSKxeBkiJJAnN2oqgkxn908hW1gxxcKy0WWrvTcpwmi";
const API_URL = "https://api.thecatapi.com/v1/breeds";
const SEARCH_URL = `https://api.thecatapi.com/v1/images/search`;
function fetchBreeds() {
  return axios.get(API_URL);
}

const selectEl = document.querySelector(".breed-select");
const loaderEl = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfoEl = document.querySelector(".cat-info");

function createMarkup(arr) {
  return arr
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join("");
}
function createMarkupCat({
  0: {
    breeds: {
      0: { temperament, name, description },
    },
    url,
  },
}) {
  return `
    <img src="${url}" alt="${name}" width="800" height="500" />
    <div>
    <h1 class="title">${name}</h1>
    <p class="description">${description}</p>
    <h2>Temperament:</h2>
    <p class="description">${temperament}</p></div>`;
}

export { createMarkup, createMarkupCat };

function fetchCatByBreed(breedId) {
  return axios.get(`${SEARCH_URL}?breed_ids=${breedId}`);
}
export { fetchBreeds, fetchCatByBreed };

selectEl.addEventListener("change", onValueId);
fetchBreeds()
  .then((arr) => {
    load();

    return (selectEl.innerHTML = createMarkup(arr.data));
  })
  .then(() => slim())
  .catch(fetchError);

function onValueId(e) {
  const id = e.target.value;
  fetchCatByBreed(id)
    .then((obj) => {
      load();

      return (catInfoEl.innerHTML = createMarkupCat(obj.data));
    })
    .then(() => success())
    .catch(fetchError);
}
function fetchError() {
  Report.failure(error.textContent, "Try reloading the page!");
}
function success() {
  Notify.success("Search was successful!)");
}
function load() {
  selectEl.hidden = false;
  loaderEl.classList.remove("loader");
}

function slim() {
  new SlimSelect({
    select: selectEl,
  });
}
