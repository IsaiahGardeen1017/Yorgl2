import Player from './Parts/Player';
import PlaylistViewer from './Parts/PlaylistViewer';

function Skeleton() {
    return (
        <div className="main-container">
            <header className="header">
                Welcome to Yorgly.com
            </header>
            <div className="middle-section">
                <div className="middle-container">
                    <div id="col1" className="middle-col">
                        <PlaylistViewer />
                    </div>
                    <div id="col2" className="middle-col">
                        Some stuff
                    </div>
                    <div id="col3" className="middle-col">
                        Even More Stuff
                    </div>
                </div>
            </div>
            <footer className="footer">
                <Player />
            </footer>
        </div>
    )
}

export default Skeleton;
