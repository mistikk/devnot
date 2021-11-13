import React from "react";
import MovieCard from "../components/MovieCard";

class HomePage extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      searchKey: "",
      isLoading: false,
      error: "",
    };
  }

  _onSearchButtonClick = () => {
    const { searchKey } = this.state;

    this.setState({ isLoading: true });

    fetch(`https://www.omdbapi.com/?s=${searchKey}&apikey=f65e4b5e`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          const _movies = data.Search.map((el) => {
            return {
              name: el.Title,
              poster: el.Poster,
              year: el.Year,
              id: el.imdbID,
            };
          });

          this.setState({
            movies: _movies,
            isLoading: false,
            error: "",
          });
        }

        if (data.Error) {
          this.setState({ error: data.Error, movies: [] });
        }
      });
  };

  _onInputChange = (e) => {
    this.setState({ searchKey: e.target.value });

    // fetch(`https://www.omdbapi.com/?s=${e.target.value}&apikey=f65e4b5e`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.Response === "True") {
    //       const _movies = data.Search.map((el) => {
    //         return {
    //           name: el.Title,
    //           poster: el.Poster,
    //           year: el.Year,
    //           id: el.imdbID
    //         };
    //       });

    //       this.setState({
    //         movies: _movies,
    //         isLoading: false,
    //         error: "",
    //       });
    //     }

    //     if (data.Error) {
    //       this.setState({ error: data.Error, movies: [] });
    //     }
    //   });
  };

  _onMovieCardClick = (movie) => {
    console.log(`test`, movie);
  };

  _renderMovieCard = () => {
    const { movies, isLoading } = this.state;

    if (movies.length > 0 && isLoading !== true) {
      return movies.map((movie) => {
        return (
          <div
            onClick={() => {
              this._onMovieCardClick(movie);
            }}
          >
            <MovieCard
              name={movie.name}
              poster={movie.poster}
              year={movie.year}
              key={movie.id}
            />
          </div>
        );
      });
    }

    return null;
  };

  _renderLoading = () => {
    const { movies, isLoading, error } = this.state;

    if ((movies.length === 0 || isLoading === true) && !error) {
      return <p>LOADING!!!</p>;
    }

    return null;
  };

  render() {
    const { error } = this.state;

    return (
      <>
        <input onChange={this._onInputChange} />
        <button onClick={this._onSearchButtonClick}>Search</button>
        {this._renderLoading()}
        {this._renderMovieCard()}
        <p>{error}</p>
      </>
    );
  }
}

export default HomePage;
