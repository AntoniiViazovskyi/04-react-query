import axios from 'axios'
import type { Movie } from '../types/movie.ts'

interface MoviesHttpResponse {
  results: Movie[]
}

export default async function fetchMovies(value: string): Promise<Movie[]> {
  const myKey = import.meta.env.VITE_TMDB_TOKEN

  const response = await axios.get<MoviesHttpResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: { query: value },
      headers: {
        Authorization: `Bearer ${myKey}`
      }
    }
  )

  return response.data.results
}
