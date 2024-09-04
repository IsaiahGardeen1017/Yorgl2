import { useEffect, useState } from "react";
import './Player.css';

function Player() {

    const [playerData, setPlayer] = useState(null);

    useEffect(() => {
        let auth_token = sessionStorage.getItem('auth-token');
        fetch('/api/nowPlaying', {
            headers: {
                authorization: auth_token
            },
            // .,.
        }).then((response) => response.json())
            .then((data) => {
                setPlayer(data);
            });
    }, []);




    let trackName, albumName, artistName, imageSource = '';

    console.log(playerData);
    if (playerData && playerData.track) {

        trackName = playerData.track?.name;
        albumName = playerData.track?.album.name;
        artistName = playerData.track?.artists[0].name;

        let possibleImages = playerData.track?.album.images;
        imageSource = possibleImages[0].url;
    }


    return (
        <div class="playerRoot">
            <div className="songInfo playerCol">
                <img src={imageSource} alt={albumName} class="albumImage" />
            </div>

            <div className="songInfo playerCol">
                <div class="trackName">
                    {trackName}
                </div>
                < br />
                <div class="albumName">
                    {albumName}
                </div>
                < br />
                <div class="artistName">
                    {artistName}
                </div>
            </div>
            <div className="buttons playerCol">
                skip pause play
            </div>
            < br />
        </div>
    )
}


export default Player;
