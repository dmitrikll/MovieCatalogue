import { API_KEY } from './apiKey';
import { BASE_URL } from './baseUrl';

import axios from 'axios';

export class TrendingFilmsApiService {
  constructor() {
    this.page = 1;
    
  }

  async fetchFilms() {
  
      const options = { params: { api_key: API_KEY } };
      const url = `${BASE_URL}/trending/movie/week?page=${this.page}`;
      const response = await axios.get(url, options);
      return response.data;
  }

  async fetchGenres() {
    try {
      const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
      const gentesList = await axios.get(url);
      return gentesList.data.genres;
    } catch (error) {
      throw new Error(`Oops, something went wrong`);
    }
  }
  resetPage() {
    this.page = 1;
  }

  get Page() {
    return this.page;
  }
  set Page(newPage) {
    this.page = newPage;
  }

  incrementPage() {
    this.page += 1;
  }
  decrement() {
    this.page -= 1;
  }
}
