import { useEffect, useState } from "react";
import { getNowPlaying, doPlayStateAction } from "../../utils/apiCalls";
import './Player.css';

function Player() {

    const [playerData, setPlayerData] = useState(null);
    const [playerOptionStates, setPlayerOptionState] = useState({
        repeat_track: false,
        repeat_off: false,
        repeat_context: false,
        shuffle: false,
        is_playing: false
    });

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

    function setPlayer(data) {
        let plyrOptsSt = {
            repeat_track: false,
            repeat_off: false,
            repeat_context: false,
            shuffle: data.shuffle ? data.shuffle : false,
            is_playing: data.is_playing ? data.is_playing : false
        };
        switch (data.repeat) {
            case 'track':
                plyrOptsSt['repeat_track'] = true;
                break;
            case 'context':
                plyrOptsSt['repeat_context'] = true;
                break;
            case 'off':
            default:
                plyrOptsSt['repeat_off'] = true;
                break;
        }
        setPlayerOptionState(plyrOptsSt);
        setPlayerData(data);
    }

    const sendPlaystate = async (action) => {
        let respData = await doPlayStateAction(action);
        if (respData) {
            setPlayer(respData);
        }
    }
    const getOnChangeFunc = (inputField, currentValue) => {
        switch (inputField) {
            case 'shuffle':
                return () => {
                    sendPlaystate(currentValue ? 'shuffle_off' : 'shuffle_on')
                    setPlayerOptionState({
                        ...playerOptionStates,
                        shuffle: !currentValue
                    });
                };
            case 'is_playing':
                return () => {
                    sendPlaystate(currentValue ? 'pause' : 'play')
                    setPlayerOptionState({
                        ...playerOptionStates,
                        is_playing: !currentValue
                    });
                };
            case 'previous':
            case 'skip':
                return () => sendPlaystate(inputField);
            case 'repeat_off':
            case 'repeat_context':
            case 'repeat_track':
                return () => {
                    sendPlaystate(inputField);
                    let newPlyOptSts = {
                        ...playerOptionStates,
                        repeat_track: false,
                        repeat_off: false,
                        repeat_context: false,
                    };
                    setPlayerOptionState({
                        ...newPlyOptSts,
                        [inputField]: true
                    })
                };
            default:
                return () => console.log('Not Implemented: ' + inputField);
        }
    }

    let trackName, albumName, artistName, imageSource = '';

    if (playerData && playerData.track) {

        trackName = playerData.track?.name;
        albumName = playerData.track?.album.name;
        artistName = playerData.track?.artists[0].name;

        let possibleImages = playerData.track?.album.images;
        possibleImages = possibleImages.sort((a, b) => {
            return a.width - b.width;
        }).filter((a) => {
            return a.width >= 300;
        });
        imageSource = possibleImages[0].url;
    }

    let shuffle = playerOptionStates.shuffle;

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
                <button type="button" onClick={getOnChangeFunc('previous')}>
                    &lt;&lt;
                </button>
                <button type="button" onClick={getOnChangeFunc('is_playing', playerOptionStates.is_playing)}>
                    {playerOptionStates.is_playing ? 'Pause' : 'Play'}
                </button>
                <button type="button" onClick={getOnChangeFunc('skip')}>
                    &gt;&gt;
                </button>
                <br />
                <br />
                <label>
                    <input type="checkbox" checked={shuffle} onChange={getOnChangeFunc('shuffle', shuffle)} />
                    Shuffle
                </label>
                <br />
                <br />
                <label>
                    <input type="radio" value="off" name="repeat"
                        checked={playerOptionStates.repeat_off}
                        onChange={getOnChangeFunc('repeat_off', playerOptionStates.repeat_off)} /> No Repeat
                </label>
                <br />
                <label>
                    <input type="radio" value="track" name="repeat"
                        checked={playerOptionStates.repeat_track}
                        onChange={getOnChangeFunc('repeat_track', playerOptionStates.repeat_track)} /> Single Track
                </label>
                <br />
                <label>
                    <input type="radio" value="context" name="repeat"
                        checked={playerOptionStates.repeat_context}
                        onChange={getOnChangeFunc('repeat_context', playerOptionStates.repeat_context)} /> Context
                </label>
            </div>
            < br />
        </div>
    )
}


export default Player;
