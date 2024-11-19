import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import NavBar from "../components/NavBar"
function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    fetch('http://localhost:4000/movies')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setLoading(false); // Data is loaded, set loading to false
      })
      .catch((err) => {
        setError("Failed to load movies.");
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  // If loading, show a loading message
  if (loading) {
    return (
      <div>
        <NavBar />
        <h1>Loading...</h1>
      </div>
    );
  }

  // If there was an error fetching movies, show the error message
  if (error) {
    return (
      <div>
        <NavBar />
        <h1>{error}</h1>
      </div>
    );
  }

  // If no movies were returned, show a message
  if (movies.length === 0) {
    return (
      <div>
        <NavBar />
        <h1>No movies found.</h1>
      </div>
    );
  }

  return (
    <>
      <header>
        <NavBar />
        <h1>Home Page</h1>
      </header>
      <main>
        <div className="movie-list">
          {/* Pass the entire movie object to MovieCard */}
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
    </>
  );
}



export default Home;
