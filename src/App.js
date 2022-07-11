import './App.css';

import React, {useEffect, useState} from "react";
import {Route, BrowserRouter as Router, Routes, Navigate} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import CreateGamePage from "./pages/CreateGamePage";
import JoinGamePage from "./pages/JoinGamePage";
import {ProtoProvider} from "./proto";
import PlayGamePage from "./pages/PlayGamePage";

function App() {
    const [gameCode] = useState(Math.random().toString(36).slice(2, 7))

    return <ProtoProvider>
        <Router>
            <Routes>
                <Route exact path="/" element={<IndexPage/>}/>
                <Route exact path="/create" element={<CreateGamePage gameCode={gameCode}/>}/>
                <Route path="*" element={<main>
                    <Routes>
                        <Route exact path="/play/:lobbyCode" element={<PlayGamePage/>}/>
                        <Route exact path="/join" element={<JoinGamePage/>}/>
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                    </Routes>
                </main>}/>
            </Routes>
        </Router>
    </ProtoProvider>
}

export default App;
