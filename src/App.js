import './App.css';

// import { createClient } from '@supabase/supabase-js'
import {Route, BrowserRouter as Router, Routes, Navigate} from "react-router-dom";
import LoginPage from "./pages/Login";
import IndexPage from "./pages/IndexPage";
import CreateGamePage from "./pages/CreateGamePage";
import JoinGamePage from "./pages/JoinGamePage";
import GamePage from "./pages/GamePage";

// Create a single supabase client for interacting with your database
// const supabase = createClient('https://iheesrzbuoyqqozhfxjp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloZWVzcnpidW95cXFvemhmeGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQxMTcyNjUsImV4cCI6MTk2OTY5MzI2NX0.cuBZi_a6g-bNcVizyjnRe7pFWkao3XHp6UU-TVp-QZA')

function App() {
  return <Router>
    <Routes>
      <Route exact path="/" element={<IndexPage />} />
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/create" element={<CreateGamePage />} />
      <Route exact path="/join" element={<JoinGamePage />} />
      <Route exact path="/play/:lobby" element={<GamePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>;
}

export default App;
