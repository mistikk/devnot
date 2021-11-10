const Logo = ({
  logo = "/static/media/logo.6ce24c58.svg",
  fileName = "test",
}) => {
  console.log("logo render calisti");
  return (
    <div>
      <p>
        Edit <code>src/App.js</code> and save to reload. {fileName}
      </p>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
};

export default Logo;
