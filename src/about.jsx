import Navbar from "./navbar";
import axios from "axios";
import "./about.css"
import { useEffect,useState }from "react"
import { MovieCard } from "./App";

let api_key = "bdb2602947a8e431c32afa49a0c8330d";
let original_img_url = "https://image.tmdb.org/t/p/original";
let movie_detail_http = "https://api.themoviedb.org/3/movie";


let movie_id = location.pathname;

export default function AboutPage() {
    let [movie, setMovie] = useState({});
    let [cast, setCast] = useState([]);
    let [trailers, setTrailers] = useState([]);
    let [recommendations, setRecommendations] = useState([]);

  

    useEffect(() => {
        getMovieDetails();
        fetchCast();
        fetchTrailers();
      fetchRecommedations();
      document.title = movie.title;
    }, [movie]);

    let getMovieDetails =async () => {
        
        await axios.get(`${movie_detail_http}${movie_id}?` + new URLSearchParams({ api_key: api_key }))
            .then(response => setMovie(response.data))
            .catch(err => console.log(err));
    }

    let fetchCast = async() => {
        await axios
          .get(
            `${movie_detail_http}${movie_id}/credits?` +
              new URLSearchParams({
                api_key: api_key,
              })
          )
          .then((response) => setCast(response.data.cast.slice(0,6)))
          .catch((err) => console.log(err));
    }

     let fetchTrailers = async () => {
       await axios
         .get(
           `${movie_detail_http}${movie_id}/videos?` +
             new URLSearchParams({
               api_key: api_key,
             })
         )
         .then((response) => setTrailers(response.data.results.slice(0,5)))
         .catch((err) => console.log(err));
    };
    let fetchRecommedations = async () => {

        await axios
          .get(
            `${movie_detail_http}${movie_id}/recommendations?` +
              new URLSearchParams({
                api_key: api_key,
              })
          )
          .then((response) => setRecommendations(response.data.results.slice(0,14)))
          .catch((err) => console.log(err));
     }
    
    return (
      <div>
        <Navbar />
        <div
          className="movie-info"
          style={{
            backgroundImage: `url(${original_img_url}${
              movie?.backdrop_path == null
                ? movie?.poster_path
                : movie?.backdrop_path
            })`,
          }}
        >
          <div className="movie-detail">
            <h1 className="movie-name">{movie.title}</h1>

            <p className="genres">
              {`${movie.release_date?.split("-")[0]}|
              ${movie.genres?.map((obj) => obj.name + " ,").join(" ")}`}
              {movie.adult == true && " | +18"}
            </p>

            <p className="des">{movie.overview?.substring(0, 200) + "....."}</p>

            <p className="starring">
              <span>Starring: </span>
              {`${cast
                .map((obj) => obj.name + " ,")
                .slice(0, 6)
                .join("")}`}
            </p>
          </div>
        </div>

        <div className="trailer-container">
          <h1 className="heading">Video Clip</h1>
          {trailers.map((trailerObj) => (
            <iframe
              key={trailerObj.id}
              src={`https://youtube.com/embed/${trailerObj.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ))}
        </div>

        <div className="recommendations">
          <h1 className="heading">More Like This</h1>
          <div className="recommendations-container">
            {recommendations.map((item) => {
              if (item.backdrop_path == null) {
                item.backdrop_path = item.poster_path;
                if (item.backdrop_path == null) {
                  return;
                }
              }

              return <MovieCard key={item.id} data={item} />;
            })}
          </div>
        </div>

        <footer>
          <p style={{ color: "white", textAlign: "center", margin: "1em" }}>
            {" "}
            copyrights reserved @ Rakesh_Mandal 2023
          </p>
        </footer>
      </div>
    );
}