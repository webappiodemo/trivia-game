import logo from './logo.svg';
import './App.css';

import { createClient } from '@supabase/supabase-js'
import {useEffect, useState} from "react";

// Create a single supabase client for interacting with your database
const supabase = createClient('https://iheesrzbuoyqqozhfxjp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloZWVzcnpidW95cXFvemhmeGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQxMTcyNjUsImV4cCI6MTk2OTY5MzI2NX0.cuBZi_a6g-bNcVizyjnRe7pFWkao3XHp6UU-TVp-QZA')

function App() {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(async () => {
    const {data, error} = await supabase.from("players").select("name");
    if(error) {
      setError(error);
    } else {
      setPlayers(data);
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the trivia game!
          Players are: {players.join(", ")}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
