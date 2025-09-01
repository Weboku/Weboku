import Container from "./container/Container";
import { LocalProvider } from './context/LocalContext';
import './assets/style.css';
import { AdminProvider } from "./context/AdminContext";
import { BlogProvider } from "./context/BlogContext";
import { HelmetProvider } from "react-helmet-async";
import { MessageProvider } from "./context/MessageContext";
import { TeamContext } from "./context/TeamContext";  
import { teamData } from "./data/teamData";

console.log("teamData is array?", Array.isArray(teamData), teamData);

function App() {
  return (
    <div className="App">
      <LocalProvider>
        <AdminProvider>
          <TeamContext initial={teamData}>        
            <MessageProvider>
              <BlogProvider>
                <HelmetProvider>
                  <Container />
                </HelmetProvider>
              </BlogProvider>
            </MessageProvider>
          </TeamContext>
        </AdminProvider>
      </LocalProvider>
    </div>
  );
}

export default App;
