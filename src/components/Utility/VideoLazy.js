import React, { useRef, useState } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import LoadingProgress from './LoadingProgress';

export default function VideoLazy({src}) {
    let [isLoading, setIsLoading] = useState(true);
    let vidRef = useRef(null);

    return (
        <div className={'Relative-full-width Flex-center'}>
            {isLoading &&
                <div className={'Absolute-full Flex-center'}>
                    <LoadingProgress />
                </div>
            }
            <LazyLoadComponent>
                <video ref={vidRef} playsInline autoPlay muted loop className={'App-img'} src={src} onPlay={() => setIsLoading(false)} />
            </LazyLoadComponent>
        </div>

    )
}
