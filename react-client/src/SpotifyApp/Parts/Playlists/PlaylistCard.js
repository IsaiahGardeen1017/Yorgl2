import { useEffect, useState } from "react";
import { getAllMyPlaylists } from "../../../utils/apiCalls";
import './PlaylistCard.css';
import { getImageSrcFromImages } from "../../../utils/utilFuncs";


function getOwnerType(id, currentUserID) {
    if (id === 'spotify') {
        return 'spotify';
    } else if (id === currentUserID) {
        return 'me';
    } else {
        return 'other'
    }
}

export function PlaylistCard(props) {

    const [selected, setSelected] = useState(false);

    const data = props.data;
    const userData = props.userData;
    const updateSelectedStatus = props.updateSelectedStatus;
    const canAdd = props.canAdd;
    const onAddFunction = () => {
        props.onAdd(data.id);
    }

    const onChecked = () => {
        updateSelectedStatus(data.id, !selected);
        setSelected(!selected);
    }



    const ownerType = getOwnerType(data.ownerId, userData.userId);
    const rmBtnText = ownerType === 'me' ? 'Delete' : 'Unfollow';
    const ownerClass = ownerType + '-style';
    const imageSource = getImageSrcFromImages(data.images, 65);


    return (
        <div className={'plCard ' + ownerClass}>
            <div className="plCard-col">
                <img src={imageSource} className="playlistImage" />
            </div>
            <div className="plCard-col">
                {data.name}|{data.id}: {data.length}
                <br />
                {data.ownerName}
            </div>
            <div className="plCard-col">
                <button disabled={true}>{rmBtnText}</button>
                <button disabled={!canAdd} onClick={onAddFunction}>Add</button>
            </div>
            <div className="plCard-col">
            <label>
                    <input type="checkbox" checked={selected} onChange={onChecked}/>
                    Select
                </label>

            </div>


        </div>
    )
}