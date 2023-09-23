import { downloadFile, getCurrentDateAsString } from "../globalComponents/utils";
import { decrypt, encrypt } from "./encryptionManager";
import { getEncryptedJSON, getEntries, getUnencryptedJSON } from "./entryManager";
import { user } from "./userManager";

import PassxBackupExport from "./export/passxBackup";
import PassxUnencryptedExport from "./export/passxUnencrypted";

// Possible export / import options: key is the number (< 10 = not encrypted > 10 encrypted)
const options = [
    new PassxBackupExport(),
    new PassxUnencryptedExport()
];

function getOptionTitles() {
    var titles = [];
    for(var i = 0; i < options.length; i++) {
        var v = options[i];
        titles.push(v.getTitle());
    }
    return titles;
}

function getOptions() {
    var output = [];
    for(var [key, value] of options) {
        output.push(key.getTitle());
    } 
    return output;
}


function isEncrypted(i) {
    if(i < 0) return undefined;
    return options[i].isEncrypted();
}

function getExportOption(i) {
    return options[i];
}

export {getOptionTitles, isEncrypted, getExportOption};