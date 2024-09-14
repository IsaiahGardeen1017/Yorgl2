import { useEffect, useRef } from 'react';

import { useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Callback() {
    const [queryParameters] = useSearchParams();
    const code = queryParameters.get('code');

    const navigate = useNavigate();
    useEffect(() => {
        let success = getAndLoadToken(code);
        if(success){
            navigate("/");
        }
    }, []);



    return (
        <div className="Callback">
            <header className="App-header">
                <p>
                    Callback Page
                </p>
                code is {code}
            </header>
        </div>
    );
}

async function getAndLoadToken(code) {
    let urlQs = '?code=' + code + '&state=' + 'stateCode';

    const response = await fetch('/auth/gentoken' + urlQs);

    if (response.status !== 200) {
        return false;
    }
    const data = await response.json();

    if (data && data.token && data.expires && data.refresh) {
        sessionStorage.setItem("auth-token", data.token);
        const expirationTimestamp = Date.now() + (data.expires * 1000);
        sessionStorage.setItem("auth-token-exp", expirationTimestamp);
        return data.token
    }
    return false;
}

export default Callback;
