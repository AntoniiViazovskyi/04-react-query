import SearchBar from '../SearchBar/SearchBar.tsx'
import type { Movie } from '../../types/movie.ts'
import fetchMovies from '../../services/movieService.ts'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Loader from '../Loader/Loader.tsx'
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx'
import MovieGrid from '../MovieGrid/MovieGrid.tsx'
import MovieModal from '../MovieModal/MovieModal.tsx'
import css from './App.module.css'

function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setLoader] = useState<boolean>(false)
  const [isError, setError] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie)
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setSelectedMovie(null)
    setIsModalOpen(false)
  }

  async function onSubmit(query: string) {
    try {
      setLoader(true)
      setError(false)
      setMovies([])
      const results = await fetchMovies(query)
      if (results.length === 0) {
        toast.error('No movies found for your request.')
        return
      }
      setMovies(results)
    } catch {
      setError(true)
    } finally {
      setLoader(false)
    }
  }

  return (
    <div className={css.app}>
      <Toaster position="top-center" />
      <SearchBar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid movies={movies} onSelect={openModal} />}
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  )
}

export default App
