import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetailsPage = () => {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { imdbId = "tt1375666" } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=f65e4b5e`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovie(data);
          setError("");
          setIsLoading(false);
        } else {
          setError("Not Found");
          setIsLoading(false);
        }
      });
  }, []);

  const _onBackButtonClick = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <p>LOADING!!</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <button onClick={_onBackButtonClick}>Back</button>
      <h1>{movie.Title}</h1>
      <p>{`Director : ${movie.Director}`}</p>
      <p>{`Description : ${movie.Plot}`}</p>
      <p>{`Rating : ${movie.imdbRating}`}</p>
    </>
  );
};

// class DetailsPage extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       movie: {},
//       error: "",
//       isLoading: false,
//     };
//   }

//   componentDidMount() {
//     const imdbId = get(this.props, "match.params.imdbId", "tt1375666");

//     this.setState({ isLoading: true });

//     fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=f65e4b5e`)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.Response === "True") {
//           this.setState({ movie: data, error: "", isLoading: false });
//         } else {
//           this.setState({ error: "Not Found", isLoading: false });
//         }
//       });
//   }

//   render() {
//     const { movie, error, isLoading } = this.state;

//     if (isLoading) {
//       return <p>LOADING!!</p>;
//     }

//     if (error) {
//       return <p>{error}</p>;
//     }

//     return (
//       <>
//         <h1>{movie.Title}</h1>
//         <p>{`Director : ${movie.Director}`}</p>
//         <p>{`Description : ${movie.Plot}`}</p>
//         <p>{`Rating : ${movie.imdbRating}`}</p>
//       </>
//     );
//   }
// }

export default DetailsPage;
