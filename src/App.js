import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [id, setId] = useState(1)
  const [movieId, setMovieId] = useState()

  const nextPage = async () => {
    setId((id) => id + 1)
  }

  useEffect(() => {
    async function getMovies() {
      const result = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=fcd48ca74e06f52d29422c2007f44c82&language=en-US&page=${id}`
      )
      const data = await result.json()
      setMovies((movies) => [...movies, ...data.results])
      // console.log('movies >>>', movies[0].id)
    }

    console.log('length >>>', movies)
    // for (let i = 0; i < movies.length; i++) {
    //   setMovieId(movies[i].id)
    // }

    // async function getMovieBanner() {
    //   await fetch(
    //     `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=fcd48ca74e06f52d29422c2007f44c82&52AfXWuXCHn3UjD17rBruA9f5qb.jpg`
    //   )
    // }

    // getMovieBanner()
    getMovies()
  }, [])

  return (
    <div className='App'>
      {movies.map((item, index) => (
        <div key={index}>
          <img src={movieId} alt='movie banner'></img>
          <h3>{item.title}</h3>
        </div>
      ))}
      <button onClick={nextPage}>Next page</button>
    </div>
  )
}

export default App
