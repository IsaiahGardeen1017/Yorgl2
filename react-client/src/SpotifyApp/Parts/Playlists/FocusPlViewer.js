import { useEffect, useState, useContext } from "react";
import FocusContext from '../../Skeleton';
import { getFocusPlaylistData } from "../../../utils/apiCalls";

function FocusPlViewer(props) {

    const [playlistData, setPlaylistData] = useState(null);
    const [localFocus, setLocalFocus] = useState(null);


    const getPlaylistData = async (focus) => {
        let data = await getFocusPlaylistData(focus);
        if(data){
            setPlaylistData(data);
        }
    }
    
    console.log('rendering');
    const focus = props.focus;
    
    if(localFocus !== focus){
        console.log('SWITCED');
        setLocalFocus(focus);
        if(focus){
            getPlaylistData(focus);
        }
    }


    return (
        <div className="column grid-col2">
            Some stuff here: {focus}
            <div>
                {JSON.stringify(playlistData)}
            </div>
        </div>
    )
}


export default FocusPlViewer;
