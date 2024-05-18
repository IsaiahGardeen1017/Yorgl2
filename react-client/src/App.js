import './App.css';
import Main from './mainPage/main';
import Callback from './login/callback';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                This is the app div
                <Routes>
                    <Route path='/' element={<Main/>}/>
                    <Route path='/callback' element={<Callback/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
