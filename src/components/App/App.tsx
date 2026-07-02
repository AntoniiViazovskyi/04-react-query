import SearchBar from '../SearchBar/SearchBar.tsx'
import type { Movie } from '../../types/movie.ts'
import fetchMovies from '../../services/movieService.ts'
import { useEffect, useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast'
import Loader from '../Loader/Loader.tsx'
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx'
import MovieGrid from '../MovieGrid/MovieGrid.tsx'
import MovieModal from '../MovieModal/MovieModal.tsx'
import css from './App.module.css'
import Pagination from '../Pagination/Pagination.tsx'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const {
    data: { results: movies, total_pages: totalPages } = {
      results: [],
      total_pages: 0
    },
    isLoading,
    isError,
    isSuccess,
    isFetching,
    isPlaceholderData
  } = useQuery({
    queryKey: ['movies', searchQuery, currentPage],
    queryFn: () => fetchMovies(searchQuery, currentPage),
    enabled: searchQuery.trim() !== '',
    placeholderData: keepPreviousData
  })

  useEffect(() => {
    if (
      isSuccess &&
      !isFetching &&
      !isPlaceholderData &&
      searchQuery !== '' &&
      movies.length === 0
    ) {
      toast.error('No movies found for your request.')
    }
  }, [isFetching, isPlaceholderData, isSuccess, movies.length, searchQuery])

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedMovie(null)
    setIsModalOpen(false)
  }

  const onSubmit = (query: string) => {
    setSearchQuery(query.trim())
    setCurrentPage(1)
  }

  return (
    <div className={css.app}>
      <Toaster position="top-center" />
      <SearchBar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
      {movies.length > 0 && <MovieGrid movies={movies} onSelect={openModal} />}
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  )
}

export default App
