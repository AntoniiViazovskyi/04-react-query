import css from './MovieGrid.module.css'
import type { Movie } from '../../types/movie.ts'

interface MovieGridProps {
  movies: Movie[]
  onSelect: (movie: Movie) => void
}

function renderCards(movies: Movie[], onSelect: (movie: Movie) => void) {
  return movies.map((movie) => {
    return (
      <li key={movie.id}>
        <div className={css.card}>
          <img
            className={css.image}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
            onClick={() => onSelect(movie)}
          />
          <h2 className={css.title}>{movie.title}</h2>
        </div>
      </li>
    )
  })
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return <ul className={css.grid}>{renderCards(movies, onSelect)}</ul>
}
