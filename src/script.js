import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Report } from "notiflix/build/notiflix-report-aio";
import SlimSelect from "slim-select";

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


function fetchCatByBreed(breedId) {
  return axios.get(`${SEARCH_URL}?breed_ids=${breedId}`);
}


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
  catInfoEl.innerHTML = "";
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
  const slimSelect = new SlimSelect({
    select: selectEl,
    settings: {
      placeholderText: "Custom Placeholder Text",
    },
  });

  const firstOption = selectEl.querySelector("option:first-child");
  if (firstOption) {
    onValueId({ target: { value: firstOption.value } });
  }
}
