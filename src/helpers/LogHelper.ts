import * as fs from 'fs';
import * as fsextra from 'fs-extra';

class LogHelper {
    static writeLog(message: string) {
        let folder = 'logs/';
        let path = (new Date()).toLocaleDateString() + '-constance.txt';
        let basePath = folder + path;
        fsextra.ensureDirSync(folder);
        fs.appendFile(basePath, (new Date()).toLocaleString() + ' : ' + message + '\n', 'utf8', err => err && console.log('\x1b[31m', err, '\x1b[0m'));
    }
}

Object.seal(LogHelper);
export default LogHelper;
