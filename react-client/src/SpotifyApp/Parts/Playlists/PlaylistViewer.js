import { useEffect, useState } from "react";
import { getAllMyPlaylists, addSongsToPlaylist } from "../../../utils/apiCalls";
import { PlaylistCard } from "./PlaylistCard"
import './PlaylistViewer.css';

function PlaylistViewer(props) {
    const [playlistData, setPlaylistData] = useState(null);
    const [canAdd, setCanAdd] = useState(false);
    const [focus, setFocus] = useState(null); //ID of playlist being focused
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

    const onAdd = async (playlistID) => {
        await addSongsToPlaylist(selectedPlaylistIds, playlistID)
    }

    const onFocus = async (playlistID) => {
        if(playlistID){
            setFocus(playlistID);
        } 
    }


    let playlistList = playlistData ? playlistData.playlists : [];
    return (
        <div>
            <div class="filter-header">Show: </div>
            <div class="scroller-col">

            {
                playlistList.map(playlist => <PlaylistCard userData={props.userData}
                    data={playlist}
                    updateSelectedStatus={updateSelectedStatus}
                    onAdd={onAdd}
                    onFocus={onFocus}
                    canAdd={canAdd}
                    focus={playlist.id === focus ? true : false}></PlaylistCard>)
                }
                </div>
        </div>
    )
}


export default PlaylistViewer;
