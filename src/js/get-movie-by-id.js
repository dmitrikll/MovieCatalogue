import { BASE_URL } from './apiFilms/baseUrl';
import { API_KEY } from './apiFilms/apiKey';

export async function getMovieById(value) {
    const params = new URLSearchParams({ api_key: API_KEY });
    const response = await fetch(`${BASE_URL}/movie/${value}?${params}`);
    const moviesData = await response.json();
    return moviesData;
};