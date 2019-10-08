import React from 'react';
import Markdown from 'react-markdown';

export default function Resume() {
    let path = `${process.env.PUBLIC_URL}/RESUME.md`;
    const resume = loadFile(path);
    return (
        <div className={"App-page"}>
            <Markdown
                escapeHtml={false}
                source={resume}
            />
            <br/><br/>
        </div>
    )
}

function loadFile(filePath) {
    let result = null;
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", filePath, false);
    xmlHttp.send();
    if (Number(xmlHttp.status) === 200) {
        result = xmlHttp.responseText;
    }
    return result;
}
