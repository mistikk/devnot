const Title = ({ title = "" }) => {
  return (
    <h1 style={{ color: "red", backgroundColor: "yellow", fontSize: "50px" }}>
      {title}
    </h1>
  );
};

export default Title;
