const MovieCard = ({ name = "", poster = "", description = "" }) => {
  return (
    <>
      <h1>{name}</h1>
      <img
        alt=""
        src={poster === "N/A" ? "https://via.placeholder.com/300x400" : poster}
      />
      <p>{description}</p>
    </>
  );
};

export default MovieCard;
