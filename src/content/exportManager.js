import { decrypt, encrypt } from "./encryptionManager";
import { getEncryptedJSON, getEntries, getUnencryptedJSON } from "./entryManager";
import { user } from "./userManager";

// Possible export / import options: key is the number (< 10 = not encrypted > 10 encrypted)
const options = new Map();


options.set("Passx Backup (CSV)", 11);
options.set("Passx Unencrypted (CSV)", 1);
options.set("KeePass (CSV)", 2);

function getOptions() {
    var output = [];
    for(var [key, value] of options) {
        output.push(key);
    } 
    return output;
}

function isEncrypted(i) {
    console.log(getOptions()[i]);
    return options.get(getOptions()[i]) > 10;
}

function exportData(method) {
    var methodId = options.get(getOptions()[method]);
    var output = {};

    // PassX Backup
    if(methodId == 11) {
        output.user = {
            name: user.getName(),
            passwordTest: encrypt(user.getPassword(), user.getPasswordTest()),
        };
        output.entries = getEncryptedJSON(true, true, true, true, true, true, true);
    }
    
    // PassX Unencrypted
    if(methodId == 1) {
        output.passwordTest = user.getPasswordTest();
        output.entries = getUnencryptedJSON(true, true, true, true, true, true, true);
        
    }

    // KeePass CSV
    if(methodId == 2) {
        output = [];
        output.push({
            "Account": "Sample Entry",
            "Login Name": "User Name",
            "Password": "Password",
            "Web Site": "https://keepass.info/",
            "Comments": "Notes"
        });
        for(var i = 0; i < getEntries().length; i++) {
            var v = getEntries()[i];
            output.push({
                "Account": v.getTitle(),
                "Login Name": v.getUsername(),
                "Password": v.getPassword(),
                "Web Site": v.getUrl(),
                "Comments": v.getDescription() + (v.getEmail() ? ";" + v.getEmail() : "")
            });
        }
        return output;
    }

    return JSON.stringify(output);
}

export {getOptions, isEncrypted, exportData};