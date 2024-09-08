import Player from './Parts/Player';
import PlaylistViewer from './Parts/PlaylistViewer';

function Skeleton() {
    return (
        <div className="container">
            <div className="content">
                <PlaylistViewer />
            </div>
            <div className="footer">
                <Player />
            </div>
        </div>
    )
}

export default Skeleton;
