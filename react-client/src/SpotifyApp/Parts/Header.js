import { useEffect, useState } from "react";
import { getUserInfo } from "../../utils/apiCalls";

function Header(props) {

    let userDisplay = "";
    if(props.userData){
        userDisplay = props.userData?.userName;
    }

    return (
        <div>
            Welcome {userDisplay}
        </div>
    )
}

export default Header;
