import Player from './Parts/Player/Player';
import PlaylistViewer from './Parts/Playlists/PlaylistViewer';
import Header from './Parts/Header';
import { useEffect, useState } from "react";
import { getUserInfo } from '../utils/apiCalls';

function Skeleton() {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        getUserInfo((data) => {
            setUserData(data);
        });
    }, []);


    return (
        <div className="main-grid">
            <header className="grid-header">
                <Header userData={userData} />
            </header>

            <PlaylistViewer userData={userData} />
            <div className="column grid-col2">
                Some stuff
            </div>
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
