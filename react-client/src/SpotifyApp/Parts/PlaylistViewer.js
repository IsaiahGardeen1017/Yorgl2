import { useEffect, useState } from "react";
import { getAllMyPlaylists } from "../../utils/apiCalls";


function PlaylistViewer() {

    const [playlistData, setPlaylistData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            let data = await getAllMyPlaylists();
            setPlaylistData(data);
        };
        getData();
    }, []);



    let stringed = JSON.stringify(playlistData);
    return (
        <div>
            Look at this here {stringed}
        </div>
    )
}


export default PlaylistViewer;
