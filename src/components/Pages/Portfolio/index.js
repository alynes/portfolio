import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';

import BasicModal from '../../Layout/Modal';
import RouteConstants from '../../../constant/RouteConstants';
import ThreeScene from './ThreeScene';
import TradeBoy from './Apps/TradeBoy';
import SocialAutomator from './Apps/SocialAutomator';
import BPChronicles from './Apps/BPChronicles';

const TRANSITION_TIMEOUT = 600; 

export default function Portfolio(props) {
    const history = useHistory();
    let [showModal, setShowModal] = useState(false);

    let handleChoosePortfolioItem = (appRoute) => {
        history.push(`${appRoute}`);
    }

    let handleCloseModal = () => {
        setShowModal(false);
        
        setTimeout(() => {
            history.push(`/`);
        }, TRANSITION_TIMEOUT)
    }

    useEffect(() => {
        const pathname = history.location.pathname;
        const pathnameNoTrailingSlash = pathname[pathname.length - 1] === '/' ? pathname.substring(0, pathname.length - 1) : pathname;

        switch(pathnameNoTrailingSlash) {
            case RouteConstants.Home:
            case RouteConstants.Resume:
            case RouteConstants.Portfolio:
                return;
            default:
                history.location.pathname !== '/' && setShowModal(true);
        }
    }, [])

    return (
        
        <div className={'Absolute-full Centered No-select'}>
            <ThreeScene showModal={showModal} setShowModal={setShowModal} handleChoosePortfolioItem={handleChoosePortfolioItem} {...props} />

            <BasicModal
                open={showModal}
                handleClose={handleCloseModal}
                timeout={TRANSITION_TIMEOUT}
                
            >
                <Route path={RouteConstants.TradeBoy}>
                    <TradeBoy />
                </Route>

                <Route path={RouteConstants.BpChronicles}>
                    <BPChronicles />
                </Route>

                <Route path={RouteConstants.SocialAutomator}>
                    <SocialAutomator />
                </Route>

            </BasicModal>

        </div>
    )
}
