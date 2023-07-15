const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '37056848-912ded0eb5e75838ece32e5ab';

export const getImages = inputSearch => {
  console.log(inputSearch);
  return fetch(
    `${BASE_URL}/?q=${inputSearch}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
