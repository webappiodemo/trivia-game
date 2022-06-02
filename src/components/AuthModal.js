import React, {useState} from "react";
import supabase from "../supabase";

function LogInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return <form onSubmit={e => {
        e.preventDefault();
        supabase.auth.signIn({
            email: email,
            password: password,
        }).then(x => {
            console.log(x);
            // document.location.reload();
        });
    }} className="flex flex-col space-y-8">
        <label>Email</label>
        <input type="text" placeholder="me@example.com" value={email} onChange={e => setEmail(e.target.value)}/>
        <label>Password</label>
        <input type="password" placeholder="" value={password} onChange={e => setPassword(e.target.value)}/>
        <button
            type="submit"
            className="rounded-lg border border-purple-700 bg-purple-500 text-white py-4 px-8"
            disabled={!email || !password}
        >Log in
        </button>
    </form>
}

function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    return <form onSubmit={e => {
        e.preventDefault();
        supabase.auth.signUp({
            email: email,
            password: password,
            data: {
                name: name,
            }
        }).then(x => {
            console.log(x);
            document.location.reload();
        });
    }} className="flex flex-col space-y-8">
        <label>Your name</label>
        <input type="text" placeholder="Alex Li" value={name} onChange={e => setName(e.target.value)}/>
        <label>Email</label>
        <input type="text" placeholder="me@example.com" value={email} onChange={e => setEmail(e.target.value)}/>
        <label>Password</label>
        <input type="password" placeholder="" value={password} onChange={e => setPassword(e.target.value)}/>
        <button
            type="submit"
            className="rounded-lg border border-purple-700 bg-purple-500 text-white py-4 px-8"
            disabled={!email || !password || !name}
        >Register
        </button>
    </form>
}

export default function AuthModal() {
    const [askedAboutRegistration, setAskedAboutRegistration] = useState(false);
    const [isRegistering, setIsRegistering] = useState(true);

    return <>
        <div className="modal-backdrop bg-white-75"/>
        <div className="flex flex-col modal bg-white p-8 rounded-lg border border-purple-300">

            {!askedAboutRegistration
                ? <div className="flex flex-col space-y-8">
                    <h5>Do you have an account already?</h5>
                    <div className="flex space-x-16">
                        <button
                            type="button"
                            className="rounded-lg border border-purple-700 bg-purple-500 text-white py-4 px-8"
                            onClick={() => {
                                setAskedAboutRegistration(true);
                                setIsRegistering(true);
                            }}
                        >Create new account
                        </button>
                        <button
                            type="button"
                            className="rounded-lg border border-purple-700 text-dark py-4 px-8"
                            onClick={() => {
                                setAskedAboutRegistration(true);
                                setIsRegistering(false);
                            }}
                        >Log in
                        </button>
                    </div>
                </div>
                : isRegistering ? <RegisterForm/> : <LogInForm/>
            }
        </div>
    </>
}