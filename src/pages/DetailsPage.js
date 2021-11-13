import React from "react";

class DetailsPage extends React.Component {
  constructor() {
    super();

    this.state = {
      movie: {},
    };
  }

  componentDidMount() {
    fetch("https://www.omdbapi.com/?i=tt1375666&apikey=f65e4b5e")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ movie: data });
      });
  }

  render() {
    const { movie } = this.state;
    return (
      <>
        <h1>{movie.Title}</h1>
        <p>{`Director : ${movie.Director}`}</p>
        <p>{`Description : ${movie.Plot}`}</p>
        <p>{`Rating : ${movie.imdbRating}`}</p>
      </>
    );
  }
}

export default DetailsPage;
