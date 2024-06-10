import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import Layout from './components/Layout/index.js';
import Portfolio from './components/Pages/Portfolio/index.js';
import Resume from './components/Pages/Resume/index.js';
import MarkdownUtils from './utility/MarkdownUtils';
import RouteConstants from './constant/RouteConstants';

import './App.css';

const resumePath = `${process.env.PUBLIC_URL}/assets/${RouteConstants.ResumeMd}`;

export default function App() {
    const [loadedResumeData, setLoadedResumeData] = useState(null);

    useEffect(() => {
        const loadResume = async () => setLoadedResumeData(await MarkdownUtils.loadFile(resumePath));
        loadResume().catch(console.error);

        return () => {
            setLoadedResumeData(false);
        }
    }, [])

    return (
        <div className='App'>
            <Router>
                <Switch>
                    <Route
                        exact
                        path={RouteConstants.ResumePrint}
                        render={props => <Resume loadedResumeFile={loadedResumeData} isPrint />}
                    />
                    <Layout>
                        <Route
                            path={'/'}
                            render={props => <Portfolio {...props} />}
                        />

                        <Route exact path={RouteConstants.Resume}>
                            {({ match }) => (
                                <CSSTransition
                                    in={match !== null}
                                    timeout={400}
                                    classNames='transition-resume'
                                    unmountOnExit
                                >
                                    <Resume loadedResumeFile={loadedResumeData} />
                                </CSSTransition>
                            )}
                        </Route>

                    </Layout>
                </Switch>
            </Router>
        </div>
    );

}
