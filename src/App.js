import './App.css';

// import { createClient } from '@supabase/supabase-js'
import {Route, BrowserRouter as Router, Routes, Navigate} from "react-router-dom";
import LoginPage from "./pages/Login";
import IndexPage from "./pages/IndexPage";
import CreateGamePage from "./pages/CreateGamePage";
import JoinGamePage from "./pages/JoinGamePage";
import GamePage from "./pages/GamePage";
import supabase from "./supabase";
import AuthModal from "./components/AuthModal";

function App() {
  return <Router>
    <Routes>
      <Route exact path="/" element={<IndexPage />} />
      <Route exact path="/create" element={<CreateGamePage />} />
      <Route path="*" element={<main>
        {!supabase.auth.user() ? <AuthModal /> : null}
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/join" element={<JoinGamePage />} />
          <Route exact path="/game/:uuid" element={<GamePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>}/>
    </Routes>
  </Router>;
}

export default App;
