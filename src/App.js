import React from "react";

import MovieCard from "./MovieCard";

import "./App.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    fetch("https://www.omdbapi.com/?s=inception&r=json&apikey=f65e4b5e")
      .then((response) => response.json())
      .then((data) => {
        const _movies = data.Search.map((el) => {
          return {
            name: el.Title,
            poster: el.Poster,
            description: el.Year,
          };
        });

        this.setState({
          movies: _movies,
        });
      });
  }

  _renderMovieCard = () => {
    const { movies } = this.state;

    return movies.map((movie) => {
      return (
        <MovieCard
          name={movie.name}
          poster={movie.poster}
          description={movie.description}
        />
      );
    });
  };

  render() {
    const { movies } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          {movies.length === 0 ? <p>LOADING!!!</p> : this._renderMovieCard()}
        </header>
      </div>
    );
  }
}

export default App;
