const API_KEY = 'cbb822aa772537b57d5d040000698149';
const BASE_URL = 'https://api.themoviedb.org/3';

import axios from 'axios';

async function fetchMovies(page = 1) {
  try {
    const options = { params: { api_key: API_KEY } };
    const url = `${BASE_URL}/trending/movie/week?page=${page}`;
    const response = await axios.get(url, options);
    return response.data.results;
  } catch (error) {
    throw new Error(`Oops, something went wrong`);
  }
}

async function fetchGenres() {
  try {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
    const genresList = await axios.get(url);
    return genresList.data.genres;
  } catch (error) {
    throw new Error(`Oops, something went wrong`);
  }
}

async function fetchSearchQuery(query, page) {
  try {
    const results = await axios(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}&language=en-US`
    );

    return results;
  } catch (error) {
    console.log(error);
  }
}

async function fetchMovieDetails(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
}

export { fetchMovies, fetchGenres, fetchSearchQuery, fetchMovieDetails };
