import Title from "./Title";
import Image from "./Image";

const MovieCard = ({ name = "", poster = "", year = "" }) => {
  return (
    <>
      <Title title={name} />
      <Image poster={poster} />
      <p style={{ color: "yellow" }}>{year}</p>
    </>
  );
};

export default MovieCard;
