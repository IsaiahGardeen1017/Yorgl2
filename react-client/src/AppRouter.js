import Callback from './login/callback';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Root from './SpotifyApp/Root';
import './App.css';

function AppRouter() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/' element={<Root/>}/>
                    <Route path='/callback' element={<Callback/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default AppRouter;
