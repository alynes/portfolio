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
                    <Route
                        exact
                        path={"/resume/print"}
                        render={props => <Resume {...props}/>}
                    />
                    <Layout>
                        <Route
                            exact
                            path={"/"}
                            render={props => <Portfolio {...props}/>}
                        />
                        <Route
                            exact
                            path={"/resume"}
                            render={props => <Resume {...props}/>}
                        />
                        <Route
                            exact
                            path={`/trade-boy`}
                            component={TradeBoy}/>
                        <Route
                            exact
                            path={`/social-automator`}
                            component={SocialAutomator}/>
                        <Route
                            exact
                            path={`/bp-chronicles`}
                            component={BPChronicles}/>
                    </Layout>
                </Switch>
            </Router>
        </div>
    );
}
