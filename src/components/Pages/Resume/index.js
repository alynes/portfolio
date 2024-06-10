import React from 'react';
import Markdown from 'react-markdown';

export default function Resume({loadedResumeFile, isPrint}) {

    return (
        <div className={'App-page'}>
            <div className={`Markdown-container${isPrint ? '-print' : ''}`}>
                <Markdown
                    escapeHtml={false}
                    source={loadedResumeFile}
                />
                <br/><br/>

            </div>
        </div>
        
    )
}
