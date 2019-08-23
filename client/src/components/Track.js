import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class Track extends Component {
  handleAdd = async () => {
    await this.props.addTrackToPlaylist(
      this.props.track,
      this.props.playlists.current._id
    );
  };

  handleDelete = async () => {
    await this.props.pauseTrack({}, 100);
    if (this.props.globalPlayer.currentTrack.youtubeUri) {
      window.youtubePlayer.pauseVideo();

    }
    await this.props.removeTrackFromPlaylist(
      this.props.track,
      this.props.playlists.current._id
    );

      // Play the next song.
  
      const { currentTrack } = this.props.globalPlayer;
      const { tracks } = this.props.playlists.current;
      if (tracks !== undefined) {
        const nextSong = tracks[currentTrack.index];
        if (nextSong !== undefined) {
          await this.props.playTrack(nextSong, currentTrack.index, 0);
        }
      }
  };

  handlePlay = async () => {
    const { order, track, playlists } = this.props;
    const { playing, currentTrack } = this.props.globalPlayer;
    
      if (!playing) {
        // If paused, play the clicked track.
        await this.props.playTrack(track, order - 1, 0);
      } else if (playing && currentTrack.id === track._id) {
        // If playing and the currently playing song is clicked, then pause the song.
        await this.props.pauseTrack(track, currentTrack.position);
      } else {
        //  Otherwise, just play the clicked track.
        await this.props.playTrack(track, order - 1, 0);
      }

  };
  msToMin = ms => {
    var min = ms / 1000 / 60;
    var r = min % 1;
    var sec = Math.floor(r * 60);
    if (sec < 10) {
      sec = "0" + sec;
    }
    min = Math.floor(min);
    return min + ":" + sec;
  };

  render() {
   
    let { searching, globalPlayer, track, order } = this.props;
    let { artistNames, source, artists } = track;
    let youtubeThumbnailImage = (source === "youtube" ? <img className="youtube-thumbnail" src={track.thumbnail} alt={`thumbnail-${order}`} /> : null)
    let searchingClass = searching ? "" : "hidden";
    let deleteButtonClass = searching ? "hidden" : "trash-icon";
    let orderClass = searching ? "hidden" : "playlist__data";
    let trackDuration = (source === "spotify") ? this.msToMin(this.props.track.duration): "";
    
    let currentTrackPlayingClass;

    if (!searching)
      if (globalPlayer.playing) {
        // If globalPlayer is playing...
        currentTrackPlayingClass =
          this.props.track._id === globalPlayer.currentTrack.id
            ? "fas fa-pause"
            : "fas fa-play";
      } else {
        // If globalPlayer is NOT playing...
        currentTrackPlayingClass = "fas fa-play";
      }

    let artistName = "";

    // If artistsNames (we're looking at the playlists of tracks)
    if (artistNames) {
      artists = artistNames
      artistNames.forEach((artist, index) => {
        index !== artistNames.length - 1
          ? (artistName += artist + ", ")
          : (artistName += artist);
      });
      // If artists, we're looking at the search results of tracks.
    } else if (artists && artists.length) {
      artists.forEach((artist, index) => {
        (index !== artists.length - 1) ?
        (artistName += artist.name + ", ")
        : (artistName += artist.name);
        
      })
    }

    return (
      <div className="playlist__trackrow">
        
        <div className="playlist__trackrow--white">
        <span className={orderClass}>{this.props.order}.</span>
          <button className={searchingClass} onClick={this.handleAdd}>
            <i className="fas fa-plus fa-lg" />
          </button>

          
          <button className="" onClick={this.handlePlay}>
            <i className={currentTrackPlayingClass} />
          </button>
          <span className="playlist__data">{this.props.track.trackName}</span>
          <button className={deleteButtonClass} onClick={this.handleDelete}>
            <i className="fa fa-trash" aria-hidden="true" />
          </button>
        </div>
        <div className="playlist__trackrow--grey">
          <span className="playlist__data">{artistName}</span>
          <span className="playlist__data playlist__data--duration">
            {trackDuration}
          </span>
          {youtubeThumbnailImage}
          <span className="playlist__data">
            <i className={`fab fa-${source}`} />
          </span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    playlists: state.playlists,
    spotifyState: state.spotifyState,
    globalPlayer: state.globalPlayer,
    search: state.search
  };
}

export default connect(
  mapStateToProps,
  actions
)(Track);
