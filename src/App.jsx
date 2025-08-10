import Container from "./container/Container";
import { LocalProvider } from './context/LocalContext';
import './assets/style.css'
import { AdminProvider } from "./context/AdminContext";
import { BlogProvider } from "./context/BlogContext";

function App() {
  return (
    <div className="App">
      <LocalProvider >
        <AdminProvider >
          <BlogProvider >
      <Container />
      </BlogProvider>
      </AdminProvider>
      </LocalProvider>
    </div>
  );
}

export default App;
