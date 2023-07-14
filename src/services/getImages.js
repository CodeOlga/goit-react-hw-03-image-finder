// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '37056848-912ded0eb5e75838ece32e5ab';

export const getImages = inputSearch => {
  console.log(inputSearch);
  // fetch(`${BASE_URL}/`);
  return fetch(
    `https://pixabay.com/api/?q=${inputSearch}&page=1&key=37056848-912ded0eb5e75838ece32e5ab&image_type=photo&orientation=horizontal&per_page=12`
  );
  // .then(res => res.json())
  // .then(images => console.log(images));
};
