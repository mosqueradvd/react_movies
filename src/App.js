import { useState, useEffect } from 'react'
import './styles/App.css'
import Navbar from '../src/components/Navbar'
import Skeleton from '../src/components/Skeleton'

function App() {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)

  const nextPage = async () => {
    setPage((page) => page + 1)
  }

  useEffect(() => {
    async function getMovies() {
      const result = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=fcd48ca74e06f52d29422c2007f44c82&language=en-US&page=${page}`
      )
      const data = await result.json()
      setMovies((movies) => [...movies, ...data.results])
    }

    getMovies()
  }, [page])

  return (
    <div className='App'>
      <Navbar />
      <div className='App-container'>
        {!movies.length ? (
          <Skeleton />
        ) : (
          movies.map((item, index) => (
            <div key={index} className='App-card'>
              <div>
                <img
                  className='App-card--img'
                  src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                  alt='movie banner'
                ></img>
              </div>
              <h2 className='App-card--title'>{item.title}</h2>
              <div className='App-card--info'>
                <h3>Language {item.original_language}</h3>
                <h3>Release date {item.release_date}</h3>
                <h3>Rating {item.vote_average}</h3>
              </div>
              <div className='App-card--paragraph'>
                <h2>Movie Overview</h2>
                <p>{item.overview}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className='App-button--container'>
        <button className='App-button' onClick={nextPage}>
          Load more movies!
        </button>
      </div>
    </div>
  )
}

export default App
