import { useState, useEffect, useRef } from 'react'
import {useNavigate} from "react-router-dom"
import './App.css';
import axios from "axios"
import Navbar from './navbar';
import AboutPage from './about';

let api_key = "bdb2602947a8e431c32afa49a0c8330d";

let img_url = "https://image.tmdb.org/t/p/w500";
let genres_list_http = "https://api.themoviedb.org/3/genre/movie/list?";
let movie_genres_http = "https://api.themoviedb.org/3/discover/movie?";

function App() {
  let [genresList, setGenresList] = useState([]);

  useEffect(() => {
    fetchListOfGenres();
  }, [])
  
  let fetchListOfGenres = async() => {
    
    await axios.get(genres_list_http + new URLSearchParams({
      api_key:api_key
    }))
      .then(response =>
        setGenresList(response.data.genres)
      )
      .catch(err =>
        console.log(err));
        
  }

 
  return (
    <div>
      <Navbar/>

      <header className="main">
        <h1 className="heading">movies</h1>
        <p className="info">
          Movies move us like nothing else can, whether they're scary, funny,
          dramatic, romantic or anywhere in-between. So many titles, so much to
          experience.
        </p>

        {genresList.map((genre) => (
          <MoviesListByGenre key={genre.id} id={genre.id} genres={genre.name} />
        ))}
      </header>

      <footer>
        <p style={{ color: "white", textAlign: "center", margin: "1em" }}>
          {" "}
          copyrights reserved @ Rakesh_Mandal 2023
        </p>
      </footer>
    </div>
  );
}

export default App;


let MoviesListByGenre = ({ id, genres }) => {

  let [moviesList, setMoviesList] = useState([]);
  let [moviesListLength,setMoviesListLength] = useState("")

  let moviesContainerRef = useRef();

  useEffect(() => {
    fetchMoviesList();
    setMoviesListLength(
      moviesContainerRef.current?.getBoundingClientRect().width
    );
  },[])

  let fetchMoviesList = async() => {
    
    await axios.get(
      movie_genres_http +
      new URLSearchParams({
        api_key: api_key,
        with_genres: id,
        page: Math.floor(Math.random() * 3) + 1,
      })
    ).then(response => {
      setMoviesList(response.data.results);
    })
      .catch(err => console.log(err));
  }

  
  return (
    <div className="movie-list">
      <button
        onClick={() =>
          moviesContainerRef.current.scrollLeft -= moviesListLength
        }
        className="pre-btn"
      >
        <img
          src="https://www.clipartmax.com/png/middle/177-1773536_arrow-left-icon-next-and-previous-buttons-png.png"
          alt=""/>
      </button>

      <h1 className="movie-category">{`${genres} Movies`}</h1>

      <div ref={moviesContainerRef} className="movie-container" id={genres}>
        {moviesList.map((item) => {
          if (item.backdrop_path == null) {
            item.backdrop_path = item.poster_path;
            if (item.backdrop_path == null) {
              return;
            }
          }

          return <MovieCard key={item.id}  data={item} />;
        })}
      </div>

      <button
        onClick={() =>
          (moviesContainerRef.current.scrollLeft += moviesListLength)
        }
        className="nxt-btn"
      >
        <img
          src="https://w7.pngwing.com/pngs/358/28/png-transparent-arrow-computer-icons-next-button-cdr-angle-rectangle-thumbnail.png"
          alt="" />
      </button>
    </div>
  );
  
}



let MovieCard = ({  data }) => {
  let NavigateTo = useNavigate();
  

  return (
    <div className="movie" onClick={() => {
      location.href = `/${data.id}`
    }} >
      <img src={img_url + data.backdrop_path} alt="moviePoster" />
      <p className="movie-title">{data.title}</p>

    </div>
  )
}

export {MovieCard}
