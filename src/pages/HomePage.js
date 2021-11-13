import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MovieCard from "../components/MovieCard";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(`----component did mount-----`);

    return () => {
      console.log(`----component will unmount-----`);
    };
  }, []);

  useEffect(() => {
    console.log(`----searchKey updated-----`);

    return () => {
      console.log(`----searchKey will update-----`);
    };
  }, [searchKey]);

  useEffect(() => {
    console.log(`----movies updated-----`);
  }, [movies]);

  useEffect(() => {
    console.log(`----searchKey or movies updated-----`);
  }, [searchKey, movies]);

  useEffect(() => {
    _fetchMovies();
  }, [page]);

  const _fetchMovies = () => {
    if (searchKey) {
      fetch(
        `https://www.omdbapi.com/?s=${searchKey}&apikey=f65e4b5e&page=${page}`
      )
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

            setMovies(_movies);
            setIsLoading(false);
            setError("");
          }

          if (data.Error) {
            setError(data.Error);
            setMovies([]);
          }
        });
    }
  };

  const _onInputChange = (e) => {
    setSearchKey(e.target.value);
  };

  const _onSearchButtonClick = () => {
    setIsLoading(true);

    _fetchMovies();
  };

  const _onMovieCardClick = (movie) => {
    navigate(`/details/${movie.id}`);
  };

  const _onPageButtonClick = (value) => {
    console.log(`_onNextButtonClick`);
    setPage((prevState) => {
      return prevState + value;
    });
  };

  const _renderLoading = () => {
    if ((movies.length === 0 || isLoading === true) && !error) {
      return <p>LOADING!!!</p>;
    }

    return null;
  };

  const _renderMovieCard = () => {
    if (movies.length > 0 && isLoading !== true) {
      return movies.map((movie) => {
        return (
          <div
            key={movie.id}
            onClick={() => {
              _onMovieCardClick(movie);
            }}
            style={{ border: "1px solid" }}
          >
            <MovieCard
              name={movie.name}
              poster={movie.poster}
              year={movie.year}
            />
          </div>
        );
      });
    }

    return null;
  };

  return (
    <>
      <input onChange={_onInputChange} />
      <button onClick={_onSearchButtonClick}>Search</button>
      <button onClick={() => _onPageButtonClick(1)}>Next</button>
      <p>{page}</p>
      <button disabled={!(page > 1)} onClick={() => _onPageButtonClick(-1)}>
        Back
      </button>
      {_renderLoading()}
      {_renderMovieCard()}
      <p>{error}</p>
    </>
  );
};

// class HomePage extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       movies: [],
//       searchKey: "",
//       isLoading: false,
//       error: "",
//     };
//   }

//   _onSearchButtonClick = () => {
//     const { searchKey } = this.state;

//     this.setState({ isLoading: true });

//     fetch(`https://www.omdbapi.com/?s=${searchKey}&apikey=f65e4b5e`)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.Response === "True") {
//           const _movies = data.Search.map((el) => {
//             return {
//               name: el.Title,
//               poster: el.Poster,
//               year: el.Year,
//               id: el.imdbID,
//             };
//           });

//           this.setState({
//             movies: _movies,
//             isLoading: false,
//             error: "",
//           });
//         }

//         if (data.Error) {
//           this.setState({ error: data.Error, movies: [] });
//         }
//       });
//   };

//   _onInputChange = (e) => {
//     this.setState({ searchKey: e.target.value });

//     // fetch(`https://www.omdbapi.com/?s=${e.target.value}&apikey=f65e4b5e`)
//     //   .then((response) => response.json())
//     //   .then((data) => {
//     //     if (data.Response === "True") {
//     //       const _movies = data.Search.map((el) => {
//     //         return {
//     //           name: el.Title,
//     //           poster: el.Poster,
//     //           year: el.Year,
//     //           id: el.imdbID
//     //         };
//     //       });

//     //       this.setState({
//     //         movies: _movies,
//     //         isLoading: false,
//     //         error: "",
//     //       });
//     //     }

//     //     if (data.Error) {
//     //       this.setState({ error: data.Error, movies: [] });
//     //     }
//     //   });
//   };

//   _onMovieCardClick = (movie) => {
//     const { history } = this.props;

//     history.push(`/details/${movie.id}`);
//   };

//   _renderMovieCard = () => {
//     const { movies, isLoading } = this.state;

//     if (movies.length > 0 && isLoading !== true) {
//       return movies.map((movie) => {
//         return (
//           <div
//             key={movie.id}
//             onClick={() => {
//               this._onMovieCardClick(movie);
//             }}
//             style={{ border: "1px solid" }}
//           >
//             <MovieCard
//               name={movie.name}
//               poster={movie.poster}
//               year={movie.year}
//             />
//           </div>
//         );
//       });
//     }

//     return null;
//   };

//   _renderLoading = () => {
//     const { movies, isLoading, error } = this.state;

//     if ((movies.length === 0 || isLoading === true) && !error) {
//       return <p>LOADING!!!</p>;
//     }

//     return null;
//   };

//   render() {
//     const { error } = this.state;

//     return (
//       <>
//         <input onChange={this._onInputChange} />
//         <button onClick={this._onSearchButtonClick}>Search</button>
//         {this._renderLoading()}
//         {this._renderMovieCard()}
//         <p>{error}</p>
//       </>
//     );
//   }
// }

export default HomePage;
