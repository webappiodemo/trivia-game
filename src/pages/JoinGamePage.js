import React, {useState} from "react";
import supabase from "../supabase";
import {useNavigate} from "react-router-dom";

export default function JoinGamePage() {
    const [lobbyCode, setLobbyCode] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    return <div className="flex flex-col p-8">
        <h1 className="text-center">Join an existing game</h1>
        {error ? <p className="text-center">{error}</p> : null }

        <form onSubmit={e => {
            e.preventDefault();
            (async () => {
                const {data, error} = await supabase.from('game').select("*").eq("lobby_code", lobbyCode);
                if(error) {
                    setError(error);
                    return;
                }
                if(data.length === 0) {
                    setError("No games found with that ID.");
                    return;
                }
                const game = data[0];
                if(!game.owner_id) {
                    const {data, error} = await supabase.from('game').update({"owner_uuid": supabase.auth.user().id}).match({"uuid": game.uuid})
                    if(error) {
                        setError("Error making you the game owner: " + error);
                        return;
                    }
                    console.log(data);
                }
                navigate("/game/"+game.uuid);
            })();
        }} className="flex space-x-16 content-center">
            <input
                type="text"
                value={lobbyCode}
                onChange={e => setLobbyCode(e.target.value)}
                placeholder="abcde"
            />
            <button type="submit" disabled={lobbyCode.length !== 5}>Join game</button>
        </form>
    </div>
}