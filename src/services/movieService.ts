import axios from 'axios'
import type { MoviesResponse } from '../types/movie.ts'

export default async function fetchMovies(
  value: string,
  page: number
): Promise<MoviesResponse> {
  const myKey = import.meta.env.VITE_TMDB_TOKEN

  const response = await axios.get<MoviesResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        query: value,
        page: page
      },
      headers: {
        Authorization: `Bearer ${myKey}`
      }
    }
  )

  return {
    results: response.data.results,
    total_pages: response.data.total_pages
  }
}
