import { useEffect, useState } from "react";
import Card from "../components/ReusableCard";
import NavBar from "../components/NavBar";

function Actors() {
  const [actors, setActors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch actors' data from the backend API
    fetch('http://localhost:4000/actors')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setActors(data);  // Update state with the actors' data
        setIsLoading(false);  // Set loading state to false after data is fetched
      })
      .catch((error) => {
        setError(error.message);  // Handle fetch errors
        setIsLoading(false);  // Set loading state to false after error
      });
  }, []);

  if (isLoading) {
    return (
      <>
        <header>
          <NavBar />
          <h1>Actors Page</h1>
        </header>
        <main>
          <h2>Loading actors...</h2>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <header>
          <NavBar />
          <h1>Actors Page</h1>
        </header>
        <main>
          <h2>Error loading actors: {error}</h2>
        </main>
      </>
    );
  }

  const articles = actors.map((actor) => {
    // Map over the movies array and render each movie
    const movieTags = actor.movies.map((movie, index) => (
      <li key={index}>{movie}</li>  // Using `index` as key if movie is just a string
    ));

    return (
      <article key={actor.id}>
        <h2>{actor.name}</h2>
        <ul>
          {movieTags}
        </ul>
      </article>
    );
  });

  return (
    <>
      <header>
        <NavBar />
        <h1>Actors Page</h1>
      </header>
      <main>
        {articles}
      </main>
    </>
  );
}

export default Actors;
