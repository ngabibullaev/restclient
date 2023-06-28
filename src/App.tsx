import { Link } from 'react-router-dom';
import './Styles/App.css'

function App() {
  return (
    <div className='app-root'>
      <main className="app-text-container">
        <svg className="app-text-stroke" viewBox="0 0 440 100" width="80%" height="100%">
          <text className="app-text" x="20" y="75">KATANA</text>
        </svg>
      </main>
      <Link className='app-Linkreset' to="/home"><button className="app-reset">Дальше ➤</button></Link>
      <h2 className='text-center text-secondary'>Мы работаем с 10:00 до 00:00</h2>
    </div>
  );
}

export default App;
