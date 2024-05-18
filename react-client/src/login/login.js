import '../App.css';

function Login() {

    const authLink = 'https://accounts.spotify.com/authorize';
    const clientId = '58be630dba4c4c788643b5c8f7321a88';
    const scopes = [
        'user-read-private',
        'user-read-playback-state',
        'user-modify-playback-state',
        'playlist-read-private'
    ];
    const redirect = 'http://localhost:1080/callback';



    const fullAuthUrl = `${authLink}?client_id=${clientId}&scope=${scopes.join('%20')}&redirect_uri=${redirect}&response_type=code`

    return (
        <div className="Login">
            <header className="App-header">
                <p>
                    This is where we Login
                </p>

                <a href={fullAuthUrl}>login</a>
            </header>
        </div>
    );
}

export default Login;
