import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import makeCard from './partials/makeCard.hbs';
import makeList from './partials/makeList.hbs';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const onSearchCountry = e => {
  const inputValue = e.target.value;

  fetchCountries(inputValue)
    .then(data => {
      console.log(data);
      const list = makeCard(data);
      countryInfoEl.innerHTML = list;
    })
    .catch(error => Notify.failure(error));
};
inputEl.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));
