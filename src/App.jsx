import Container from "./container/Container";
import { LocalProvider } from './context/LocalContext';
import './assets/style.css'

function App() {
  return (
    <div className="App">
      <LocalProvider >
      <Container />
      </LocalProvider>
    </div>
  );
}

export default App;
