import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

// My Components
import Layout from './components/Layout/index.js';
import Portfolio from './components/Portfolio/index.js';
import TradeBoy from "./components/Portfolio/TradeBoy";
import SocialAutomator from "./components/Portfolio/SocialAutomator";
import BPChronicles from "./components/Portfolio/BPChronicles";
import Resume from './components/Resume.js';

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
                            path={"/portfolio"}
                            render={props => <Portfolio {...props}/>}
                        />
                        <Route
                            exact
                            path={"/resume"}
                            render={props => <Resume {...props}/>}
                        />
                        <Route
                            exact
                            path={`/portfolio/trade-boy`}
                            component={TradeBoy}/>
                        <Route
                            exact
                            path={`/portfolio/social-automator`}
                            component={SocialAutomator}/>
                        <Route
                            exact
                            path={`/portfolio/bp-chronicles`}
                            component={BPChronicles}/>
                    </Layout>
                </Switch>
            </Router>
        </div>
    );
}
