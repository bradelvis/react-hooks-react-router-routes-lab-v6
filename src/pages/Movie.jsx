import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import NavBar from "../components/NavBar";

function Movie() {
  const [movie, setMovie] = useState({});
  const params = useParams();
  const movieId = params.id;

  useEffect(() => {
    fetch(`http://localhost:4000/movies/${movieId}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error(error));
  }, [movieId]);

  if (!movie.title) {
    return <h1>Loading...</h1>
  }

  const genreTags = movie.genres.map((genre) => {
    return (
      <span key={genre}>{genre}</span>
    );
  });

  return (
    <>
      <header>
        {/* What component should go here? */}
        <NavBar />
        <h1>{movie.title}</h1>
      </header>
      <main>
        {/* Movie info here! */}
        <p>{movie.time}</p>
        {genreTags}
      </main>
    </>
  );
};


export default Movie;
