import Player from './Parts/Player/Player';
import PlaylistViewer from './Parts/Playlists/PlaylistViewer';
import FocusPlViewer from './Parts/Playlists/FocusPlViewer';
import Header from './Parts/Header';
import { useEffect, useState, createContext } from 'react';
import { getUserInfo } from '../utils/apiCalls';

function Skeleton() {

    const [userData, setUserData] = useState(null);
    const [focus, setFocus] = useState(null);

    useEffect(() => {
        getUserInfo((data) => {
            setUserData(data);
        });
    }, []);


    const setFocusPlaylist = (focusId) => {
        setFocus(focusId);
    }

    return (
        <div className="main-grid">
            <header className="grid-header">
                <Header userData={userData} />
            </header>

            <PlaylistViewer userData={userData} setFocus={setFocusPlaylist} focus={focus}/>
            <FocusPlViewer focus={focus}/>
            <div className="column grid-col3">
                Some stuff
            </div>
            <footer className="grid-footer">
                <Player />
            </footer>
        </div>
    )
}

export default Skeleton;
