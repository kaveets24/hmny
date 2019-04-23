import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from "../actions";


class Playlists extends Component {

    renderContent() {
        let playlists = [];
        console.log("HERE's this.props.auth", this.props.auth);
        switch(this.props.auth) {
            case null:
                return <div>You haven't created any playlists yet.</div>

            default:
                for (let p of this.props.auth.playlists) {
                    playlists.push(p);
                }
                break;
        }
        const allPlaylists = playlists.map((playlist) => {

            let playlistName = playlist.playlistName; //should be equal to props.auth.playlists.playlistName
            return (
                <Link to={`/${playlistName}`.replace(' ','_')}>
                    <div key={playlistName} className="main__item">{playlistName}</div>
                </Link>
            )
        })

        return allPlaylists;
    

    }

    componentDidMount() {
        this.props.fetchPlaylists();
    }

    render() {
        return (
                <div className="main__grid">{this.renderContent()}</div>

        )
    }



}
function mapStateToProps({ auth }) {
    return { auth };

}
export default connect(mapStateToProps, actions)(Playlists);
