import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

// My Components
import Layout from './components/Layout/index.js';
import Portfolio from './components/Portfolio/index.js';
import Applications from './components/Applications/index.js';
import TradeBoy from "./components/Applications/TradeBoy";
import SocialAutomator from "./components/Applications/SocialAutomator";
import BPChronicles from "./components/Applications/BPChronicles";
import Resume from './components/Portfolio/Resume.js';

export default function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Layout>
                        <Route
                            exact
                            path={"/"}
                            render={props => <Portfolio {...props}/>}
                        />
                        <Route
                            exact
                            path={"/applications"}
                            render={props => <Applications {...props}/>}
                        />
                        <Route
                            exact
                            path={"/resume"}
                            render={props => <Resume {...props}/>}
                        />
                        <Route
                            exact
                            path={`/applications/trade-boy`}
                            component={TradeBoy}/>
                        <Route
                            exact
                            path={`/applications/social-automator`}
                            component={SocialAutomator}/>
                        <Route
                            exact
                            path={`/applications/bp-chronicles`}
                            component={BPChronicles}/>
                    </Layout>
                </Switch>
            </Router>
        </div>
    );
}
