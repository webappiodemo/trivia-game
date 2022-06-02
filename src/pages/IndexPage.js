import React from "react";
import {Link} from "react-router-dom";

export default function IndexPage() {
    return <div>
        <div>Index page!</div>
        <Link to="/create">Create game</Link>
        <Link to="/join">Join game</Link>
    </div>
}