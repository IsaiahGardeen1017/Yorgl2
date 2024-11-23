import { useEffect, useState, useContext } from "react";
import FocusContext from '../../Skeleton';
import { getFocusPlaylistData } from "../../../utils/apiCalls";
import { getImageSrcFromImages } from "../../../utils/utilFuncs"
import './PlaylistViewer.css';

function FocusPlViewer(props) {

    const [playlistData, setPlaylistData] = useState(null);
    const [localFocus, setLocalFocus] = useState(null);


    const getPlaylistData = async (focus) => {
        let data = await getFocusPlaylistData(focus);
        if (data) {
            setPlaylistData(data);
        }
    }

    console.log('rendering');
    const focus = props.focus;

    if (localFocus !== focus) {
        console.log('SWITCED');
        setLocalFocus(focus);
        if (focus) {
            getPlaylistData(focus);
        }
    }

    const playlistName = playlistData?.playlist?.name;
    const playlistOwnerName = playlistData?.playlist?.ownerName;
    const imageSource = playlistData ? getImageSrcFromImages(playlistData.playlist?.images, 300) : undefined;
    const tracks = playlistData?.tracks ? playlistData.tracks : [];

    return (
        <div className="column grid-col2">
            <div className="sub-header focusHeader">
                <img src={imageSource} alt={playlistName} className={"focusPlaylistImage"} />
                <div>
                    {playlistName}
                </div>
                <div>
                    {playlistOwnerName}
                </div>
            </div>
            <div className="scrollbox">
                {
                    tracks.map(track => <div>
                        {track.name}
                    </div>)
                }
            </div>
        </div>
    )
}


export default FocusPlViewer;
