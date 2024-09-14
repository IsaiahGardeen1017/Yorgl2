import Player from './Parts/Player';
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
        <div className="main-container">
            <header className="header">
                <Header userData={userData}/>
            </header>
            <div className="middle-section">
                    <div id="col1" className="middle-col">
                        <PlaylistViewer userData={userData}/>
                    </div>
                    <div id="col2" className="middle-col">
                        Some stuff
                    </div>
                    <div id="col3" className="middle-col">
                        Even More Stuff
                    </div>
            </div>
            <footer className="footer">
                <Player />
            </footer>
        </div>
    )
}

export default Skeleton;
