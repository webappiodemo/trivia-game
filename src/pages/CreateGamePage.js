import React, {useCallback, useEffect, useState} from "react";
import {useProtocol} from "../proto";
import {Link} from "react-router-dom";

export default function CreateGamePage({gameCode}) {
    const [error, setError] = useState("");
    const {send, players, state, hostPlayerId} = useProtocol();

    useEffect(() => {
        const interval = setInterval(() => {
            if (gameCode) {
                send({type: "create", lobbyCode: gameCode});
            }
        }, 500);
        return () => clearInterval(interval);
    }, []);

    if (!state || state === "NEW") {
        return <div className="flex flex-col p-8 items-center">
            <h1 className="text-center">Lobby code is: {gameCode}</h1>
            {error ? <p className="text-center">{error}</p> : null}
            <h3 className="text-center">Visit https://alcoholympics.net and click "join" on your phone.</h3>
            {players ? <div className="d-flex flex-col">
                <h3>Players:</h3>
                <ul>
                    {Object.values(players).map(({name}) => <li key={name}>{name}</li>)}
                </ul>
            </div> : null}
        </div>;
    } else if (state === "WAITING_QUESTION") {
        return <div className="flex flex-col p-8 items-center">
            <h1 className="text-center">Waiting for {hostPlayerId} to ask a question.</h1>
            <div className="d-flex flex-col">
                <h3>Players:</h3>
                {Object.values(players).map(({name, points}) => <div key={name}>{name} ({points} pts)</div>)}
            </div>
            <h5 className="text-center">Lobby code is: {gameCode}</h5>
        </div>
    }

}