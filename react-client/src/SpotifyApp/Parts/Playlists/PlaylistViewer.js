import { useEffect, useState } from "react";
import { getAllMyPlaylists, addSongsToPlaylist } from "../../../utils/apiCalls";
import { PlaylistCard } from "./PlaylistCard"
import './PlaylistViewer.css';
import { getOwnerType } from "./PlaylistCard";

function PlaylistViewer(props) {
    const [playlistData, setPlaylistData] = useState(null);
    const [canAdd, setCanAdd] = useState(false);
    const [focus, setFocus] = useState(null); //ID of playlist being focused
    const [selectedPlaylistIds, setNever] = useState([]);
    const [showSpotify, setShowSpotify] = useState(false);
    const [showMine, setShowMine] = useState(false);
    const [showOther, setShowOther] = useState(false);

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
        if (playlistID) {
            setFocus(playlistID);
        }
    }

    const getOnCheckboxFunc = (checkboxKey) => {
        return (val) => {
            const isChecked = val.target.checked;
            switch(checkboxKey){
                case 'spotify':
                    setShowSpotify(isChecked);
                    break;
                case 'me':
                    setShowMine(isChecked);
                    break;
                case 'other':
                    setShowOther(isChecked);
                    break;
            }
        }
    }



    let playlistList = playlistData ? playlistData.playlists : [];
    let filteredPlaylist = [];
    if(showOther | showMine | showSpotify){
        const userId = props.userData.userId;
        for(let i = 0; i < playlistList.length; i++){
            let owner = getOwnerType(playlistList[i].ownerId, userId);
            if(owner === 'spotify' && showSpotify){
                filteredPlaylist.push(playlistList[i]);
            }
            if(owner === 'other' && showOther){
                filteredPlaylist.push(playlistList[i]);
            }
            if(owner === 'me' && showMine){
                filteredPlaylist.push(playlistList[i]);
            }
        }
    }else{
        filteredPlaylist = playlistList;
    }

    console.log('Final Length: ' + filteredPlaylist.length);

    return (
        <div className="column grid-col1">
            <div className="sub-header">
                Select:
                <label>
                    <input type="checkbox" onChange={getOnCheckboxFunc("me")} />
                    Mine
                </label>
                <label>
                    <input type="checkbox" onChange={getOnCheckboxFunc("spotify")} />
                    Spotify
                </label>
                <label>
                    <input type="checkbox" onChange={getOnCheckboxFunc("other")} />
                    Other
                </label>
            </div>
            <div className="scrollbox">
                {
                    filteredPlaylist.map(playlist => <PlaylistCard userData={props.userData}
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
