import { useEffect, useState } from "react";
import { getNowPlaying } from "../../utils/apiCalls";
import './Player.css';

function Player() {

    const [playerData, setPlayer] = useState(null);

    useEffect(() => {
        const getPlayerDataFunc = async () => {
            let data = await getNowPlaying();
            setPlayer(data);
        }

        getPlayerDataFunc();
        const interval = setInterval(() => {
            getPlayerDataFunc();
        }, 10000);
        return () => clearInterval(interval);
    }, []);


    const shuffleOnChange = () => {
        console.log('clicked shuffle');
    }

    const repeatOnChange = () => {
        console.log('clicked repeat');
    }

    let trackName, albumName, artistName, imageSource = '';
    let playButtonText = 'Play/Pause';
    let shuffle = false;
    let repeatMode = playerData

    if (playerData && playerData.track) {

        trackName = playerData.track?.name;
        albumName = playerData.track?.album.name;
        artistName = playerData.track?.artists[0].name;

        let possibleImages = playerData.track?.album.images;
        imageSource = possibleImages[0].url;

        playButtonText = playerData.is_playing ? 'Pause' : 'Play';
        shuffle = playerData.shuffle;
        repeatMode = playerData.repeat;
    }

    console.log('repeatemode: ' + repeatMode)

    return (
        <div className="playerRoot">
            <div className="songInfo playerCol">
                <img src={imageSource} alt={albumName} className="albumImage" />
            </div>

            <div className="songInfo playerCol">
                <div className="trackName">
                    {trackName}
                </div>
                < br />
                <div className="albumName">
                    {albumName}
                </div>
                < br />
                <div className="artistName">
                    {artistName}
                </div>
            </div>
            <div className="buttons playerCol">
                <button type="button">&lt;&lt;</button>
                <button type="button">{playButtonText}</button>
                <button type="button">&gt;&gt;</button>
                <br />
                <br />
                <label>
                    <input type="checkbox" checked={shuffle ? 'checked' : ''} onChange={shuffleOnChange}/>
                    Shuffle
                </label>
                <br />
                <br />
                <label>
                    <input type="radio" value="off" name="repeat" checked={repeatMode==='off' ? 'checked' : ''} onChange={repeatOnChange}/> No Repeat
                </label>
                <br />
                <label>
                    <input type="radio" value="track" name="repeat" checked={repeatMode==='track' ? 'checked' : ''} onChange={repeatOnChange}/> Single Track
                </label>
                <br />
                <label>
                    <input type="radio" value="context" name="repeat" checked={repeatMode==='context' ? 'checked' : ''} onChange={repeatOnChange}/> Context
                </label>
            </div>
            < br />
        </div>
    )
}


export default Player;
