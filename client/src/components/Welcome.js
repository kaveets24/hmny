import React from "react";

const Welcome = () => {
  return (
    <div className="main__message">
      <span className="main__welcome">
        Howdy!
        <br />
      </span>
      <span className="main__hmny">hmny </span>
      lets you build playlists using songs from your favorite platforms.
      <br />
      <div className="main__icons">
        <i className="fab fa-spotify" />
        <i className="fab fa-youtube" />
        <i className="fab fa-soundcloud" />
      </div>
    </div>
  );
};
export default Welcome;
