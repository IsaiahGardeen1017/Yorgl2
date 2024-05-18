import '../App.css';
import Login from '../login/login';

function Main() {
    let yarg = 'GAY'
  return (
    <div className="Main">
      <header className="App-header">
        <p>
          Ooh Wah Ooh, { yarg } dis da main
        </p>
        <Login/>
      </header>
    </div>
  );
}

export default Main;
