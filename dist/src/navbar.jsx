

export default function Navbar() {
    return (
      <nav className="navbar">
        <img
          style={{ height: "10vh" }}
          src="/logo.png"
          className="logo"
          alt="logo"
        />
        <div className="join-box">
          <p className="join-msg">unlimited tv shows & movies</p>
          <button
            id="join-in"
            onClick={() => alert("This is a frontend project ")}
            className="btn join-btn"
          >
            join now
          </button>
          <button
            id="login"
            onClick={() =>
              alert(
                "This project is created just to get familiar with TMDB Api fetching methods"
              )
            }
            className="btn"
          >
            sign in
          </button>
        </div>
      </nav>
    );
}