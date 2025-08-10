import Container from "./container/Container";
import { LocalProvider } from './context/LocalContext';
import './assets/style.css'
import { AdminProvider } from "./context/AdminContext";
import { BlogProvider } from "./context/BlogContext";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <div className="App">
      <LocalProvider >
        <AdminProvider >
          <BlogProvider >
        <HelmetProvider>
      <Container />
      </HelmetProvider>
      </BlogProvider>
      </AdminProvider>
      </LocalProvider>
    </div>
  );
}

export default App;
