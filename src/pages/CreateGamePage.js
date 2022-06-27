import React, {useEffect, useState} from "react";

import supabase from "../supabase";

export default function CreateGamePage() {
    const [gameCode, setGameCode] = useState(Math.random().toString(36).slice(2, 7));

    useEffect(() => {
        (async () => {
            const {data, error} = await supabase.from('game').insert([
                {lobby_code: gameCode}
            ])
        })();
    }, [gameCode])

    return <div className="flex flex-col p-8">
        <h1 className="text-center">Lobby code is: {gameCode}</h1>
        <h3 className="text-center">Visit https://alcoholympics.net and click "join" on your phone.</h3>
    </div>
}