import Login from '../login/login';
import Skeleton from './Skeleton';

function Root() {
    const token = sessionStorage.getItem("auth-token");
    const expiration = sessionStorage.getItem("auth-token-exp");

    if (token && expiration && expiration >= Date.now()) {
        return <Skeleton />
    } else {
        return <Login />
    }
}

export default Root;
