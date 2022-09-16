import React from 'react';
import Markdown from 'react-markdown';

export default function Resume({loadedResumeFile}) {

    return (
        <div className={'App-page'}>
            <div className={'Markdown-container'}>
                <Markdown
                    escapeHtml={false}
                    source={loadedResumeFile}
                />
                <br/><br/>

            </div>
        </div>
        
    )
}
