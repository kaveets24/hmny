import React from "react";

const Welcome = () => {
let mobileMessageClass = (/Mobi/.test(navigator.userAgent)) ? "" : "hidden";
  
  return (
    <div className="main__message">
      <span className="main__welcome">
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
      <div className={mobileMessageClass} style={{marginTop: "50px", fontSize: "12px"}}>
      Oops... due to the lack of mobile browser support for the <a style = {{ color: "white", fontWeight: "bold"}} href="https://developer.spotify.com/documentation/web-playback-sdk/#supported-browsers">Spotify Web Playback SDK</a>, audio playback is only supported on Desktop.
      </div>
    </div>
  );
};
export default Welcome;
