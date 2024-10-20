import { useEffect, useState } from "react";
import { getAllMyPlaylists } from "../../../utils/apiCalls";
import './PlaylistCard.css';
import { getImageSrcFromImages } from "../../../utils/utilFuncs";


export function getOwnerType(id, currentUserID) {
    if (id === 'spotify') {
        return 'spotify';
    } else if (id === currentUserID) {
        return 'me';
    } else {
        return 'other'
    }
}

export function PlaylistCard(props) {

    const data = props.data;
    const userData = props.userData;
    const updateSelectedStatus = props.updateSelectedStatus;
    const canAdd = props.canAdd;
    const focus = props.focus;
    const selected = props.selected;
    const onAddFunction = () => {
        console.log('on-add')
        props.onAdd(data.id);
    }

    const onCardFocused = () => {
        props.onFocus(data.id);
    }

    const onChecked = () => {
        updateSelectedStatus(data.id, !selected);
    }



    const ownerType = getOwnerType(data.ownerId, userData.userId);
    const rmBtnText = ownerType === 'me' ? 'Delete' : 'Unfollow';
    let ownerClassList = ownerType + '-style';
    if(focus){
        ownerClassList += ' focused';
    }
    const imageSource = getImageSrcFromImages(data.images, 65);


    return (
        <div className={'plCard ' + ownerClassList} onClick={onCardFocused}>
            <div className="plCard-col">
                <img src={imageSource} className="playlistImage" />
            </div>
            <div className="plCard-col">
                {data.name}: {data.length}
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