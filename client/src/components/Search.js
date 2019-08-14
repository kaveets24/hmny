import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Track from "./Track";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      source: "spotify",
      overlay: false
    };
  }

  handleRadioClick = e => {
    this.setState({ source: e.target.value, inputText: "" });
    this.props.searchTracks({inputText: "", source: e.target.value});
  };
  handleChange = e => {
    this.setState({
      inputText: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    let timeout = null;
    clearTimeout(timeout);
    if (this.state.source !== "youtube") {
      timeout = setTimeout(async () => {
        // make a request to fetch search query (results limited to 10-15)
        await this.props.searchTracks(this.state);
      }, 600);
    } else {
      timeout = setTimeout(async () => {
        // make a request to fetch search query (results limited to 10-15)
        await this.props.searchTracks(this.state);
      }, 2000);

    }

  };

  showOverlay = () => {
    this.setState({ overlay: true });
  };
  hideOverlay = () => {
    this.setState({ overlay: false });
  };

  showSearchResults = () => {
    if (
      this.props.search.results !== undefined &&
      this.props.search.results.length
    ) {
      const { results } = this.props.search;

      switch (this.state.source) {
        case "spotify":
          return results.map((result, index) => {
            const { name, artists, duration_ms, uri } = result;
            let order = index + 1;
            let track = {
              trackName: name,
              artists,
              duration: duration_ms,
              spotifyUri: uri,
              source: this.state.source
            };
            return (
              <Track track={track} artists={artists} searching={true} key={order} order={order} />
            );
          });

        case "youtube":
            return results.map((result, index) => {
              const { title, id, thumbnails } = result;
              let decodedTitle = decodeURI(title);
              let order = index + 1;
              let track = {
                trackName: decodedTitle,
                artists: [],
                duration: null,
                youtubeUri: id,
                source: this.state.source,
                thumbnail: thumbnails ? thumbnails.default.url : ""
              };
              return (
                <Track track={track} searching={true} key={order} order={order} />
              );
            });
          

        default:
          break;
      }
    } else {
      return <div>Start typing above to add new tracks to your playlist!</div>;
    }
  };

  render() {
    let overlayClassName = this.state.overlay
      ? `search__results`
      : `search__results search__results--hidden`;
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            onClick={this.showOverlay}
            onKeyUp={this.handleSubmit}
            value={this.state.inputText}
            type="text"
            placeholder="Search for more tracks..."
          />
          <fieldset>
            <div className="search__radio-fields">
              <input
                onClick={this.handleRadioClick}
                defaultChecked
                type="radio"
                value="spotify"
                id="spotify"
                name="music-service"
              />
              <label htmlFor="spotify">Spotify</label>
              <input
                onClick={this.handleRadioClick}
                type="radio"
                value="youtube"
                id="youtube"
                name="music-service"
              />
              <label htmlFor="youtube">Youtube</label>
              {/* SoundCloud Radio Button */}
              {/* <input
                onClick={this.handleRadioClick}
                type="radio"
                value="soundcloud"
                id="soundcloud"
                name="music-service"
              />
              <label htmlFor="soundcloud">Soundcloud</label> */}
            </div>
          </fieldset>
        </form>
        <div className={overlayClassName}>
          <div onClick={this.hideOverlay} className="search__results-button">
            <i className="fa fa-window-close" />
          </div>
          <div className="search__results-tracks">
            {this.showSearchResults()}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    search: state.search
  };
}

export default connect(
  mapStateToProps,
  actions
)(Search);
