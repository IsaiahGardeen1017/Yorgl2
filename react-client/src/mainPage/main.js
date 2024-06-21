import '../App.css';
import Login from '../login/login';
import MainLayout from '../mainPage/mainLayout';

function Main() {
    let loggedIn = false;
    if (!loggedIn) {
        return <Login />
    } else {
        return <MainLayout />
    }
}

export default Main;
