import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

// My Components
import Layout from './components/Layout/index.js';
import Home from './components/Home/index.js';

function App() {

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route
                        exact
                        path={"/"}
                        render={props => <Layout component={<Home {...props} />} />}
                    />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
