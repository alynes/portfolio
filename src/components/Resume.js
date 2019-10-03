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
        </div>
    )
}

function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (Number(xmlhttp.status) === 200) {
        result = xmlhttp.responseText;
    }
    return result;
}