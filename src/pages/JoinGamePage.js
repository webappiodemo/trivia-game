import React, {useEffect, useState} from "react";
import {useProtocol} from "../proto";
import {useNavigate} from "react-router-dom";

export default function JoinGamePage() {
    const [lobbyCode, setLobbyCode] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [error, setError] = useState(null);
    const {send, code} = useProtocol();
    const navigate = useNavigate();

    useEffect(() => {
        if(code) {
            navigate("/play/"+code);
        }
    }, [code]);

    return <div className="flex flex-col p-8">
        <h1 className="text-center">Join an existing game</h1>
        {error ? <p className="text-center">{error}</p> : null }

        <form onSubmit={e => {
            e.preventDefault();
            send({type: "join", lobbyCode, playerName});
        }} className="flex flex-col space-y-8 content-center">
            <input
                type="text"
                value={lobbyCode}
                onChange={e => setLobbyCode(e.target.value.toLowerCase())}
                placeholder="Game code"
            />
            <input
                type="text"
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
                placeholder="Your Name"
            />

            <button type="submit" disabled={lobbyCode.length !== 5 || !playerName}>Join game</button>
        </form>
    </div>
}