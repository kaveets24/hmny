import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Track from "./Track";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      overlay: false,
      searching: false
 
    };
  }


  handleChange = e => {
    this.setState({
      inputText: e.target.value
    });
  };

   handleSubmit = async (e) => {
    e.preventDefault();
    // make a request to fetch search query (results limited to 20)
    await this.props.searchTracks(this.state.inputText);
    this.setState({searching: true});
    console.log(this.state);

  };

  showOverlay = () => {
    this.setState({overlay: true})
  }
  hideOverlay = () => {
    this.setState({overlay: false})
  }

  showSearchResults = () => {
    
    console.log("SEARCH RESULTS", this.props.tracks.searchResults )
    if (this.props.tracks.searchResults !== undefined && this.props.tracks.searchResults.length > 0) {
      const { searchResults } = this.props.tracks;

      return searchResults.map(result => {
        const { name, artists, images, duration_ms } = result;
        let order = searchResults.indexOf(result) + 1
        let track = {
          trackName: name,
          artists,
          duration: duration_ms
        }
         return (
           
           <Track track={track} key={order} order={order}/>
          // <div key={`${name}-${artists[0]}`}>
          // {}
          //   {/* {images ? <div>{images[0]}</div> : "no artwork" } */}
          //   <div>{name}</div>
          //   {artists.map(artist => <div key={artist.name}>{artist.name}</div>)}
          // </div>
        )
      })
 
    } else {
      return <div>Start typing above to add new tracks to your playlist!</div>
    }

  };


  render() {
    let overlayClassName = this.state.overlay ? `search__results`: `search__results search__results--hidden`;
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            onClick={this.showOverlay}
            value={this.state.inputText}
            type="text"
            placeholder="Search for more tracks..."
          />
          <fieldset>
            <div className="search__radio-fields">
              <input type="radio" value="spotify" id="spotify" name="music-service" />
              <label htmlFor="spotify">Spotify</label>
              <input type="radio" value="youtube" id="youtube" name="music-service" />
              <label htmlFor="youtube">Youtube</label>
              <input type="radio" value="soundcloud" id="soundcloud" name="music-service" />
              <label htmlFor="soundcloud">Soundcloud</label>
            </div>
          </fieldset>
        </form>
        <div className={overlayClassName}>
          <div onClick={this.hideOverlay} className="search__results-button">
            <i className="fa fa-window-close"></i>
          </div>
          {this.showSearchResults()}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    tracks: state.tracks
  };
}

export default connect(
  mapStateToProps,
  actions
)(Search);

