import { useEffect } from 'react';
import '../App.css';
import { useSearchParams } from 'react-router-dom';

function Callback() {

    const [queryParameters] = useSearchParams();
    const code = queryParameters.get('code');

    useEffect(() => {
        console.log('Using Effecting Callback');
        let data = callGenToken(code);
    }, []);
    

    return (
        <div className="Callback">
            <header className="App-header">
                <p>
                    Call Page
                </p>
                code is { code }
            </header>
        </div>
    );
}

async function callGenToken(code){
    const urlQs = '?code=' + code;
    fetch('/api/auth/gentoken' + urlQs).then((response) => {
        console.log('res');
        console.log(response);
        return response.json()
    }).then((data) => {
        if(data.token && data.expires && data.refresh_token){
            sessionStorage.setItem('authToken', data.token);
        }
    });
}

export default Callback;
