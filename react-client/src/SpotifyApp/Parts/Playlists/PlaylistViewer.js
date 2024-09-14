import { useEffect, useState } from "react";
import { getAllMyPlaylists } from "../../../utils/apiCalls";
import { PlaylistCard } from "./PlaylistCard"

function PlaylistViewer(props) {
    const [playlistData, setPlaylistData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            let data = await getAllMyPlaylists();
            setPlaylistData(data);
        };
        getData();
    }, []);


    let playlistList = playlistData ? playlistData.playlists : [];
    let stringed = JSON.stringify(playlistData);
    return (
        <div className="playlist-viewer">
            {
                playlistList.map(playlist => <PlaylistCard userData={props.userData} data={playlist}></PlaylistCard>)
            }
        </div>
    )
}


export default PlaylistViewer;
