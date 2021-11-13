import "./image.css";

const Image = ({ poster }) => {
  return (
    <img
      className="image"
      alt=""
      src={poster === "N/A" ? "https://via.placeholder.com/300x400" : poster}
    />
  );
};

export default Image;
