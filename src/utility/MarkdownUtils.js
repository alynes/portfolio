export default class MarkdownUtils {
    static loadFile = async (filePath) => {
        return new Promise(function (resolve, reject) {
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", filePath, false);
            xmlHttp.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xmlHttp.responseText);
                } else {
                    reject(null);
                }
            };
            xmlHttp.onerror = function () {
                reject(null);
            };
            xmlHttp.send();
        });
        
    }
}