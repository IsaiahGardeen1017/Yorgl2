import { useEffect, useState } from "react";
import { getAllMyPlaylists } from "../../../utils/apiCalls";
import { PlaylistCard } from "./PlaylistCard"

function PlaylistViewer(props) {
    const [playlistData, setPlaylistData] = useState(null);
    const [canAdd, setCanAdd] = useState(false);
    const [selectedPlaylistIds, setNever] = useState([]);

    useEffect(() => {
        const getData = async () => {
            let data = await getAllMyPlaylists();
            setPlaylistData(data);
        };
        getData();
    }, []);

    const updateSelectedStatus = (playlistID, isSelected) => {
        if (isSelected) {
            //Add id to list
            if (selectedPlaylistIds.length === 0) {
                //Re-render da Cards do enable add button
                selectedPlaylistIds.push(playlistID);
                setCanAdd(true);
            } else if (!selectedPlaylistIds.includes(playlistID)) {
                selectedPlaylistIds.push(playlistID);
            }
        } else {
            //Remove id to list
            let rmIndex = selectedPlaylistIds.indexOf(playlistID);
            selectedPlaylistIds.splice(rmIndex, 1);

            if (selectedPlaylistIds.length === 0) {
                setCanAdd(false);
            }
        }
        console.log(selectedPlaylistIds);
    }

    const onAdd = (playlistID) => {
        console.log(playlistID);
        console.log(selectedPlaylistIds);
    }


    let playlistList = playlistData ? playlistData.playlists : [];
    let stringed = JSON.stringify(playlistData);
    return (
        <div className="playlist-viewer">
            {
                playlistList.map(playlist => <PlaylistCard userData={props.userData}
                    data={playlist}
                    updateSelectedStatus={updateSelectedStatus}
                    onAdd={onAdd}
                    canAdd={canAdd}></PlaylistCard>)
            }
        </div>
    )
}


export default PlaylistViewer;
