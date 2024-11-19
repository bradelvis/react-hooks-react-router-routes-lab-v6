import { useEffect, useState } from "react";
import Card from "../components/ReusableCard";
import NavBar from "../components/NavBar";
function Directors() {
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/directors')
      .then((response) => response.json())
      .then((data) => setDirectors(data));
  }, [])

  const articles = directors.map((director) => {
    const movieTags = director.movies.map((movie) => <li key={movie}>{movie}</li>);
    return (
      <article key={director.id}>
        <h2>{director.name}</h2>
        <ul>
          {movieTags}
        </ul>
      </article>
    );
  });

  return (
    <>
      <header>
        {/* What component should go here? */}
        <NavBar />
        <h1>Directors Page</h1>
      </header>
      <main>
        {/* Director info here! */}
        {articles}
      </main>
    </>
  );
};



export default Directors;
