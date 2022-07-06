import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const filter = 'fields=name,capital,population,flags,languages';

export const fetchCountries = name => {
  return fetch(`${BASE_URL}${name}?${filter}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Oops, there is no country with that name');
      }
      return response.json();
    })
    .catch(error => {
      throw error.message;
    });
};
