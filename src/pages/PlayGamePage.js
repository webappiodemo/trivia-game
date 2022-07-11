import React, {useEffect, useState} from "react";
import {useProtocol} from "../proto";
import {useNavigate, useParams} from "react-router-dom";

export default function PlayGamePage() {
    const {lobbyCode} = useParams();
    const {send, code, state, hostPlayerId, playerId} = useProtocol();
    const navigate = useNavigate();

    useEffect(() => {
        if(lobbyCode !== code) {
            navigate("/join")
        }
    }, [code, lobbyCode])

    if(state === "NEW") {
        if (hostPlayerId && hostPlayerId === playerId) {
            return <div className="flex flex-col p-8 items-center content-center">
                <h1 className="text-center">You are the host of this game</h1>
                <button
                    className="rounded-lg border border-purple-700 bg-purple-500 text-white py-4 px-8"
                    type="button"
                    onClick={() => {
                        send({type: "start"})
                    }}
                >
                    Start game
                </button>
            </div>
        }

        return <div className="flex flex-col p-8">
            <h1 className="text-center">Waiting for host to start game.</h1>
        </div>
    }
}