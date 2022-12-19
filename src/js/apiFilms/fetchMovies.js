import { API_KEY } from './apiKey';
import { BASE_URL } from './baseUrl';

import axios from 'axios';

export default async function fetchMovies(query, page) {
  try {
    const result = await axios(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}&language=en-US`
    );

    return result;
  } catch (error) {
    console.log(error);
  }
}
