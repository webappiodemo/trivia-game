import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import supabase from "../supabase";

export default function GamePage() {
    const params = useParams();

    const [error, setError] = useState("");

    const [game, setGame] = useState(null);
    const updateGame = useCallback(async () => {
        const {data, error} = await supabase.from('game').select("*").eq("uuid", params.uuid);
        if(error) {
            setError(error.message);
            return;
        }
        setGame(data[0]);
    }, [params.uuid])

    const [sub] = useState(supabase.from('game').on('*', updateGame).subscribe());
    useEffect(() => {
        updateGame();
        return () => {
            supabase.removeSubscription(sub);
        }
    }, [sub, updateGame])

    const weAreOwner = game?.owner_uuid === supabase.auth.user().id;

    return <div className="flex flex-col">
        {error ? <div className="text-center">{error}</div> : null}
        Game UUID: {game?.uuid}
        We are owner? {""+weAreOwner}
    </div>
}