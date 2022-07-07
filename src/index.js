import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import makeCard from './partials/makeCard.hbs';
import makeList from './partials/makeList.hbs';

const DEBOUNCE_DELAY = 300;
const Notify_TEXT_INFO = 'Too many matches found. Please enter a more specific name.';

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

/* innerHTMLCountryInfo - выбирает из data данные в объект, и потом 
по шаблону собирает html, и innerHTML код всавляет в div  */
const innerHTMLCountryInfo = data => {
  const { capital, flags, languages, name, population } = data[0];
  const obj = {
    capital: capital[0],
    flags: flags.svg,
    languages: Object.values(languages).join(', '),
    name: name.official,
    population: population,
  };
  countryInfoEl.innerHTML = makeCard(obj);
};

/* innerHTMLCountryList - созд список по шаблону и вставляет
готовый html в ul  */
const innerHTMLCountryList = data => {
  countryInfoEl.innerHTML = makeList(data);
};

/* объект с методами очистки div - info() или ul - list(), или all() */
const clearHTML = {
  /* Очистка div */
  info() {
    countryInfoEl.innerHTML = '';
  },

  /* Очистка ul */
  list() {
    countryListEl.innerHTML = '';
  },

  /* очистить ul и div */
  all() {
    countryInfoEl.innerHTML = '';
    countryListEl.innerHTML = '';
  },
};

const onSearchCountry = e => {
  const inputValue = e.target.value.trim();

  if (inputValue.length !== 0) {
    fetchCountries(inputValue)
      .then(data => {
        if (data.length > 10) {
          clearHTML.all();
          Notify.info(Notify_TEXT_INFO);
          return;
        }

        if (data.length > 2 && data.length < 10) {
          clearHTML.info();
          innerHTMLCountryList(data);
          return;
        }

        if (data.length === 1) {
          clearHTML.list();
          innerHTMLCountryInfo(data);
          return;
        }
      })
      .catch(error => {
        clearHTML.all();
        Notify.failure(error);
      });
  } else {
    clearHTML.all();
  }
};

inputEl.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));
