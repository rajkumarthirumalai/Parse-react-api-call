import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Parse from 'parse/dist/parse.min.js';
import { PersonComponent } from './PersonComponent';
import { initializeParse } from '@parse/react';
import SignInSide from './materialuiRef/SignInSide';
import Home from "./materialuiRef/Home";
// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'APPLICATION_ID';
const PARSE_HOST_URL = 'http://localhost:1337/parse';
const PARSE_MASTER_KEY = 'MASTER_KEY';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_MASTER_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Router>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
          <SignInSide />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;