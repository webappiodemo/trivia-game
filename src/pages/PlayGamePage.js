import React, {useEffect, useState} from "react";
import {useProtocol} from "../proto";
import {useNavigate, useParams} from "react-router-dom";

export default function PlayGamePage() {
    const {lobbyCode} = useParams();
    const {send, code, state, hostPlayerId, playerId, currAnsweringPlayer} = useProtocol();
    const navigate = useNavigate();

    useEffect(() => {
        if(lobbyCode !== code) {
            navigate("/join")
        }
    }, [code, lobbyCode])

    const isHost = hostPlayerId && hostPlayerId === playerId
    if(state === "NEW") {
        if (isHost) {
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
            <h1 className="text-center">Waiting for {hostPlayerId} to start game.</h1>
        </div>
    } else if (state === "WAITING_QUESTION") {
        if (isHost) {
            return <div className="flex flex-col p-8 items-center content-center">
                <h1>Tell your question to your players</h1>
                <div className="flex space-x-16">
                    <button
                        className="rounded-lg border border-purple-700 bg-purple-500 text-white py-8 px-8"
                        type="button"
                        onClick={() => {
                            send({type: "done_asking"})
                        }}
                    >
                        I'm done asking
                    </button>
                    <button
                        className="rounded-lg border border-purple-700 bg-purple-500 text-white py-8 px-8"
                        type="button"
                        onClick={() => {
                            send({type: "skip_question"})
                        }}
                    >
                        Skip this question
                    </button>
                </div>
                <p>Once you click "I'm done asking", players will have the opportunity to answer the question. If none of them answer, click "Skip this question" and ask your next question.</p>
            </div>
        }
        return <div className="flex flex-col p-8 items-center content-center">
            <h1>{hostPlayerId} is asking a question...</h1>
            <button
                className="rounded-lg border border-purple-700 bg-purple-500 text-white py-8 px-8"
                type="button"
                onClick={() => {
                    send({type: "answer"})
                }}
            >
                Answer question
            </button>
            <p>You can only answer questions after the host is done asking.</p>
        </div>
    } else if (state === "PLAYER_ANSWERING") {
        if (isHost) {
            return <div className="flex flex-col p-8 items-center content-center">
                {currAnsweringPlayer ? <h1>{currAnsweringPlayer} is answering.</h1> : <h1>Tell your question to your players</h1>}
                <div className="flex space-x-16">
                    <button
                        className="rounded-lg border border-purple-700 bg-purple-500 text-white py-8 px-8"
                        type="button"
                        onClick={() => {
                            send({type: "incorrect"})
                        }}
                    >
                        Player answered incorrectly
                    </button>
                    <button
                        className="rounded-lg border border-purple-700 bg-purple-500 text-white py-8 px-8"
                        type="button"
                        onClick={() => {
                            send({type: "correct_100"})
                        }}
                    >
                        correct (+100)
                    </button>
                    <button
                        className="rounded-lg border border-purple-700 bg-purple-500 text-white py-8 px-8"
                        type="button"
                        onClick={() => {
                            send({type: "correct_200"})
                        }}
                    >
                        correct (+200)
                    </button>
                    <button
                        className="rounded-lg border border-purple-700 bg-purple-500 text-white py-8 px-8"
                        type="button"
                        onClick={() => {
                            send({type: "correct_300"})
                        }}
                    >
                        correct (+300)
                    </button>
                </div>
            </div>
        } else if (playerId === currAnsweringPlayer) {
            return <div className="flex flex-col p-8 items-center content-center">
                <h1>You are answering the question!</h1>
            </div>
        }
        return <div className="flex flex-col p-8 items-center content-center">
            <h1>{currAnsweringPlayer} is answering the question.</h1>
        </div>
    }
}