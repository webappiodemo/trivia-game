import React from "react";
import {Link} from "react-router-dom";

export default function IndexPage() {
    return <div className="container flex flex-col space-y-16 text-dark items-center content-center">
        <h1 className="text-lg font-bold text-center">Alcoholympics</h1>
        <p className="text-md font-bold text-center">Play trivia with your friends</p>
        <div className="flex space-x-16">
            <Link to="/create" className="rounded-lg border border-purple-700 bg-purple-500 text-white py-4 px-8">Create game</Link>
            <Link to="/join" className="rounded-lg border border-purple-700 text-dark py-4 px-8">Join game</Link>
        </div>
    </div>
}